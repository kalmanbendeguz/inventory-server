

module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']
    const CategoryModel = objectRepository['CategoryModel']

    return function (req, res, next) {
        
        function getAllItemsFromDB(){
            const getAllItemsFromDBPromise = new Promise((resolve, reject) => {
                ItemModel.find({}, (err, items) => {
                    
                    if (items) { 
                        CategoryModel.find({}, (err, categories) => {
                            if (categories) { 

                                if(typeof req.query.zero_count !== "undefined" && req.query.zero_count === "n"){
                                    res.locals.items = items.filter(item => item.quantity !== 0)

                                    for(let i=0; i<res.locals.items.length; ++i){
                                        let categoryArray = getCategoryArray(res.locals.items[i], categories).reverse()
                                        res.locals.items[i] = {
                                            'code': res.locals.items[i].code,
                                            'name': res.locals.items[i].name,
                                            'category': res.locals.items[i].category,
                                            'quantity': res.locals.items[i].quantity,
                                            'categoryStringArray': categoryArray
                                        }
                                    }
                                   
                                    resolve()
        
                                } else {
                                    res.locals.items = items

                                    for(let i=0; i<res.locals.items.length; ++i){
                                        let categoryArray = getCategoryArray(res.locals.items[i], categories).reverse()

                                        res.locals.items[i] = {
                                            'code': res.locals.items[i].code,
                                            'name': res.locals.items[i].name,
                                            'category': res.locals.items[i].category,
                                            'quantity': res.locals.items[i].quantity,
                                            'categoryStringArray': categoryArray
                                        }
                                    }
                                    
                                    resolve()
                                }
                            }
                        });
                        
                        
                    }
                    else {
                        reject()
                    }
                });
    
            })

            getAllItemsFromDBPromise.
            then(() => {
                res.status(200).json(res.locals.items)
            }).
            catch(() => { 
                res.status(500).json({})
            })
        }

        getAllItemsFromDB()

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
    };

    
};

