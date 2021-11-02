
import BigNumber from "bignumber.js";

const Web3 = require('web3');

const providerETH = 'wss://speedy-nodes-nyc.moralis.io/99c238c237fa12068a89c5c6/eth/mainnet/ws'
const abiETH: any = [
    {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "owner", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "sender", "type": "address"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256"}, {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }],
        "name": "Burn",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "sender", "type": "address"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256"}],
        "name": "Mint",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "sender", "type": "address"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0In",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint256", "name": "amount1In", "type": "uint256"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0Out",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint256", "name": "amount1Out", "type": "uint256"}, {
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
        }, {"indexed": false, "internalType": "uint112", "name": "reserve1", "type": "uint112"}],
        "name": "Sync",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "from", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
        "name": "Transfer",
        "type": "event"
    }, {
        "constant": true,
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "MINIMUM_LIQUIDITY",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "PERMIT_TYPEHASH",
        "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"internalType": "address", "name": "", "type": "address"}, {
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "name": "allowance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "to", "type": "address"}],
        "name": "burn",
        "outputs": [{"internalType": "uint256", "name": "amount0", "type": "uint256"}, {
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
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "factory",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "getReserves",
        "outputs": [{"internalType": "uint112", "name": "_reserve0", "type": "uint112"}, {
            "internalType": "uint112",
            "name": "_reserve1",
            "type": "uint112"
        }, {"internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "_token0", "type": "address"}, {
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
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "to", "type": "address"}],
        "name": "mint",
        "outputs": [{"internalType": "uint256", "name": "liquidity", "type": "uint256"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "nonces",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
            "internalType": "address",
            "name": "spender",
            "type": "address"
        }, {"internalType": "uint256", "name": "value", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }, {"internalType": "uint8", "name": "v", "type": "uint8"}, {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
        }, {"internalType": "bytes32", "name": "s", "type": "bytes32"}],
        "name": "permit",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "price0CumulativeLast",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "price1CumulativeLast",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "to", "type": "address"}],
        "name": "skim",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "uint256", "name": "amount0Out", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "amount1Out",
            "type": "uint256"
        }, {"internalType": "address", "name": "to", "type": "address"}, {
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
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
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
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "token1",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }],
        "name": "transfer",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {"internalType": "uint256", "name": "value", "type": "uint256"}],
        "name": "transferFrom",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const contractETH = '0xf1fe852fca1b5a869ef1fe06a2799e1f38b70b84'

const providerBNB = 'wss://speedy-nodes-nyc.moralis.io/99c238c237fa12068a89c5c6/bsc/mainnet/ws'
const abiBNB: any = [
    {"inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor"}, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "owner", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "sender", "type": "address"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256"}, {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }],
        "name": "Burn",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "sender", "type": "address"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint256", "name": "amount1", "type": "uint256"}],
        "name": "Mint",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "sender", "type": "address"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0In",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint256", "name": "amount1In", "type": "uint256"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount0Out",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint256", "name": "amount1Out", "type": "uint256"}, {
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
        }, {"indexed": false, "internalType": "uint112", "name": "reserve1", "type": "uint112"}],
        "name": "Sync",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "from", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
        "name": "Transfer",
        "type": "event"
    }, {
        "constant": true,
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "MINIMUM_LIQUIDITY",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "PERMIT_TYPEHASH",
        "outputs": [{"internalType": "bytes32", "name": "", "type": "bytes32"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"internalType": "address", "name": "", "type": "address"}, {
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "name": "allowance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "to", "type": "address"}],
        "name": "burn",
        "outputs": [{"internalType": "uint256", "name": "amount0", "type": "uint256"}, {
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
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "factory",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "getReserves",
        "outputs": [{"internalType": "uint112", "name": "_reserve0", "type": "uint112"}, {
            "internalType": "uint112",
            "name": "_reserve1",
            "type": "uint112"
        }, {"internalType": "uint32", "name": "_blockTimestampLast", "type": "uint32"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "_token0", "type": "address"}, {
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
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "to", "type": "address"}],
        "name": "mint",
        "outputs": [{"internalType": "uint256", "name": "liquidity", "type": "uint256"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "nonces",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
            "internalType": "address",
            "name": "spender",
            "type": "address"
        }, {"internalType": "uint256", "name": "value", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
        }, {"internalType": "uint8", "name": "v", "type": "uint8"}, {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
        }, {"internalType": "bytes32", "name": "s", "type": "bytes32"}],
        "name": "permit",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "price0CumulativeLast",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "price1CumulativeLast",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "to", "type": "address"}],
        "name": "skim",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "uint256", "name": "amount0Out", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "amount1Out",
            "type": "uint256"
        }, {"internalType": "address", "name": "to", "type": "address"}, {
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
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
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
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "token1",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
        }],
        "name": "transfer",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {"internalType": "uint256", "name": "value", "type": "uint256"}],
        "name": "transferFrom",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const contractBNB = '0x3ea2de549ae9dcb7992f91227e8d6629a22c3b40'


export async function apyAllPairs() {
    const provider = new Web3.providers.WebsocketProvider(providerETH);
    const web3 = new Web3(provider);
    const tradeContract = new web3.eth.Contract(abiETH, contractETH);

    // let fromBlock =  12180343;
    // const count = 6000;
    // const latest = Date.now();

    const eventsSync = []
    await tradeContract.getPastEvents('Sync', {
        fromBlock: 13489241, //12180343,
        toBlock: 13497617,
    }, function (error, events) {
        eventsSync.push(events)
    })
    for (let i = 0; i < eventsSync[0].length; i++) {
        const token0 = Number (new BigNumber(eventsSync[0][i].returnValues.reserve0).shiftedBy(-18))
        const token1 = Number (new BigNumber(eventsSync[0][i].returnValues.reserve1).shiftedBy(-18))
        await web3.eth.getBlock(eventsSync[0][i].blockNumber)
            .then()
        // console.log(token0, token1)
    }
}
