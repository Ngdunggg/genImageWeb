import { GoogleGenAI, Modality } from "@google/genai";
import * as dotenv from 'dotenv'

dotenv.config()

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export default ai