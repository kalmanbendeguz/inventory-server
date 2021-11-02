module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {

        if(res.locals.categories.length !== 0){
            res.locals.categories[res.locals.categories.length - 1].items.push(res.locals.item._id)
        }
        
        
        return next()
    
    };   
};

