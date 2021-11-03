module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']
    const ChangeModel = objectRepository['ChangeModel']


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

                    updateChanges()
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
        
        function updateChanges() {
            ChangeModel.findOne({}, {}, { sort: { createdAt : -1 } }, function(err, change) {

                let newQuantity = 0
                if (change) {
                    newQuantity = change.quantity - req.body.quantity
                    let newChange = new ChangeModel()
                    newChange.quantity = newQuantity
                    newChange.save(err => {
                        if(!err) {
                            res.status(200).send()
                        } else {
                            res.status(500).send(err)
                        }
                    })
                } else {
                    ItemModel.find({}, (err, items) => {
                        if (items) {
                            let sum = 0 
                            for(let i=0; i< items.length; ++i){
                                sum += items[i].quantity
                            }
                            newQuantity = sum
                            let newChange = new ChangeModel()
                            newChange.quantity = newQuantity 
                            newChange.save(err => {
                                if(!err) {
                                    res.status(200).send()
                                } else {
                                    res.status(500).send(err)
                                }
                            })
                        }
                    });
                }

                
                
            });
        }
        
    };

    
};

