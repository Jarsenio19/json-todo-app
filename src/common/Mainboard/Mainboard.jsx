import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from "uuid"
import './Mainboard.css'
import { RiDeleteBin6Line } from "react-icons/ri"
import { FaCheckSquare } from "react-icons/fa"
import { useContext } from 'react'
import { TaskContext } from '../../context/TaskContext'
import { LiaTrashRestoreAltSolid } from "react-icons/lia";

const Mainboard = () => {

  const { filter } = useContext(TaskContext)

  const [newTask, setNewTask] = useState('')

  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem("tasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskList))
  }, [taskList])

  const [editTask, setEditTask] = useState('')
  const [editMode, setEditMode] = useState('')

  // Add task
  const addTask = (e) => {
    e.preventDefault()

    if (newTask.trim() !== '') {

      setTaskList((taskList) =>
        [...taskList,
        {
          id: uuidv4(),
          title: newTask,
          isComplete: false,
          isDelete: false
        }
        ])
      setNewTask('')
    }
  }

  // Delete task
  const deleteTask = (id) => {
    setTaskList((prev) =>
      prev.map((item) => item.id == id ? { ...item, isDelete: true } : item)
    )
  }

  const deleteForever = (id) => {
    setTaskList((prev) => prev.filter((item) => item.id !== id))
  }
  // Restore
  const restoreTask = (id) => {
    setTaskList((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, isDelete: false }
          : item
      )
    )
  }

  // Toggle complete
  const handleComplete = (id) => {
    const handleFinished = taskList.map((item) => {
      if (id === item.id) {
        return { ...item, isComplete: !item.isComplete }
      }
      return item
    })
    setTaskList(handleFinished)
  }

  // Task count
  const taskLeft = taskList.filter((item) => !item.isComplete && !item.isDelete).length

  // Clear all
  const clearAll = () => {
    setTaskList((prev) =>
      prev.filter((item) => !(item.isComplete && !item.isDelete))
    )
  }

  //  Start edit
  const startEdit = (item) => {
    setEditMode(item.id);
    setEditTask(item.title);
  };

  //  Save edit
  const saveEdit = () => {
    setTaskList((prev) =>
      prev.map((item) =>
        item.id === editMode
          ? { ...item, title: editTask }
          : item
      )
    );

    setEditMode(null);
    setEditTask("");
  };

  return (
    <>

      <div className='main-container'>
        <div className='upper-part'>
          <h1>Json To-do-List</h1>
          <button className='add-button-text'>+ Add task</button>
        </div>

        <div className='input-container'>

          {/* Input */}
          <form onSubmit={addTask}>
            <input
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
              type="text"
              placeholder='Add new task...' />
            <button
              type='submit'
              className='fs-600 add-button-icon'>
              +
            </button>
          </form>
        </div>

        {/* List */}
        <div className="output">
          <ul>
            {taskList.filter((item) => {
              if (filter === 'completed') {
                return item.isComplete && !item.isDelete
              }

              if (filter === 'trash') {
                return item.isDelete
              }

              return !item.isDelete;
            })
              .map((item, index) => (
                <li key={index} className="todo-item">
                  {editMode === item.id ? (
                    <div className="edit-container fs-550">
                      <input
                        value={editTask}
                        onChange={(e) => setEditTask(e.target.value)}
                        autoFocus
                      />
                      <FaCheckSquare
                        className='save-icon'
                        onClick={saveEdit} />
                    </div>
                  ) : (
                    <>
                      <div className="left">
                        <input
                          type="checkbox"
                          checked={item.isComplete}
                          onChange={() => handleComplete(item.id)}
                        />

                        <span
                          onDoubleClick={() => startEdit(item)}
                          className={
                            item.isComplete ? "label completed" : "label  "
                          }
                        >
                          {item.title}
                        </span>
                      </div>

                      {filter === 'trash' ? (
                        <div className="trash-actions">
                          <LiaTrashRestoreAltSolid
                            className="restore-icon"
                            onClick={() => restoreTask(item.id)}
                          />
                          <RiDeleteBin6Line
                            onClick={() => deleteForever(item.id)}
                            className="delete-icon"
                            title="Delete Permanently"
                          />
                        </div>
                      ) : (
                        <RiDeleteBin6Line
                          onClick={() => deleteTask(item.id)}
                          className="delete-icon"
                          title="Move to Trash"
                        />
                      )}
                    </>
                  )}
                </li>
              ))}
          </ul>
        </div>


        {/* Footer */}
        <div className='lower-part'>
          <span className='left-part'> {taskLeft} task(s) left</span>
          <button
            onClick={clearAll}
            className='right-part'>
            Clear completed
          </button>
        </div >
      </div >


    </>
  )
}

export default Mainboard