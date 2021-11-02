module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {

        newItem = new ItemModel()
    
        newItem.code = req.body.code
        newItem.name = req.body.name
        newItem.quantity = req.body.quantity

        res.locals.item = newItem
        
        return next()
    
    };   
};

