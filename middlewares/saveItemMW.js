const { escapeExpression } = require("handlebars");

module.exports = function (objectRepository) {

    const ChangeModel = objectRepository['ChangeModel']
    const ItemModel = objectRepository['ItemModel']

    return function (req, res, next) {

        res.locals.item.save(err => {
            if(!err) {
                updateChanges()
            } else {
                res.status(500).json(err)
            }
        })

        function updateChanges() {
            ChangeModel.findOne({}, {}, { sort: { createdAt : -1 } }, function(err, change) {

                let newQuantity = 0
                if (change) {
                    newQuantity = change.quantity + res.locals.item.quantity
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

