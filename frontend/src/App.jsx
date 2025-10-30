
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
      <div className="flex flex-col min-h-screen"> 
      <AuthProvider>
        <Navbar />
        <main className="flex-grow max-w-screen-2xl mx-auto w-full px-4 font-primary pt-16">
         <Outlet /> 
        </main>
        <Footer/>
      </AuthProvider>
      </div>
  )
}

export default App