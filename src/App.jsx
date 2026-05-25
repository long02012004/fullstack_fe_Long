import { useEffect, useState } from 'react'

import axios from './util/axios.customize'

function App() {
  useEffect(() =>{
    const fecthHelloWorld = async () =>{
      const res = await axios.get(`/v1/api/`)
      console.log(res.data.message)
    }
    fecthHelloWorld()
  }, [])

  return (
    <>
      <h1>hello world</h1>
    </>
  )
}

export default App
