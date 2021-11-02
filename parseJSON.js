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
exports.parseJSON = void 0;
var axios_1 = require("axios");
var bignumber_js_1 = require("bignumber.js");
function parseJSON() {
    return __awaiter(this, void 0, void 0, function () {
        var TronWeb, fs, rawdata, data, transaction, trans, hashAmounts, arr, i, oneBlock, namesSet, asdas, size_1, counter_1, i, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    TronWeb = require('tronweb');
                    fs = require('fs');
                    rawdata = fs.readFileSync('files/TBSPijU2HsBe6RaZc6NkFRcQ9cJjMBqGzZ.json');
                    data = JSON.parse(rawdata);
                    transaction = {};
                    trans = [];
                    hashAmounts = {};
                    arr = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < data.data.length)) return [3 /*break*/, 5];
                    oneBlock = data.data[i];
                    return [4 /*yield*/, arr.concat(oneBlock.transaction_id)];
                case 3:
                    arr = _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    namesSet = new Set(arr);
                    asdas = namesSet.values();
                    size_1 = namesSet.size;
                    counter_1 = 0;
                    for (i = 0; i < size_1; i++) {
                        axios_1.default.get("https://apilist.tronscan.org/api/transaction-info?hash=" + asdas.next().value)
                            .then(function (trInfo) {
                            var _a = trInfo.data, trigger_info = _a.trigger_info, internal_transactions = _a.internal_transactions, contractRet = _a.contractRet, tokenTransferInfo = _a.tokenTransferInfo;
                            var methodName = trigger_info && trigger_info.method === undefined ? 'Undefined_Method' : trigger_info.method;
                            // .toLowerCase();
                            console.log(methodName, trInfo.data.hash);
                            if (contractRet === 'SUCCESS') {
                                if (Object.keys(trigger_info).length == 0) {
                                    hashAmounts[trInfo.data.hash] = {
                                        method: null,
                                        token_info: null,
                                    };
                                    hashAmounts[trInfo.data.hash].amount = 0;
                                    if (typeof trInfo.data.info === 'object' && trInfo.data.info.balance) {
                                        hashAmounts[trInfo.data.hash].amount;
                                    }
                                    else if (hashAmounts[trInfo.data.hash].amount) {
                                        hashAmounts[trInfo.data.hash].amount = new bignumber_js_1.default(trInfo.data.info).shiftedBy(-18);
                                    }
                                }
                                else if (trigger_info.parameter._amount || trigger_info.call_value) {
                                    hashAmounts[trInfo.data.hash] = {
                                        method: trigger_info.method,
                                        token_info: null,
                                    };
                                    console.log(trigger_info.parameter._amount || trigger_info.call_value);
                                    var internalTransactions = Object.values(internal_transactions);
                                    internalTransactions.forEach(function (items) {
                                        !hashAmounts[trInfo.data.hash].token_info && items.forEach(function (transactionData) {
                                            if (transactionData.token_list && transactionData.token_list.length && tokenTransferInfo) {
                                                hashAmounts[trInfo.data.hash].token_info = tokenTransferInfo.symbol;
                                            }
                                        });
                                    });
                                    // tokenDecimal
                                    hashAmounts[trInfo.data.hash].amount = Number
                                        ? new bignumber_js_1.default(trigger_info.parameter._amount || trigger_info.call_value).shiftedBy(-18)
                                        : (trigger_info.parameter._amount || 0);
                                }
                                else if (tokenTransferInfo) {
                                    hashAmounts[trInfo.data.hash] = {
                                        method: trigger_info.method,
                                        token_info: null,
                                    };
                                    var tokenTransfer = Object.values(tokenTransferInfo);
                                    tokenTransfer.forEach(function (items) {
                                        tokenTransferInfo && (hashAmounts[trInfo.data.hash].token_info = tokenTransferInfo.symbol);
                                    });
                                    hashAmounts[trInfo.data.hash].amount = Number
                                        ? new bignumber_js_1.default(tokenTransferInfo.amount_str).shiftedBy(-18)
                                        : (tokenTransferInfo.amount_str || 0);
                                }
                                else if (internal_transactions) {
                                    hashAmounts[trInfo.data.hash] = {
                                        method: trigger_info.method,
                                    };
                                    var internalTransactions = Object.values(internal_transactions);
                                    hashAmounts[trInfo.data.hash].amount = internalTransactions.reduce(function (acc, items) {
                                        var value = items.reduce(function (a, transactionData) {
                                            var tokenValue = 0;
                                            if (transactionData.token_list && transactionData.token_list.length) {
                                                hashAmounts[trInfo.data.hash].token_info = transactionData.token_list[0].tokenInfo.tokenName;
                                                var summa = transactionData.token_list;
                                                tokenValue = summa.reduce(function (acc, token) { return (token.call_value
                                                    ? acc + Number(new bignumber_js_1.default(token.call_value).shiftedBy(-18))
                                                    : acc); }, 0);
                                            }
                                            return tokenValue + a;
                                        }, 0);
                                        return value + acc;
                                    }, 0);
                                }
                            }
                            transaction = {
                                block: trInfo.data.block,
                                confirmed: trInfo.data.confirmed,
                                ownerAddress: trInfo.data.ownerAddress,
                                timestamp: new Date(trInfo.data.timestamp).toISOString(),
                                value: trInfo.data.value,
                                toAddress: trInfo.data.toAddress,
                                txHash: trInfo.data.hash,
                                contractRet: trInfo.data.contractRet,
                                method: trInfo.data.trigger_info.method,
                                amount: hashAmounts[trInfo.data.hash].amount
                            };
                            trans = trans.concat(transaction);
                            // Saving file
                            counter_1++;
                            if (counter_1 === size_1) {
                                console.log(JSON.stringify(trans));
                                var createCsvWriter = require('csv-writer').createObjectCsvWriter;
                                var headers = [];
                                for (var i_1 = 0; i_1 < Object.keys(trans[0]).length; i_1++) {
                                    var key = Object.keys(trans[0])[i_1];
                                    headers.push({ id: key, title: key });
                                }
                                var csvWriter = createCsvWriter({
                                    path: "TBSPijU2HsBe6RaZc6NkFRcQ9cJjMBqGzZ.csv",
                                    header: headers
                                });
                                console.log(csvWriter.writeRecords(trans));
                                return 'Ok, file create';
                            }
                        })
                            .catch(function (err) {
                            // Saving file
                            counter_1++;
                            console.log('Query error:', err);
                        });
                    }
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    console.log('getTransaction', e_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.parseJSON = parseJSON;
