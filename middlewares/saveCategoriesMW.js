module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {

        let saveCategoryPromises = []

        for(let i=0;i<res.locals.categories.length; ++i){
            let saveCategoryPromise = new Promise((resolve,reject) => {
                res.locals.categories[i].save((err)=>{
                    if(err){
                        console.log(err)
                        reject()
                    }
                    resolve()
                })
            })
            saveCategoryPromises.push(saveCategoryPromise)
        }

        Promise.all(saveCategoryPromises)
        .then(() => {return next()})
        .catch(() => {})
    
    };   
};

