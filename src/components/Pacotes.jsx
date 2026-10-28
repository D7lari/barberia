import './Pacotes.css'
import { pacotes } from '../data/pacotes'

function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

function Pacotes() {
  return (
    <section className="pac" id="pacotes">
      <h2 className="pac-titulo">
        Pacotes e <span className="pac-titulo-destaque">ofertas</span>
      </h2>
      <p className="pac-subtitulo">
        Combine serviços e pague menos. Escolha o seu na hora de agendar.
      </p>

        <div className="pac-grade">
            {pacotes.map((pacote) => (
                <article
                    className={`pac-card ${pacote.destaque ? 'pac-card-destaque' : ''}`}
                    key={pacote.id}
                    >
                 {pacote.destaque && <span className="pac-selo">Mais pedido</span>}

                    <h3 className="pac-nome">{pacote.nome}</h3>
                    <p className="pac-descricao">{pacote.descricao}</p>

                    <ul className="pac-itens">
                        {pacote.itens.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>

                    <p className="pac-preco-antigo">
                        De {formatarPreco(pacote.precoOriginal)}
                    </p>
                    <p className="pac-preco">{formatarPreco(pacote.preco)}</p>

                    <a href="#agendar" className="pac-botao">Escolher pacote</a>
                </article>
            ))}
        </div>
    </section>
  )
}

export default Pacotes