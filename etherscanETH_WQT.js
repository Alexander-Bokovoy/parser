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
exports.subscribeNewBlock = exports.getWQT = void 0;
var Web3 = require('web3');
// const PROVIDER_LINK = 'wss://eth.getblock.io/mainnet/?api_key=af6c8d36-7f56-46c9-873b-6eb0ef5d882b'
var PROVIDER_LINK = 'wss://speedy-nodes-nyc.moralis.io/c9991b05b32effdda8b167e6/bsc/mainnet/ws';
var ABI_TRADE = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "previousAdmin",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "newAdmin",
                "type": "address"
            }
        ],
        "name": "AdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "beacon",
                "type": "address"
            }
        ],
        "name": "BeaconUpgraded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "Claimed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "previousAdminRole",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "newAdminRole",
                "type": "bytes32"
            }
        ],
        "name": "RoleAdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleGranted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleRevoked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "Staked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "Unstaked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "implementation",
                "type": "address"
            }
        ],
        "name": "Upgraded",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "ADMIN_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "DEFAULT_ADMIN_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "UPGRADER_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "allProduced",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "claim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "_paused",
                "type": "bool"
            }
        ],
        "name": "claimingPause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "claimingPaused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "distributionTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_staker",
                "type": "address"
            }
        ],
        "name": "getClaim",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "reward",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getInfoByAddress",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "staked_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "claim_",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_balance",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            }
        ],
        "name": "getRoleAdmin",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getStakingInfo",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "startTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardTotal",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "distributionTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalStaked",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalDistributed",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "stakeTokenAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "rewardTokenAddress",
                        "type": "address"
                    }
                ],
                "internalType": "struct WQLiquidityMining.StakeInfo",
                "name": "info_",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "hasRole",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_startTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_rewardTotal",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_distributionTime",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_rewardToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_stakeToken",
                "type": "address"
            }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "producedTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "removeTokenByAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "renounceRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "revokeRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rewardProduced",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rewardToken",
        "outputs": [
            {
                "internalType": "contract IERC20Upgradeable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "rewardTotal",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_startTime",
                "type": "uint256"
            }
        ],
        "name": "setStartTime",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "stakeToken",
        "outputs": [
            {
                "internalType": "contract IERC20Upgradeable",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "stakes",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rewardAllowed",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "rewardDebt",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "distributed",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "_paused",
                "type": "bool"
            }
        ],
        "name": "stakingPause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "stakingPaused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "startTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokensPerStake",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalDistributed",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalStaked",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "unstake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "_paused",
                "type": "bool"
            }
        ],
        "name": "unstakingPause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unstakingPaused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "update",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_rewardTotal",
                "type": "uint256"
            }
        ],
        "name": "updateReward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_rewardProduced",
                "type": "uint256"
            }
        ],
        "name": "updateRewardProduced",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_rewardTotal",
                "type": "uint256"
            }
        ],
        "name": "updateRewardTotal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_rewardAllowed",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_rewardDebt",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_distributed",
                "type": "uint256"
            }
        ],
        "name": "updateStakerInfo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_totalDistributed",
                "type": "uint256"
            }
        ],
        "name": "updateTotalDistributed",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_totalStaked",
                "type": "uint256"
            }
        ],
        "name": "updateTotalStaked",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_tps",
                "type": "uint256"
            }
        ],
        "name": "updateTps",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "_paused",
                "type": "bool"
            }
        ],
        "name": "updatingPause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            }
        ],
        "name": "upgradeTo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newImplementation",
                "type": "address"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "upgradeToAndCall",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
];
var CONTRACT_ADDRESS_TRADE = '0x7F31d9c6Cf99DDB89E2a068fE7B96d230b9D19d1';
// const PROVIDER_LINK = 'wss://mainnet.infura.io/ws/v3/74e70c071afb48a18542e1f5dd2a0e74'
// const ABI_TRADE: any = [
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_govTokenAddress",
//                 "type": "address"
//             },
//             {
//                 "internalType": "address",
//                 "name": "_USDTAddress",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_rate",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_totalAmount",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_minAmountToBuy",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_maxAmountToBuy",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "address",
//                 "name": "_vcUSDPoolAddress",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "nonpayable",
//         "type": "constructor"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "bytes32",
//                 "name": "role",
//                 "type": "bytes32"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "bytes32",
//                 "name": "previousAdminRole",
//                 "type": "bytes32"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "bytes32",
//                 "name": "newAdminRole",
//                 "type": "bytes32"
//             }
//         ],
//         "name": "RoleAdminChanged",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "bytes32",
//                 "name": "role",
//                 "type": "bytes32"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "sender",
//                 "type": "address"
//             }
//         ],
//         "name": "RoleGranted",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "bytes32",
//                 "name": "role",
//                 "type": "bytes32"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             },
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "sender",
//                 "type": "address"
//             }
//         ],
//         "name": "RoleRevoked",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": false,
//                 "internalType": "bool",
//                 "name": "state",
//                 "type": "bool"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "time",
//                 "type": "uint256"
//             }
//         ],
//         "name": "RoundStateChanged",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "spender",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "daovcAmount",
//                 "type": "uint256"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "time",
//                 "type": "uint256"
//             }
//         ],
//         "name": "TokenExchangedFromFiat",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "spender",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "usdtAmount",
//                 "type": "uint256"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "daovcAmount",
//                 "type": "uint256"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "string",
//                 "name": "userId",
//                 "type": "string"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "time",
//                 "type": "uint256"
//             }
//         ],
//         "name": "TokenExchangedFromUsdt",
//         "type": "event"
//     },
//     {
//         "anonymous": false,
//         "inputs": [
//             {
//                 "indexed": true,
//                 "internalType": "address",
//                 "name": "claimer",
//                 "type": "address"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "amountClaimed",
//                 "type": "uint256"
//             },
//             {
//                 "indexed": false,
//                 "internalType": "uint256",
//                 "name": "time",
//                 "type": "uint256"
//             }
//         ],
//         "name": "TokensClaimed",
//         "type": "event"
//     },
//     {
//         "inputs": [],
//         "name": "ADMIN_ROLE",
//         "outputs": [
//             {
//                 "internalType": "bytes32",
//                 "name": "",
//                 "type": "bytes32"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "DEFAULT_ADMIN_ROLE",
//         "outputs": [
//             {
//                 "internalType": "bytes32",
//                 "name": "",
//                 "type": "bytes32"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "SERVICE_ROLE",
//         "outputs": [
//             {
//                 "internalType": "bytes32",
//                 "name": "",
//                 "type": "bytes32"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "USDTAddress",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "USDTClaimed",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "USDTReceived",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256[]",
//                 "name": "_unlockDate",
//                 "type": "uint256[]"
//             },
//             {
//                 "internalType": "uint256[]",
//                 "name": "_percent",
//                 "type": "uint256[]"
//             }
//         ],
//         "name": "addLock",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "claim",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_usdtReceiver",
//                 "type": "address"
//             }
//         ],
//         "name": "claimUSDT",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "getInfoAboutUsdt",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "USDTReceived_",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "USDTClaimed_",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "getRate",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "bytes32",
//                 "name": "role",
//                 "type": "bytes32"
//             }
//         ],
//         "name": "getRoleAdmin",
//         "outputs": [
//             {
//                 "internalType": "bytes32",
//                 "name": "",
//                 "type": "bytes32"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "bytes32",
//                 "name": "role",
//                 "type": "bytes32"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "index",
//                 "type": "uint256"
//             }
//         ],
//         "name": "getRoleMember",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "bytes32",
//                 "name": "role",
//                 "type": "bytes32"
//             }
//         ],
//         "name": "getRoleMemberCount",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "getRoundState",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_user",
//                 "type": "address"
//             }
//         ],
//         "name": "getUserInfo",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "amount_",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "available_",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "claimed_",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "currentLockTime_",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "govTokenAddress",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "bytes32",
//                 "name": "role",
//                 "type": "bytes32"
//             },
//             {
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             }
//         ],
//         "name": "grantRole",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "bytes32",
//                 "name": "role",
//                 "type": "bytes32"
//             },
//             {
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             }
//         ],
//         "name": "hasRole",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "name": "locks",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "unlockDate",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "percent",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "maxAmountToBuy",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "minAmountToBuy",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "rate",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "ratesPrecision",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_recepient",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_amount",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "address",
//                 "name": "tokenAddress",
//                 "type": "address"
//             }
//         ],
//         "name": "removeToken",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "bytes32",
//                 "name": "role",
//                 "type": "bytes32"
//             },
//             {
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             }
//         ],
//         "name": "renounceRole",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "bytes32",
//                 "name": "role",
//                 "type": "bytes32"
//             },
//             {
//                 "internalType": "address",
//                 "name": "account",
//                 "type": "address"
//             }
//         ],
//         "name": "revokeRole",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "_amount",
//                 "type": "uint256"
//             }
//         ],
//         "name": "sendUsdtToPool",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "bool",
//                 "name": "_state",
//                 "type": "bool"
//             }
//         ],
//         "name": "setRoundState",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "_amountInUsdt",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "string",
//                 "name": "_userId",
//                 "type": "string"
//             }
//         ],
//         "name": "swap",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_user",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_amountInUsdt",
//                 "type": "uint256"
//             }
//         ],
//         "name": "swapBackend",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "swapUnlocked",
//         "outputs": [
//             {
//                 "internalType": "bool",
//                 "name": "",
//                 "type": "bool"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "totalAmount",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "totalSold",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "_index",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_percent",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_unlockDate",
//                 "type": "uint256"
//             }
//         ],
//         "name": "updateLock",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "_maxAmountToBuy",
//                 "type": "uint256"
//             }
//         ],
//         "name": "updateMaximum",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "_minAmountToBuy",
//                 "type": "uint256"
//             }
//         ],
//         "name": "updateMinimum",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "_rate",
//                 "type": "uint256"
//             }
//         ],
//         "name": "updateRate",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_govTokenAddress",
//                 "type": "address"
//             }
//         ],
//         "name": "updateTokenAddress",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_user",
//                 "type": "address"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_amount",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "_claimed",
//                 "type": "uint256"
//             }
//         ],
//         "name": "updateUserInfo",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "_vcUSDPoolAddress",
//                 "type": "address"
//             }
//         ],
//         "name": "updateVcUsdPoolAddress",
//         "outputs": [],
//         "stateMutability": "nonpayable",
//         "type": "function"
//     },
//     {
//         "inputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "name": "users",
//         "outputs": [
//             {
//                 "internalType": "uint256",
//                 "name": "amount",
//                 "type": "uint256"
//             },
//             {
//                 "internalType": "uint256",
//                 "name": "claimed",
//                 "type": "uint256"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     },
//     {
//         "inputs": [],
//         "name": "vcUSDPoolAddress",
//         "outputs": [
//             {
//                 "internalType": "address",
//                 "name": "",
//                 "type": "address"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     }
// ]
// const CONTRACT_ADDRESS_TRADE = '0x1AbBbF288f707Aa2a8B0974365a3E34075cbfCad'
function getWQT() {
    return __awaiter(this, void 0, void 0, function () {
        var reward, staked, unstaked, array, arrayAll, allEvents, sumAmount, provider, web3, tradeContract, count, latest, fromBlock, _loop_1, toBlock, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reward = [];
                    staked = [];
                    unstaked = [];
                    array = [];
                    arrayAll = [];
                    allEvents = {};
                    sumAmount = 0;
                    provider = new Web3.providers.WebsocketProvider(PROVIDER_LINK);
                    web3 = new Web3(provider);
                    tradeContract = new web3.eth.Contract(ABI_TRADE, CONTRACT_ADDRESS_TRADE);
                    count = 6000;
                    latest = 10831500;
                    fromBlock = 10000000;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    _loop_1 = function (toBlock) {
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    console.log('fromBlock', fromBlock, 'toBlock', toBlock <= latest ? toBlock : latest);
                                    return [4 /*yield*/, tradeContract.getPastEvents('allEvents', {
                                            fromBlock: fromBlock,
                                            toBlock: toBlock,
                                        }).then(function (events, err) {
                                            // console.log(events)
                                            for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                                                var event_1 = events_1[_i];
                                                console.log(event_1);
                                                if (event_1.event === 'RewardPaid') {
                                                    reward = reward.concat(event_1);
                                                }
                                                // if (event.event === 'RewardPaid') {
                                                //     reward = reward.concat(event)
                                                // }
                                                // if (event.event === 'Staked') {
                                                //     staked = staked.concat(event)
                                                // }
                                                // if (event.event === 'Unstaked') {
                                                //     unstaked = unstaked.concat(event)
                                                // }
                                            }
                                            fromBlock = toBlock;
                                        })];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    toBlock = fromBlock + count;
                    _a.label = 2;
                case 2:
                    if (!(toBlock <= latest + count)) return [3 /*break*/, 5];
                    return [5 /*yield**/, _loop_1(toBlock)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    toBlock += count;
                    return [3 /*break*/, 2];
                case 5:
                    array = array.concat(reward);
                    array = array.concat(staked);
                    array = array.concat(unstaked);
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getWQT = getWQT;
function subscribeNewBlock(block, instance_atomicSwap, web3) {
    return __awaiter(this, void 0, void 0, function () {
        var subscribe;
        var _this = this;
        return __generator(this, function (_a) {
            subscribe = web3.eth.subscribe('newBlockHeaders', function (err, event) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!err) return [3 /*break*/, 1];
                            block = {
                                number: event.number,
                                timestamp: event.timestamp
                            };
                            console.log(event);
                            console.log(block, 'block');
                            return [3 /*break*/, 3];
                        case 1:
                            console.log(err, 'ERROR SUBSCRIBE');
                            return [4 /*yield*/, subscribe.unsubscribe(function (error, success) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        if (success) {
                                            console.log('Successfully unsubscribed!');
                                        }
                                        return [2 /*return*/];
                                    });
                                }); })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    });
}
exports.subscribeNewBlock = subscribeNewBlock;
