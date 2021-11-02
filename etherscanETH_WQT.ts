import {createObjectCsvWriter as createCsvWriter} from "csv-writer";
import BigNumber from "bignumber.js";
import {log} from "util";

const Web3 = require('web3');

// const PROVIDER_LINK = 'wss://eth.getblock.io/mainnet/?api_key=af6c8d36-7f56-46c9-873b-6eb0ef5d882b'

const PROVIDER_LINK = 'wss://speedy-nodes-nyc.moralis.io/c9991b05b32effdda8b167e6/bsc/mainnet/ws'
const ABI_TRADE: any = [
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
]
const CONTRACT_ADDRESS_TRADE = '0x7F31d9c6Cf99DDB89E2a068fE7B96d230b9D19d1'

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

export async function getWQT() {
    let reward = []
    let staked = []
    let unstaked = []
    let array = []

    let arrayAll = []
    let allEvents = {}
    let sumAmount = 0
    // let block: { number: number; timestamp: number; counter: number } = {
    //     number: 8178812,
    //     timestamp: 11457290,
    //     counter: 6000,
    // };

    const provider = new Web3.providers.WebsocketProvider(PROVIDER_LINK);
    const web3 = new Web3(provider);
    const tradeContract = new web3.eth.Contract(ABI_TRADE, CONTRACT_ADDRESS_TRADE);
    // await tradeContract.getPastEvents('allEvents', {
    //     fromBlock: block.number,
    //     toBlock: block.timestamp,
    // }).then(function (events, err) {
    //     console.log(events)
    // })
    const count = 6000;
    const latest =   10831500;
    let fromBlock =  10000000;
        // 8178812;
    try {
    for (let toBlock = fromBlock + count; toBlock <= latest + count; toBlock += count) {
        console.log('fromBlock', fromBlock, 'toBlock', toBlock <= latest ? toBlock : latest);
        await tradeContract.getPastEvents('allEvents', {
            fromBlock: fromBlock,
            toBlock: toBlock,
        }).then(function (events, err) {
            // console.log(events)
            for (const event of events) {
                console.log(event)
                if (event.event === 'RewardPaid') {
                    reward = reward.concat(event)
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
        })
    }
    array = array.concat(reward)
    array = array.concat(staked)
    array = array.concat(unstaked)

    // console.log(JSON.stringify(array))

    // for (let toBlock = block.number + block.counter; toBlock <= block.timestamp + block.counter; toBlock += block.counter) {
    //     await tradeContract.getPastEvents('TokenExchangedFromUsdt', {fromBlock: toBlock, toBlock: block.timestamp},
    //         async (err, event) => {
    //             console.log(JSON.stringify(event))
    //             console.log(event.length)
    //             array = event
    //             for (let i = 0; i < event.length; i++) {
    //                 let blockNumber = array[i].blockNumber
    //                 const blockInfo = new web3.eth.getBlock(blockNumber, (err, event) => {
    //                 }).then(function (event) {
    //                     allEvents = {
    //                         event: array[i].event,
    //                         address: array[i].address,
    //                         blockNumber: array[i].blockNumber,
    //                         timestamp: array[i].returnValues.time,
    //                         blockHash: array[i].blockHash,
    //                         transactionHash: array[i].transactionHash,
    //                         // user: array[i].returnValues.user,
    //                         amount: Number(new BigNumber(array[i].returnValues.daovcAmount).shiftedBy(-18))
    //                     };
    //                     sumAmount = Number (new BigNumber(sumAmount).plus(new BigNumber(array[i].returnValues.daovcAmount).shiftedBy(-18)))
    //                     arrayAll = arrayAll.concat(allEvents)
    //                     console.log(array.length, arrayAll.length)
    //                     if (array.length === arrayAll.length) {
    //                         console.log(arrayAll)
    //                         console.log(sumAmount, 'sumAmount')
    //                         const createCsvWriter = require('csv-writer').createObjectCsvWriter
    //                         const headers = []
    //                         for (let i = 0; i < Object.keys(arrayAll[0]).length; i++) {
    //                             const key = Object.keys(arrayAll[0])[i]
    //                             headers.push({id: key, title: key})
    //                         }
    //                         const csvWriter = createCsvWriter({
    //                             path: `111111111111111111.csv`,
    //                             header: headers
    //                         });
    //                         console.log(csvWriter.writeRecords(arrayAll))
    //                         return 'Ok, file create'
    //                     }
    //                 });
    //         }}).on('events', function (err, event) {
    //     })
    // }

    // .then(function (events,err) {
    //     console.log(events, err)
    // })

    // for (let i = 0; i < array.length; i++) {
    //     let blockNumber = array[i].blockNumber
    //     const blockInfo = new web3.eth.getBlock(blockNumber, (err, event) => {
    //     }).then(function (event) {
    //         allEvents = {
    //             event: array[i].event,
    //             address: array[i].address,
    //             blockNumber: array[i].blockNumber,
    //             timestamp: event.timestamp,
    //             blockHash: array[i].blockHash,
    //             transactionHash: array[i].transactionHash,
    //             user: array[i].returnValues.user,
    //             amount: array[i].returnValues.amount || array[i].returnValues.reward,
    //         };
    //         arrayAll = arrayAll.concat(allEvents)
    //
    //         console.log(arrayAll)
    //         console.log(array.length, arrayAll.length)
    //         if (array.length === arrayAll.length) {
    //             console.log(arrayAll)
    //             const createCsvWriter = require('csv-writer').createObjectCsvWriter
    //             const headers = []
    //             for (let i = 0; i < Object.keys(arrayAll[0]).length; i++) {
    //                 const key = Object.keys(arrayAll[0])[i]
    //                 headers.push({id: key, title: key})
    //             }
    //             const csvWriter = createCsvWriter({
    //                 path: `WQT_BSC(05.10.21).csv`,
    //                 header: headers
    //             });
    //             console.log(csvWriter.writeRecords(arrayAll))
    //             return 'Ok, file create'
    //         }
    //     });
    //
    // // await subscribeNewBlock(block,tradeContract,web3)
    //
    // }
    } catch (err) {
        console.log(err)
    }
}


export async function subscribeNewBlock(block, instance_atomicSwap, web3) {
    const subscribe = web3.eth.subscribe('newBlockHeaders', async (err, event) => {
            if (!err) {
                block = {
                    number: event.number,
                    timestamp: event.timestamp
                };
                console.log(event)
                console.log(block, 'block')
            } else {
                console.log(err, 'ERROR SUBSCRIBE');
                await subscribe.unsubscribe(async (error, success) => {
                    if (success) {
                        console.log('Successfully unsubscribed!');
                    }
                });
            }
        }
    );
}
