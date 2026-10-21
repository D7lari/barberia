import './Hero.css'

function Hero() {
  return (
    <section className="hero" id="inicio">
      <p className="hero-etiqueta">Barbearia &amp; Estilo</p>
      <h1 className="hero-titulo">
        Corte certo, <span className="hero-titulo-destaque">sem espera</span>
      </h1>
      <p className="hero-texto">
        Escolha o dia, o horário e o profissional. Pague pelo site ou na loja.
      </p>
      <div className="hero-acoes">
        <a href="#agendar" className="hero-botao">Agendar horário</a>
        <a href="#cortes" className="hero-botao-secundario">Ver cortes</a>
      </div>
    </section>
  )
}

export default Hero