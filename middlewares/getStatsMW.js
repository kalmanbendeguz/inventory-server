

module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']
    const ChangeModel = objectRepository['ChangeModel']

    return function (req, res, next) {
        
        function getStats(){

            let getStatsPromises = []

            const getAllItemCountPromise = new Promise((resolve, reject) => {

                ItemModel.find({}, (err, items) => {
                    if (items) {
                        let sum = 0 
                        for(let i=0; i< items.length; ++i){
                            sum += items[i].quantity
                        }
                        res.locals.allItemCount = sum
                        resolve()
                    }
                    else {
                        reject(err)
                    }
                });
    
            })

            const getItemDiversityPromise = new Promise((resolve, reject) => {

                ItemModel.find({}, (err, items) => {
                    if (items) {
                        res.locals.itemDiversity = items.length
                        resolve()
                    }
                    else {
                        reject(err)
                    }
                });
    
            })

            const getChangesPromise = new Promise((resolve, reject) => {

                ChangeModel.find({}, (err, changes) => {
                    if (changes) {
                        // kell-e rendezni, vagy úgy kapjuk?
                        res.locals.changes = changes
                        resolve()
                    }
                    else {
                        reject(err)
                    }
                });
    
            })
            

            getStatsPromises.push(getAllItemCountPromise)
            getStatsPromises.push(getItemDiversityPromise)
            getStatsPromises.push(getChangesPromise)


            Promise.all(getStatsPromises)
            .then(
            () => {
                res.status(200)
                .json({
                        "allItemCount": res.locals.allItemCount,
                        "itemDiversity": res.locals.itemDiversity,
                        "changes": res.locals.changes
                    })
                }
            )
            .catch((err) => { 
                res.status(500).send(err)
            })
        }

        getStats()
    };

    
};

