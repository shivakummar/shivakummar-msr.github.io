
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var mandrillTransport   = require('nodemailer-mandrill-transport');
const configs = require('../Configs');
const env = require('../env');
const mailer = (env.instance == "dev") ? configs.SMTP.dev : configs.SMTP.test;
var transporter = nodemailer.createTransport(smtpTransport({
    service: "Gmail",
    auth: {
        user: mailer.username,
        pass: mailer.password
    }
}));

module.exports = {
    transporter: transporter
};
