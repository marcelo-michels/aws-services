
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

module.exports = class SNS {

    static async publish(subject, payload, arn) {
        let sns = new AWS.SNS();
        let params = {
            Message: JSON.stringify(payload),
            Subject: subject,
            TargetArn: arn || process.env.SNSARN,
        }
        console.log('Publicou SNS');
        return await sns.publish(params).promise();
    }
} 