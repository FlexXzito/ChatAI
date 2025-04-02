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

// Configurar CORS
app.use(cors({
    origin: 'https://chatai-zp3m.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Responder a preflight requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://chatai-zp3m.onrender.com');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

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
