module.exports = function(app) {

    const resetInventoryMW = require(app.get('middlewares') + 'resetInventoryMW')
    const getInventoryNameMW = require(app.get('middlewares') + 'getInventoryNameMW')
    const setInventoryNameMW = require(app.get('middlewares') + 'setInventoryNameMW')

    const ItemModel = require(app.get('models') + 'item')
    const CategoryModel = require(app.get('models') + 'category')
    const ChangeModel = require(app.get('models') + 'change')
    const InventoryModel = require(app.get('models') + 'inventory')

    const objectRepository = {
		ItemModel: ItemModel,
        CategoryModel: CategoryModel,
        ChangeModel: ChangeModel,
        InventoryModel: InventoryModel
	};

    // GET

    app.get("/inventory/get_name",
        getInventoryNameMW(objectRepository)
    )

    app.get('/inventory/reset_inventory', 
        resetInventoryMW(objectRepository)
    )
    
    // POST
    
    app.post("/inventory/set_name",
        setInventoryNameMW(objectRepository)
    )
}