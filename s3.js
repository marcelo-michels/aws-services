
var AWS = require('aws-sdk');
const uuidv4 = require('uuid/v4');

module.exports = class S3 {

    static async uploadBase64(bucket, base64, contentType) {

        var s3Bucket = new AWS.S3({ params: { 'Bucket': bucket } });

        let buffer = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64')

        let name = uuidv4();
        name = name.replace(/-/g, '');
        var params = {
            'Key': name,
            'Body': buffer,
            'ContentEncoding': 'base64',
            'ContentType': contentType,
            'ACL': 'public-read',
        };

        await s3Bucket.putObject(params).promise();
        return name;
    }
} 