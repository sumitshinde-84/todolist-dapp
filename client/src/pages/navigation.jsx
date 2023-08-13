import {Link} from "react-router-dom";


const Navigation =()=>{
    return(
        <header>
        <div className="logo">TODO 3.O</div>
        <nav>
          <ul>
          <li>
              <Link className="nav_link" to="/">
                Wallet
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/viewTasks">
                View All Tasks
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/createTask">
                Create Task
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/viewTask">
                View Task
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/updateTask">
                Update Task
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/deleteTask">
                Delete Task
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
}
export default Navigation;