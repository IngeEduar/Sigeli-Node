import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 1025,
    secure: false,
    auth: {
      user: 'biblioteca@fecs.edu.co',
      pass: 'velo ewoq wqho ohtv'
    }
});
