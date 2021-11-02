import BigNumber from "bignumber.js";
import {createObjectCsvWriter as createCsvWriter} from "csv-writer";
import axios from "axios";
// import {ChainId, Token, TokenAmount, Pair} from "@uniswap/sdk";
import {FACTORY_ADDRESS} from "@uniswap/sdk";
import {INIT_CODE_HASH} from "@uniswap/sdk";
import {MINIMUM_LIQUIDITY} from "@uniswap/sdk";
import {InsufficientReservesError} from "@uniswap/sdk";
import {InsufficientInputAmountError} from "@uniswap/sdk";
import {ChainId, Token, TokenAmount, Pair,} from "@uniswap/sdk";

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

export async function getContract() {
    // const tronWeb = await new TronWeb(
    //     fullNode,
    //     solidityNode,
    //     eventServer,
    //     privateKey
    // );
    // const fs = require('fs');
    // let rawdata = fs.readFileSync('output.json.csv');
    // const data = JSON.parse(rawdata);
    // let arr: any = {}
    // let purse = []
    // for (let i = 0; i < data.data.length; i++) {
    //     const oneBlock = data.data[i]
    //     arr = TronWeb.address.fromHex(oneBlock.result.to)
    //     purse = purse.concat(arr)
    // }
    // const namesSet: any = new Set(purse);
    // const asdas: any = namesSet.values()
    // const allPurse = []
    // for (let i = 0; i < namesSet.size; i++){
    //     setTimeout(tronWeb.trx.getBalance(`${asdas.next().value}`).then(result => {
    //         console.log(result)
    //         allPurse.push({
    //             purse: asdas.next().value,
    //             balance: result
    //         })
    //     }).catch(err => {  }), 500)
    //
    //
    //     // console.log(tronWeb.wdx.getBalance(`${asdas.next().value}`).then(res => console.log(res)))
    // }
    // console.log(allPurse)


    // for (let i = 0; i < allPurse.length; i++){
    // tronWeb.trx.getBalance(`${allPurse[i]}`).then(result => console.log(result))
    // }
}

export async function getLiquid() {

    const WQT = new Token(
        ChainId.MAINNET,
        "0x06677dc4fe12d3ba3c7ccfd0df8cd45e4d4095bf",
        18,
        "WQT",
        "Work quest Token"
    );
    const ETH = new Token(
        ChainId.MAINNET,
        "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        18,
        "ETH",
        "Ether (Wrapped)"
    );

    const pair = new Pair(
        new TokenAmount(WQT, "0"),
        new TokenAmount(ETH, "0")
    );

    // console.log(pair.liquidityToken.address.toLowerCase())
    console.log(WQT.address)
    const r = await axios({
        url: `https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2`,
        method: "post",
        data: {
            query: `{ 
 tokenDayDatas(orderBy: date, orderDirection: asc,
  where: {
    token:"${WQT.address.toLowerCase()}"
  }
 ) {
    id
    date
    priceUSD
    totalLiquidityToken
    totalLiquidityUSD
    totalLiquidityETH
    dailyVolumeETH
    dailyVolumeToken
    dailyVolumeUSD
 }
      }`
        }
    });
    console.log(await r.data.data.tokenDayDatas)
}

// tokenDayDatas($tokenAddr: String!, $skip: Int!) {\n  tokenDayDatas(first: 1000, skip: $skip, orderBy: date, orderDirection: asc, where: {token: $tokenAddr}) {\n    id\n    date\n    priceUSD\n    totalLiquidityToken\n    totalLiquidityUSD\n    totalLiquidityETH\n    dailyVolumeETH\n    dailyVolumeToken\n    dailyVolumeUSD\n    __typename\n  }\n}\n"
// variables: {tokenAddr: "0x06677dc4fe12d3ba3c7ccfd0df8cd45e4d4095bf", skip: 0}


// getContract();// Execute the function

// main();
