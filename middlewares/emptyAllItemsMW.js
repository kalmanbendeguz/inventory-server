module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {
        

        function emptyAllItems(){
            ItemModel.updateMany({}, { quantity: 0 }, (err, items) => {

                if (!err && items) {
                    res.status(200).send("{}")
                } else {
                    res.status(500).json(err)
                }

            });
        }

        emptyAllItems()

    };

    
};

