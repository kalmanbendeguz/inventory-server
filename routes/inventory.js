module.exports = function(app) {

    const resetInventoryMW = require(app.get('middlewares') + 'resetInventoryMW')

    const ItemModel = require(app.get('models') + 'item')
    const CategoryModel = require(app.get('models') + 'category')
    const ChangeModel = require(app.get('models') + 'change')

    const objectRepository = {
		ItemModel: ItemModel,
        CategoryModel: CategoryModel,
        ChangeModel: ChangeModel
	};

    // GET

    app.get('/inventory/reset_inventory', 
        resetInventoryMW(objectRepository)
    )
    
    
}