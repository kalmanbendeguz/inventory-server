
module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {
        
        res.locals.items = []
        let findItemsOfCategoryPromises = []

        for (let i=0;i<res.locals.categories.length ; ++i) {
            const findItemsOfCategoryPromise = new Promise((resolve, reject) => {
                ItemModel.find({category: res.locals.categories[i]._id}, (err, items) => {
                    if(err){
                        console.log(err)
                    }
                    if (items) { 
                        res.locals.items.push(...items)
                        resolve()
                    }
                });
            })
            findItemsOfCategoryPromises.push(findItemsOfCategoryPromise)

        }
        
        Promise.all(findItemsOfCategoryPromises)
        .then(() => {
            res.locals.items = res.locals.items.filter(item => item.quantity !== 0).map(item => {
                return {
                    'name': item.name,
                    'code': item.code,
                    'quantity': item.quantity
                }
        })
            res.status(200).json(res.locals.items)
        }).
        catch(() => { 
            res.status(500).json({})
        })

        
    }

};

