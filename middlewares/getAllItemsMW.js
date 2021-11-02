

module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {
        
        function getAllItemsFromDB(){
            const getAllItemsFromDBPromise = new Promise((resolve, reject) => {
                
                ItemModel.find({}, (err, items) => {
                    if (items) { 

                        if(typeof req.query.zero_count !== "undefined" && req.query.zero_count === "n"){
                            res.locals.items = items.filter(item => item.quantity !== 0).map(item => {
                                return {
                                    'name': item.name,
                                    'category': item.category,
                                    'quantity': item.quantity
                                }
                        })} else {
                            res.locals.items = items.map(item => {
                                return {
                                    'name': item.name,
                                    'category': item.category,
                                    'quantity': item.quantity
                                }
                            })
                        }
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

