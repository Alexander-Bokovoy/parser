import axios from "axios";
import BigNumber from "bignumber.js";


const hash = [
    "1493dd498d4beca90f5b49c06aac38446abcbceee7cc32c6bbe176f9be122b29",
    "29e4eb11e9d306e80a5774c970412db5f64fae1a75487d14a0638b3f4588a8f2",
    "341c40b52db498c7231f4951acb00bfb0c679094118b7c93f0edd41ac8216894",
    "5205532d82373e3176c2d2cc31a0ddbfc85c76d363ca19bfef7b1f522f8ae1e1",
    "64975dfe2d1d6b70ea5e2d231d0ebc9d454220f60c0a029b1cf6a2c7ecc8b10d",
    "69a4529496da253055e8c3d5cf84117ab4843e970dc23e5602825bfab00dff48",
    "be4b8b996a430347d0cabb1953d691fe5408c1a31c2412708767e22c4878511b",
    "db002684b805907779d2e4c8365471bbe64f2bcefd210eb75e2133cd6f1fd9d9",
    "f2a1a8337b8467c36e9986380a7a60eb7fab50d1ec7011e4ac6c106f1d05d175",
    "02f3d4f2336b8b932b16de330141e3555eb95368600ccd0d783c7cda27108ed4",
    "046d9e53c0c0aab8fda3dabb82cb7086bfbeb8e11efecd83fca7ab36419a20fe",
    "0929b97d2cfff858d84df863b4d10b2af333904ce5bf3ec7077d517fc49cd1d7",
    "0e257986d8b486d31441a481426c6ad49c4533677504a19ccd421121cb0dd2ab",
    "13419945040f255624ed077132a2c7e46d40ca9c824547f33cd508689dde3837",
    "2ff77aafff8d4979facf9c4640996613953c16d589051c32c5c2f774cc521d21",
    "389ce633d772028b893098a4e7834751e158360e352bdd920a2301307653a6df",
    "4a09a4a4201b4304cab1547acb4a0d879bc4f68d143835635c0dd063d56ce08f",
    "7a7e913584d8b017b527efef102735680ffbddc6105d14e8615642c71ba8ed4c",
    "932414c3d96a789b29bd957ba595f1a663306ca7aa20834f13e239418ccfca22",
    "96ce2bfe0887e05ad552b1f5e3c14ce622461b6b0a816131010d7fe39d236c70",
    "ba48c495d0ebd752f63c858639bd909fa3d1bb4fc3e1cd7b1dd61fc554e88c6d",
    "c400df8a63d9f05d450097bace3e5752e20da803bd8bc841fde2a25850814472",
    "cdb70c1991ec641cba4d59287d002694d198adbee04b32f62ecf2045074aaf7e",
    "e1d767330016ae11eefd711c357d1503f8353ae496b07fd533ba7776ecafb311",
    "e815e69b3405fdc3c618d07c20e362978426b7a6d43256f623edb75c70b07753",
    "ee7a7cacf8709704b0e9c610874f374926aea8f9b6832e71f14b89e7718e043e",
    "f307d963a8254149bb24983a7a5d4bae4f31bd38d2d197b5466e475c9e4ca1ca",
    "f7dc36aa7b55c64c7cfa91d2444d320d67589f68ab67ad2bda7f7427c6a2cbe0",
    "24b07e73ec17469b0ceb5b2450a6916ba3912d40932dab6007672f80f3816c3d",
    "33ad0a0d73927ebb8ea6956b348d9101875627e0bbefb9e1802bbd170d2c7beb",
    "36efddf97f445aa564d2518deef6b19c730222b4da385cb046cf745cd9b9daf7",
    "5f40939067ec6da83b56f644408faa670139004a3e621af390f0e06afdac1ad2",
    "7fc0e35d55ad5bb8987ef6d6228465be2ebdc59a002af91eea4cbf3bdd0fd334",
    "ab1923c5425449f02308eadd1f0d641312ea8594d35cbad033a2f60b8f382040",
    "b920a1e41d29b2ffc0e021513f48e5816270a3276bb1f17973c7aaf192a87a00",
    "fc44846cef7b6c0a71804f6013f6911a9f7131f023120a6df24bcde85e500179",
    "0cdfb91cabf4ff1ee7e9d368ba1a348f9f7e6837c4d8392e14fbf51fffe2f6af",
    "0d000e406a1b8c0ce8fc3247b8e21c5585e7218c82729a8284996279831f1156",
    "0f03e05e1f6c34bdf0d7c4063a6e0cd383cfe4adbae16248dd873c3b714ebdec",
    "17dfb4648f3101ae0e439b4987ec6eb2e4c4eb1b773a6bea2e4432df5c72e6d7",
    "2d7f7abc32414358e934d627069b1d6dd0398ee70739013c4cf11d8c3bb2331c",
    "3de7d5e175d6efaead075c6196051a16c8ee0eece92061427377e0edbca43dbd",
    "6f3b5c2270ed9e08c666477fe20adf3cebb08d4b1d56c2e61d6613c8c899c289",
    "7eae51551c8da9f8d7471d05453a666feb83da8f80ffa0dd2d9a92e12251039f",
    "8b8a79a7ee810411ec9376b6025d77aca69c06dc135242ee446581823941ebdc",
    "9e8dcad990e570a7706b7a594df104ba0c3183ab05e9e1ef2d38dc2fa60e1922",
    "c1d4eacc2e2e96ca7953d1b411ef065e5b1d0ae664c0fd5cdb1afdf0401b423c",
    "d81153bad93eefd900a2f4c35e2c79bb9f825fad8bb28f13a9feb3417cc49c9c",
    "faac33925cd1bc3b69e0a951bdbbe8868bebb37de7356dc0e1a59ff2549ae85d",
    "3ce4429d07ff7f19fa7145c3e0bc669f33e18ea82945ab453da42e5ee5983f31",
    "3ef5d269dcbed3d3c66270690758a3a9e341065b4f38a3709d94661d35ff3d2f",
    "6e30c826afded7e9b17be2e17a3094a9c09b0c8e898519411e7b9e3e059e6392",
    "79b5ee5ec3add7ee4a194d9367321791d4488af3bd26506d8958d7aafaab0ac0",
    "a56aa98c9178f367dcd0ac6271e6273aaefc561620f129a9192ed08925c81f34",
    "b23bb713df1ff0d708e6be406bd82ce9d529c0c2fb49b313869b1b235c4f4ebb",
    "ca8dfb4284aa7d61a214bf9ad11edfcd31c82bf9f5600d9a3a7669c2b70eed30",
    "00885b4a41f3b9a5bf54a00fde1b93ad6f50fffc9675fdccffce90f5088115ff",
    "14fdcb3a915bb3cd36150ff70195be9126c95d57a9b54932c22fe2c107682b6e",
    "7219f235c8a724f2790973e41896523e0ea626ec453ec315048d021e354fc364",
    "87b2998bb0f16f387001711e9e09ea91d7b00efec727b119eda8e1a4e0084feb",
    "9146d74240c200faf54055bafa9948210b5925d3b884c89788054349280e2e31",
    "956ba19d56a72b8cb11ed1ec6d31de84d1f5d3e65d531042c6c51b14025d0708",
    "a505140b3392208306623287162dd2575f38dcc708390d8f7e0a2fafa7d9a927",
    "b3ac389d61e42dd99394e7910dbe1c759d4d641c58f0e93982f5242bf411c378",
    "4d3c40f19c574af6f65282c1557e8ee1f66d6571f4747682d6df2542354f0a03",
    "58b5fbd61206dcb3e84b17d2416f50e0ecd65b0cba0c0c1f4032b26355978366",
    "7e2dfb85299d0396e3f6d75531399aaf651c88fb643b6cef8be969bd8aaa259f",
    "9d4a37a2664c3e3512bd01e8a750fbe0bcc1c9e817436077f97dfe8a5b613dd4",
    "b6f23324cca758226b2feadb68e939cb4c0050d3982c596371b05441b75f93a6",
    "d7ddf7ad6115caac459789665231a5b0e42352d74f5dd2dc2ea0ec43a1e69942",
    "e34aef6b2aa6f46d99a988d3b77d9e28c039ba6f6104e4eb41901e281091ee35",
    "37c0cc6e1b993497e23b5d9efee58f65b34aa1243a5e697fc3fdb524b2fee906",
    "a56ae3fab444170c9af8ab5703e7aaa6de4e8a816fccc2ed443b925480bbf0c4",
    "f37f0d7af0a2c4012226ad21c8582ec35203c654bd65b2fbedeefc709cdd2920"
]

