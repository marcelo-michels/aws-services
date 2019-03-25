
var AWS = require('aws-sdk');

module.exports = class SES {

    static async sendEmail(from, to, subject, textMsg, htmlMsg) {
        var params = {
            Destination: { ToAddresses: [to] },
            Message: {
                Body: {},
                Subject: { Charset: "UTF-8", Data: subject }
            },
            Source: from,
        };

        if (textMsg)
            params.Message.Body.Text = { Charset: "UTF-8", Data: textMsg };

        if (htmlMsg)
            params.Message.Body.Html = { Charset: "UTF-8", Data: htmlMsg };

        let ses = new AWS.SES();
        return await ses.sendEmail(params).promise();
    }
}