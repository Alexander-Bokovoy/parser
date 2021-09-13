import BigNumber from "bignumber.js";
import {createObjectCsvWriter as createCsvWriter} from "csv-writer";

const TronWeb = require('tronweb')
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider('https://api.trongrid.io');
const solidityNode = new HttpProvider('https://api.trongrid.io');
const eventServer = new HttpProvider('https://api.trongrid.io');

// const privateKey = 'e0c1346f-6221-4de0-b9f0-12036214867f';
const privateKey = '820d7421b04670cd9fabf0cc785df6e4e314bdaacdb25cf119b3ac0a1490db42';

export async function main() {
    // const tronWeb = new TronWeb({
    //     fullHost: 'https://api.trongrid.io',
    //     privateKey: 'e0c1346f-6221-4de0-b9f0-12036214867f'
    // });

    const tronWeb = await new TronWeb(
        fullNode,
        solidityNode,
        eventServer,
        privateKey
    );
    tronWeb.setHeader({"TRON-PRO-API-KEY": 'e0c1346f-6221-4de0-b9f0-12036214867f'});
    let contract = await tronWeb.contract().at("TTmqVitmCbU5We7bhU3dohKcuwNn7L5RWh");
    await contract && contract.Transaction().watch((err, event) => {
        if (err)
            return console.error('Error with "Message" event:', err);

        console.group('New event received');
        console.log('- Contract Address:', event.contract);
        console.log('- Event Name:', event.name);
        console.log('- Transaction:', event.transaction);
        console.log('- Block number:', event.block);
        console.log('- Result:', event.result, '\n');
        console.groupEnd();
    });

    // contract.eventMethod().watch((err, event) => {
    //     if (err){
    //     return console.error('Error with "method" event:', err);
    //   }
    //   if (event) {
    //       console.log(event)
    //   }
    // });
}

//Example 1

export async function triggercontract() {
    const fs = require('fs');
    const tronWeb = await new TronWeb(
        fullNode,
        solidityNode,
        eventServer,
        privateKey
    );
    let arr: any = {}
    let purse = []

    let rawdata = fs.readFileSync('output.json');
    const data = JSON.parse(rawdata);

    for (let i = 0; i < data.data.length; i++) {
        const oneBlock = data.data[i]
        arr = TronWeb.address.fromHex(oneBlock.result.to)
        purse = purse.concat(arr)
    }

    const namesSet: any = new Set(purse);
    const asdas: any = namesSet.values()
    let allPurse: any = []
    for (let i = 0; i < namesSet.size; i++) {
        allPurse = allPurse.concat(asdas.next().value)
    }
    let resultAll = {}
    let ggg = []
    try {
        for (let i = 0; i < allPurse.length; i++) {
            try {
                const instance = await tronWeb.contract().at('TThrzAzRj2Pw4CQjqo1dk2zGyifPhuNHRu');
                let result = await instance["balanceOf"](`${allPurse[i]}`).call()
                console.log(tronWeb.toDecimal(result._hex));
                resultAll = {
                    purse: allPurse[i],
                    balance: new BigNumber(tronWeb.toDecimal(result._hex)).shiftedBy(-18).toString(),
                }
                ggg = ggg.concat(resultAll)
            } catch (errors) {
                console.log(errors)
            }
        }
        const createCsvWriter = require('csv-writer').createObjectCsvWriter
        const headers = []
        for (let i = 0; i < Object.keys(ggg[0]).length; i++) {
            const key = Object.keys(ggg[0])[i]
            headers.push({id: key, title: key})
        }
        const csvWriter = createCsvWriter({
            path: `Purse&&Amount.csv`,
            header: headers
        });
        console.log(csvWriter.writeRecords(ggg))
        return 'Ok, file create'
    } catch (err) {
        console.log(err)
    }
}


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


// getContract();// Execute the function

main();
