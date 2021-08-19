import axios from "axios";
import {createObjectCsvWriter as createCsvWriter} from "csv-writer";


export async function getTransaction(address: string) {
    try {
        let transaction: any = []
        let start = 0
        let data: any = await axios.get(`https://apilist.tronscan.org/api/contracts/transaction?sort=-timestamp&count=true&limit=50&contract=${address}&start=${start}`)
        const total = data.data.total
        while (start < total) {
            let data: any = await axios.get(`https://apilist.tronscan.org/api/contracts/transaction?sort=-timestamp&count=true&limit=50&contract=${address}&start=${start}`)
            let value = 50
            start += value
            transaction = transaction.concat(data.data.data)
            console.log(transaction.length, data.data.data.length,total)
        }
        const createCsvWriter = require('csv-writer').createObjectCsvWriter
        const headers = []
        for (let i = 0; i < Object.keys(transaction[0]).length; i++) {
            const key = Object.keys(transaction[0])[i]
            headers.push({id: key, title: key})
        }
        const csvWriter = createCsvWriter({
            path: `Transaction/${address}.csv`,
            header: headers
        });
        console.log(csvWriter.writeRecords(transaction))
    } catch (e) {
        console.log('getTransaction', e)
    }
}


export async function getTransfer(address: string) {
    try {
        let transfer: any = []
        let start = 0
        let limit = 40
        let data: any = await axios.get(`https://apilist.tronscan.org/api/token_trc20/transfers?limit=${limit}&start=${start}&sort=-timestamp&count=true&relatedAddress=${address}`)
        const total = data.data.total
        console.log(total)
        while (start < total) {
            let data: any = await axios.get(`https://apilist.tronscan.org/api/token_trc20/transfers?limit=${limit}&start=${start}&sort=-timestamp&count=true&relatedAddress=${address}`)
            start += limit
            transfer = transfer.concat(data.data.token_transfers)
            console.log(data.data.token_transfers.length,transfer.length,start,total)
        }
        const createCsvWriter = require('csv-writer').createObjectCsvWriter
        const headers = []
        for (let i = 0; i < Object.keys(transfer[0]).length; i++) {
            const key = Object.keys(transfer[0])[i]
            headers.push({id: key, title: key})
        }
        const csvWriter = createCsvWriter({
            path: `Transfer_${address}.csv`,
            header: headers
        });
        console.log(csvWriter.writeRecords(transfer))
    } catch (e) {
        console.log('getTransaction', e)
    }
}
