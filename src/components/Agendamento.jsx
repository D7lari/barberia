import { useState } from 'react'
import './Agendamento.css'
import { profissionais } from '../data/profissionais.js'
import { gerarDias } from '../data/dias.js'
import { formasPagamento } from '../data/pagamento.js'
import { servicos } from '../data/servicos.js'

function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1)
}
function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })
}

function Agendamento() {
    const [profissionalId, setProfissionalId] = useState(null)
    const [diaId, setDiaId] = useState(null)
    const [horario, setHorario] = useState(null)
    const [formaId, setformaId] = useState(null)
    const [local, setLocal] = useState(null)
    const [confirmado, setConfirmado] = useState(false)
    const [servicosSelecionados, setServicosSelecionados] = useState([])
    const [pago, setPago] = useState(false)

    const dias = gerarDias(7)

    const profissionalEscolhido = profissionais.find(
        (pessoa) => pessoa.id === profissionalId
    )
    function alterarServico(id) {
        setServicosSelecionados((atual) =>
            atual.includes(id)
                ? atual.filter((item) => item !== id)
                : [...atual, id]
        )

    }
    function novoAgendamento() {
        setProfissionalId(null)
        setDiaId(null)
        setHorario(null)
        setformaId(null)
        setServicosSelecionados([])
        setLocal(null)
        setConfirmado(false)
        setPago(false)
    }
    const horariosDisponiveis = profissionalEscolhido
        ? profissionalEscolhido.horarios
        : []


    const diaEscolhido = dias.find((dia) => dia.id === diaId)

    const formaEscolhida = formasPagamento.find((forma) => forma.id === formaId)

    const servicosEscolhidos = servicos.filter((servico) =>
        servicosSelecionados.includes(servico.id)
    )
    const total = servicosEscolhidos.reduce((soma, servico) => soma + servico.preco, 0)
    if (confirmado) {
        return (
            <section className="agend" id="agendar">
                <div className="agend-sucesso">
                    {local === 'loja' && (
                        <>
                            <h2 className="agend-titulo">
                                Agendamento <span className="agend-titulo-destaque">realizado</span>
                            </h2>
                            <p className="agend-sucesso-texto">
                                Agendamento realizado com sucesso! O pagamento será realizado em loja.
                            </p>
                        </>
                    )}

                    {local === 'site' && !pago && (
                        <>
                            <h2 className="agend-titulo">
                                Área de <span className="agend-titulo-destaque">pagamento</span>
                            </h2>
                            <p className="agend-sucesso-texto">
                                Total a pagar: <strong>{formatarPreco(total)}</strong> ({formaEscolhida.nome})
                            </p>

                            {formaEscolhida.id === 'pix' ? (
                                <>
                                    <div className="agend-pix-qr">QR Code (simulação)</div>
                                    <p className="agend-sucesso-texto">
                                        Aqui apareceria o QR Code do Pix gerado pelo serviço de pagamento.
                                    </p>
                                </>
                            ) : (
                                <p className="agend-sucesso-texto">
                                    Aqui você seria levado ao ambiente seguro do serviço de pagamento para informar os dados do cartão.
                                </p>
                            )}

                            <button type="button" className="agend-confirmar" onClick={() => setPago(true)}>
                                Simular pagamento aprovado
                            </button>
                        </>
                    )}

                    {local === 'site' && pago && (
                        <>
                            <h2 className="agend-titulo">
                                Pagamento <span className="agend-titulo-destaque">confirmado</span>
                            </h2>
                            <p className="agend-sucesso-texto">
                                Agendamento realizado com sucesso! Seu pagamento de {formatarPreco(total)} foi confirmado.
                            </p>
                        </>
                    )}
                    <button type="button" className="agend-confirmar" onClick={novoAgendamento}>
                        Fazer novo agendamento
                    </button>
                </div>

            </section>
        )
    }
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

                    <h3 className="agend-passo">3. Escolha seu horário</h3>
                    <div className="agend-horarios">
                        {horariosDisponiveis.map((hora) => (
                            <button
                                key={hora}
                                type="button"
                                className={
                                    horario === hora
                                        ? 'agend-opcao agend-horario agend-opcao-ativa'
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
                    <h3 className="agend-passo">4. Escolha os serviços</h3>
                    <div className="agend-servicos">
                        {servicos.map((servico) => (
                            <button
                                key={servico.id}
                                type="button"
                                className={
                                    servicosSelecionados.includes(servico.id)
                                        ? 'agend-opcao agend-opcao-ativa'
                                        : 'agend-opcao'
                                }
                                onClick={() => alterarServico(servico.id)}
                            >
                                <span className="agend-opcao-detalhe">{servico.tipo}</span>
                                <span className="agend-opcao-nome">{servico.nome}</span>
                                <span className="agend-opcao-detalhe">{formatarPreco(servico.preco)}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}

            {horario !== null && servicosEscolhidos.length > 0 && (
                <>
                    <h3 className="agend-passo">5. Forma de pagamento</h3>
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
                            <h3 className="agend-passo">6. Onde você quer pagar?</h3>
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



            {horario !== null && servicosEscolhidos.length > 0 && (
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
                        <li>
                            <span>Serviços</span>
                            <strong>
                                {servicosEscolhidos.length > 0
                                    ? servicosEscolhidos.map((servico) => servico.nome).join(', ')
                                    : 'Nenhum serviço selecionado'}
                            </strong>

                        </li>
                        <li>
                            <span>Total</span>
                            <strong>{formatarPreco(total)}</strong>
                        </li>
                    </ul>
                </div>
            )}
            {horario !== null && servicosEscolhidos.length > 0 && local !== null && (
                <button
                    type="button"
                    className="agend-confirmar"
                    onClick={() => setConfirmado(true)}
                >
                    Confirmar agendamento
                </button>
            )}

        </section>
    )
}

export default Agendamento


