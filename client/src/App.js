import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import CreateTask from './components/CreateTask'
import PlayWithTask from './components/PlayWithTask'
import Navbar from './components/Navbar'

const App = () => {
  return (
<>

<Router>
<Navbar/>
      <Routes>
        <Route path='/' element={<CreateTask/>}/>
        <Route path='/play' element={<PlayWithTask/>}/>
      </Routes>
    </Router>
</>
   
  )
}

export default App
