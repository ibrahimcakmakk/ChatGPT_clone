import  express from "express";
import * as dotenv from "dotenv"
import cors from "cors"
import { Configuration , OpenAIApi } from "openai";

dotenv.config()

const configuration = new Configuration({
    apiKey: " " //
})

const openai = new OpenAIApi(configuration)
const app = express()
app.use(cors())
app.use(express.json())

app.get("/",async (req, res)=>{
    res.status(200).send({message: "Uygulamanın server tarafı ayakta"})
})

app.post('/',async(req,res)=>{
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature:0,
            max_tokens:3000,
            frequency_penalty:0.5,
            presence_penalty: 0
        })
        res.status(200).send({
            bot: response.data.choices[0].text
        })
    } catch (error) {
        console.error(error)
        res.status(500).send(error || "yanlıs giden seyler var")
    }
    
    
   
})

app.listen(5001,()=> console.log("AI server yayını basladı: http://localhost:5001"))
