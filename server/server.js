const express = require("express");
const { Web3, Contract } = require("web3");
const Abi = require("./ABI.json");
const app = express();
const cors = require('cors')
const port = 3000;
const dotenv = require('dotenv')

dotenv.config();
app.use(cors())
app.use(express.json());


const web3 = new Web3(
    process.env.PROVIDER
);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(Abi, contractAddress);

// route to get single Task by its Id

app.get("/viewTask/:taskId", async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await contract.methods.viewTask(taskId).call();
        const { id, name, date } = task;
        const taskObj = {
            id: Number(id),
            name,
            date,
        };
        res.status(200).json({ status: 200, taskObj, message: "task exist" });
    } catch (err) {
        console.error(err);
        res.status(404).json({ status: 404, message: "id not exist" });
    }
});

