module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']
    const ChangeModel = objectRepository['ChangeModel']


    return function (req, res, next) {
        
        req.body = JSON.parse(Object.keys(req.body)[0])

        ItemModel.updateOne({ code: req.body.code }, { $inc: { quantity: req.body.quantity }}, (err, item) => {

            if (!err) {
                updateChanges()
            } else {
                res.status(500).json(err)
            }

        });

        function updateChanges() {
            ChangeModel.findOne({}, {}, { sort: { createdAt : -1 } }, function(err, change) {

                let newQuantity = 0
                if (change) {
                    newQuantity = change.quantity + req.body.quantity
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

