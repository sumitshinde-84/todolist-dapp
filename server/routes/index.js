const express = require("express");

const cors = require("cors");
const {
    createTask,
    updateTask,
    viewAllTask,
    viewTask,
} = require("../controllers/controller");
const router = express.Router();


// route to get single Task by its Id

router.route("/viewTask/:taskId").get(viewTask);

// route to get all task
router.route("/viewTasks").get(viewAllTask);

// route to create task
router.route("/createTask").post(createTask);

// route to update task

router.route("/updateTask").post(updateTask);

module.exports = router;
