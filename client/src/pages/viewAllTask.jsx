import  { useEffect, useState } from "react";

const ViewAllTasks = () => {
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const viewTasks = async () => {
            try {
                const res = await fetch('http://localhost:3000/viewTasks', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await res.json();

                if (data.status === 200) {
                    setTaskList(data.taskObj);
                    console.log(data.taskObj);
                }
            } catch (err) {
                console.error(err);
            }
        };

        viewTasks();
    }, []); 

    return (
        <div>
            <h1>View All Tasks</h1>
            <ul>
                {taskList.map(task => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewAllTasks;
