import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config()
const app = express();
const port = 3000;


console.log(process.env.API_KEY);
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/", (req, res)=> {
    res.render("index.ejs", { content: "result"});
})

app.post("/", async (req, res)=> {
    try {
        console.log(req.body);
        const cityChoice = req.body.choice
        const response = await axios.get("http://api.weatherstack.com/current?" + "access_key=" + process.env.API_KEY + "&query=" + cityChoice);
        const result = response.data
        console.log(JSON.stringify(result));
        
        res.render("index.ejs", { content: result});
    } catch (error){
        console.error(error);
       
    }
})

app.listen(port, ()=> {
    console.log(`Server is listening to port ${port}`);
    
})