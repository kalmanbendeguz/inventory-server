

module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {


        let categoryArray = JSON.parse("["+Object.keys(Object.values(req.body)[0])[0]+"]")

        if(Object.keys(Object.values(req.body)[0])[0] == 0){
            categoryArray = []
        }

        req.body = JSON.parse(Object.keys(req.body)[0].substr(0,Object.keys(req.body)[0].indexOf(",\"category\"")) + "}")
        req.body.category = categoryArray
        
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

