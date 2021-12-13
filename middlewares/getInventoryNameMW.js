module.exports = function (objectRepository) {

    const InventoryModel = objectRepository['InventoryModel']

    return function (req, res, next) {
        function getInventoryName(){
            InventoryModel.findOne({ key: "inventory_name"}, (err, doc) => {

                if (!err && doc) {
                    res.status(200).send(doc.value)
                } else if (!doc) {
                    res.status(200).send("")
                } else {
                    res.status(500).json(err)
                }

            });
        }

        getInventoryName()

    };

    
};

