

module.exports = function (objectRepository) {

    const CategoryModel = objectRepository['CategoryModel']
    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {

            const getCategoryPromise = new Promise((resolve, reject) => {
                CategoryModel.findOne({ _id: req.body.category_id }, (err, category) => {
    
                    if (category) {
                        console.log(JSON.stringify(category))
                        resolve()
                    } else {
                        reject()
                    }
    
                });
            })

            getCategoryPromise.
            then(() => {
                //res.status(200).json(res.locals.items)
            }).
            catch(() => { 
                //res.status(500).json({})
            })

    };

    
};

