import axios from "axios";
import BigNumber from "bignumber.js";


export async function getTransaction(addressTransaction, totalTransaction, versionTransaction) {
    try {
        let transaction: any = []
        let newTransaction: any = []
        for (let i = 0; i < addressTransaction.length; i++) {
            let start = 0
            let limit = 50
            let data: any = await axios.get(`https://apilist.tronscan.org/api/contracts/transaction?sort=-timestamp&count=true&limit=1&contract=${addressTransaction[i]}&start=0`)
            while (start < data.data.total) {
                let data: any = await axios.get(`https://apilist.tronscan.org/api/contracts/transaction?sort=-timestamp&count=true&limit=${limit}&contract=${addressTransaction[i]}&start=${start}`)
                start += limit
                try {
                    let newTr = await data.data.data.map(event => {
                        newTransaction = {
                            version: versionTransaction[i],
                            block: event.block,
                            confirmed: event.confirmed,
                            ownAddress: event.ownAddress,
                            timestamp: event.timestamp,
                            value: event.value,
                            toAddress: event.toAddress,
                            txHash: event.txHash,
                            contractRet: event.contractRet,
                        }
                        return newTransaction
                    })
                    console.log(limit, start, data.data.total, totalTransaction)
                    transaction = await transaction.concat(newTr)
                } catch (e) {
                    console.log(e)
                }
            }
        }
        const createCsvWriter = require('csv-writer').createObjectCsvWriter
        const headers = []
        for (let i = 0; i < Object.keys(transaction[0]).length; i++) {
            const key = Object.keys(transaction[0])[i]
            headers.push({id: key, title: key})
        }
        const csvWriter = createCsvWriter({
            path: `Transaction.csv`,
            header: headers
        });
        console.log(csvWriter.writeRecords(transaction))
    } catch (e) {
        console.log('getTransaction', e)
    }
}

export async function getTransfer(addressTransfer, totalTransfer, versionTransfer) {
    try {
        let transfer: any = []
        let newTransfer: any = []
        for (let i = 0; i < addressTransfer.length; i++) {
            let start = 0
            let limit = 40
            let data: any = await axios.get(`https://apilist.tronscan.org/api/token_trc20/transfers?limit=1&start=0&sort=-timestamp&count=true&relatedAddress=${addressTransfer[i]}`)
            while (start < data.data.total) {
                let data: any = await axios.get(`https://apilist.tronscan.org/api/token_trc20/transfers?limit=${limit}&start=${start}&sort=-timestamp&count=true&relatedAddress=${addressTransfer[i]}`)
                start += limit
                try {
                    let newTr = data.data.token_transfers.map(event => {
                        let valueQuant = event.quant
                        if (event.tokenInfo.tokenAbbr === "WDX") {
                            valueQuant = Number(new BigNumber(event.quant).shiftedBy(-18))
                        }
                        if (event.tokenInfo.tokenAbbr === "USDT") {
                            valueQuant = Number(new BigNumber(event.quant).shiftedBy(-6))
                        }
                        newTransfer = {
                            version: versionTransfer[i],
                            transaction_id: event.transaction_id,
                            block: event.block,
                            block_ts: event.block_ts,
                            from_address: event.from_address,
                            to_address: event.to_address,
                            confirmed: event.confirmed,
                            contractRet: event.contractRet,
                            quantity: valueQuant,
                            toAddressIsContract: event.toAddressIsContract,
                            tokenInfo: event.tokenInfo.tokenAbbr
                        }
                        return newTransfer
                    })
                    console.log(limit, start, data.data.total, totalTransfer)
                    transfer = await transfer.concat(newTr)
                } catch (e) {
                    console.log(e)
                }
            }
        }
        const createCsvWriter = require('csv-writer').createObjectCsvWriter
        const headers = []
        for (let i = 0; i < Object.keys(transfer[0]).length; i++) {
            const key = Object.keys(transfer[0])[i]
            headers.push({id: key, title: key})
        }
        const csvWriter = createCsvWriter({
            path: `Transfer.csv`,
            header: headers
        });
        console.log(csvWriter.writeRecords(transfer))
    } catch (e) {
        console.log('getTransaction', e)
    }
}
