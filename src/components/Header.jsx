import './Header.css'

function Header() {
  return (
    <header className="header">
      <a href="#inicio" className="header-logo">
        Sua <span className="header-logo-destaque">Barbearia</span>
      </a>
      <nav className="header-menu">
        <a href="#cortes">Cortes</a>
        <a href="#profissionais">Profissionais</a>
        <a href="#pacotes">Pacotes</a>
        <a href="#agendar" className="header-botao">Agendar</a>
      </nav>
    </header>
  )
}

export default Header