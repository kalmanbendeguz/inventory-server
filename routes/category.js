module.exports = function(app) {

    const createCategoryMW = require(app.get('middlewares') + 'createCategoryMW')
    const renameCategoryMW = require(app.get('middlewares') + 'renameCategoryMW')
    const getSubCategoriesMW = require(app.get('middlewares') + 'getSubCategoriesMW')
    const getAllOfCategoryMW = require(app.get('middlewares') + 'getAllOfCategoryMW')

    const CategoryModel = require(app.get('models') + 'category')

    const objectRepository = {
		CategoryModel: CategoryModel,
	};

    app.post('/category/new', 
        createCategoryMW(objectRepository)
    )

    app.post('/category/rename', 
        renameCategoryMW(objectRepository)
    )

    app.get('/category/get_subcategories',
        getSubCategoriesMW(objectRepository)
    )
    
    app.get('/category/get_all_of_category',
        getAllOfCategoryMW(objectRepository)
    )
}