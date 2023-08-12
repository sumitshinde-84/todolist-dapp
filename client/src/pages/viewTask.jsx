import { useEffect, useState } from "react";

const ViewTask = () => {
    const [task, setTask] = useState(null);
    const [id, setId] = useState(1)

    useEffect(() => {
        console.log(task)
    }, [task])

    const formHandler = async () => {
        try {
            event.preventDefault()
            const res = await fetch(`http://localhost:3000/viewTask/${id}`)
            const data = await res.json()
            if (data.status === 200) {
                setTask(data.taskObj)

            }

        } catch (error) {
            console.error(error)
        }
    }

    const inputHandler = (id) => {
        setId(id)
        console.log(id)
    }
    useEffect(() => {
        console.log(task)
    }, [task])


    return (
        <form onSubmit={formHandler}>
            <label htmlFor="Id">Id</label>
            <input className="id-input" type="tel" onInput={(event) => { inputHandler(event.target.value) }} value={id} />
            <button type="submit">view</button>
        </form>
    )
};

export default ViewTask;
