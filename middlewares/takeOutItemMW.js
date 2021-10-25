module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {

        const checkPositiveQuantityPromise = new Promise((resolve, reject) => {

            ItemModel.findOne({ code: req.query.code }, (err, item) => {
    
                if (item.quantity >= req.query.quantity) {
                    resolve()
                } else {
                    reject()
                }

            });

        })

        function takeOutItemFromDB(){

            ItemModel.updateOne({ code: req.query.code }, { $inc: { quantity: (-1) * req.query.quantity }}, (err, item) => {

                if (!err) {
                    res.status(200).send()
                } else {
                    res.status(500).json(err)
                }

            });
    
        }

        checkPositiveQuantityPromise.
        then(() => {
            takeOutItemFromDB()
        }).
        catch(() => {
            console.log("Attempt to update to negative quantity!")
            res.status(500).send()
        })
        
    };

    
};

