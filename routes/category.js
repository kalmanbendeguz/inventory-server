module.exports = function(app) {

    const getSubCategoriesMW = require(app.get('middlewares') + 'getSubCategoriesMW')
    const createCategoryMW = require(app.get('middlewares') + 'createCategoryMW')
    const renameCategoryMW = require(app.get('middlewares') + 'renameCategoryMW')  

    const CategoryModel = require(app.get('models') + 'category')

    const objectRepository = {
		CategoryModel: CategoryModel
	};

    // GET

    app.get('/category/get_subcategories',
        getSubCategoriesMW(objectRepository)
    )

    // POST

    app.post('/category/rename', 
        renameCategoryMW(objectRepository)
    )
    
    app.post('/category/new', 
        createCategoryMW(objectRepository)
    )
}