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
    // {address: "TMKkurxT8RygHjmA9Ncs7ycDTRdNWXqLkD", contract_type: "STATUS", version: 1, type: "Transaction"},
    // {address: "TGcmNkPRD7SQn9W112LjjR1EnMqD1bssAt", contract_type: "AUTOPROGRAM", version: 1, type: "Transaction"},
    // {address: "TGmn2hDiuHPvGNA2Q6qAUHNp8bHz75asBi", contract_type: "STAKING", version: 1, type: "Transaction"},
    // {address: "TNdaAqJWkPBsc2RWLmrLb17HPfG4thYhNv", contract_type: "STATUS", version: 2, type: "Transaction"},
    // {address: "TEA1rgug9buNx9wZNp6VoQPHe8bfmr8a73", contract_type: "AUTOPROGRAM", version: 2, type: "Transaction"},
    // {address: "TTiBWB1ZaDPBgEnMRGh6zxPALLjgPnbdvb", contract_type: "STAKING", version: 2, type: "Transaction"},
    // {address: "TQrqo9mRzYj1YGsS54hNLYZjVbDxrTiCqv", contract_type: "STATUS", version: 3, type: "Transaction"},
    // {address: "TB3LChn3QpoqdnJEBYrTx97dAyJaAS3D43", contract_type: "AUTOPROGRAM", version: 3, type: "Transaction"},
    // {address: "TB8oZNyr2NX5jnJjocpnQCQVgpQdGoW2n2", contract_type: "STAKING", version: 3, type: "Transaction"},
    // {address: "TFwHbk9Jb1zBuW96BN6nP8nNBKYLXJe6pp", contract_type: "STATUS", version: 4, type: "Transaction"},
    // {address: "TNNeHfSt63fRmQC3RUWBDCDbS9TJmedfdP", contract_type: "STAKING", version: 4, type: "Transaction"},
    // {address: "TJaE2jAyDLNVRBQps6qjfWxShh3UJo1ftR", contract_type: "STAKING", version: 5, type: "Transaction"},
    { address: "TCVjFSw4ZoBmbfdcpaxsR1R6K161fsHgZf", contract_type: "STAKING", version: 6, type: "Transaction" },
    // {address: "TKyg9MuuT6V8LJzTHoiURiB4S8jAh4nMTF", contract_type: "AUTOPROGRAM", version: 4, type: "Transaction"},
    // {address: "TYC4g42yFXeqQd5gJTqueo4hjtZ3BqnVry", contract_type: "SWAP", version: 1, type: "Transaction"},
    // {address: "T9yJ5EAE8RHtWtaWzSknZuyUgvV62ttPA3", contract_type: "SWAP", version: 2, type: "Transaction"},
    // {address: "TEi3KvzSdDieDD4tFARz8NJ3SSU2z17ZcD", contract_type: "CITYLIFE_SWAP", version: 3, type: "Transaction"},
    // {address: "TApCMGcW6ZQW3vY7u6Bhrec43WyHBao4QA", contract_type: "REFERRALS", version: 1, type: "Transaction"},
    // {address: "TBSPijU2HsBe6RaZc6NkFRcQ9cJjMBqGzZ", contract_type: "REFERRALS", version: 2, type: "Transaction"},
    // {address: "TSvMwjUxYkLjavUvMQe9d4FyEe5FJeeyX3", contract_type: "REFERRALS", version: 3, type: "Transaction"},
];
var init = function () { return __awaiter(void 0, void 0, void 0, function () {
    var versionTransaction, addressTransaction, totalTransaction, contrType, i, data, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                versionTransaction = [];
                addressTransaction = [];
                totalTransaction = 0;
                contrType = [];
                i = 0;
                _b.label = 1;
            case 1:
                if (!(i < address.length)) return [3 /*break*/, 5];
                versionTransaction = versionTransaction.concat(address[i].version);
                addressTransaction = addressTransaction.concat(address[i].address);
                contrType = contrType.concat(address[i].contract_type);
                return [4 /*yield*/, axios_1.default.get("https://apilist.tronscan.org/api/contracts/transaction?sort=-timestamp&count=true&limit=10&contract=" + address[i].address + "&start=0")];
            case 2:
                data = _b.sent();
                _a = totalTransaction;
                return [4 /*yield*/, data.data.total];
            case 3:
                totalTransaction = _a + _b.sent();
                _b.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5:
                console.log(totalTransaction);
                return [4 /*yield*/, parse_1.getTransaction(addressTransaction, totalTransaction, versionTransaction, contrType)
                    // await getTransfer(addressTransfer, totalTransfer, versionTransfer)
                    // await compareHash
                ];
            case 6:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
init();
