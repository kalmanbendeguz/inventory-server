

module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {
        
        function getItemFromDB(){
            const getItemFromDBPromise = new Promise((resolve, reject) => {

                ItemModel.findOne({ code: req.query.code }, (err, item) => {
    
                    if (item) {
                        res.locals.item = item
                        resolve()
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

    };

    
};

