/* eslint-disable no-console */
import {Server} from "http"
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";


let server:Server;

const startServer = async()=>{
   try{
     await mongoose.connect(envVars.DB_URL);

    console.log("connected to Db!!");
    server = app.listen(envVars.PORT,()=>{
        console.log(`Server is listening to port ${envVars.PORT}`);
    })
   }catch(error){
    console.log(error);
   }
}
startServer()

process.on("unhandledRejection",(error)=>{
    console.log("Unhandled Rejection detected, server shutting down... ... ...", error)

    if(server){
        server.close(()=>{
            process.exit(1);// terminal close hoye jabe
        })
        process.exit(1);
    }
})

// creating an unhandled Rejection --> Promise resolve na kora
// Promise.reject(new Error("I forgot to resolve the promise"))


process.on("uncaughtException",(error)=>{
    console.log("Uncaught Exception error: ",error)

    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1);
})

// creating an uncaught exception
// throw new error("Something went wrong")

process.on("SIGTERM",()=>{
    console.log("SIGTERM signal received. Server shutting down");

    if(server){
        server.close(()=>{
            process.exit(1);
        })
    }
    process.exit(1);
})

process.on("SIGINT",()=>{
    console.log("SIGINT Signal received ...")
    if(server){
        server.close(()=>{
            process.exit(1);
        })
    }
    process.exit(1);
})

