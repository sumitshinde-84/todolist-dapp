const {contract} = require('../contract/contract');

const viewTask = async (req, res) => {
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
}

const viewAllTask = async (req, res) => {
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
}

const createTask = async (req, res) => {
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
}


const updateTask = async (req, res) => {
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
}

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

module.exports = {
    createTask,updateTask,viewAllTask,viewTask
}