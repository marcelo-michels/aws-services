
var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

module.exports = class Dynamo {

    constructor(table) {
        this.prefix_table = process.env.prefix_table || '';
        this.table = this.prefix_table + table;
        this.contador_table = this.prefix_table + 'contador'
    }

    getDC() {
        return new AWS.DynamoDB.DocumentClient();
    }

    prepareParams(params) {
        params = params || {};
        return Object.assign(params, {
            TableName: this.table,
            ReturnConsumedCapacity: 'TOTAL',
        });
    }

    async update(params) {
        params = this.prepareParams(params);
        return await this.getDC().update(params).promise();
    }

    async put(params) {
        params = this.prepareParams(params);
        return await this.getDC().put(params).promise();
    }

    async get(params) {
        params = this.prepareParams(params);
        return await this.getDC().get(params).promise();
    }

    async query(params) {
        params = this.prepareParams(params);
        return await this.getDC().query(params).promise();
    }

    async scan(params) {
        params = this.prepareParams(params);
        return await this.getDC().scan(params).promise();
    }

    async getContador() {
        var params = {
            TableName: this.contador_table,
            Key: { table: this.table }, UpdateExpression: 'ADD #a :x',
            ExpressionAttributeNames: { '#a': "contador" }, ExpressionAttributeValues: { ':x': 1 },
            ReturnValues: "UPDATED_NEW"
        };
        let result = await this.getDC().update(params).promise();
        return result.Attributes.contador;
    }

    async createTable() {

        var params = {
            TableName: this.table,
            KeySchema: [{ AttributeName: "id", KeyType: "HASH" },],
            AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" },],
            BillingMode: "PAY_PER_REQUEST",
        };

        var dynamodb = new AWS.DynamoDB();
        return await dynamodb.createTable(params).promise();
    }

    async describeTable() {
        var params = { TableName: this.table };
        var dynamodb = new AWS.DynamoDB();
        return await dynamodb.describeTable(params).promise();
    }

}