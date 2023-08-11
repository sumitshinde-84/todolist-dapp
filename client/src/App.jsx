// import { useState, useEffect } from 'react';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import './App.css'
import Wallet from './pages/wallet';
import CreateTask from './pages/createTask';
import DeleteTask from './pages/deleteTask';
import UpdateTask from './pages/updateTask';
import ViewTask from './pages/viewTask';
import ViewAllTasks from './pages/viewAllTask';
import Navigation from './pages/navigation';

function App() {

  const router = createBrowserRouter([
    {path:'/', element:<Wallet/>},
    {path:'/createTask', element:<CreateTask/>},
    {path:'/viewTask', element:<ViewTask/>},
    {path:'/viewTasks', element:<ViewAllTasks/>},
    {path:'/deleteTask', element:<DeleteTask/>},
    {path:'/updateTask', element:<UpdateTask/>},
    
  ])
  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
