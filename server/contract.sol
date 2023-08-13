// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Todo{
    struct Task{
        uint id;
        string name;
        string date;
    }

    address owner;
    Task task;
    uint taskId = 1;
    mapping (uint => Task) Tasks;

    constructor(){
        owner = msg.sender;
    }

    modifier checkId(uint id){
        require(id != 0 && id < taskId,"invalid taskID");
        _; 
    }

    function createTask( string calldata _name , string calldata date) public {
        Tasks[taskId] = Task(taskId, _name , date);
        taskId++;
    }

    function updateTask(uint _id , string calldata _name, string calldata _date) public {
        Tasks[_id] = Task(_id, _name, _date);
    }

    function viewTask(uint _id) public view checkId(_id) returns (Task memory) {
       return Tasks[_id];
    }

    function viewAllTask() public view returns (Task[] memory){
        Task[] memory taskList = new Task[](taskId - 1);
        
        for(uint i; i < taskId -1 ;i++){
            taskList[i] = Tasks[i+1];
        }
        return taskList;
    }

    function deleteTask(uint _id) public checkId(_id){
        delete Tasks[_id];
    }
}
