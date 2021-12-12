module.exports = function(app) {

    const getSubCategoriesMW = require(app.get('middlewares') + 'getSubCategoriesMW')
    const createCategoryMW = require(app.get('middlewares') + 'createCategoryMW')
    const renameCategoryMW = require(app.get('middlewares') + 'renameCategoryMW')

    const CategoryModel = require(app.get('models') + 'category')

    const objectRepository = {
		CategoryModel: CategoryModel
	};

    // POST

    app.get('/category/get_subcategories',
        getSubCategoriesMW(objectRepository)
    )

    app.post('/category/new', 
        createCategoryMW(objectRepository)
    )

    // GET

    app.post('/category/rename', 
        renameCategoryMW(objectRepository)
    )
    
}