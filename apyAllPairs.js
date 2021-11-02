"use strict";
/**
 Provider Moralis
 login: gasahor772@jesdoit.com
 password: gasahor772
 Дергаем SYNC, он возвращает 2 токена, TOKENa и TOKENb, и с коингеко берешь стоимости токенов на дату синка.
 **/
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
exports.apyAllPairs = void 0;
var bignumber_js_1 = require("bignumber.js");
var Web3 = require('web3');
var providerETH = 'wss://speedy-nodes-nyc.moralis.io/99c238c237fa12068a89c5c6/eth/mainnet/ws';
var abiETH = [
    { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount0",
                "type": "uint256"
            }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }, {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            }],
        "name": "Burn",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount0",
                "type": "uint256"
            }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }],
        "name": "Mint",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount0In",
                "type": "uint256"
            }, { "indexed": false, "internalType": "uint256", "name": "amount1In", "type": "uint256" }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount0Out",
                "type": "uint256"
            }, { "indexed": false, "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            }],
        "name": "Swap",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
                "indexed": false,
                "internalType": "uint112",
                "name": "reserve0",
                "type": "uint112"
            }, { "indexed": false, "internalType": "uint112", "name": "reserve1", "type": "uint112" }],
        "name": "Sync",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }],
        "name": "Transfer",
        "type": "event"
    }, {
        "constant": true,
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "MINIMUM_LIQUIDITY",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "PERMIT_TYPEHASH",
        "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }, {
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
        "name": "allowance",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }],
        "name": "approve",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "address", "name": "to", "type": "address" }],
        "name": "burn",
        "outputs": [{ "internalType": "uint256", "name": "amount0", "type": "uint256" }, {
                "internalType": "uint256",
                "name": "amount1",
                "type": "uint256"
            }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "factory",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "getReserves",
        "outputs": [{ "internalType": "uint112", "name": "_reserve0", "type": "uint112" }, {
                "internalType": "uint112",
                "name": "_reserve1",
                "type": "uint112"
            }, { "internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "address", "name": "_token0", "type": "address" }, {
                "internalType": "address",
                "name": "_token1",
                "type": "address"
            }],
        "name": "initialize",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "kLast",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "address", "name": "to", "type": "address" }],
        "name": "mint",
        "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "nonces",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }, { "internalType": "uint256", "name": "value", "type": "uint256" }, {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }, { "internalType": "uint8", "name": "v", "type": "uint8" }, {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }],
        "name": "permit",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "price0CumulativeLast",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "price1CumulativeLast",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "address", "name": "to", "type": "address" }],
        "name": "skim",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, {
                "internalType": "uint256",
                "name": "amount1Out",
                "type": "uint256"
            }, { "internalType": "address", "name": "to", "type": "address" }, {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }],
        "name": "swap",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "sync",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "token0",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "token1",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }],
        "name": "transfer",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, {
                "internalType": "address",
                "name": "to",
                "type": "address"
            }, { "internalType": "uint256", "name": "value", "type": "uint256" }],
        "name": "transferFrom",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
var contractETH = '0xf1fe852fca1b5a869ef1fe06a2799e1f38b70b84';
var providerBNB = 'wss://speedy-nodes-nyc.moralis.io/99c238c237fa12068a89c5c6/bsc/mainnet/ws';
var abiBNB = [
    { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount0",
                "type": "uint256"
            }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }, {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            }],
        "name": "Burn",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount0",
                "type": "uint256"
            }, { "indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256" }],
        "name": "Mint",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount0In",
                "type": "uint256"
            }, { "indexed": false, "internalType": "uint256", "name": "amount1In", "type": "uint256" }, {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount0Out",
                "type": "uint256"
            }, { "indexed": false, "internalType": "uint256", "name": "amount1Out", "type": "uint256" }, {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            }],
        "name": "Swap",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
                "indexed": false,
                "internalType": "uint112",
                "name": "reserve0",
                "type": "uint112"
            }, { "indexed": false, "internalType": "uint112", "name": "reserve1", "type": "uint112" }],
        "name": "Sync",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }],
        "name": "Transfer",
        "type": "event"
    }, {
        "constant": true,
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "MINIMUM_LIQUIDITY",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "PERMIT_TYPEHASH",
        "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }, {
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
        "name": "allowance",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }],
        "name": "approve",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "address", "name": "to", "type": "address" }],
        "name": "burn",
        "outputs": [{ "internalType": "uint256", "name": "amount0", "type": "uint256" }, {
                "internalType": "uint256",
                "name": "amount1",
                "type": "uint256"
            }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "factory",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "getReserves",
        "outputs": [{ "internalType": "uint112", "name": "_reserve0", "type": "uint112" }, {
                "internalType": "uint112",
                "name": "_reserve1",
                "type": "uint112"
            }, { "internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "address", "name": "_token0", "type": "address" }, {
                "internalType": "address",
                "name": "_token1",
                "type": "address"
            }],
        "name": "initialize",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "kLast",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "address", "name": "to", "type": "address" }],
        "name": "mint",
        "outputs": [{ "internalType": "uint256", "name": "liquidity", "type": "uint256" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "nonces",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }, { "internalType": "uint256", "name": "value", "type": "uint256" }, {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256"
            }, { "internalType": "uint8", "name": "v", "type": "uint8" }, {
                "internalType": "bytes32",
                "name": "r",
                "type": "bytes32"
            }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }],
        "name": "permit",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "price0CumulativeLast",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "price1CumulativeLast",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "address", "name": "to", "type": "address" }],
        "name": "skim",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "uint256", "name": "amount0Out", "type": "uint256" }, {
                "internalType": "uint256",
                "name": "amount1Out",
                "type": "uint256"
            }, { "internalType": "address", "name": "to", "type": "address" }, {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }],
        "name": "swap",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "sync",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "token0",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "token1",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }],
        "name": "transfer",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, {
                "internalType": "address",
                "name": "to",
                "type": "address"
            }, { "internalType": "uint256", "name": "value", "type": "uint256" }],
        "name": "transferFrom",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
var contractBNB = '0x3ea2de549ae9dcb7992f91227e8d6629a22c3b40';
function apyAllPairs() {
    return __awaiter(this, void 0, void 0, function () {
        var provider, web3, tradeContract, eventsSync, i, token0, token1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = new Web3.providers.WebsocketProvider(providerETH);
                    web3 = new Web3(provider);
                    tradeContract = new web3.eth.Contract(abiETH, contractETH);
                    eventsSync = [];
                    return [4 /*yield*/, tradeContract.getPastEvents('Sync', {
                            fromBlock: 13489241,
                            toBlock: 13497617,
                        }, function (error, events) {
                            eventsSync.push(events);
                        })];
                case 1:
                    _a.sent();
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < eventsSync[0].length)) return [3 /*break*/, 5];
                    token0 = Number(new bignumber_js_1.default(eventsSync[0][i].returnValues.reserve0).shiftedBy(-18));
                    token1 = Number(new bignumber_js_1.default(eventsSync[0][i].returnValues.reserve1).shiftedBy(-18));
                    return [4 /*yield*/, web3.eth.getBlock(eventsSync[0][i].blockNumber)
                            .then(console.log)
                        // console.log(token0, token1)
                    ];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.apyAllPairs = apyAllPairs;
