/**
 * Objeto que representa um pedido
 * @typedef {Object} Pedido
 * @property {string} metodoDePagamento - Método de pagamento para o pedido.
 * @property {Array.<string>} itens - Lista de itens no pedido.
 */



const formasDePagamento = {
    'dinheiro': .95,
    'credito': 1.03,
    'debito': 1,
}

const cardapio = {
    cafe: {
        descricao: 'Café',
        valor: 3.00
    },
    chantily: {
        descricao: 'Chantily (extra do Café)',
        valor: 1.50,
        principal: 'cafe',
    },
    suco: {
        descricao: 'Suco Natural',
        valor: 6.20
    },
    sanduiche: {
        descricao: 'Sanduíche',
        valor: 6.50
    },
    queijo: {
        descricao: 'Queijo (extra do sanduíche)',
        valor: 2.00,
        principal: 'sanduiche',
    },
    salgado: {
        descricao: 'Salgado',
        valor: 7.25
    },
    combo1: {
        descricao: '1 Suco e 1 Sanduíche',
        valor: 9.50
    },
    combo2: {
        descricao: '1 café e 1 sanduíche',
        valor: 7.50
    },
}


/**
 * Valida a entrada
 * @param {Pedido} pedido
 * @returns {Pedido|string} 
 */
function validaEntrada(pedido) {
    if (pedido.itens.length === 0) {
        return 'Não há itens no carrinho de compra!'
    }
    if (!formasDePagamento[pedido.metodoDePagamento]) {
        return 'Forma de pagamento inválida!'
    }
    return pedido
}

/**
 * Converte a lista de pedidos para objetos
 * @param {Pedido} pedido
 * @returns {Pedido|string} 
 */
function converterItems(pedido) {
    const itemsEncontrados = []
    for (const item of pedido.itens) {
        const [codigo, qtd] = item.split(',')
        const qtdValue = parseInt(qtd)
        if (!cardapio.hasOwnProperty(codigo)) {
            return 'Item inválido!'
        }
        if (qtdValue === 0) {
            return 'Quantidade inválida!'
        }
        const { valor, descricao, principal } = cardapio[codigo]
        itemsEncontrados.push({
            qtd: qtdValue,
            codigo,
            valor,
            descricao,
            principal,
        })

    }
    pedido.itens = itemsEncontrados
    return pedido
}


/**
 * Verifica se todos os itens adicionais do pedido possuem seus respectivos itens principais.
 * @param {Pedido} pedido
 * @returns {Pedido|string} 
 */
function verificaItemsPrincipais(pedido) {
    for (const item of pedido.itens) {
        const { principal } = item
        if (!principal) continue
        const itemPrincipal = pedido.itens.find(({ codigo }) => codigo === principal)
        if (!itemPrincipal) {
            return 'Item extra não pode ser pedido sem o principal'
        }
    }
    return pedido
}

/**
 * Calcula o valor total do pedido, considerando os itens e a forma de pagamento.
 * @param {Pedido} pedido
 * @returns {string} 
 */
function calculaValorTotal(pedido) {
    let valorBruto = 0
    for (const {qtd, valor} of pedido.itens) {
        valorBruto += qtd * valor
    }
    console.log(valorBruto)
    const valorAjuste = formasDePagamento[pedido.metodoDePagamento]
    const valorLiquido = valorBruto * valorAjuste
    return `R$ ${valorLiquido.toFixed(2).replace('.', ',')}`;
}


class CaixaDaLanchonete {

    /**
     * Calcula o valor da compra
     * @param {string} metodoDePagamento
     * @param {Array.<string>} itens - Descrição do item.
     */
    calcularValorDaCompra(metodoDePagamento, itens) {
        const pedido = { metodoDePagamento, itens }

        const operacoes = [
            validaEntrada,
            converterItems,
            verificaItemsPrincipais,
            calculaValorTotal,
        ]

        for (const op of operacoes) {
            const result = op(pedido)
            if (typeof result === "string") {
                return result
            }
        }
    }

}

export { CaixaDaLanchonete };
