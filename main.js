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
var parse_1 = require("./parse");
var axios_1 = require("axios");
// TODO ::  Specify values for parsing.
//  Example (address = [{address:"",version: Number, type:""}])
var address = [
    { address: "TYC4g42yFXeqQd5gJTqueo4hjtZ3BqnVry", version: 1, type: "Transfer" },
    { address: "T9yJ5EAE8RHtWtaWzSknZuyUgvV62ttPA3", version: 2, type: "Transfer" },
    { address: "TEi3KvzSdDieDD4tFARz8NJ3SSU2z17ZcD", version: 3, type: "Transfer" },
    { address: "TApCMGcW6ZQW3vY7u6Bhrec43WyHBao4QA", version: 1, type: "Transaction" },
    { address: "TBSPijU2HsBe6RaZc6NkFRcQ9cJjMBqGzZ", version: 2, type: "Transaction" },
    { address: "TSvMwjUxYkLjavUvMQe9d4FyEe5FJeeyX3", version: 3, type: "Transaction" },
];
var init = function () { return __awaiter(void 0, void 0, void 0, function () {
    var versionTransfer, addressTransfer, totalTransfer, versionTransaction, addressTransaction, totalTransaction, i, types, data, _a, data, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                versionTransfer = [];
                addressTransfer = [];
                totalTransfer = 0;
                versionTransaction = [];
                addressTransaction = [];
                totalTransaction = 0;
                i = 0;
                _c.label = 1;
            case 1:
                if (!(i < address.length)) return [3 /*break*/, 8];
                types = address[i].type;
                if (!(types === "Transfer")) return [3 /*break*/, 4];
                versionTransfer = versionTransfer.concat(address[i].version);
                addressTransfer = addressTransfer.concat(address[i].address);
                return [4 /*yield*/, axios_1.default.get("https://apilist.tronscan.org/api/token_trc20/transfers?limit=10&start=0&sort=-timestamp&count=true&relatedAddress=" + address[i].address)];
            case 2:
                data = _c.sent();
                _a = totalTransfer;
                return [4 /*yield*/, data.data.total];
            case 3:
                totalTransfer = _a + _c.sent();
                _c.label = 4;
            case 4:
                if (!(types === "Transaction")) return [3 /*break*/, 7];
                versionTransaction = versionTransaction.concat(address[i].version);
                addressTransaction = addressTransaction.concat(address[i].address);
                return [4 /*yield*/, axios_1.default.get("https://apilist.tronscan.org/api/contracts/transaction?sort=-timestamp&count=true&limit=10&contract=" + address[i].address + "&start=0")];
            case 5:
                data = _c.sent();
                _b = totalTransaction;
                return [4 /*yield*/, data.data.total];
            case 6:
                totalTransaction = _b + _c.sent();
                _c.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 1];
            case 8: return [4 /*yield*/, parse_1.getTransaction(addressTransaction, totalTransaction, versionTransaction)];
            case 9:
                _c.sent();
                return [4 /*yield*/, parse_1.getTransfer(addressTransfer, totalTransfer, versionTransfer)];
            case 10:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); };
init();
