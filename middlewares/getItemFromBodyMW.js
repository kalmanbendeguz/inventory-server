

module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {
        
        function getItemFromDB(){
            const getItemFromDBPromise = new Promise((resolve, reject) => {

                ItemModel.findOne({ code: req.body.code }, (err, item) => {
    
                    if (item) {
                        res.locals.item = item
                        resolve()
                    } else {
                        reject(err)
                    }
    
                });
    
            })

            getItemFromDBPromise.
            then(() => {
                return next()
            }).
            catch((err) => { 
                console.log(err)
            })
        }

        getItemFromDB()

    };

    
};

