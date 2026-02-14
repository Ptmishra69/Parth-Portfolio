
import '@/App.css'
import Hero from './components/Hero'
import About from './components/About'
import Navbar from "./components/Navbar";
import GlobalCursorGlow from "@/components/globalcursorglow";
import ProblemSolving from "@/components/ProblemSolving"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
function App() {

  return (
    <>
     <GlobalCursorGlow />
    <Navbar/>
    <Hero/>
    <About/>
    <ProblemSolving/>
    <Projects/>
    <Contact/>
    
    </>  

      

  )
}

export default App
