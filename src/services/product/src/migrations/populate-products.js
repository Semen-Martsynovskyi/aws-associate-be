"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocks_1 = require("../mocks");
const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
async function populateWithMocks() {
    await dynamoClient
        .batchWrite({
        RequestItems: {
            products: mocks_1.mockProducts.map((product) => ({
                PutRequest: { Item: product },
            })),
        },
    })
        .promise();
    await dynamoClient
        .batchWrite({
        RequestItems: {
            stocks: mocks_1.mockStocks.map((stock) => ({
                PutRequest: { Item: stock },
            })),
        },
    })
        .promise();
}
populateWithMocks();
