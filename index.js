import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';
import dotenv from 'dotenv';
dotenv.config();

let app = express();

app.use(cors())
app.use(bodyParser.json());


app.use(
    (req,res,next)=>{
        const tokenString = req.header("Authorization")
        if(tokenString != null){
            const token = tokenString.replace("Bearer ", "")
            
            jwt.verify(token, "hasi-@2000",
                (err,decoded)=>{
                    if(decoded != null){
                        console.log(decoded);
                        req.user = decoded
                        next()
                    }else{
                        console.log("Invalid token");
                        res.status(403).json({
                            message: "Invalid token"
                        })
                    }
                }
            )
        }else{
            next()
        }
})



    mongoose.connect(process.env.MONGODB_URL).
    then(()=> {
        console.log('Connected to MongoDB');
    }).catch(()=>{
        console.log('Error connecting to MongoDB'); 
    })

    

    app.use("/api/products", productRouter)

    app.use("/api/users", userRouter)

    app.use("/api/orders", orderRouter)

    app.listen(5000, () => {
        console.log('Server is running on port 5000');
        });
    