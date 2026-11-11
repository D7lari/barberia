import { useState } from 'react'
import './Agendamento.css'
import { profissionais } from '../data/profissionais.js'
import { gerarDias } from '../data/dias.js'
import { formasPagamento } from '../data/pagamento.js'

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1)
}

function Agendamento() {
    const [profissionalId, setProfissionalId] = useState(null)
    const [diaId, setDiaId] = useState(null)
    const [horario, setHorario] = useState(null)
    const [formaId, setformaId] = useState(null)
    const [local, setLocal] = useState(null)

    const dias = gerarDias(7)

    const profissionalEscolhido = profissionais.find(
        (pessoa) => pessoa.id === profissionalId
    )
    const horariosDisponiveis = profissionalEscolhido
        ? profissionalEscolhido.horarios
        : []


    const diaEscolhido = dias.find((dia) => dia.id === diaId)

    const formaEscolhida = formasPagamento.find((forma) => forma.id === formaId)
    return (
        <section className="agend" id="agendar">
            <h2 className="agend-titulo">
                Faça seu <span className="agend-titulo-destaque">agendamento</span>
            </h2>
            <p className="agend-subtitulo">
                Escolha o profissional, o dia e o horário que ficam melhores para você.
            </p>

            <h3 className="agend-passo">1. Escolha o profissional</h3>
            <div className="agend-opcoes">
                {profissionais.map((pessoa) => (
                    <button
                        key={pessoa.id}
                        type="button"
                        className={
                            profissionalId === pessoa.id
                                ? 'agend-opcao agend-opcao-ativa'
                                : 'agend-opcao'
                        }
                        onClick={() => {
                            setProfissionalId(pessoa.id)
                            setHorario(null)
                        }}
                    >
                        <span className="agend-opcao-nome">{pessoa.nome}</span>
                        <span className="agend-opcao-detalhe">{pessoa.especialidade}</span>
                    </button>
                ))}
            </div>

            {profissionalId !== null && (
                <>
                    <h3 className="agend-passo">2. Escolha o dia</h3>
                    <div className="agend-dias">
                        {dias.map((dia) => (
                            <button
                                key={dia.id}
                                type="button"
                                className={
                                    diaId === dia.id
                                        ? 'agend-opcao agend-dia agend-opcao-ativa'
                                        : 'agend-opcao agend-dia'
                                }
                                onClick={() => {
                                    setDiaId(dia.id)
                                    setHorario(null)
                                }}
                            >
                                <span className="agend-dia-semana">{dia.semana}</span>
                                <span className="agend-dia-numero">{dia.numero}</span>
                                <span className="agend-dia-mes">{dia.mes}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}


            {diaId !== null && (
                <>

                    <h3 className="agend-passo">3. Escolha seu hórario</h3>
                    <div className="agend-horarios">
                        {horariosDisponiveis.map((hora) => (
                            <button
                                key={hora}
                                type="button"
                                className={
                                    horario === hora
                                        ? 'agend-opcao agend-horario agend-opcao-ativaa'
                                        : 'agend-opcao agend-horario'
                                }
                                onClick={() => setHorario(hora)}
                            >
                                {hora}

                            </button>
                        ))}
                    </div>
                </>
            )}

            {horario !== null && (
                <>
                    <h3 className="agend-passo">4. Forma de pagamento</h3>
                    <div className="agend-pagamentos">
                        {formasPagamento.map((forma) => (
                            <button
                                key={forma.id}
                                type="button"
                                className={
                                    formaId === forma.id
                                        ? 'agend-opcao agend-opcao-ativa'
                                        : 'agend-opcao'
                                }
                                onClick={() => {
                                    setformaId(forma.id)
                                    setLocal(forma.soNaLoja ? 'loja' : null)
                                }}
                            >

                                <span className="agend-opcao-nome">{forma.nome}</span>
                                <span className="agend-opcao-detalhe">{forma.detalhe}</span>

                            </button>
                        ))}
                    </div>

                    {formaId !== null && (
                        <>
                            <h3 className="agend-passo">5. Onde você quer pagar?</h3>
                            <div className="agend-pagamentos">
                                <button
                                    type="button"
                                    disabled={formaEscolhida.soNaLoja}
                                    className={
                                        local === 'site'
                                            ? 'agend-opcao agend-opcao-ativa'
                                            : 'agend-opcao'
                                    }
                                    onClick={() => setLocal('site')}
                                >
                                    <span className="agend-opcao-nome">Pagar pelo site</span>
                                    <span className="agend-opcao-detalhe">
                                        Você será levado à área de pagamento
                                    </span>
                                </button>
                                <button
                                    type="button"
                                    className={
                                        local === 'loja'
                                            ? 'agend-opcao agend-opcao-ativa'
                                            : 'agend-opcao'
                                    }
                                    onClick={() => setLocal('loja')}
                                >
                                    <span className="agend-opcao-nome">Pagar na loja</span>
                                    <span className="agend-opcao-detalhe">
                                        Você paga presencialmente no dia
                                    </span>
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}



            {horario !== null && (
                <div className="agend-resumo">
                    <h3 className="agend-passo">Resumo do agendamento</h3>
                    <ul className="agend-resumo-lista">
                        <li>
                            <span>Profissional</span>
                            <strong> {profissionalEscolhido.nome} </strong>
                        </li>
                        <li>
                            <span>Dia</span>
                            <strong>
                                {capitalizar(diaEscolhido.semana)}, {diaEscolhido.numero} de {capitalizar(diaEscolhido.mes)} {diaEscolhido.ano}
                            </strong>
                        </li>
                        <li>
                            <span>Horário</span>
                            <strong> {horario}</strong>
                        </li>
                    </ul>
                </div>
            )}

        </section>
    )
}

export default Agendamento