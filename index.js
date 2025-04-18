import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRoute.js';
import orderRouter from './routes/orderRoute.js';

let app = express();

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



    mongoose.connect('mongodb+srv://admin:123@cluster0.m0fa4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').
    then(()=> {
        console.log('Connected to MongoDB');
    }).catch(()=>{
        console.log('Error connecting to MongoDB'); 
    })

    

    app.use('/products', productRouter)

    app.use('/users', userRouter)

    app.use('/orders', orderRouter)

    app.listen(5000, () => {
        console.log('Server is running on port 5000');
        });
    //mongodb+srv://admin:123@cluster0.m0fa4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    //mongodb+srv://admin:123@cluster0.m0fa4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0