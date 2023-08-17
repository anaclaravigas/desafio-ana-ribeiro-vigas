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



/**
 * Calcula o valor da compra
 * @param {Pedido} pedido
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


class CaixaDaLanchonete {

    /**
     * Calcula o valor da compra
     * @param {string} metodoDePagamento
     * @param {Array.<string>} itens - Descrição do item.
     */
    calcularValorDaCompra(metodoDePagamento, itens) {
        const pedido = {metodoDePagamento, itens}

        const operacoes = [
            validaEntrada,
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
