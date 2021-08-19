"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransfer = exports.getTransaction = void 0;
var axios_1 = require("axios");
function getTransaction(address) {
    return __awaiter(this, void 0, void 0, function () {
        var transaction, start, data, total, data_1, value, createCsvWriter_1, headers, i, key, csvWriter, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    transaction = [];
                    start = 0;
                    return [4 /*yield*/, axios_1.default.get("https://apilist.tronscan.org/api/contracts/transaction?sort=-timestamp&count=true&limit=50&contract=" + address + "&start=" + start)];
                case 1:
                    data = _a.sent();
                    total = data.data.total;
                    _a.label = 2;
                case 2:
                    if (!(start < total)) return [3 /*break*/, 4];
                    return [4 /*yield*/, axios_1.default.get("https://apilist.tronscan.org/api/contracts/transaction?sort=-timestamp&count=true&limit=50&contract=" + address + "&start=" + start)];
                case 3:
                    data_1 = _a.sent();
                    value = 50;
                    start += value;
                    transaction = transaction.concat(data_1.data.data);
                    console.log(transaction.length, data_1.data.data.length, total);
                    return [3 /*break*/, 2];
                case 4:
                    createCsvWriter_1 = require('csv-writer').createObjectCsvWriter;
                    headers = [];
                    for (i = 0; i < Object.keys(transaction[0]).length; i++) {
                        key = Object.keys(transaction[0])[i];
                        headers.push({ id: key, title: key });
                    }
                    csvWriter = createCsvWriter_1({
                        path: "Transaction/" + address + ".csv",
                        header: headers
                    });
                    console.log(csvWriter.writeRecords(transaction));
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    console.log('getTransaction', e_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getTransaction = getTransaction;
function getTransfer(address) {
    return __awaiter(this, void 0, void 0, function () {
        var transfer, start, limit, data, total, data_2, createCsvWriter_2, headers, i, key, csvWriter, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    transfer = [];
                    start = 0;
                    limit = 40;
                    return [4 /*yield*/, axios_1.default.get("https://apilist.tronscan.org/api/token_trc20/transfers?limit=" + limit + "&start=" + start + "&sort=-timestamp&count=true&relatedAddress=" + address)];
                case 1:
                    data = _a.sent();
                    total = data.data.total;
                    console.log(total);
                    _a.label = 2;
                case 2:
                    if (!(start < total)) return [3 /*break*/, 4];
                    return [4 /*yield*/, axios_1.default.get("https://apilist.tronscan.org/api/token_trc20/transfers?limit=" + limit + "&start=" + start + "&sort=-timestamp&count=true&relatedAddress=" + address)];
                case 3:
                    data_2 = _a.sent();
                    start += limit;
                    transfer = transfer.concat(data_2.data.token_transfers);
                    console.log(data_2.data.token_transfers.length, transfer.length, start, total);
                    return [3 /*break*/, 2];
                case 4:
                    createCsvWriter_2 = require('csv-writer').createObjectCsvWriter;
                    headers = [];
                    for (i = 0; i < Object.keys(transfer[0]).length; i++) {
                        key = Object.keys(transfer[0])[i];
                        headers.push({ id: key, title: key });
                    }
                    csvWriter = createCsvWriter_2({
                        path: "Transfer_" + address + ".csv",
                        header: headers
                    });
                    console.log(csvWriter.writeRecords(transfer));
                    return [3 /*break*/, 6];
                case 5:
                    e_2 = _a.sent();
                    console.log('getTransaction', e_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getTransfer = getTransfer;
