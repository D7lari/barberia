export function gerarDias(quantidade = 7) {
    const dias = []
    const hoje = new Date()

    for (let i = 0; i < quantidade; i++) {
        const  data = new Date(hoje)
        data.setDate(hoje.getDate() + i)

        const ano = data.getFullYear()
        const mes = String(data.getMonth() + 1).padStart(2, '0')
        const dia = String(data.getDate()).padStart(2, '0')

        dias.push({
            id: `${ano}-${mes}-${dia}`,
            semana: data.toLocaleDateString('pt-BR' , {weekday: 'short'}).replace('.', ''),
            numero: dia,
            mes: data.toDateString('pt-BR',{ month: 'short' }).replace('.', ''),
        })
    }
    
    return dias
}