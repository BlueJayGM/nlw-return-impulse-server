import express from 'express';
import nodemailer from 'nodemailer';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer_mail_adapter';
import { prisma } from './prisma';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma_feedbacks_repository';
import { SubmitFeedbackService } from './services/submit_feedback.service';

export const routes = express.Router();



routes.post('/feedbacks', async (req, res) => {
  const {type, comment, screenshot} = req.body;
  console.log({type, comment, screenshot});
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackService = new SubmitFeedbackService(prismaFeedbacksRepository, nodemailerMailAdapter);

  await submitFeedbackService.execute({type, comment, screenshot});

  
  return res.status(201).send();

} );