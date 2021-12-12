module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {
        
        req.body = JSON.parse(Object.keys(req.body)[0])

        function setQuantity(){
            ItemModel.updateOne({ code: req.body.code }, { quantity: req.body.new_quantity }, (err, item) => {
                if( req.body.new_quantity < 0){
                    console.log("Attempt to update to negative quantity")
                    res.status(200).send("Attempt to update to negative quantity")
                    return
                }
                if (!err && item) {
                    res.status(200).send()
                } else {
                    res.status(500).json(err)
                }

            });
        }

        setQuantity()

    };

    
};

