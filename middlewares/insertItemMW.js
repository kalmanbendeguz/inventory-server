module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {
        
        insertItemToDB()

        function insertItemToDB(){

            if (typeof req.query.name === "undefined") {
                insertExistingItem()
            } else {
                insertNewItem()
            }
    
        }

        function insertExistingItem(){
            ItemModel.updateOne({ code: req.query.code }, { $inc: { quantity: req.query.quantity }}, (err, item) => {

                if (!err) {
                    res.status(200).send()
                } else {
                    res.status(500).json(err)
                }

            });
        }

        function insertNewItem(){
            newItem = new ItemModel()
            newItem.code = req.query.code
            newItem.name = req.query.name
            newItem.quantity = req.query.quantity

            newItem.save(err => {
                if(!err) {
                    res.status(200).send()
                } else {
                    res.status(500).json(err)
                }
            })

            ItemModel.updateOne({ code: req.query.code }, { $inc: { quantity: req.query.quantity }}, (err, item) => {
    
                if (!err) {
                    res.status(200).send()
                } else {
                    res.status(500).json(err)
                }

            });
        }
        
    };

    
};

