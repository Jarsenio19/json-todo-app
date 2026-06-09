import Dashboard from '../common/Dashboard/Dashboard'
import Mainboard from '../common/Mainboard/Mainboard'
import './index.css'

const Landing = () => {


  return (
    <>
      <div className='container'>

        {/* Dashboard */}
        <Dashboard />

        {/* Main */}
        <Mainboard />


      </div>


    </>
  )
}

export default Landing