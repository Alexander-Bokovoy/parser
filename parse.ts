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
                if (data.length === 0 || data.status === 500) {
                    start -= limit
                }
                try {
                    const hashAmounts = {};
                    for (const trans of data) {
                        console.log(trans.ownAddress, trans.toAddress, trans.txHash)
                        // if (await trans.ownAddress === 'TQfwmgn2PJiudTVgCHWqBzQJDQdJypjN4e'
                        //     || await trans.ownAddress === 'TCwYw7NCrnUE19CbmE8urYvrvNvK9JG5pJ'
                        //     || await trans.ownAddress === 'TUWo5ckXSStrvBL18S6n9hH4eWJoaTPq7r'
                        //     || await trans.ownAddress === 'TR69NsJSYvmP7Fu7SNCuo1AKq7enfrxdz1'
                        //     || await trans.ownAddress === 'TKNmpq5G6BddMv9h6nvgDKus1kagYd1ggz'
                        //     || await trans.ownAddress === 'TFTkqGUrNS7zDaaf4MkTBEn88gGLBUgXUW'
                        //     || await trans.ownAddress === 'TXz44zi7KcKgGThTke7hdEp7PHZWyxADAw'
                        // ) {
                            if (await (trans.hasOwnProperty('txHash') && trans.txHash)) {
                                let trInfo: any = await axios.get(`https://apilist.tronscan.org/api/transaction-info?hash=${trans.txHash}`)
                                const {
                                    trigger_info,
                                    internal_transactions,
                                    contractRet,
                                    tokenTransferInfo
                                } = trInfo.data
                                const methodName = trigger_info.method
                                // .toLowerCase();
                                console.log(methodName, trans.txHash)
                                // Unstake
                                if ( methodName.includes('claimBonuses()')) {
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
                                        } else if (internal_transactions) {
                                            hashAmounts[trans.txHash] = {
                                                method: trigger_info.method,
                                            };
                                            const internalTransactions: any = Object.values(internal_transactions);
                                            hashAmounts[trans.txHash].amount = internalTransactions.reduce((acc, items) => {
                                                const value = items.reduce((a, transactionData) => {
                                                    let tokenValue = 0;
                                                    if (transactionData.token_list && transactionData.token_list.length) {
                                                        hashAmounts[trans.txHash].token_info = transactionData.token_list[0].tokenInfo.tokenName;
                                                        let jgjgjg = transactionData.token_list as object[]
                                                        for (const token of jgjgjg) {
                                                            // @ts-ignore
                                                            tokenValue += Number(new BigNumber(token.call_value).shiftedBy(-18))
                                                        }
                                                    }
                                                    return tokenValue + a;
                                                }, 0)

                                                return value + acc;
                                            }, 0)
                                        }
                                    }
                                }
                            // }
                        }
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
                path: `AUTOPROGRAM_STATUS(claimBonuses).csv`,
                header: headers
            });
            console.log(csvWriter.writeRecords(transaction))
            return 'Ok, file create'
    } catch
        (e) {
        console.log('getTransaction', e)
    }
}
