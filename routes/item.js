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
    const renameItemMW = require(app.get('middlewares') + 'renameItemMW')
    const getItemFromBodyMW = require(app.get('middlewares') + 'getItemFromBodyMW')
    const saveImageMW = require(app.get('middlewares') + 'saveImageMW')
    const getImageMW = require(app.get('middlewares') + 'getImageMW')


    const ItemModel = require(app.get('models') + 'item')
    const CategoryModel = require(app.get('models') + 'category')
    const ChangeModel = require(app.get('models') + 'change')
    const ImageModel = require(app.get('models') + 'image')


    const objectRepository = {
		ItemModel: ItemModel,
        CategoryModel: CategoryModel,
        ChangeModel: ChangeModel,
        ImageModel: ImageModel
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

    app.get('/item/image',
        getImageMW(objectRepository)
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

    app.post('/item/rename',
        renameItemMW(objectRepository)
    )

    app.post('/item/change_category',
        getItemFromBodyMW(objectRepository),
        createCategoryPathMW(objectRepository),
        addCategoryToItemMW(objectRepository),
        addItemToCategoryMW(objectRepository),
        saveCategoriesMW(objectRepository),
        saveItemMW(objectRepository)
    )

    app.post('/item/upload_image',
        saveImageMW(objectRepository)
    )
    
}