const percentageBase = {

    run: function(preco, porcentagem) {
        return preco * (porcentagem/100);
    }

};

module.exports = percentageBase;