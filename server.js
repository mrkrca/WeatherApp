import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

dotenv.config()
const app = express();
const port = 3000;


console.log(process.env.API_KEY);
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }));




app.get("/", (req, res)=> {
    res.render("index.ejs", { content: "result"});
})

app.post("/", async (req, res) => {
    try {
        console.log(req.body);
        const unit = req.body.units;
        console.log(req.body.units);

        const cityChoice = req.body.choice;
        const response = await axios.get("http://api.weatherstack.com/current?" + "access_key=" + process.env.API_KEY + "&query=" + cityChoice);
        const result = response.data;
        console.log(JSON.stringify(result));

        if (unit === "American") {
            const celsiusTemp = result.current.temperature;
            const fahrenheitTemp = (celsiusTemp * 9 / 5) + 32;
            result.current.temperature = fahrenheitTemp.toFixed(2); // Convert to Fahrenheit and round to 2 decimal places
            console.log(fahrenheitTemp);
        }
        res.render("index.ejs", { content: result, unit: unit });
    } catch (error) {
        console.error(error);
        res.render("index.ejs", { content: null, error: "Error fetching weather data", unit: null });
    }
});


app.listen(port, ()=> {
    console.log(`Server is listening to port ${port}`);
    
})