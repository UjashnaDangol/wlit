
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';
import readline from 'readline/promises';

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const topics = 'JavaScript';
const difficulty = 'easy';
const numQuestions = 3;

const responseSchema = {
    type: 'object',
    properties: {
        questions: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    question: { type: 'string' },
                    options: {
                        type: 'array',
                        items: { type: 'string' }
                    },
                    correctAnswer: { type: 'string' },
                    difficultyLevel: {
                        type: 'string',
                        enum: ['Easy', 'Medium', 'Difficult']
                    }
                },
                required: [
                    'question',
                    'options',
                    'correctAnswer',
                    'difficultyLevel'
                ]
            }
        }
    },
    required: ['questions']
};

const configuration = {
    systemInstruction: `
        Think of yourself as a teacher who creates quizzes.

        1. Base every question only on the provided topic or notes.
        2. Generate questions according to the requested difficulty.
        3. Each question must have exactly 4 options.
        4. Only one option must be correct.
        5. Remember previous conversation messages.
        6. Answer follow-up questions using previous conversation context.
    `,
    temperature: 0.2,
    responseMimeType: 'application/json',
    responseSchema: responseSchema
};

const history = [];

async function main() {

    try {

        const prompt = `
            Generate ${numQuestions} ${difficulty} multiple-choice
            questions about ${topics}.
        `;

        history.push({
            role: 'user',
            parts: [{ text: prompt }]
        });

        const response = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: history,
            config: configuration
        });

        const quiz = JSON.parse(response.text);

        console.log('\n========== GENERATED QUIZ ==========\n');

        quiz.questions.forEach((q, index) => {

            console.log(`\nQuestion ${index + 1}: ${q.question}`);

            q.options.forEach((option, i) => {
                console.log(
                    `Option ${String.fromCharCode(65 + i)}: ${option}`
                );
            });

            console.log(`Correct Answer: ${q.correctAnswer}`);
            console.log(`Difficulty: ${q.difficultyLevel}`);

        });

        history.push({
            role: 'model',
            parts: [{ text: response.text }]
        });

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log('\n========== FOLLOW-UP CONVERSATION ==========');
        console.log('Ask anything about your quiz or topic.');
        console.log('Type "exit" to end the conversation.');

        while (true) {

            const message = await rl.question('\nYou: ');

            if (message.trim().toLowerCase() === 'exit') {
                console.log('\nConversation ended.');
                break;
            }

            if (!message.trim()) {
                continue;
            }

            history.push({
                role: 'user',
                parts: [{ text: message }]
            });

            const reply = await ai.models.generateContent({
                model: 'gemini-3.1-flash-lite',
                contents: history,
                config: {
                    systemInstruction: configuration.systemInstruction,
                    temperature: 0.2,
                    responseMimeType: 'text/plain'
                }
            });

            console.log('\nGemini:', reply.text);

            history.push({
                role: 'model',
                parts: [{ text: reply.text }]
            });

        }

        console.log('\n========== CONVERSATION HISTORY ==========\n');

        history.forEach((item, index) => {

            console.log(`Message ${index + 1}`);
            console.log(`Role: ${item.role}`);

            console.log(
                'Content:',
                item.parts
                    .filter(part => part.text)
                    .map(part => part.text)
                    .join('\n')
            );

            console.log('-----------------------------');

        });

        rl.close();

    } catch (error) {
        console.error('Error:', error.message);
    }
}

main();
