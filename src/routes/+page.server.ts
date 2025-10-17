import type { Actions } from './$types';
import nodemailer from 'nodemailer';
import { MailtrapTransport } from 'mailtrap';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a transporter object using Mailtrap
const transporter = nodemailer.createTransport(
  MailtrapTransport({
    token: process.env.SMTP_TOKEN || '',
  })
);

const emailText = "You are the secret angel of ";

// Function to send email
async function sendEmail(toName: string, toEmail: string) {
  try {
    const sender = {
      address: "secret-angel@npower.dev",
      name: "Secret Angel",
    };
    const recipients = [
      "franciscopower66@gmail.com",
    ];
    const info = await transporter.sendMail({
      from: sender,
      to: recipients,
      subject: "You're the secret Angel of...", // Subject line
      text: emailText
      // html: "", // html body
    });

    console.log("Message sent: %s", info);
  } catch (err) {
    console.error("Error while sending mail", err);
  }
}


export const actions = {
  default: async ({cookies, request}) => {
    const data = await request.formData();
    const emails = data.getAll('email') as string[];
    const names = data.getAll('name') as string[];

    await sendEmail(names[0], emails[0]);
  }
} satisfies Actions;
