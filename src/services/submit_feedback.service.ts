import { MailAdapter } from "../adapters/mail_adapter";
import { FeedbacksRepository } from "../repositories/feedbacks_repository";

interface SubmitFeedbackServiceRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackService {

  constructor(private feedbacksRepository: FeedbacksRepository, private mailAdapter: MailAdapter) {
  }

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    if (!type) throw new Error('Type is required.');
    if (!comment) throw new Error('Comment is required.');

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.');
    }

    await this.feedbacksRepository.create({
      type, comment, screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #333;">`,
        `<p>Tipo do feedback: <strong>${type}</strong></p>`,
        `<p>Comentário do feedback: ${comment}</p>`,
        `<img style="width:100%" src="${screenshot}" />`,
        `</div>`
      ].join('\n'),
    });
  }
}