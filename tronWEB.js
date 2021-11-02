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
exports.getLiquid = exports.getContract = void 0;
var axios_1 = require("axios");
var sdk_1 = require("@uniswap/sdk");
// const TronWeb = require('tronweb')
// const HttpProvider = TronWeb.providers.HttpProvider;
// const fullNode = new HttpProvider('https://api.trongrid.io');
// const solidityNode = new HttpProvider('https://api.trongrid.io');
// const eventServer = new HttpProvider('https://api.trongrid.io');
// const privateKey = 'e0c1346f-6221-4de0-b9f0-12036214867f';
// const privateKey = '820d7421b04670cd9fabf0cc785df6e4e314bdaacdb25cf119b3ac0a1490db42';
// export async function main() {
//     // const tronWeb = new TronWeb({
//     //     fullHost: 'https://api.trongrid.io',
//     //     privateKey: 'e0c1346f-6221-4de0-b9f0-12036214867f'
//     // });
//
//     const tronWeb = await new TronWeb(
//         fullNode,
//         solidityNode,
//         eventServer,
//         privateKey
//     );
//     tronWeb.setHeader({"TRON-PRO-API-KEY": 'e0c1346f-6221-4de0-b9f0-12036214867f'});
//     let contract = await tronWeb.contract().at("TTmqVitmCbU5We7bhU3dohKcuwNn7L5RWh");
//     await contract && contract.Transaction().watch((err, event) => {
//         if (err)
//             return console.error('Error with "Message" event:', err);
//
//         console.group('New event received');
//         console.log('- Contract Address:', event.contract);
//         console.log('- Event Name:', event.name);
//         console.log('- Transaction:', event.transaction);
//         console.log('- Block number:', event.block);
//         console.log('- Result:', event.result, '\n');
//         console.groupEnd();
//     });
//
//     // contract.eventMethod().watch((err, event) => {
//     //     if (err){
//     //     return console.error('Error with "method" event:', err);
//     //   }
//     //   if (event) {
//     //       console.log(event)
//     //   }
//     // });
// }
//Example 1
// export async function triggercontract() {
//     const fs = require('fs');
//     const tronWeb = await new TronWeb(
//         fullNode,
//         solidityNode,
//         eventServer,
//         privateKey
//     );
//     let arr: any = {}
//     let purse = []
//
//     let rawdata = fs.readFileSync('output.json');
//     const data = JSON.parse(rawdata);
//
//     for (let i = 0; i < data.data.length; i++) {
//         const oneBlock = data.data[i]
//         arr = TronWeb.address.fromHex(oneBlock.result.to)
//         purse = purse.concat(arr)
//     }
//
//     const namesSet: any = new Set(purse);
//     const asdas: any = namesSet.values()
//     let allPurse: any = []
//     for (let i = 0; i < namesSet.size; i++) {
//         allPurse = allPurse.concat(asdas.next().value)
//     }
//     let resultAll = {}
//     let ggg = []
//     try {
//         for (let i = 0; i < allPurse.length; i++) {
//             try {
//                 const instance = await tronWeb.contract().at('TThrzAzRj2Pw4CQjqo1dk2zGyifPhuNHRu');
//                 let result = await instance["balanceOf"](`${allPurse[i]}`).call()
//                 console.log(tronWeb.toDecimal(result._hex));
//                 resultAll = {
//                     purse: allPurse[i],
//                     balance: new BigNumber(tronWeb.toDecimal(result._hex)).shiftedBy(-18).toString(),
//                 }
//                 ggg = ggg.concat(resultAll)
//             } catch (errors) {
//                 console.log(errors)
//             }
//         }
//         const createCsvWriter = require('csv-writer').createObjectCsvWriter
//         const headers = []
//         for (let i = 0; i < Object.keys(ggg[0]).length; i++) {
//             const key = Object.keys(ggg[0])[i]
//             headers.push({id: key, title: key})
//         }
//         const csvWriter = createCsvWriter({
//             path: `Purse&&Amount.csv`,
//             header: headers
//         });
//         console.log(csvWriter.writeRecords(ggg))
//         return 'Ok, file create'
//     } catch (err) {
//         console.log(err)
//     }
// }
function getContract() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.getContract = getContract;
function getLiquid() {
    return __awaiter(this, void 0, void 0, function () {
        var WQT, ETH, pair, r, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    WQT = new sdk_1.Token(sdk_1.ChainId.MAINNET, "0x06677dc4fe12d3ba3c7ccfd0df8cd45e4d4095bf", 18, "WQT", "Work quest Token");
                    ETH = new sdk_1.Token(sdk_1.ChainId.MAINNET, "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 18, "ETH", "Ether (Wrapped)");
                    pair = new sdk_1.Pair(new sdk_1.TokenAmount(WQT, "0"), new sdk_1.TokenAmount(ETH, "0"));
                    // console.log(pair.liquidityToken.address.toLowerCase())
                    console.log(WQT.address);
                    return [4 /*yield*/, axios_1.default({
                            url: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
                            method: "post",
                            data: {
                                query: "{ \n tokenDayDatas(orderBy: date, orderDirection: asc,\n  where: {\n    token:\"" + WQT.address.toLowerCase() + "\"\n  }\n ) {\n    id\n    date\n    priceUSD\n    totalLiquidityToken\n    totalLiquidityUSD\n    totalLiquidityETH\n    dailyVolumeETH\n    dailyVolumeToken\n    dailyVolumeUSD\n }\n      }"
                            }
                        })];
                case 1:
                    r = _c.sent();
                    _b = (_a = console).log;
                    return [4 /*yield*/, r.data.data.tokenDayDatas];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getLiquid = getLiquid;
// tokenDayDatas($tokenAddr: String!, $skip: Int!) {\n  tokenDayDatas(first: 1000, skip: $skip, orderBy: date, orderDirection: asc, where: {token: $tokenAddr}) {\n    id\n    date\n    priceUSD\n    totalLiquidityToken\n    totalLiquidityUSD\n    totalLiquidityETH\n    dailyVolumeETH\n    dailyVolumeToken\n    dailyVolumeUSD\n    __typename\n  }\n}\n"
// variables: {tokenAddr: "0x06677dc4fe12d3ba3c7ccfd0df8cd45e4d4095bf", skip: 0}
// getContract();// Execute the function
// main();
