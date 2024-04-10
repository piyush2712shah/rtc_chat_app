import bodyParser from "body-parser";
import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage=async(req,res)=>{
    try {
        
        const {message} =req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        })

        if(Message){
            conversation.messages.push(newMessage._id)
        }

        
        
        //this will run in paralle rather then line by line in single saves
        await Promise.all([conversation.save(),newMessage.save()]);
        
        res.status(201).json(newMessage)

        //socket io functionality

        const receiverSocketId= getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

    } catch (error) {
        console.log("error in send message controller",error.message)
        res.status(500).json({
            error:"internal server error"
        })
    }
}

export const getMessage =async (req,res)=>{
    try {
        const {id:usertoChatId} = req.params;
        const senderId=req.user._id;

        const conversation = await Conversation.findOne({
            participants:{
                $all:[senderId,usertoChatId],
            }
        }).populate("messages"); //populate does not give reference but gives the actual messages

        if(!conversation){
            return res.status(200).json([]);
        }

        const messages=conversation.messages;

        res.status(200).json(messages)

    } catch (error) {
        console.log("error in get message controller",error.message)
        res.status(500).json({
            error:"internal server error"
        })
    }
}