import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import './Mainboard.css'
import { RiDeleteBin6Line } from "react-icons/ri";

const Mainboard = () => {

  const [newTask, setNewTask] = useState('')
  const [taskList, setTaskList] = useState([])

  const addTask = (e) => {
    e.preventDefault()

    if (newTask.trim() !== '') {

      setTaskList((prev) => [
        ...prev, {
          id: uuidv4(),
          title: newTask,
          isComplete: false,
        }
      ])
      setNewTask('')
    }
  }

  const deleteTask = (id) => {
    setTaskList(taskList.filter((item) => item.id !== id))
  }

  const handleComplete = (id) => {
    const toComplete = taskList.map((item) => {
      if (id === item.id) {
        return { ...item, isComplete: !item.isComplete }
      }
      return item
    })
    setTaskList(toComplete)
  }

  const tasksLeft = taskList.filter(item => !item.isComplete).length;


  const clearAllTodo = () => {
    setTaskList(taskList.filter(item => !item.isComplete))
  }


  return (
    <>

      <div className='main-container'>

        <div className='upper-part'>
          <h1>Json To-do-List</h1>
          <button className='add-button-text'>+ Add task</button>
        </div>

        <div className='input-container'>

          <form onSubmit={addTask}>
            <input
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
              type="text"
              placeholder='Add new task...'
            />
            <button
              type='submit'
              className='fs-600 add-button-icon'>
              +
            </button>
          </form>
        </div>

        <div className='output'>
          {taskList.length > 0 &&
            <div className='row'>
              <ul>

                {taskList.map((item, index) => (
                  <li key={index}>
                    <span className={`fs-650 label ${item.isComplete ? 'completed' : ''}`} >
                      <input
                        checked={item.isComplete}
                        onChange={() => handleComplete(item.id)}
                        type="checkbox" />

                      {item.title}
                    </span>
                    <span
                      className="value">
                      <RiDeleteBin6Line
                        onClick={() => deleteTask(item.id)}
                        className='delete-icon' />
                    </span>
                  </li>
                ))}

              </ul>
            </div>

          }
        </div>
        <div className='lower-part'>

          <span className='box1'> {tasksLeft} task(s) left</span>
          <span className='box2'
            onClick={clearAllTodo}> Clear completed</span>
        </div >
      </div>


    </>
  )
}

export default Mainboard