module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {
        
        ItemModel.updateOne({ code: req.body.code }, { $inc: { quantity: req.body.quantity }}, (err, item) => {

            if (!err) {
                res.status(200).send()
            } else {
                res.status(500).json(err)
            }

        });
        
    };

    
};

