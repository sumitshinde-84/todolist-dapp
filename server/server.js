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

app.get("/viewTasks", async (req, res) => {
    try {
        const tasks = await contract.methods.viewAllTask().call();
        if (tasks.length > 0) {
            const taskObj = tasks.map(({ id, name, date }) => {
                return {
                    id: Number(id),
                    name,
                    date,
                };
            });

            res.status(200).json({
                status: 200,
                taskObj,
                message: "tasks exist",
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "tasks does not exist",
            });
        }
    } catch (err) {
        console.error(err);
    }
});

const checkDateClash = async (date) => {
    try {
        const allTask = await contract.methods.viewAllTask().call();
        const result = allTask.find(task => task.date === date);
        return result ? "Clash: task cannot be added" : "No task found";
    } catch (err) {
        console.log(err);
        return "Error checking date clash";
    }
}

app.post("/createTask", async (req, res) => {
    const { date } = req.body;

    try {
        const clashResult = await checkDateClash(date); 
        if (clashResult !== 'No task found') {
            res.status(409).json({ status: 409, message: clashResult });
        } else {
            res.status(200).json({ status: 200, message: 'Task can be added' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
});


app.post("/updateTask", async (req, res) => {
    const { date } = req.body;

    try {
        const clashResult = await checkDateClash(date); 
        if (clashResult !== 'No task found') {
            res.status(409).json({ status: 409, message: clashResult });
        } else {
            res.status(200).json({ status: 200, message: 'Task can be added' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 500, message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`server is running at ${port}`);
});