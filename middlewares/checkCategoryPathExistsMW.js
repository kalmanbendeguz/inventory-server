module.exports = function (objectRepository) {

    const CategoryModel = objectRepository['CategoryModel']

    return function (req, res, next) {

        if(!res.locals.categoryNamesExis){
            res.locals.categoryPathExists = false
            return next()
        }

        let lastCategories = res.locals.categories.filter(cat => cat.name === req.body.category[-1].name)

        for(let i=0; i < lastCategories.length; ++i){
            if(checkPath(lastCategories[i])){
                res.locals.categoryExists = true
                return next()
            }
        }
        res.locals.categoryExists = false
        findLastExistingCategory()
        return next()

    };   

    function checkPath(category){
        for(let i=req.body.category.length - 1; i > 0; --i){
            // find parent
            let parent = res.locals.categories.find(cat => cat._id === category.parent_category)
            // check parent name
            if(parent.name !== req.body.category[i-1]){
                return false
            }
            category = parent
        }
        return true
    }

    function findLastExistingCategory(){
        
    }

};

