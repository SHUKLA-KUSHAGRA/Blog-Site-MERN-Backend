import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Router from "./routes/route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({extended : true}));
app.use(bodyParser.urlencoded({extended : true}));

app.use("/",Router);

// MONGOOSE SETUP
const PORT=process.env.PORT;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser : true ,
    useUnifiedTopology : true ,
})
.then(()=>{
    app.listen(PORT,()=>console.log(`Server started port : ${PORT}`));
})
.catch((error)=> console.log(`${error} did not connect`));