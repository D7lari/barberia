import './Cortes.css'
import { cortes } from '../data/cortes'

function Cortes() {
  return (
    <section className="cortes" id="cortes">
      <h2 className="cortes-titulo">
        Nossos <span className="cortes-titulo-destaque">cortes</span>
      </h2>
      <p className="cortes-subtitulo">
        Conheça os modelos e escolha o seu na hora de agendar.
      </p>

      <div className="cortes-grade">
        {cortes.map((corte) => (
          <article className="corte-card" key={corte.id}>
            {corte.imagem ? (
              <img className="corte-imagem" src={corte.imagem} alt={corte.nome} />
            ) : (
              <div className="corte-imagem corte-imagem-vazia">{corte.nome}</div>
            )}
            <div className="corte-info">
              <h3 className="corte-nome">{corte.nome}</h3>
              <p className="corte-descricao">{corte.descricao}</p>
              <p className="corte-preco">
                {corte.preco.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Cortes