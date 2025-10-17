import type { Actions } from './$types';
import nodemailer from 'nodemailer';
import { MailtrapTransport } from 'mailtrap';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const emails = data.getAll('email') as string[];
    const names = data.getAll('name') as string[];

    const distributionList = createDistributionList(emails, names);
    const shuffledList = shuffleArray(distributionList);

    distributionList.forEach(async (participant, index) => {
      const assigned = shuffledList[index];
      const emailText = `Hi ${participant.name}! You are the secret angel of ${assigned.name}`;
      await sendEmail(participant.email, emailText);
    });

  }
}satisfies Actions;

// Create a transporter object using Mailtrap
const transporter = nodemailer.createTransport(
  MailtrapTransport({
    token: process.env.SMTP_TOKEN || '',
  })
);

// Function to send email
async function sendEmail(toEmail: string, emailText: string) {
  console.log(`Sending email to ${toEmail} with text: ${emailText}`);
  try {
    const sender = {
      address: "secret-angel@npower.dev",
      name: "Secret Angel",
    };
    const info = await transporter.sendMail({
      from: sender,
      to: toEmail,
      subject: "You're the secret Angel of...", // Subject line
      text: emailText
      // html: "", // html body
    });

    console.log("Message sent: %s", info);
  } catch (err) {
    console.error("Error while sending mail", err);
  }
}

interface Participant {
  email: string;
  name: string;
}

function createDistributionList(emails: string[], names: string[]): Participant[] {
  return emails.map((email, index) => ({
    email: email,
    name: names[index],
  }))
}

function shuffleArray<T>(array: T[]): T[] {
  const n = array.length;
  const indices = Array.from({ length: n }, (_, i) => i);

  // Fisher-Yates shuffle of indices
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Fix any fixed points to ensure a derangement
  for (let i = 0; i < n; i++) {
    if (indices[i] === i) {
      const swapWith = (i === n - 1) ? i - 1 : i + 1;
      [indices[i], indices[swapWith]] = [indices[swapWith], indices[i]];
    }
  }

  return indices.map(i => array[i]);
}
