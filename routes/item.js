module.exports = function(app) {

    const getItemMW = require(app.get('middlewares') + 'getItemMW')
    const insertItemMW = require(app.get('middlewares') + 'insertItemMW')
    const takeOutItemMW = require(app.get('middlewares') + 'takeOutItemMW')
    const getAllItemsMW = require(app.get('middlewares') + 'getAllItemsMW')

    const ItemModel = require(app.get('models') + 'item')

    const objectRepository = {
		ItemModel: ItemModel,
	};

    app.get('/item/info', 
        getItemMW(objectRepository)
    )

    app.get('/item/insert',
        insertItemMW(objectRepository)
    )

    app.get('/item/take_out',
        takeOutItemMW(objectRepository)
    )

    app.get('/item/get_all', 
        getAllItemsMW(objectRepository)
    )
}