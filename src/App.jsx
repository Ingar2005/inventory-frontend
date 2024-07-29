import { useState } from 'react'
import './App.css'
import StockPage from './StockPage'
import NavBar from './NavBar'
import ConfigPage from './ConfigPage'
import LogPage from './LogPage'
import WorkersPanel from './WorkersPanel'
import { Route, Routes } from 'react-router-dom'
import StockHome from './StockHome'
import MainButton from './MainButtons'
import Config from './Config'

// CREATE MODAL COMPONENT FOR ITEMS SUPPLIER AND ROOMS AS SEEN ON THE VIDEO
// MAYBE DELETE ALL THE <br></br> TAGS REPLACE WITH FANCY CSS?
function App() {
  const url = "http://127.0.0.1:5000"

  return (
  <Routes >
    <Route >
      <Route path= "/" element={<WorkersPanel url={url}   />} />
      <Route element={<NavBar url={url} />}>
        <Route path='/admin'>
          <Route index element={<MainButton url={url} />} />
          <Route path='stock'>
            <Route index element={<StockHome url={url} />} />
            <Route path="logs" element={<LogPage url={url} />} />
            <Route path="live" element={<StockPage url={url} />} />
          </Route>
          <Route path='config' element={<ConfigPage url={url} />} />
        </Route>
      </Route>
    
    </Route>
    
  </Routes>

  
  )
}

export default App
