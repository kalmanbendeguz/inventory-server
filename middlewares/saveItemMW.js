const { escapeExpression } = require("handlebars");

module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {

        res.locals.item.save(err => {
            if(!err) {
                res.status(200).send()
            } else {
                res.status(500).json(err)
            }
        })
    
    };   
};

