import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Wallet from './pages/wallet';
import CreateTask from './pages/createTask';
import DeleteTask from './pages/deleteTask';
import UpdateTask from './pages/updateTask';
import ViewTask from './pages/viewTask';
import ViewAllTasks from './pages/viewAllTask';

function App() {
    const [state, setState] = useState({
        web3: null,
        account: null,
        contract: null,
    });

    const saveState = (web3, account, contract) => {
        if (!state.web3 && !state.account && !state.contract) {
            setState({
                web3,
                account,
                contract,
            });
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Wallet saveState={saveState} />}
                />
                <Route path="/createTask" element={<CreateTask state={state} />} />
                <Route path="/viewTask" element={<ViewTask />} />
                <Route path="/viewTasks" element={<ViewAllTasks />} />
                <Route path="/deleteTask" element={<DeleteTask state={state} />} />
                <Route path="/updateTask" element={<UpdateTask state={state} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
