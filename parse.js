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
var bignumber_js_1 = require("bignumber.js");
function getTransaction(addressTransaction, totalTransaction, versionTransaction) {
    return __awaiter(this, void 0, void 0, function () {
        var transaction, newTransaction_1, _loop_1, i, createCsvWriter, headers, i, key, csvWriter, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    transaction = [];
                    newTransaction_1 = [];
                    _loop_1 = function (i) {
                        var start, limit, data, data_1, newTr, e_2;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    start = 0;
                                    limit = 50;
                                    return [4 /*yield*/, axios_1.default.get("https://apilist.tronscan.org/api/contracts/transaction?sort=-timestamp&count=true&limit=1&contract=" + addressTransaction[i] + "&start=0")];
                                case 1:
                                    data = _b.sent();
                                    _b.label = 2;
                                case 2:
                                    if (!(start < data.data.total)) return [3 /*break*/, 9];
                                    return [4 /*yield*/, axios_1.default.get("https://apilist.tronscan.org/api/contracts/transaction?sort=-timestamp&count=true&limit=" + limit + "&contract=" + addressTransaction[i] + "&start=" + start)];
                                case 3:
                                    data_1 = _b.sent();
                                    start += limit;
                                    _b.label = 4;
                                case 4:
                                    _b.trys.push([4, 7, , 8]);
                                    return [4 /*yield*/, data_1.data.data.map(function (event) {
                                            newTransaction_1 = {
                                                version: versionTransaction[i],
                                                block: event.block,
                                                confirmed: event.confirmed,
                                                ownAddress: event.ownAddress,
                                                timestamp: event.timestamp,
                                                value: event.value,
                                                toAddress: event.toAddress,
                                                txHash: event.txHash,
                                                contractRet: event.contractRet,
                                            };
                                            return newTransaction_1;
                                        })];
                                case 5:
                                    newTr = _b.sent();
                                    console.log(limit, start, data_1.data.total, totalTransaction);
                                    return [4 /*yield*/, transaction.concat(newTr)];
                                case 6:
                                    transaction = _b.sent();
                                    return [3 /*break*/, 8];
                                case 7:
                                    e_2 = _b.sent();
                                    console.log(e_2);
                                    return [3 /*break*/, 8];
                                case 8: return [3 /*break*/, 2];
                                case 9: return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < addressTransaction.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    createCsvWriter = require('csv-writer').createObjectCsvWriter;
                    headers = [];
                    for (i = 0; i < Object.keys(transaction[0]).length; i++) {
                        key = Object.keys(transaction[0])[i];
                        headers.push({ id: key, title: key });
                    }
                    csvWriter = createCsvWriter({
                        path: "Transaction.csv",
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
function getTransfer(addressTransfer, totalTransfer, versionTransfer) {
    return __awaiter(this, void 0, void 0, function () {
        var transfer, newTransfer_1, _loop_2, i, createCsvWriter, headers, i, key, csvWriter, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    transfer = [];
                    newTransfer_1 = [];
                    _loop_2 = function (i) {
                        var start, limit, data, data_2, newTr, e_4;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    start = 0;
                                    limit = 40;
                                    return [4 /*yield*/, axios_1.default.get("https://apilist.tronscan.org/api/token_trc20/transfers?limit=1&start=0&sort=-timestamp&count=true&relatedAddress=" + addressTransfer[i])];
                                case 1:
                                    data = _b.sent();
                                    _b.label = 2;
                                case 2:
                                    if (!(start < data.data.total)) return [3 /*break*/, 8];
                                    return [4 /*yield*/, axios_1.default.get("https://apilist.tronscan.org/api/token_trc20/transfers?limit=" + limit + "&start=" + start + "&sort=-timestamp&count=true&relatedAddress=" + addressTransfer[i])];
                                case 3:
                                    data_2 = _b.sent();
                                    start += limit;
                                    _b.label = 4;
                                case 4:
                                    _b.trys.push([4, 6, , 7]);
                                    newTr = data_2.data.token_transfers.map(function (event) {
                                        var valueQuant = event.quant;
                                        if (event.tokenInfo.tokenAbbr === "WDX") {
                                            valueQuant = Number(new bignumber_js_1.default(event.quant).shiftedBy(-18));
                                        }
                                        if (event.tokenInfo.tokenAbbr === "USDT") {
                                            valueQuant = Number(new bignumber_js_1.default(event.quant).shiftedBy(-6));
                                        }
                                        newTransfer_1 = {
                                            version: versionTransfer[i],
                                            transaction_id: event.transaction_id,
                                            block: event.block,
                                            block_ts: event.block_ts,
                                            from_address: event.from_address,
                                            to_address: event.to_address,
                                            confirmed: event.confirmed,
                                            contractRet: event.contractRet,
                                            quantity: valueQuant,
                                            toAddressIsContract: event.toAddressIsContract,
                                            tokenInfo: event.tokenInfo.tokenAbbr
                                        };
                                        return newTransfer_1;
                                    });
                                    console.log(limit, start, data_2.data.total, totalTransfer);
                                    return [4 /*yield*/, transfer.concat(newTr)];
                                case 5:
                                    transfer = _b.sent();
                                    return [3 /*break*/, 7];
                                case 6:
                                    e_4 = _b.sent();
                                    console.log(e_4);
                                    return [3 /*break*/, 7];
                                case 7: return [3 /*break*/, 2];
                                case 8: return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < addressTransfer.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_2(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    createCsvWriter = require('csv-writer').createObjectCsvWriter;
                    headers = [];
                    for (i = 0; i < Object.keys(transfer[0]).length; i++) {
                        key = Object.keys(transfer[0])[i];
                        headers.push({ id: key, title: key });
                    }
                    csvWriter = createCsvWriter({
                        path: "Transfer.csv",
                        header: headers
                    });
                    console.log(csvWriter.writeRecords(transfer));
                    return [3 /*break*/, 6];
                case 5:
                    e_3 = _a.sent();
                    console.log('getTransaction', e_3);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getTransfer = getTransfer;
