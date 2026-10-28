import './Profissionais.css'
import { profissionais } from '../data/profissionais.js'

function pegarIniciais(nome) {
    return nome
    .split(' ')
    .map((parte) => parte[0])
    .slice(0,2)
    .join('')

}

function Profissionais() {
    return (
        <section className="prof" id="profissionais">
            <h2 className="prof-titulo">
                Nossos <span className="prof-titulo-destaque">Profissionais</span>
            </h2>
            <p className="prof-subtitulo">
                Escolha  quem vai cuidar do seu visual na hora de agendar.
            </p>

            <div className="prof-grade">
                {profissionais.map((pessoa) => (
                    <article className="prof-card" key={pessoa.id}>
                        {pessoa.foto ? (
                            <img className="prof-foto" src={pessoa.foto} alt={pessoa.nome} />
                        ) : (
                            <div className="prof-foto prof-foto-vazia">
                                {pegarIniciais(pessoa.nome)}
                            </div>
                        )}
                        <h3 className="prof-nome">{pessoa.nome}</h3>
                        <p className="prof-especialidade">{pessoa.especialidade}</p>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Profissionais