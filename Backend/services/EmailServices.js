import { transporter } from '../config/mailer.js';

const sendEmailPrestamo = async (to, prestamo) => {
  const titulo = "Se ha realizado el prestamo con éxito";
  const body = "El prestamo del libro " + prestamo.libro.nombre + " ha sido realizao con éxito " +
                "y debería ser entregado antes de: " + prestamo.fechaEntregar;
  console.log(to);
  
  await sendEmail(to, titulo, body);
}

const sendEmailMulta = async (to, prestamo) => {
  const titulo = "Se ha creado una multa a su nombre";
  const body = "Por parte de la Biblioteca FESC le pedimos por favor se acerque a nuestras oficinas " +
                "con el fin de pactar un pago viable para el prestamo: " + prestamo.prestamoId;
  console.log(to);
  
  await sendEmail(to, titulo, body);
}

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: transporter.options.auth.user,
      to: to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.response);
  } catch (error) {
    console.error('Error al enviar email:', error);
    throw error;
  }
};

export default {sendEmailPrestamo, sendEmailMulta, sendEmail}