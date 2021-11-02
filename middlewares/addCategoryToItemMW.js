module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {
        
        if(res.locals.categories.length !== 0){
            res.locals.item.category = res.locals.categories[res.locals.categories.length - 1]._id
        } else {
            res.locals.item.category = null
        }
        
        
        return next()
    
    };   
};

