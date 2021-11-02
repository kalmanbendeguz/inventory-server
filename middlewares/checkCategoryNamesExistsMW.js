module.exports = function (objectRepository) {

    const CategoryModel = objectRepository['CategoryModel']

    return function (req, res, next) {

        let findCategoryPromises = []
        res.locals.categories = []

        for(let i = 0; i < req.body.category.length; ++i){
            const findCategoryPromise = new Promise((resolve, reject) => {
                CategoryModel.findOne({ name: req.body.category[i]}, (err, category) => {
                    if (category) {
                        res.locals.categories.push(category)
                        resolve()
                    } else {
                        reject()
                    }
                });
            })
            findCategoryPromises.push(findCategoryPromise)
        }

        Promise.all(findCategoryPromises)
        .then(() => {
            res.locals.categoryNamesExist = true
        })
        .catch(() => {
            res.locals.categoryNamesExist = false
        })
        .finally(() => {
            return next()
        })
    
    };   
};

