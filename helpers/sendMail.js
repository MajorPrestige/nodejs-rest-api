const sgMail = require('@sendgrid/mail');
const RequestError = require('./RequestError');
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = (data) => {
  const mail = { ...data, from: 'wqaw1@ukr.net' };
  sgMail
    .send(mail)
    .then(() => {
      console.log('Email sent');
    })
    .catch(() => {
      throw RequestError(403, 'Send mail error');
    });

  return true;
};

module.exports = sendMail;
