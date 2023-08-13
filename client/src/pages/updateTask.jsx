import  { useState } from "react";
import Navigation from "./navigation";
import PropTypes from 'prop-types';

const UpdateTask = ({ state }) => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(""); 

    const formatDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = dateObj.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalContent("");
    };

    const updateTask = async (event) => { 
        event.preventDefault();
        const { account, contract } = state;

        try {
            const res = await fetch("http://localhost:3000/updateTask", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id, name, date: formatDate(date) }) 
            });

            const data = await res.json();
            console.log(data);

            if (data.status === 200) {
                console.log(contract)
                if (contract && contract.methods) {
                    await contract.methods
                        .updateTask(id, name, date) 
                        .send({ from: account });
                    setModalContent(`Task at "${id}" updated successfully`);
                    setModalOpen(true); 
                }
                console.log("Task updated successfully.");
            } else {
                alert("Task cannot be updated");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Navigation />
            <div className="create_task todo_btn">
            <form onSubmit={updateTask}>
                <label>
                    Id:
                    <input id="taskId" onInput={(event) => { setId(event.target.value) }} />
                </label>
                <label>
                    Name:
                    <input id="taskName" onInput={(event) => { setName(event.target.value) }} />
                </label>
                <label>
                    Date:
                    <input id="taskDate" type="date" onChange={(event) => { setDate(event.target.value) }} />
                </label>
                <button type="submit">Update Task</button>
            </form>
                {modalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                            <p>{modalContent}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

UpdateTask.propTypes = {
    state: PropTypes.object,
};

export default UpdateTask;
