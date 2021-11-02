import BigNumber from "bignumber.js";

const Web3 = require('web3');

export const wsProviders = {
        bsc: "wss://speedy-nodes-nyc.moralis.io/c9991b05b32effdda8b167e6/bsc/testnet/ws",
        eth: "wss://rinkeby.infura.io/ws/v3/e30a866bb84041b58381b9e97adedf3c"
};

export async function getMessageHash() {
        const signData = []
        signData.push(0)
        signData.push('123456789012345674890123654789')
        signData.push('0x2c765c9de1d2057104328f4b2b7579f2321d0b3e')
        signData.push('0x2c765c9de1d2057104328f4b2b7579f2321d0b3e')
        signData.push((123456789987654321121).toString())
        signData.push(20)
        signData.push('WQT')
        const web3 = new Web3(wsProviders.bsc);
        let {messageHash} = await web3.eth.accounts.sign(web3.utils.soliditySha3(...signData), '95174aa38065df0b8cdb186ba31ab80c08891aafdd0fbd0f9cdaab35bc17e1f5')
        console.log(JSON.stringify(signData))
        console.log(messageHash)
        return messageHash
}
