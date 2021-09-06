import {getTransaction} from "./parse";
import axios from "axios";

// TODO ::  Specify values for parsing.
//  Example (address = [{address: String, contract_type: String, version: Number, type: String}])

const address = [
    // {address: "TMKkurxT8RygHjmA9Ncs7ycDTRdNWXqLkD", contract_type: "STATUS", version: 1, type: "Transaction"},
    // {address: "TGcmNkPRD7SQn9W112LjjR1EnMqD1bssAt", contract_type: "AUTOPROGRAM", version: 1, type: "Transaction"},
    // {address: "TGmn2hDiuHPvGNA2Q6qAUHNp8bHz75asBi", contract_type: "STAKING", version: 1, type: "Transaction"},
    // {address: "TNdaAqJWkPBsc2RWLmrLb17HPfG4thYhNv", contract_type: "STATUS", version: 2, type: "Transaction"},
    // {address: "TEA1rgug9buNx9wZNp6VoQPHe8bfmr8a73", contract_type: "AUTOPROGRAM", version: 2, type: "Transaction"},
    // {address: "TTiBWB1ZaDPBgEnMRGh6zxPALLjgPnbdvb", contract_type: "STAKING", version: 2, type: "Transaction"},
    // {address: "TQrqo9mRzYj1YGsS54hNLYZjVbDxrTiCqv", contract_type: "STATUS", version: 3, type: "Transaction"},
    // {address: "TB3LChn3QpoqdnJEBYrTx97dAyJaAS3D43", contract_type: "AUTOPROGRAM", version: 3, type: "Transaction"},
    // {address: "TB8oZNyr2NX5jnJjocpnQCQVgpQdGoW2n2", contract_type: "STAKING", version: 3, type: "Transaction"},
    // {address: "TFwHbk9Jb1zBuW96BN6nP8nNBKYLXJe6pp", contract_type: "STATUS", version: 4, type: "Transaction"},
    // {address: "TNNeHfSt63fRmQC3RUWBDCDbS9TJmedfdP", contract_type: "STAKING", version: 4, type: "Transaction"},
    // {address: "TJaE2jAyDLNVRBQps6qjfWxShh3UJo1ftR", contract_type: "STAKING", version: 5, type: "Transaction"},
    // {address: "TCVjFSw4ZoBmbfdcpaxsR1R6K161fsHgZf", contract_type: "STAKING", version: 6, type: "Transaction"},
    // {address: "TKyg9MuuT6V8LJzTHoiURiB4S8jAh4nMTF", contract_type: "AUTOPROGRAM", version: 4, type: "Transaction"},
    // {address: "TYC4g42yFXeqQd5gJTqueo4hjtZ3BqnVry", contract_type: "SWAP", version: 1, type: "Transaction"},
    // {address: "T9yJ5EAE8RHtWtaWzSknZuyUgvV62ttPA3", contract_type: "SWAP", version: 2, type: "Transaction"},
    // {address: "TEi3KvzSdDieDD4tFARz8NJ3SSU2z17ZcD", contract_type: "CITYLIFE_SWAP", version: 3, type: "Transaction"},
    // {address: "TApCMGcW6ZQW3vY7u6Bhrec43WyHBao4QA", contract_type: "REFERRALS", version: 1, type: "Transaction"},
    // {address: "TBSPijU2HsBe6RaZc6NkFRcQ9cJjMBqGzZ", contract_type: "REFERRALS", version: 2, type: "Transaction"},
    // {address: "TSvMwjUxYkLjavUvMQe9d4FyEe5FJeeyX3", contract_type: "REFERRALS", version: 3, type: "Transaction"},
]


const init = async () => {
    let versionTransaction = []
    let addressTransaction = []
    let totalTransaction = 0
    let contrType = []
    for (let i = 0; i < address.length; i++) {
            versionTransaction = versionTransaction.concat(address[i].version)
            addressTransaction = addressTransaction.concat(address[i].address)
            contrType = contrType.concat(address[i].contract_type)
            let data: any = await axios.get(`https://apilist.tronscan.org/api/contracts/transaction?sort=-timestamp&count=true&limit=10&contract=${address[i].address}&start=0`)
            totalTransaction += await data.data.total
    }
    console.log(totalTransaction)

    await getTransaction(addressTransaction, totalTransaction, versionTransaction, contrType)

    // await getTransfer(addressTransfer, totalTransfer, versionTransfer)

};
init();
