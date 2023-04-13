const gmailOptions = (userEmail, subjectEmail, htmlTemplate) => { 
    return {
        from: process.env.GMAIL_ACCOUNT,
        to: userEmail,
        subject: subjectEmail,
        html: htmlTemplate
    }
};

const gmailConfirm = (userEmail, htmlTemplate) => { 
    return {
        from: process.env.GMAIL_ACCOUNT,
        to: userEmail,
        subject: 'Confirmación de cita',
        html: htmlTemplate
    }
}

module.exports = gmailOptions,gmailConfirm