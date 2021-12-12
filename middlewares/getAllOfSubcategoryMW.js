
module.exports = function (objectRepository) {

    const CategoryModel = objectRepository['CategoryModel']

    return function (req, res, next) {
        
        const getSubCategoriesPromise = new Promise((resolve, reject) => {

            CategoryModel.findOne({ _id: req.query.category_id }, (err, category) => {

                if (category) {
                    resolve()
                } else {
                    reject()
                }

            });

        })

        getSubCategoriesPromise.
        then(() => {
            //res.status(200).json(res.locals.category)
        }).
        catch(() => { 
            //res.status(200).json({})
        })

        
    }

};

