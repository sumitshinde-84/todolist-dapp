const { Web3 } = require("web3");
const Abi = require("../ABI.json");
const dotenv = require('dotenv')

dotenv.config();

const web3 = new Web3(
    process.env.PROVIDER
);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(Abi, contractAddress);

module.exports = {
    contract
}