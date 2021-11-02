
module.exports = function (objectRepository) {

    const CategoryModel = objectRepository['CategoryModel']

    return function (req, res, next) {
        res.locals.categories = []
        CategoryModel.find({}, (err, categories) => {
            res.locals.allCategories = categories
            res.locals.categories.push(categories.find(cat => cat._id.equals(req.query.category_id)))
            let topCategory = categories.find(cat => cat._id.equals(req.query.category_id))
            
            findAllSubcategories(topCategory)
            const util = require('util')
            console.log(util.inspect(res.locals.categories, false, null, true /* enable colors */))
            return next()
        });

        function findAllSubcategories(category){
            if(category.subcategories.length === 0){
                return
            }
            let subCategories = res.locals.allCategories.filter(cat => typeof category.subcategories.find(x => x._id.equals(cat._id)) !== "undefined")
            res.locals.categories.push(...subCategories)
            for(let i=0; i<subCategories.length; ++i){
                findAllSubcategories(subCategories[i])
            }
        }
    }   
}


