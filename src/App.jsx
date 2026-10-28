import Header from './components/Header'
import Hero from './components/Hero'
import Cortes from './components/Cortes'
import Profissionais from './components/Profissionais'
import Pacotes from './components/Pacotes'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Cortes />
        <Profissionais />
        <Pacotes />
      </main>
    </>
  )
}

export default App