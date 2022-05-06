import express from 'express';
import { prisma } from './prisma';
import nodemailer from 'nodemailer';
import { routes } from './routes';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: false,}))
app.use(express.json());


app.use(routes);


app.listen(process.env.PORT || 4040, () => console.log("Server listening on 4040!"));