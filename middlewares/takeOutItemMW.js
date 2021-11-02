module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {

        const checkPositiveQuantityPromise = new Promise((resolve, reject) => {

            ItemModel.findOne({ code: req.body.code }, (err, item) => {
    
                if (item.quantity >= req.body.quantity) {
                    resolve()
                } else {
                    reject()
                }

            });

        })

        function takeOutItemFromDB(){

            ItemModel.updateOne({ code: req.body.code }, { $inc: { quantity: (-1) * req.body.quantity }}, (err, item) => {

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
            res.status(500).send("Attempt to update to negative quantity!")
        })
        
    };

    
};

