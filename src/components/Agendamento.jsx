import { useState } from 'react'
import './Agendamento.css'
import { profissionais } from '../data/profissionais.js'
import { gerarDias } from '../data/dias.js'

function Agendamento() {
    const [profissionalId, setProfissionalId] = useState(null)
    const [diaId, setDiaId] = useState(null)

    const dias = gerarDias(7)

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
                        onClick={() => setProfissionalId(pessoa.id)}
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
                                onClick={() => setDiaId(dia.id)}
                            >
                                <span className="agend-dia-semana">{dia.semana}</span>
                                <span className="agend-dia-numero">{dia.numero}</span>
                                <span className="agend-dia-mes">{dia.mes}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}

export default Agendamento