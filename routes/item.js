module.exports = function(app) {

    const getItemMW = require(app.get('middlewares') + 'getItemMW')
    const getAllItemsMW = require(app.get('middlewares') + 'getAllItemsMW')
    const getAllSubcategoriesOfCategoryMW = require(app.get('middlewares') + 'getAllSubcategoriesOfCategoryMW')
    const getAllItemsOfCategoriesMW = require(app.get('middlewares') + 'getAllItemsOfCategoriesMW')
    const createItemMW = require(app.get('middlewares') + 'createItemMW')
    const createCategoryPathMW = require(app.get('middlewares') + 'createCategoryPathMW')
    const addCategoryToItemMW = require(app.get('middlewares') + 'addCategoryToItemMW')
    const addItemToCategoryMW = require(app.get('middlewares') + 'addItemToCategoryMW')
    const saveCategoriesMW = require(app.get('middlewares') + 'saveCategoriesMW')
    const saveItemMW = require(app.get('middlewares') + 'saveItemMW')
    const insertExistingItemMW = require(app.get('middlewares') + 'insertExistingItemMW')
    const takeOutItemMW = require(app.get('middlewares') + 'takeOutItemMW')

    const ItemModel = require(app.get('models') + 'item')
    const CategoryModel = require(app.get('models') + 'category')

    const objectRepository = {
		ItemModel: ItemModel,
        CategoryModel, CategoryModel
	};

    // GET

    app.get('/item/info', 
        getItemMW(objectRepository)
    )

    app.get('/item/get_all', 
        getAllItemsMW(objectRepository)
    )
    
    app.get('/item/get_all_of_subcategory',
        getAllSubcategoriesOfCategoryMW(objectRepository),
        getAllItemsOfCategoriesMW(objectRepository)
    )

    // POST

    app.post('/item/insert_new',
        createItemMW(objectRepository),
        createCategoryPathMW(objectRepository),
        addCategoryToItemMW(objectRepository),
        addItemToCategoryMW(objectRepository),
        saveCategoriesMW(objectRepository),
        saveItemMW(objectRepository)
    )

    app.post('/item/insert_existing',
        insertExistingItemMW(objectRepository)
    )

    app.post('/item/take_out',
        takeOutItemMW(objectRepository)
    )

    
}