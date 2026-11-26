
import { model, systemInstruction, ai } from './assistant.js';

const testCases = [
    {
        question: 'Where is Tal Barahi located?',
        expected: 'Pokhara'
    },
    {
        question: 'Which main jatra is kumari jatra part of?',
        expected: 'Indra Jatra'
    },
    {
        question: 'Which planet is known as the Red Planet?',
        expected: 'Mars'
    }
];

// Evaluate assistant response
async function evaluateAssistant(question) {

    const response = await ai.models.generateContent({

        model: model,
        contents: question,

        config: {
            systemInstruction: systemInstruction,
        }
    });

    return response.text;
}

// Run test cases
async function runTests() {

    let passed = 0;

    for (const test of testCases) {

        const response = await evaluateAssistant(test.question);

        const ok = response.toLowerCase().includes(
            test.expected.toLowerCase()
        );

        console.log('\nQuestion:', test.question);
        console.log('Expected:', test.expected);
        console.log('Response:', response);
        console.log('Result:', ok ? 'PASS' : 'FAIL');

        if (ok) {
            passed++;
        }
    }

    // Calculate pass rate
    const total = testCases.length;

    const passRate = (passed / total) * 100;

    console.log('\n========== TEST SUMMARY ==========');
    console.log('Total Tests:', total);
    console.log('Passed:', passed);
    console.log('Failed:', total - passed);
    console.log('Pass Rate:', passRate.toFixed(2) + '%');
}

// Execute tests
runTests();
