import './Dashboard.css'
import { ImCheckboxChecked } from "react-icons/im"
import { FaTasks } from "react-icons/fa"
import { FaRegCheckCircle } from "react-icons/fa"
import { HiOutlineTrash } from "react-icons/hi"
import { useContext } from 'react'
import { TaskContext } from '../../context/TaskContext'

const Dashboard = () => {

  const { setFilter } = useContext(TaskContext)

  return (
    <div className='dash-container'>
      <div className='dash'>
        <ImCheckboxChecked className='checkedicon' />
        <h4 className='fw-bold fs-550'> Json To-Do List</h4>
      </div>
      <aside className='dashboard'>
        <nav className='nav-container text-accent-900 '>
          <ul>

            <li onClick={() => setFilter('all')}>
              <FaTasks
                className='icons' />
              All task
            </li>
            <li onClick={() => setFilter('completed')}>
              <FaRegCheckCircle
                className='icons' />
              Completed
            </li>
            <li onClick={() => setFilter('trash')}>
              <HiOutlineTrash
                className='icons' />
              Trash
            </li>
          </ul>
        </nav>

        <div className='task-remaining'>
          for dark mode & light mode
        </div>
      </aside >
    </div >
  )
}

export default Dashboard