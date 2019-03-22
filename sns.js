
var AWS = require('aws-sdk');

module.exports = class SNS {

    static async publish(subject, payload, arn) {
        let sns = new AWS.SNS({ region: process.env.AWS_REGION });
        let params = {
            Message: JSON.stringify(payload),
            Subject: subject,
            TargetArn: arn || process.env.SNSARN,
        }
        return await sns.publish(params).promise();
    }
}