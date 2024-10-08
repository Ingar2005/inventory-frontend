import { useState } from 'react'
import './App.css'
import StockPage from './admin/stock-control/stock/StockPage.jsx'
import NavBar from './NavBar'
import ConfigPage from './admin/stock-control/stock/ConfigPage.jsx'
import LogPage from './admin/stock-control/logs/LogPage.jsx'
import WorkersPanel from './worker/WorkersPanel'
import { Route, Routes } from 'react-router-dom'
import StockHome from './admin/stock-control/stock/StockHome.jsx'
import MainButton from './admin/MainButtons'

// CREATE MODAL COMPONENT FOR ITEMS SUPPLIER AND ROOMS AS SEEN ON THE VIDEO
// MAYBE DELETE ALL THE <br></br> TAGS REPLACE WITH FANCY CSS?
function App({}) {
  const url = "https://backend-stg-bdeef42935fd.herokuapp.com/"

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
            <Route path="live">
              <Route path='config' element={<ConfigPage url={url} />} />
              <Route index element={<StockPage url={url} />} />
            </Route>
          </Route>
        </Route>
      </Route>

    </Route>

  </Routes>


  )
}

export default App
