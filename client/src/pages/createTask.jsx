import {useState} from "react";
import Navigation from "./navigation";
import PropTypes from 'prop-types';

const CreateTask =({state})=>{

    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

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

    const createTask = async(event)=>{
        event.preventDefault();
        const {contract,account}=state;
    
        try{
            const res = await fetch("http://localhost:3000/createTask",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({date:formatDate(date)})
            })
            console.log(account)
            const data = await res.json()
            if(data.status===200){
                if(contract && contract.methods){
                    await contract.methods
                    .createTask(name,date)
                    .send({from:account})
                    setModalContent(`Task ${name} added at ${date}`);
                }
            }else{
                alert("Task cannot be added")
            }

        } catch (error) {
            setModalContent(`Task already exists at ${date}`);
          } finally {
            setModalOpen(true);
          }
    }
    return(
        <>
          <Navigation />
          <div className="create_task todo_btn">
            <form onSubmit={createTask}>
              <label>
                Name:
                <input id="taskName" onInput={(event)=>{setName(event.target.value)}}/>
              </label>
              <label>
                Date:
                <input id="taskDate" type="date" onChange={(event)=>{setDate(event.target.value)}} />
              </label>
              <button type="submit">Create Task</button>
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
      )
}

CreateTask.propTypes = {
    state: PropTypes.object,
};
export default CreateTask;