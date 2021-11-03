

module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {
        
        function renameItem(){
            ItemModel.updateOne({ code: req.body.code }, { name: req.body.new_name }, (err, item) => {

                if (!err && item) {
                    res.status(200).send()
                } else {
                    res.status(500).json(err)
                }

            });
        }

        renameItem()

    };

    
};

