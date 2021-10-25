

module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {
        
        function getAllItemsFromDB(){
            const getAllItemsFromDBPromise = new Promise((resolve, reject) => {
                
                ItemModel.find({}, (err, items) => {
                    if (items) { 

                        res.locals.items = items.map(item => {
                            return {
                                'name': item.name,
                                'quantity': item.quantity
                            }
                        })
                        resolve()
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

    };

    
};

