

module.exports = function (objectRepository) {

    const CategoryModel = objectRepository['CategoryModel']

    return function (req, res, next) {
        
        if(typeof req.query.parent_category !== "undefined") {
            CategoryModel.findOne({ _id: req.query.parent_category }, (err, parentCategory) => {

                if(err || !parentCategory) {
                    res.status(500).send(err)
                }
                if (parentCategory) {
                    // subcategories array definiálása
                    res.locals.subCategories = []

                    // promise array definiálása
                    let getSubCategoriesPromises = []

                    // ciklusban feltöltés
                    for(let i=0; i < parentCategory.subcategories.length; ++i){

                        let getSubCategoriesPromise = new Promise((resolve,reject) => {

                            CategoryModel.findOne({ _id: parentCategory.subcategories[i] }, (err, subCategory) => {
                                if( err || !subCategory) {
                                    reject(err)
                                } else {
                                    res.locals.subCategories.push(subCategory)
                                    resolve()
                                }
                            })
                        })

                        getSubCategoriesPromises.push(getSubCategoriesPromise)
                    }

                    // then send
                    // catch send err
                    Promise.all(getSubCategoriesPromises)
                    .then(() => {
                        res.status(200).json(res.locals.subCategories)
                    })
                    .catch((err) => {
                        res.status(500).send(err)
                    })
                }
    
            });
        } else {
            CategoryModel.find({parent_category: null }, (err, categories) => {
                if(err) {
                    res.status(500).send(err)
                }
                if (categories) {
                    res.status(200).json(categories)
                } 

            });
        }
        

    }

};

