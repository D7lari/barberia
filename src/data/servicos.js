import { cortes } from './cortes.js'
import { pacotes } from './pacotes.js'

export const servicos = [
    ...cortes.map((corte) => ({
        id: `cortes-${corte.id}`,
        nome: corte.nome,
        preco: corte.preco,
        tipo: 'corte',
    })),
    ...pacotes.map((pacote) => ({
        id: `pacotes-${pacote.id}`,
        nome: pacote.nome,
        preco: pacote.preco,
        tipo: 'pacote',
    }))
]