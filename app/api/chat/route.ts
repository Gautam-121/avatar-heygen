import { OpenAI } from "openai";
import { PROMPT, KNOWLWEDGE } from "../../lib/constants";
import { OpenAIEmbeddings } from '@langchain/openai';
import { Document } from '@langchain/core/documents';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// Function to create vector store from knowledge base
async function createVectorStore(knowledge: string) {
  const documents = [new Document({ pageContent: knowledge })];
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
  });
  
  return await MemoryVectorStore.fromDocuments(documents, embeddings);
}

// Function to retrieve relevant context
async function getRelevantContext(vectorStore: MemoryVectorStore, query: string) {
  const results = await vectorStore.similaritySearch(query, 3);
  return results.map(doc => doc.pageContent).join('\n');
}

interface Message {
  role: string;
  content: string;
}

export async function POST(req: Request) {
  const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });
  const { messages } = await req.json();

  try {
    // Create vector store from your knowledge base
    const vectorStore = await createVectorStore(KNOWLWEDGE);

    // Get the user's latest message
    const userMessage = messages[messages.length - 1].content;

    // Retrieve relevant context
    const relevantContext = await getRelevantContext(vectorStore, userMessage);

    // Enhance the messages with system message and context
    const enhancedMessages = [
      {
        role: "system",
        content: `${PROMPT}\n\nRelevant context for the query:\n${relevantContext}`
      },
      ...messages
    ];

    console.log("Enhanced messages:", enhancedMessages);

    // Stream the chat completion response using OpenAI
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: enhancedMessages,
      stream: true,
      temperature: 0,
      max_tokens: 1000,
    });

    return new Response(
      new ReadableStream({
        async start(controller) {
          // Stream the chunks from OpenAI to the client
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            controller.enqueue(new TextEncoder().encode(content));
          }
          controller.close();
        }
      }),
      {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        }
      }
    );
  } catch (error) {
    console.error("Error in RAG process:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}