import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToDB from './db/connectToDB.js';
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5500;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	connectToDB();
	console.log(`Server Running on port ${PORT}`);
});

// import express from 'express'
// import dotenv from 'dotenv'
// import cookieParser from 'cookie-parser'

// import authRoutes from "./routes/auth.routes.js"
// import messageRoutes from "./routes/message.routes.js"
// import userRoutes from "./routes/user.routes.js"
// import connectToDB from './db/connectToDB.js';
// import { app, server } from './socket/socket.js'


// const PORT=process.env.PORT || 5500;

// dotenv.config();


// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth",authRoutes)
// app.use("/api/messages",messageRoutes)
// app.use("/api/users",userRoutes)


// // app.get("/", (req,res)=>{
// //     res.send("hello world! what is up?");
// // })


// server.listen(PORT,()=>{
//     connectToDB();
//     console.log(`listening on port ${PORT}`);
// })