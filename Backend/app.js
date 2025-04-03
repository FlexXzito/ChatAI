import express from "express";
import cors from "cors";

import { 
    RegistroUserRute, 
    LoginRute, 
    ChatAIRute, 
    chatsaveRute, 
    AllChatsRute, 
    CargarChatRute, 
    DeleteChatRute, 
    AdminConsultasUserRute, 
    UpdateUserRute,
    StringTomp3
} from "./Router/Routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/psicologia', RegistroUserRute);
app.use('/psicologia', LoginRute);
app.use('/psicologia', ChatAIRute);
app.use('/psicologia', chatsaveRute);
app.use('/psicologia', AllChatsRute);
app.use('/psicologia', CargarChatRute);
app.use('/psicologia', DeleteChatRute);
app.use('/psicologia', AdminConsultasUserRute);
app.use('/psicologia', UpdateUserRute);
app.use('/psicologia', StringTomp3);

export default app;
