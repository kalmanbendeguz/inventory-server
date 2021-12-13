module.exports = function (objectRepository) {

    const InventoryModel = objectRepository['InventoryModel']

    return function (req, res, next) {
        function setInventoryName(){
            let inventoryName = new InventoryModel()
            inventoryName.key = "inventory_name" 
            inventoryName.value = req.body.inventory_name
            inventoryName.save(err => {
                if(!err) {
                    res.status(200).json("{}")
                } else {
                    res.status(500).json(err)
                }
            })
            
        }

        setInventoryName()
    }


};

