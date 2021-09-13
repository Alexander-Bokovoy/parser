import axios from "axios";
import BigNumber from "bignumber.js";


export async function parseJSON() {
    const TronWeb = require('tronweb')
    const fs = require('fs');

    let rawdata = fs.readFileSync('files/TBSPijU2HsBe6RaZc6NkFRcQ9cJjMBqGzZ.json');
    const data = JSON.parse(rawdata);
    let transaction: any = {};
    let trans = []
    const hashAmounts = {};
    let arr = []
    try {
        for (let i = 0; i < data.data.length; i++) {
            const oneBlock = data.data[i]
            arr = await arr.concat(oneBlock.transaction_id)
        }
        const namesSet: any = new Set(arr);
        const asdas: any = namesSet.values()
        const size = namesSet.size;
        let counter = 0;
        for (let i = 0; i < size; i++) {
            axios.get(`https://apilist.tronscan.org/api/transaction-info?hash=${asdas.next().value}`)
                .then((trInfo) => {
                    const {
                        trigger_info,
                        internal_transactions,
                        contractRet,
                        tokenTransferInfo
                    } = trInfo.data
                    const methodName = trigger_info && trigger_info.method === undefined ? 'Undefined_Method' : trigger_info.method;
                    // .toLowerCase();
                    console.log(methodName, trInfo.data.hash)
                    if (contractRet === 'SUCCESS') {
                        if (Object.keys(trigger_info).length == 0) {
                            hashAmounts[trInfo.data.hash] = {
                                method: null,
                                token_info: null,
                            }
                            hashAmounts[trInfo.data.hash].amount = 0
                            if (typeof trInfo.data.info === 'object' && trInfo.data.info.balance) {
                                hashAmounts[trInfo.data.hash].amount
                            } else if (hashAmounts[trInfo.data.hash].amount) {
                                hashAmounts[trInfo.data.hash].amount = new BigNumber(trInfo.data.info).shiftedBy(-18)
                            }
                        } else if (trigger_info.parameter._amount || trigger_info.call_value) {
                            hashAmounts[trInfo.data.hash] = {
                                method: trigger_info.method,
                                token_info: null,
                            };
                            console.log(trigger_info.parameter._amount || trigger_info.call_value)
                            const internalTransactions: any = Object.values(internal_transactions);
                            internalTransactions.forEach(items => {
                                !hashAmounts[trInfo.data.hash].token_info && items.forEach(transactionData => {
                                    if (transactionData.token_list && transactionData.token_list.length && tokenTransferInfo) {
                                        hashAmounts[trInfo.data.hash].token_info = tokenTransferInfo.symbol
                                    }
                                })
                            })
                            // tokenDecimal
                            hashAmounts[trInfo.data.hash].amount = Number
                                ? new BigNumber(trigger_info.parameter._amount || trigger_info.call_value).shiftedBy(-18)
                                : (trigger_info.parameter._amount || 0)
                        } else if (tokenTransferInfo) {
                            hashAmounts[trInfo.data.hash] = {
                                method: trigger_info.method,
                                token_info: null,
                            };
                            const tokenTransfer: any = Object.values(tokenTransferInfo);
                            tokenTransfer.forEach(items => {
                                tokenTransferInfo && (hashAmounts[trInfo.data.hash].token_info = tokenTransferInfo.symbol);
                            })
                            hashAmounts[trInfo.data.hash].amount = Number
                                ? new BigNumber(tokenTransferInfo.amount_str).shiftedBy(-18)
                                : (tokenTransferInfo.amount_str || 0
                                )
                        } else if (internal_transactions) {
                            hashAmounts[trInfo.data.hash] = {
                                method: trigger_info.method,
                            };
                            const internalTransactions: any = Object.values(internal_transactions);
                            hashAmounts[trInfo.data.hash].amount = internalTransactions.reduce((acc, items) => {
                                const value = items.reduce((a, transactionData) => {
                                    let tokenValue = 0;
                                    if (transactionData.token_list && transactionData.token_list.length) {
                                        hashAmounts[trInfo.data.hash].token_info = transactionData.token_list[0].tokenInfo.tokenName;
                                        const summa: any = transactionData.token_list as object[]
                                        tokenValue = summa.reduce((acc, token) => (token.call_value
                                            ? acc + Number(new BigNumber(token.call_value).shiftedBy(-18))
                                            : acc), 0)
                                    }
                                    return tokenValue + a;
                                }, 0)
                                return value + acc;
                            }, 0)
                        }
                    }
                    transaction = {
                        block: trInfo.data.block,
                        confirmed: trInfo.data.confirmed,
                        ownerAddress: trInfo.data.ownerAddress,
                        timestamp: new Date(trInfo.data.timestamp).toISOString(),
                        value: trInfo.data.value,
                        toAddress: trInfo.data.toAddress,
                        txHash: trInfo.data.hash,
                        contractRet: trInfo.data.contractRet,
                        method: trInfo.data.trigger_info.method,
                        amount: hashAmounts[trInfo.data.hash].amount
                    };
                    trans = trans.concat(transaction)

                    // Saving file
                    counter++

                    if (counter === size) {
                        console.log(JSON.stringify(trans))
                        const createCsvWriter = require('csv-writer').createObjectCsvWriter
                        const headers = []
                        for (let i = 0; i < Object.keys(trans[0]).length; i++) {
                            const key = Object.keys(trans[0])[i]
                            headers.push({id: key, title: key})
                        }
                        const csvWriter = createCsvWriter({
                            path: `TBSPijU2HsBe6RaZc6NkFRcQ9cJjMBqGzZ.csv`,
                            header: headers
                        });
                        console.log(csvWriter.writeRecords(trans))
                        return 'Ok, file create'
                    }
                })
                .catch((err) => {
                    // Saving file
                    counter++
                    console.log('Query error:', err);
                })
        }
    } catch
        (e) {
        console.log('getTransaction', e)
    }
}
