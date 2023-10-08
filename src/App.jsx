import { useState } from 'react'
import './App.css'
import Layout from './components/Layout'
import Cardslider from './Cardslider'

const styles = {
  /* background:'linear-gradient(180deg, rgba(18,41,50,1) 23%, rgba(14,14,14,1) 100%) fixed',
  backgroundSize:'cover', */
  backgroundImage: 'linear-gradient(180deg, rgba(18,41,50,1) 23%, rgba(14,14,14,1) 100%)',
  padding:'0 25px',
  height:'100vh',
  
}

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
      <Layout></Layout>
      {/* <Cardslider></Cardslider> */}
      </>
  )
}

export default App
