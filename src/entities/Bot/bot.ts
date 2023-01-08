import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv"
dotenv.config()
export async function GetAnswer(message){
    const configuration = new Configuration({
        organization: process.env.botOrganization,
        apiKey: process.env.botToken
    });
    const openai = new OpenAIApi(configuration);
    
    const response = await openai.createCompletion(
        {model: 'text-davinci-003', prompt: message, max_tokens: 512, top_p: 0.1}
    );
    return response.data.choices[0].text
}

