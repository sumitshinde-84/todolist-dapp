import { useState, } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import './App.css'
import Wallet from './pages/wallet';
import CreateTask from './pages/createTask';
import DeleteTask from './pages/deleteTask';
import UpdateTask from './pages/updateTask';
import ViewTask from './pages/viewTask';
import ViewAllTasks from './pages/viewAllTask';

function App() {

  const [state, setState] = useState({ web3: null, account: null, contract: null })
  

  const saveState = ({ web3, account, contract }) => {
    setState({ web3, account, contract })
    console.log('working')
  }

  const router = createBrowserRouter([
    { path: '/', element: <Wallet saveState={saveState} /> },
    { path: '/createTask', element: <CreateTask state={state}/> },
    { path: '/viewTask', element: <ViewTask /> },
    { path: '/viewTasks', element: <ViewAllTasks /> },
    { path: '/deleteTask', element: <DeleteTask state={state}/> },
    { path: '/updateTask', element: <UpdateTask state={state}/> },

  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
