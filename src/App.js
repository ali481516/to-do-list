
import './App.css'

import Todos from './components/Todos'
import EntrancePage from './components/EntrancePage'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
function App() {
  const [state, setState] = useState({
    userName: "",
    userId : 734872,
  })
  return (
    <>
      <BrowserRouter >
        <div className="">
          {/* <Todos /> */}
          {/* <EntrancePage /> */}
          <Routes>
            <Route path='/react/' element={<EntrancePage parentState={setState} />} />
            <Route path='/react/dashboard' element={state.userName !== "" ? (<Todos parentState={state} />) : (
              <Navigate replace to={"/react"} />
            )} />
          </Routes>
        </div>
      </BrowserRouter >
    </>
  )
}

export default App