import express from "express";
import { prismaClient } from "@mohitprasad004/db/client";

const app = express();

app.use(express.json());

app.post("/" , async(req , res) => {

    const user = await prismaClient.user.create({
        data : {
            username : "mohit",
            password : "mohit123backend"
        }
    })
    

    res.status(200).json({
        message : "fetched",
        username : user.username
    })
})

app.get("/" , async(req , res) => {
    
    const users = await prismaClient.user.findMany();

    res.status(200).json({
        message : "fetched",
        users
    })

})
app.listen(8080 , () => {
    console.log("app is running on port " , 8080);
    
})