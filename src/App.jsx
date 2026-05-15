

import Hero from './components/Hero'
import About from './components/About'
import Navbar from "./components/Navbar";
import GlobalCursorGlow from "@/components/GlobalCursorGlow";
import ProblemSolving from "@/components/ProblemSolving"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"
import AskMe from "./components/AskMe";
import TechMarquee from "./components/TechMarquee";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <TechMarquee />
      <ProblemSolving />
      <Projects />
      <Contact />
      <AskMe />
    </>
  );
}

export default App;

