import  express from 'express'
import http from 'http'
import initRouters from "../api/router"
import bodyParser from 'body-parser'
import passport from "passport"
import cors from 'cors'
import error from '../api/middlewares/error'



let app=express();
app.use(cors());
app.use(bodyParser.json());

initRouters(app);
app.use(passport.initialize());
// APIError là class có chứa cấu trúc lỗi
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);
let server= http.createServer(app);
export default server;