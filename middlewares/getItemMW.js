
module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']
    const CategoryModel = objectRepository['CategoryModel']

    return function (req, res, next) {
        
        function getItemFromDB(){
            const getItemFromDBPromise = new Promise((resolve, reject) => {

                ItemModel.findOne({ code: req.query.code }, (err, item) => {
    
                    if (item) {
                        CategoryModel.find({}, (err, categories) => {
                            if (categories) { 

                                let categoryArray = getCategoryArray(item, categories).reverse()

                                res.locals.item = {
                                    'code': item.code,
                                    'name': item.name,
                                    'category': item.category,
                                    'quantity': item.quantity,
                                    'categoryStringArray': categoryArray,
                                    'lastChanged': item.updatedAt
                                }
                                   
                                resolve()
                            }
                        })
                    } else {
                        reject()
                    }
    
                });
    
            })

            getItemFromDBPromise.
            then(() => {
                res.status(200).json(res.locals.item)
            }).
            catch(() => { 
                res.status(200).json({})
            })
        }

        getItemFromDB()

        function getCategoryArray(item, categories){
            let categoryStringArray = []
            
            let currentCategory
            let currentCategoryIndex = categories.findIndex(x => x._id.equals(item.category))

            while(currentCategoryIndex !== -1){
                currentCategory = categories[currentCategoryIndex]
                categoryStringArray.push(currentCategory.name)    
                currentCategoryIndex = categories.findIndex(x => x._id.equals(currentCategory.parent_category))
            }
            
            return categoryStringArray
        }

    }
};

    

