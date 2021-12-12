module.exports = function (objectRepository) {

    const CategoryModel = objectRepository['CategoryModel']

    return function (req, res, next) {

        CategoryModel.find({}, (err,categories) => {

            res.locals.categories = []
            let parentCategory = null
            for(let i = 0; i < req.body.category.length; ++i){
                let currentCategory
                if(parentCategory !== null){
                    currentCategory = categories.find(cat => (cat.name === req.body.category[i] && cat.parent_cateogory && cat.parent_category.equals(parentCategory._id)))
                } else {
                    currentCategory = categories.find(cat => (cat.name === req.body.category[i] && cat.parent_category === null))
                }
                
                if(typeof currentCategory === "undefined"){
                    currentCategory = new CategoryModel()
                    currentCategory.parent_category = parentCategory
                    currentCategory.name = req.body.category[i]
                    if(parentCategory !== null){
                        parentCategory.subcategories.push(currentCategory)
                    }
                    
                    currentCategory.subcategories = []
                }
                parentCategory = currentCategory
                res.locals.categories.push(currentCategory)
            }
            return next()
        })
    
    };   
};

