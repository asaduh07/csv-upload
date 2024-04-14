import './src/config/env.config.js'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectToDB } from './src/config/mongoose.config.js';
import csvRouter from './src/features/csv.routes.js';
import { ApplicationError } from './src/Error-handler/applicationerror.js';
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.get('/',(req,res)=>{
    res.status(200).send("Welcome to the api");
})
app.use('/api/csv',csvRouter);

app.use((req, res) => {
    res.status(404).send("API not found")
})

app.use((err, req, res, next) => {
    console.log(err);
    
    if (err instanceof ApplicationError) {
        res.status(err.code).send(err.message);
    }
    //server errors.
     res.status(500).send("Something went wrong, try again later");
});


app.listen(process.env.PORT,()=>{
    console.log(`Server is running at ${process.env.PORT}`)
    connectToDB();
})
