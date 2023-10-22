"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockStocks = void 0;
const product_mock_1 = require("./product.mock");
exports.mockStocks = product_mock_1.mockProducts.map(({ id }, index) => ({
    product_id: id,
    count: index > 1 ? index : 0,
}));
