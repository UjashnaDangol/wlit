import { ai , model , systemInstruction} from './assistant.js'


async function main() {

    const response = await ai.models.generateContent({
        model : model ,
        contents : 'When does Momoyo in nepal open for business everyday',
        config: {
            systemInstruction  : systemInstruction ,
            responseMimeType : 'application/json',

            responseSchema : {
                type : 'OBJECT',
                properties : {
                    question : {
                        type : 'STRING'
                    },
                    answer: {
                        type : 'STRING'
                    }
                },
                required : ['question' , 'answer']

            }
        }
    })

    const result = JSON.parse(response.text)

    console.log('\nQuestion :', result.question)
    console.log('\nAnswer :', result.answer)
}

main()