export async function compare() {
    const hashAmounts = {};
    let trInfo : any
    let transaction: any = {};
    let trans = []
    for (let i = 0; i < 5; i++) {
        trInfo = await axios.get(`https://apilist.tronscan.org/api/transaction-info?hash=${hash[i]}`);

        const {
            trigger_info,
            internal_transactions,
            tokenTransferInfo
        } = trInfo.data
        if (trigger_info.parameter._amount) {
            hashAmounts[hash[i]] = {
                method: trigger_info.method,
                token_info: null,
            };
            const internalTransactions: any = Object.values(internal_transactions);
            internalTransactions.forEach(items => {
                !hashAmounts[hash[i]].token_info && items.forEach(transactionData => {
                    if (transactionData.token_list && transactionData.token_list.length) {
                        hashAmounts[hash[i]].token_info = tokenTransferInfo.symbol
                    }
                })
            })
            // tokenDecimal
            hashAmounts[hash[i]].amount = Number
                ? new BigNumber(trigger_info.parameter._amount).shiftedBy(-18)
                : (trigger_info.parameter._amount || 0
                )
        } else if (tokenTransferInfo.name === "Wordlex") {
            hashAmounts[hash[i]] = {
                method: trigger_info.method,
                token_info: null,
            };
            const tokenTransfer: any = Object.values(tokenTransferInfo);
            tokenTransfer.forEach(items => {
                hashAmounts[hash[i]].token_info = tokenTransferInfo.symbol
            })
            hashAmounts[hash[i]].amount = Number
                ? new BigNumber(tokenTransferInfo.amount_str).shiftedBy(-18)
                : (tokenTransferInfo.amount_str || 0
                )
            console.log(hashAmounts[hash[i]].amount, hashAmounts[hash[i]].token_info)
        }
        transaction[i] = {
            version: 6,
            contract_type: "STAKING",
            block: trInfo.data.block,
            confirmed: trInfo.data.confirmed,
            ownAddress: trInfo.data.ownAddress,
            timestamp: new Date(trInfo.data.timestamp).toISOString(),
            value: trInfo.data.value,
            toAddress: trInfo.data.toAddress,
            txHash: trInfo.data.hash,
            contractRet: trInfo.data.contractRet,
            ownerAddress: trInfo.data.ownerAddress,
            method: trInfo.data.trigger_info.method,
            token_info: 'WDX',
            amount_str: new BigNumber(trInfo.data.tokenTransferInfo.amount_str).shiftedBy(-18).toString(),
        };
    }
    trans = await trans.concat(transaction)

    console.log(JSON.stringify(trans.length))
    // const createCsvWriter = require('csv-writer').createObjectCsvWriter
    // const headers = []
    // for (let i = 0; i < Object.keys(trans[0].data).length; i++) {
    //     const key = Object.keys(trans[0].data[0])[i]
    //     headers.push({id: key, title: key})
    // }
    // const csvWriter = createCsvWriter({
    //     path: `74hash.csv`,
    //     header: headers
    // });
    // console.log(csvWriter.writeRecords(transaction))
    // return 'Ok, file create'

}
