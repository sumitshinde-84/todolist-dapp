import  { useState } from "react";
import Navigation from "./navigation";
import PropTypes from 'prop-types';

const DeleteTask = ({ state }) => {

    const [id, setId] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const closeModal = () => {
        setModalOpen(false);
        setModalContent("");
    };

    const deleteTask = async (event) => {
        event.preventDefault();
        const { contract, account } = state;

        try {
            if (contract && contract.methods) {
                await contract.methods.deleteTask(id).send({ from: account });
                setModalContent(`Task with ID ${id} deleted`);
                setModalOpen(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Navigation />
            <div className="delete_task todo_btn">
                <form onSubmit={deleteTask}>
                    <label htmlFor="Id">Id</label>
                    <input className="id-input" type="tel" onInput={(event) => { setId(event.target.value) }} value={id} />
                    <button type="submit">Delete</button>
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

DeleteTask.propTypes = {
    state: PropTypes.object,
};

export default DeleteTask;
