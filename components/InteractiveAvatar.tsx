import type { StartAvatarResponse } from "@heygen/streaming-avatar";

import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents, TaskMode, TaskType, VoiceEmotion,
} from "@heygen/streaming-avatar";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Select,
  SelectItem,
  Spinner,
  Chip,
  Tabs,
  Tab,
  Tooltip
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useMemoizedFn, usePrevious } from "ahooks";
import InteractiveAvatarTextInput from "./InteractiveAvatarTextInput";
import {AVATARS, STT_LANGUAGE_LIST} from "@/app/lib/constants";
import Groq from "groq-sdk";
import { Microphone, MicrophoneStage } from "@phosphor-icons/react";
import clsx from "clsx";
import { KNOWLWEDGE } from "@/app/lib/constants";
import OpenAI from "openai";




// const openai = new Groq({
//   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true,
// });

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});


// Define a type for chat messages
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};


export default function InteractiveAvatar() {
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [isLoadingRepeat, setIsLoadingRepeat] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [debug, setDebug] = useState<string>();
  const [knowledgeId, setKnowledgeId] = useState<string>("");
  const [avatarId, setAvatarId] = useState<string>("Tyler-incasualsuit-20220721");
  const [language, setLanguage] = useState<string>('hi');

  const [data, setData] = useState<StartAvatarResponse>();
  const [text, setText] = useState<string>("");
  const mediaStream = useRef<HTMLVideoElement>(null);
  const avatar = useRef<StreamingAvatar | null>(null);
  const [chatMode, setChatMode] = useState("text_mode");
  const [isUserTalking, setIsUserTalking] = useState(false);


  const [startInitial, setStartInitial] = useState(false)
  const [newInput, setNewInput] = useState("");
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [recording, setRecording] = useState(false); // Track recording state
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [gptoutput , setGptOutput] = useState<string>("");
  const [voiceId, setVoiceId] = useState<string>("7c6a15c7caf8415fb2102faafd7e2259");



  async function fetchAccessToken() {
    try {
      const response = await fetch("/api/get-access-token", {
        method: "POST",
      });
      const token = await response.text();

      console.log("Access Token:", token); // Log the token to verify

      return token;
    } catch (error) {
      console.error("Error fetching access token:", error);
    }

    return "";
  }

  async function handleGetResponse(inp : string) {
    console.log("handleGetResponse triggered", newInput, inp);
    let accumulatedText = "";
    const chunkSize = 100; // Adjust based on your needs
    setIsLoadingChat(true)
    try {
      // Add the new user message to the chat history
    const newUserMessage: ChatMessage = {
      role: 'user',
      content: inp ? inp : newInput
    };

    const updatedHistory = [...chatHistory, newUserMessage];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure the content type is set to JSON
        },
        body: JSON.stringify({ messages: updatedHistory }),
      });

      console.log("response", response); // Log the token to verify
      // return token;
      const dataFromApi = await response.text()
      // Sanitize the text to remove any special characters
    const sanitizedData = dataFromApi.replace(/[*_~`]/g, '');

      console.log("data", dataFromApi);
      setChatHistory([...updatedHistory])
      
      if (isSessionActive && avatar.current) {
        setIsLoadingChat(false)
        console.log("Enter inside")
        // Update the Gpt Output Showing
        setGptOutput(sanitizedData)
        await avatar.current.speak({ text: sanitizedData ,  taskType: TaskType.REPEAT, taskMode: TaskMode.SYNC})
          .catch(async (e) => {
            setDebug(e.message);
            // Check if the error is an object with a response field
            if (e && e.response) {
              try {
                // Await the JSON response
                const error = await e.response.json();
                const errorMessage = error.message || e.response.statusText || "Unknown error occurred";
                console.log("Error code:", error.code, " - ", errorMessage);

                if(error.code == 10005){
                  alert("Session Expired")
                  window.location.reload()
                }
                else if(error.code == 10014){
                  alert("Session Expired")
                  window.location.reload()
                }
                else if(error.code == 10007){
                  alert("Concurrent limit reached")
                  window.location.reload()
                }
                else if(error.code == 400123){
                  alert("Exceed rate limit")
                  window.location.reload()
                }
                else if(error.code == 10015){
                  alert("Limit Expired , Please come after some time")
                  window.location.reload()
                }
                // Optionally, you can set the debug message here if needed
                setDebug(`Error code: ${error.code} - ${errorMessage}`);
              } catch (jsonError) {
                // Handle any errors that occur while parsing the JSON
                console.log("Error parsing JSON response:", jsonError);
                setDebug("An error occurred while parsing the error response.");
              }
            } else {
              // If it's not a structured response, handle it as a generic error
              console.log("Error is ", e);
              setDebug(e.message || "An unknown error occurred.");
            }
          });
      } else {
        setDebug("Avatar API not initialized");
      } 
    } catch (error) {
      console.error("Error fetching response from AI:", error);
      return "";
    }
  }

  // async function transcribeAudio(audioBlob: Blob) {
  //   try {
  //     // Convert Blob to File
  //     const audioFile = new File([audioBlob], "recording.wav", {
  //       type: "audio/wav",
  //     });
  //     // const response = await openai.audio.transcriptions.create({
  //     //   model: "whisper-1",
  //     //   file: audioFile,
  //     // });
  //     const response = await openai.audio.transcriptions.create({
  //       file: audioFile,
  //       model: "whisper-large-v3",
  //       prompt: "Specify context or spelling", // Optional
  //       response_format: "json", // Optional
  //       language: "en", // Optional
  //       temperature: 0.0, // Optional
  //     });
  //     const transcription = response.text;
  //     console.log("Transcription: ", transcription);
  //     setNewInput(transcription);
  //     handleGetResponse(transcription)
  //   } catch (error) {
  //     console.error("Error transcribing audio:", error);
  //   }
  // }

  async function transcribeAudio(audioBlob: Blob) {
    try {
      // Convert Blob to File
      const audioFile = new File([audioBlob], "recording.wav", {
        type: "audio/wav",
      });
      const response = await openai.audio.transcriptions.create({
        model: "whisper-1",
        file: audioFile,
        language:"en",
        prompt: "Specify context or spelling", 
        response_format: "json",
        temperature:0.9
      });
      const transcription = response.text;
      console.log("Transcription: ", transcription);
      setNewInput(transcription);
      handleGetResponse(transcription)
    } catch (error) {
      console.error("Error transcribing audio:", error);
    }
  }

  function startRecording() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };
        mediaRecorder.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, {
            type: "audio/wav",
          });
          audioChunks.current = [];
          transcribeAudio(audioBlob);
        };
        mediaRecorder.current.start();
        setRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  }

  function stopRecording() {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setRecording(false);
    }
  }

  async function startSession() {
    setIsLoadingSession(true);
    const newToken = await fetchAccessToken();

    avatar.current = new StreamingAvatar({
      token: newToken,
    });
    avatar.current.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
      console.log("Avatar started talking", e);
    });
    avatar.current.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
      console.log("Avatar stopped talking", e);
      setGptOutput("")
      setNewInput("")
    });
    avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
      console.log("Stream disconnected");
      endSession();
      setIsSessionActive(false)
      setIsLoadingSession(false)
      setNewInput("")
      setGptOutput("")
    });
    avatar.current?.on(StreamingEvents.STREAM_READY, (event) => {
      console.log(">>>>> Stream ready:", event.detail);
      setStream(event.detail);
    });
    avatar.current?.on(StreamingEvents.USER_START, (event) => {
      console.log(">>>>> User started talking:", event);
      setIsUserTalking(true);
    });
    avatar.current?.on(StreamingEvents.USER_STOP, (event) => {
      console.log(">>>>> User stopped talking:", event);
      setIsUserTalking(false);
    });
    try {
      const res = await avatar.current.createStartAvatar({
        quality: AvatarQuality.Medium,
        avatarName: avatarId,
        knowledgeBase: KNOWLWEDGE,
        voice: {
          rate: 1.2, // 0.5 ~ 1.5
          emotion: VoiceEmotion.FRIENDLY,
        },
        language: "en"
      });

      console.log("res", res)
      setData(res);
      if (avatar.current?.mediaStream) {
        setStream(avatar.current.mediaStream);
      } else {
        setStream(undefined);
      }
      setIsSessionActive(true); // Set session as active 
      setStartInitial(true)
      // default to voice mode  
      // await avatar.current?.startVoiceChat();
      // setChatMode("voice_mode");
    } catch (error) {
      console.error("Error starting avatar session:", error);
      setIsLoadingSession(false);
    }
  }

  async function handleSpeak() {
    setIsLoadingRepeat(true);
    if (!avatar.current) {
      setDebug("Avatar API not initialized");

      return;
    }
    // speak({ text: text, task_type: TaskType.REPEAT })
    await avatar.current.speak({ text: text ,  taskType: TaskType.REPEAT, taskMode: TaskMode.SYNC }).catch((e) => {
      setDebug(e.message);
    });
    setIsLoadingRepeat(false);
  }
  async function handleInterrupt() {
    if (!avatar.current) {
      setDebug("Avatar API not initialized");

      return;
    }
    await avatar.current
      .interrupt()
      .catch((e) => {
        setDebug(e.message);
      });
  }

  async function endSession() {
    await avatar.current?.stopAvatar();
    setStream(undefined);
  }

  const handleChangeChatMode = useMemoizedFn(async (v) => {
    if (v === chatMode) {
      return;
    }
    if (v === "text_mode") {
      avatar.current?.closeVoiceChat();
    } else {
      await avatar.current?.startVoiceChat();
    }
    setChatMode(v);
  });

  useEffect(() => {
    // Define an async function
    const fetchData = async () => {
      try {
      setTimeout(async()=>{
        if (isSessionActive) {
          setIsLoadingChat(false)
          console.log("Enter inside the code", isSessionActive)
          // Update the Gpt Output Showing
          const name = localStorage.getItem("name")
          const text = `Hello ${name}! Welcome to the Sensodyne Kumbh Mela Assistant! I am here to assist you during the Kumbh Mela 2025. Do you need information about the event location, services, or programs?`
          const newUserMessage: ChatMessage = {
            role: 'user',
            content: text
          };

          const updatedHistory = [...chatHistory, newUserMessage];

          
          avatar.current && await avatar.current.speak({ text: text ,  taskType: TaskType.REPEAT, taskMode: TaskMode.SYNC})
            .catch(async (e) => {
              // Check if the error is an object with a response field
              if (e && e.response) {
                try {
                  // Await the JSON response
                  const error = await e.response.json();
                  const errorMessage = error.message || e.response.statusText || "Unknown error occurred";
                  console.log("Error code:", error.code, " - ", errorMessage);
  
                  if(error.code == 10005){
                    alert("Session Expired")
                    window.location.reload()
                  }
                  else if(error.code == 10015){
                    alert("Limit Expired , Please come after some time")
                    window.location.reload()
                  }
                  // Optionally, you can set the debug message here if needed
                  setDebug(`Error code: ${error.code} - ${errorMessage}`);
                } catch (jsonError) {
                  // Handle any errors that occur while parsing the JSON
                  console.log("Error parsing JSON response:", jsonError);
                  setDebug("An error occurred while parsing the error response.");
                }
              } else {
                // If it's not a structured response, handle it as a generic error
                console.log("Error is ", e);
                setDebug(e.message || "An unknown error occurred.");
              }
            });

            setChatHistory(updatedHistory)
          
        } else {
          setDebug("Avatar API not initialized");
        }
      },3000) 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  console.log("avatarActive" , isSessionActive , isLoadingSession)
    // Immediately call the async function inside useEffect
    fetchData();
  
    // Return nothing or a cleanup function
  }, [isSessionActive, isLoadingSession ]);  // The dependency array for the effect

  const previousText = usePrevious(text);
  useEffect(() => {
    if (!previousText && text) {
      avatar.current?.startListening();
    } else if (previousText && !text) {
      avatar?.current?.stopListening();
    }
  }, [text, previousText]);

  useEffect(() => {
    return () => {
      endSession();
    };
  }, []);

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
        setDebug("Playing");
      };
    }
  }, [mediaStream, stream]);

  return (
    <div className="w-full flex flex-col gap-4" id="avatar-card">
      <Card>
        <CardBody className="h-[400px] flex flex-col justify-center items-center" >
          {stream ? (
            <div className="h-[400px] justify-center items-center flex rounded-lg overflow-hidden">
              <video
                ref={mediaStream}
                autoPlay
                playsInline
                style={{
                  width: "90%",
                  // height: "100%",
                  borderRadius: '13px',
                  objectFit: 'cover',
                  filter:'hue-rotate(5deg)'
                }}
              >
                <track kind="captions" />
              </video>
              <div className="flex flex-col gap-2 absolute bottom-3 right-3">
                <Button
                  size="md"
                  onClick={handleInterrupt}
                  className="bg-gradient-to-tr from-indigo-500 to-indigo-300 text-white rounded-lg"
                  variant="shadow"
                >
                  Interrupt task
                </Button>
                <Button
                  size="md"
                  onClick={endSession}
                  className="bg-gradient-to-tr from-indigo-500 to-indigo-300  text-white rounded-lg"
                  variant="shadow"
                >
                  End session
                </Button>
              </div>
            </div>
          ) : !isLoadingSession ? (
            <div className="h-full justify-center items-center flex flex-col gap-8 w-[500px] self-center">
              <div className="flex flex-col gap-2 w-full">
                <p className="text-sm font-medium leading-none">
                  Custom Avatar ID
                </p>
                <Input
                  value="Tyler"
                  // onChange={(e) => setAvatarId(e.target.value)}
                  placeholder="Enter a custom avatar ID"
                />
                {/* <Select
                  placeholder="Or select one from these example avatars"
                  size="md"
                  onChange={(e) => {
                    setAvatarId(e.target.value);
                  }}
                > */}
                  {/* {AVATARS.map((avatar) => (
                    <SelectItem
                      key={avatar.avatar_id}
                      textValue={avatar.avatar_id}
                    >
                      {avatar.name}
                    </SelectItem>
                  ))}
                </Select> */}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <p className="text-sm font-medium leading-none">
                  Custom Voice ID
                </p>
                <Input
                  value="1"
                  // onChange={(e) => setVoiceId(e.target.value)}
                  placeholder="Enter a custom voice ID"
                />
                {/* <Select
                  placeholder="Or select one from these example voices"
                  size="md"
                  onChange={(e) => {
                    setVoiceId(e.target.value);
                  }}
                >
                  {VOICES.map((voice) => (
                    <SelectItem key={voice.voice_id} textValue={voice.voice_id}>
                      {voice.name} | {voice.language} | {voice.gender}
                    </SelectItem>
                  ))}
                </Select> */}
              </div>
              <Button
                size="md"
                onClick={startSession}
                className="bg-gradient-to-tr from-indigo-500 to-indigo-300 w-full text-white"
                variant="shadow"
              >
                Start session
              </Button>
            </div>
          ) : (
            <Spinner size="lg" color="default" />
          )}
        </CardBody>
        {isSessionActive && ( // Only show input when session is active
        <CardFooter className="flex flex-col">
          {/* <Divider /> */}
            <InteractiveAvatarTextInput
              label={' '}
              placeholder="Chat with the avatar"
              input={newInput}
              onSubmit={() => {
                setIsLoadingChat(false);
                if (!newInput) {
                  setDebug("Please enter text");
                  return;
                }
                // handleSubmit();
                handleGetResponse(newInput);
              }}
              
              setInput={setNewInput}
              loading={isLoadingChat}
              endContent={
                <Tooltip
                  content={!recording ? "Start recording" : "Stop recording"}
                >
                  <Button
                    onClick={!recording ? startRecording : stopRecording}
                    isDisabled={!stream}
                    isIconOnly
                    className={clsx(
                      "mr-4 text-white",
                      !recording
                        ? "bg-gradient-to-tr from-indigo-500 to-indigo-300"
                        : ""
                    )}
                    size="sm"
                    variant="shadow"
                  >
                    {!recording ? (
                      <Microphone size={20} />
                    ) : (
                      <>
                        <div className="absolute h-full w-full bg-gradient-to-tr from-indigo-500 to-indigo-300 animate-pulse -z-10"></div>
                        <MicrophoneStage size={20} />
                      </>
                    )}
                  </Button>
                </Tooltip>
              }
              disabled={!stream}
            />
        </CardFooter>
          )
        }
      </Card>
      {
        gptoutput && <p>
            {gptoutput}
        </p>
      }
      {/* <p className="font-mono text-right">
        <span className="font-bold">Console:</span>
        <br />
        {debug}
      </p> */}
    </div>
  );
}
