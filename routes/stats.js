module.exports = function(app) {

    const getStatsMW = require(app.get('middlewares') + 'getStatsMW')

    const CategoryModel = require(app.get('models') + 'category')
    const ItemModel = require(app.get('models') + 'item')
    const ChangeModel = require(app.get('models') + 'change')


    const objectRepository = {
		ItemModel: ItemModel,
        CategoryModel, CategoryModel,
        ChangeModel, ChangeModel
	};

    // GET

    app.get('/stats', 
        getStatsMW(objectRepository)
    )
    
}