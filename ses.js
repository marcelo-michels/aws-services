
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

module.exports = class SES {

    static async sendEmail(from, to, subject, textMsg, htmlMsg) {
        var params = {
            Destination: { ToAddresses: [to] },
            Message: {
                Body: {
                    Html: { Charset: "UTF-8", Data: htmlMsg },
                    Text: { Charset: "UTF-8", Data: textMsg }
                },
                Subject: { Charset: "UTF-8", Data: subject }
            },
            Source: from,
        };

        let ses = new AWS.SES();
        return await ses.sendEmail(params).promise();
    }
}