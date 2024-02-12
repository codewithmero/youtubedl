import express from 'express';
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// IMPORTING ROUTERS;
import videoRouter from './routes/video.routes.js';
import userRouter from './routes/user.routes.js';


// EMPLOYING ROUTER MIDDLERWARE;
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos", videoRouter);


export { app };