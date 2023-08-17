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


export { cardapio }