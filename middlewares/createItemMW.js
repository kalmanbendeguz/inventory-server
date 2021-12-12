module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {

        let categoryArray = JSON.parse("["+Object.keys(Object.values(req.body)[0])[0]+"]")
        if(Object.keys(Object.values(req.body)[0])[0] == 0){
            categoryArray = []
        }

        req.body = JSON.parse(Object.keys(req.body)[0].substr(0,Object.keys(req.body)[0].indexOf(",\"category\"")) + "}")
        req.body.category = categoryArray

        newItem = new ItemModel()
    
        newItem.code = req.body.code
        newItem.name = req.body.name
        newItem.quantity = req.body.quantity

        res.locals.item = newItem
        
        return next()
    
    };   
};

