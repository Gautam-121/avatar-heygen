// import Groq from "groq-sdk";
// import { PROMPT } from "@/app/lib/constants";

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });
//   const { messages } = await req.json();

//   // Enhance the messages with a system message
//   const enhancedMessages = [
//     {
//       role: "system",
//       content: PROMPT
//     },
//     ...messages
//   ];

//   // Stream the chat completion response
//   const stream = await groq.chat.completions.create({
//     messages: enhancedMessages,
//     model: "llama-3.1-8b-instant",
//     stream: true,
//     temperature: 0,
//   });

//   return new Response(
//     new ReadableStream({
//       async start(controller) {
//         for await (const chunk of stream) {
//           const content = chunk.choices[0]?.delta?.content || '';
//           controller.enqueue(new TextEncoder().encode(content));
//         }
//         controller.close();
//       }
//     }),
//     {
//       headers: {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         'Connection': 'keep-alive'
//       }
//     }
//   );
// }

import { OpenAI } from "openai";
import {PROMPT} from "../../lib/constants"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });
  const { messages } = await req.json();

  console.log("mesages" , messages)

  // Enhance the messages with a system message
  const enhancedMessages = [
    {
      role: "system",
      content: PROMPT
    },
    ...messages
  ];

  // Stream the chat completion response using OpenAI
  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: enhancedMessages,
    stream: true,
    temperature: 0,
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
}

