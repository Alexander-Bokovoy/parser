import axios from "axios";
import BigNumber from "bignumber.js";

declare var require: any

export async function getTransaction(addressTransaction, totalTransaction, versionTransaction, contrType) {
    try {

        let transaction: any = []
        for (let i = 0; i < addressTransaction.length; i++) {
            let limit = 50
            let start = 0
            let data: any = await axios.get(`https://apilist.tronscan.org/api/contracts/transaction?sort=-timestamp&count=true&limit=1&contract=${addressTransaction[i]}&start=0`)
            let total = data.data.total
            while (start < total) {
                if ((total - start) < limit) {
                    limit = total - start
                }
                const data: any = (await axios
                        .get(`https://apilist.tronscan.org/api/contracts/transaction?sort=-timestamp&count=true&limit=${limit}&contract=${addressTransaction[i]}&start=${start}`)
                ).data.data
                start += limit
                if (data.length === 0) {
                    start -= limit
                }
                try {
                    const hashAmounts = {};
                    for (const trans of data) {
                        if (trans.hasOwnProperty('txHash') && trans.txHash) {
                            let trInfo: any = await axios.get(`https://apilist.tronscan.org/api/transaction-info?hash=${trans.txHash}`)
                            const {
                                trigger_info,
                                internal_transactions,
                                contractRet,
                                tokenTransferInfo
                            } = trInfo.data
                            const methodName = trigger_info.method.toLowerCase();
                            console.log(methodName, trans.txHash)
                            // Unstake
                            if (methodName.includes('stake') || methodName.includes('unstake') || methodName.includes('claim')) {
                                if (contractRet === 'SUCCESS') {
                                    if (trigger_info.parameter._amount) {
                                        hashAmounts[trans.txHash] = {
                                            method: trigger_info.method,
                                            token_info: null,
                                        };
                                        const internalTransactions: any = Object.values(internal_transactions);
                                        internalTransactions.forEach(items => {
                                            !hashAmounts[trans.txHash].token_info && items.forEach(transactionData => {
                                                if (transactionData.token_list && transactionData.token_list.length) {
                                                    hashAmounts[trans.txHash].token_info = tokenTransferInfo.symbol
                                                }
                                            })
                                        })
                                        // tokenDecimal
                                        hashAmounts[trans.txHash].amount = Number
                                            ? new BigNumber(trigger_info.parameter._amount).shiftedBy(-18)
                                            : (trigger_info.parameter._amount || 0
                                            )
                                    } else if (tokenTransferInfo.name === "Wordlex") {
                                        hashAmounts[trans.txHash] = {
                                            method: trigger_info.method,
                                            token_info: null,
                                        };
                                        const tokenTransfer: any = Object.values(tokenTransferInfo);
                                        tokenTransfer.forEach(items => {
                                            hashAmounts[trans.txHash].token_info = tokenTransferInfo.symbol
                                        })
                                        hashAmounts[trans.txHash].amount = Number
                                            ? new BigNumber(tokenTransferInfo.amount_str).shiftedBy(-18)
                                            : (tokenTransferInfo.amount_str || 0
                                            )
                                        console.log(hashAmounts[trans.txHash].amount, hashAmounts[trans.txHash].token_info)
                                    }
                                    // else if (internal_transactions) {
                                    //     hashAmounts[trans.txHash] = {
                                    //         method: trigger_info.method,
                                    //     };
                                    //     const internalTransactions: any = Object.values(internal_transactions);
                                    //     hashAmounts[trans.txHash].amount = internalTransactions.reduce((acc, items) => {
                                    //         const value = items.reduce((a, transactionData) => {
                                    //             let tokenValue = 0;
                                    //             if (transactionData.token_list && transactionData.token_list.length) {
                                    //                 hashAmounts[trans.txHash].token_info = transactionData.token_list[0].tokenInfo.tokenName;
                                    //                 let jgjgjg = transactionData.token_list as object[]
                                    //                 for (const token of jgjgjg) {
                                    //                     // @ts-ignore
                                    //                     tokenValue += Number(new BigNumber(token.call_value).shiftedBy(-18))
                                    //                 }
                                    //             }
                                    //             return tokenValue + a;
                                    //         }, 0)
                                    //
                                    //         return value + acc;
                                    //     }, 0)
                                    // }
                                }
                            }
                        }
                        // }
                    }
                    const newTr = await data
                        .filter(item => Object.keys(hashAmounts).includes(item.txHash))
                        .map(event => ({
                            version: versionTransaction[i],
                            contract_type: contrType[i],
                            block: event.block,
                            confirmed: event.confirmed,
                            ownAddress: event.ownAddress,
                            timestamp: new Date(event.timestamp).toISOString(),
                            value: event.value,
                            toAddress: event.toAddress,
                            txHash: event.txHash,
                            contractRet: event.contractRet,
                            ...hashAmounts[event.txHash]
                        }));

                    console.log(limit, start, total, totalTransaction)
                    transaction = await transaction.concat(newTr)
                } catch
                    (e) {
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
            path: `Transaction_STAKING(${addressTransaction}).csv`,
            header: headers
        });
        console.log(csvWriter.writeRecords(transaction))
        return 'Ok, file create'
    } catch
        (e) {
        console.log('getTransaction', e)
    }
}

// export async function getTransfer(addressTransfer, totalTransfer, versionTransfer) {
//     try {
//         let transfer: any = []
//         let newTransfer: any = []
//         for (let i = 0; i < addressTransfer.length; i++) {
//             let start = 0
//             let limit = 40
//             let data: any = await axios.get(`https://apilist.tronscan.org/api/token_trc20/transfers?limit=1&start=0&sort=-timestamp&count=true&relatedAddress=${addressTransfer[i]}`)
//             while (start < data.data.total) {
//                 let data: any = await axios.get(`https://apilist.tronscan.org/api/token_trc20/transfers?limit=${limit}&start=${start}&sort=-timestamp&count=true&relatedAddress=${addressTransfer[i]}`)
//                 start += limit
//                 try {
//                     let newTr = await data.data.token_transfers.map(event => {
//                         let date = new Date(event.block_ts).toISOString()
//                         let valueQuant = event.quant
//                         if (event.tokenInfo.tokenAbbr === "WDX") {
//                             valueQuant = Number(new BigNumber(event.quant).shiftedBy(-18))
//                         }
//                         if (event.tokenInfo.tokenAbbr === "USDT") {
//                             valueQuant = Number(new BigNumber(event.quant).shiftedBy(-6))
//                         }
//                         newTransfer = {
//                             version: versionTransfer[i],
//                             contract: addressTransfer[i],
//                             transaction_id: event.transaction_id,
//                             block: event.block,
//                             block_ts: date,
//                             from_address: event.from_address,
//                             to_address: event.to_address,
//                             confirmed: event.confirmed,
//                             contractRet: event.contractRet,
//                             quantity: valueQuant,
//                             toAddressIsContract: event.toAddressIsContract,
//                             tokenInfo: event.tokenInfo.tokenAbbr
//                         }
//                         return newTransfer
//                     })
//                     console.log(limit, start, data.data.total, totalTransfer)
//                     transfer = await transfer.concat(newTr)
//                 } catch (e) {
//                     console.log(e)
//                 }
//             }
//         }
//         const createCsvWriter = require('csv-writer').createObjectCsvWriter
//         const headers = []
//         for (let i = 0; i < Object.keys(transfer[0]).length; i++) {
//             const key = Object.keys(transfer[0])[i]
//             headers.push({id: key, title: key})
//         }
//         const csvWriter = createCsvWriter({
//             path: `Transfer.csv`,
//             header: headers
//         });
//         console.log(csvWriter.writeRecords(transfer))
//     } catch (e) {
//         console.log('getTransaction', e)
//     }
// }
