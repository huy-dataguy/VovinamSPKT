
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
      <div className="flex flex-col min-h-screen"> 
        <Navbar />
        <main className="flex-grow max-w-screen-2xl mx-auto w-full px-4 font-primary pt-16">
         <Outlet /> 
        </main>
      </div>
  )
}

export default App