import exprees from "express";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = exprees();
app.use(cors({
    origin: process.env.CROS_ORIGIN,
    credentials: true
}));

app.use(exprees.json({limit: "10mb"}));
app.use(exprees.urlencoded({limit: "10mb", extended: true}));
app.use(exprees.static("public"));
app.use(cookieParser());



export { app }