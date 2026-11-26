
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const imagePath = './images/f450d95e15e93c9727848fd93d4bacaf.jpg';

const imageData = fs.readFileSync(imagePath).toString('base64');

const prompt = [
    {
        text: 'Explain why photosynthesis hapens in night usimg sunlight'
    },
    {
        inlineData: {
            mimeType: 'image/jpeg',
            data: imageData
        }
    }
];

const follow_up_request = [
    'Which K-drama is the character from?'
];

async function main() {
    try {
        const history = [];

        history.push({
            role: 'user',
            parts: prompt
        });

        const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: history
        });

        console.log('\nImage Description:');
        console.log(response.text);

        history.push({
            role: 'model',
            parts: [{ text: response.text }]
        });

        for (const follow_up of follow_up_request) {

            history.push({
                role: 'user',
                parts: [{ text: follow_up }]
            });

            const resp2 = await ai.models.generateContent({
                model: 'gemini-3.1-flash-lite',
                contents: history
            });

            console.log('\nFollow-up Question:', follow_up);
            console.log('Gemini Response:', resp2.text);

            history.push({
                role: 'model',
                parts: [{ text: resp2.text }]
            });
        }

    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
