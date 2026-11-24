
import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';



const resSchema = {
                    type: 'object',
                    properties: {
                        questions: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    question: {
                                        type: 'string'
                                    },
                                    options: {
                                        type: 'array',
                                        items: {
                                            type: 'string'
                                        }
                                    },
                                    correctAnswer: {
                                        type: 'string'
                                    },
                                    difficulty: {
                                        type: 'string',
                                        enum: ['Easy', 'Medium', 'Hard']
                                    }
                                },
                                required: [
                                    'question',
                                    'options',
                                    'correctAnswer',
                                    'difficulty'
                                ]
                            }
                        }
                    },
                    required: ['questions']
                }


const configuration =  {
                systemInstruction:
                    'You are an AI quiz generator. Generate multiple-choice questions with exactly 4 options and only one correct answer. Include the difficulty level (Easy, Medium, or Hard).',

                responseMimeType: 'application/json',

                responseSchema: resSchema 
            }                

const prompt = `Generate 5 multiple-choice quiz questions about JavaScript with ${configuration.difficulty}.`
// Initialize Gemini AI
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// Main function
async function main() {

    try {
        const response = await ai.models.generateContent({

            model: 'gemini-3.1-flash-lite',

            contents: prompt,

            config: configuration
        });

        // Convert JSON response into a JavaScript object
        const quiz = JSON.parse(response.text);

        // Display quiz questions
        console.log('\n========== AI GENERATED QUIZ ==========\n');

        quiz.questions.forEach((q, index) => {

            console.log(`Question ${index + 1}: ${q.question}`);

            // Display four options
            q.options.forEach((option, i) => {
                console.log(
                    `Option ${String.fromCharCode(65 + i)}: ${option}`
                );
            });

            console.log(`Correct Answer: ${q.correctAnswer}`);
            console.log(`Difficulty: ${q.difficulty}`);
            console.log('\n---------------------------------------\n');
        });

    } catch (error) {
        console.error('Error generating quiz:', error.message);
    }
}

// Execute main function
main();
