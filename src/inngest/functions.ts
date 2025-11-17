import { inngest } from "./client";
import {createGoogleGenerativeAI} from "@ai-sdk/google";
import { generateText } from 'ai';

const google = createGoogleGenerativeAI();

export const excute = inngest.createFunction(
  { id: "excute-ai" },
  { event: "excute.ai" },
  async ({ event, step }) => {
      const {steps} = await step.ai.wrap("gemini-generate-text",generateText,{
          model:google("gemini-2.5-flash"),
          system:"you are a help full assistent!",
          prompt:"What is 2 + 2?"
      })

      return steps;

  },
);
