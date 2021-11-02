module.exports = function(app) {

    const getItemMW = require(app.get('middlewares') + 'getItemMW')
    const insertItemMW = require(app.get('middlewares') + 'insertItemMW')
    const takeOutItemMW = require(app.get('middlewares') + 'takeOutItemMW')
    const getAllItemsMW = require(app.get('middlewares') + 'getAllItemsMW')
    const insertNewItemMW = require(app.get('middlewares') + 'insertNewItemMW')
    const checkCategoryNamesExistsMW = require(app.get('middlewares') + 'checkCategoryNamesExistsMW')
    const checkCategoryPathExistsMW = require(app.get('middlewares') + 'checkCategoryPathExistsMW')
    const createItemMW = require(app.get('middlewares') + 'createItemMW')
    const getAllOfSubcategoryMW = require(app.get('middlewares') + 'getAllOfSubcategoryMW')
    const getAllSubcategoriesOfCategoryMW = require(app.get('middlewares') + 'getAllSubcategoriesOfCategoryMW')
    const getAllItemsOfCategoriesMW = require(app.get('middlewares') + 'getAllItemsOfCategoriesMW')
    const insertExistingItemMW = require(app.get('middlewares') + 'insertExistingItemMW')
    const createCategoryPathMW = require(app.get('middlewares') + 'createCategoryPathMW')
    const addCategoryToItemMW = require(app.get('middlewares') + 'addCategoryToItemMW')
    const addItemToCategoryMW = require(app.get('middlewares') + 'addItemToCategoryMW')
    const saveCategoriesMW = require(app.get('middlewares') + 'saveCategoriesMW')
    const saveItemMW = require(app.get('middlewares') + 'saveItemMW')



    const ItemModel = require(app.get('models') + 'item')
    const CategoryModel = require(app.get('models') + 'category')

    const objectRepository = {
		ItemModel: ItemModel,
        CategoryModel, CategoryModel
	};

    app.post('/item/insert_new',
        createItemMW(objectRepository),
        createCategoryPathMW(objectRepository),
        addCategoryToItemMW(objectRepository),
        addItemToCategoryMW(objectRepository),
        saveCategoriesMW(objectRepository),
        saveItemMW(objectRepository)
        //checkCategoryNamesExistsMW(objectRepository),
        //checkCategoryPathExistsMW(objectRepository),
        //createCategoryMW(objectRepository),
        
        //
        //
        //
    )

    app.post('/item/insert_existing',
        insertExistingItemMW(objectRepository)
        //createCategoryMW(objectRepository),
        //addCategoryToItemMW(objectRepository),
        //saveItemMW(objectRepository),
        //addItemToCategoryMW(objectRepository),
        //saveCategoryMW(objectRepository)
    )

    app.get('/item/info', 
        getItemMW(objectRepository)
    )

    app.get('/item/insert',
        insertItemMW(objectRepository)
    )

    app.post('/item/take_out',
        takeOutItemMW(objectRepository)
    )

    app.get('/item/get_all', 
        getAllItemsMW(objectRepository)
    )
    
    app.get('/item/get_all_of_subcategory',
        getAllSubcategoriesOfCategoryMW(objectRepository),
        getAllItemsOfCategoriesMW(objectRepository)
    )
}