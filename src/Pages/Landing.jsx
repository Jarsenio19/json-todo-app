import { useState } from 'react'
import Dashboard from '../common/Dashboard/Dashboard'
import Mainboard from '../common/Mainboard/Mainboard'
import './index.css'
import { TaskContext } from '../context/TaskContext'

const Landing = () => {

  const [filter, setFilter] = useState('all')
  return (
    <>
      <div className='container'>

        <TaskContext.Provider value={{ filter, setFilter }}>
          {/* Dashboard */}
          <Dashboard />
          {/* Main */}
          <Mainboard />
        </TaskContext.Provider>


      </div>


    </>
  )
}

export default Landing