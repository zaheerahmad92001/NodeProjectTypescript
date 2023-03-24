import { NextFunction } from "express";
import {chat} from "../../models/chat/chat";
import { Users } from "../../models/users";

class ChatController {
    async saveChat(req:any,res:any,nex:NextFunction){
        const { sender,receiver,message, userId } = req.body;
         const user = await Users.findById(userId.id);
         if(message.trim().length===0){
             return res
        .status(501)
        .send({ message: "message is required", success: false });
         }
         const chatObj = new chat({
            sender:sender,
            receiver:receiver,
            message:message,
         })
         chat.create(chatObj)
         .then((result) => {
          return res.status(200).send({ result, success: true });
        })
        .catch((err) => {
          return res.status(500).send({ message: err, success: false });
        });
        
    }
}

export default new ChatController()