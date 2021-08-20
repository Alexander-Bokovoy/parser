import {getTransaction, getTransfer} from "./parse";
import axios from "axios";
// import {getFile} from "./file";

// TODO ::  Specify values for parsing.
//  Example (address = [{address:"",version: Number, type:""}])

const address = [
    {address: "TYC4g42yFXeqQd5gJTqueo4hjtZ3BqnVry", version: 1, type: "Transfer"},
    {address: "T9yJ5EAE8RHtWtaWzSknZuyUgvV62ttPA3", version: 2, type: "Transfer"},
    {address: "TEi3KvzSdDieDD4tFARz8NJ3SSU2z17ZcD", version: 3, type: "Transfer"},
    {address: "TApCMGcW6ZQW3vY7u6Bhrec43WyHBao4QA", version: 1, type: "Transaction"},
    {address: "TBSPijU2HsBe6RaZc6NkFRcQ9cJjMBqGzZ", version: 2, type: "Transaction"},
    {address: "TSvMwjUxYkLjavUvMQe9d4FyEe5FJeeyX3", version: 3, type: "Transaction"},
]

const init = async () => {
    let versionTransfer = []
    let addressTransfer = []
    let totalTransfer = 0
    let versionTransaction = []
    let addressTransaction = []
    let totalTransaction = 0
    for (let i = 0; i < address.length; i++) {
        let types = address[i].type
        if (types === "Transfer") {
            versionTransfer = versionTransfer.concat(address[i].version)
            addressTransfer = addressTransfer.concat(address[i].address)
            let data: any = await axios.get(`https://apilist.tronscan.org/api/token_trc20/transfers?limit=10&start=0&sort=-timestamp&count=true&relatedAddress=${address[i].address}`)
            totalTransfer += await data.data.total
        }
        if (types === "Transaction") {
            versionTransaction = versionTransaction.concat(address[i].version)
            addressTransaction = addressTransaction.concat(address[i].address)
            let data: any = await axios.get(`https://apilist.tronscan.org/api/contracts/transaction?sort=-timestamp&count=true&limit=10&contract=${address[i].address}&start=0`)
            totalTransaction += await data.data.total
        }
    }
    await getTransaction(addressTransaction, totalTransaction, versionTransaction)
    await getTransfer(addressTransfer, totalTransfer, versionTransfer)


    // await getFile(address)
};
init();
