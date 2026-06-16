import { Route, Routes } from 'react-router'
import './App.css'
import Landing from './Pages/Landing'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
      </Routes>
    </>
  )
}

export default App