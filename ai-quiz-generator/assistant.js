import { GoogleGenAI } from '@google/genai'
import 'dotenv/config'

export const ai = new GoogleGenAI({
    apiKey : process.env.GEMINI_API_KEY,
})

export const model = 'gemini-3.1-flash-lite'

export const systemInstruction = ` Explain accurately , use simple language , donot invent facts , statistics , if unsure say so , polite correct false premises , ask for clarification donot present as a guess `