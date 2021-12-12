module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']
    const CategoryModel = objectRepository['CategoryModel']
    const ChangeModel = objectRepository['ChangeModel']

    return function (req, res, next) {
        
        function resetInventory(){
            ItemModel.deleteMany({}, (err, result) => {
                if(err){
                    res.status(500).send("{}")
                } else {
                    CategoryModel.deleteMany({}, (err1, result1) => {
                        if(err1) {
                            res.status(500).send("{}")
                        } else {
                            ChangeModel.deleteMany({}, (err2, result2) => {
                                if(err2){
                                    res.status(500).send("{}")
                                } else {
                                    res.status(200).send("{}")
                                }
                            })
                        }
                    })
                }
            })
        }

        resetInventory()

    };

};

