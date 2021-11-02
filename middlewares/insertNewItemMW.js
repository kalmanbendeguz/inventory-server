const { SSL_OP_EPHEMERAL_RSA } = require('constants');

module.exports = function (objectRepository) {

    const ItemModel = objectRepository['ItemModel']
    const CategoryModel = objectRepository['CategoryModel']
    const util = require('util')
    const sleep = t => new Promise(s => setTimeout(s, t));

    return async function (req, res, next) {

        insertNewItem()

        async function insertNewItem(){
            console.log("insert")
            createItem()
            if (!categoryExists()){
                console.log("NOTEXISTS")
                //createCategoryPath()
            } else {
                console.log("EXISTS")
            }
            //addCategoryToItem()
            //saveItem()
            //addItemToCategory()
            //saveCategory()
        }

        async function createItem() {
            newItem = new ItemModel()
            
            newItem.code = req.body.code
            newItem.name = req.body.name
            newItem.quantity = req.body.quantity
    
            res.locals.item = newItem
        }

        

        async function categoryExists(){

            let found = true
            for await (let _category of req.body.category){
                console.log(_category)
                CategoryModel.findOne({ name: _category}, (err, category) => {
                    if (category) {
                        console.log("FOUND")
                    } else {
                        console.log("NOTFOUND")
                        found = false
                    }
                });
            }
            console.log(found)
            return found
        }

        function createCategoryPath(){
            parentCategory = res.locals.lastExists
            for(let i = res.locals.firstNotExists; i < req.body.category.length; ++i){
                newCategory = new CategoryModel()

                newCategory.name = req.body.category[i]
                newCategory.parentCategory = parentCategory
                parentCategory.subcategories = [newCategory]
                parentCategory = newCategory

                if(i !== req.body.category.length - 1) {
                    newCategory.save(err => {})
                }
                res.locals.currentCategory = newCategory
            }
            
        }

        function addCategoryToItem(){
            res.locals.item.category = res.locals.currentCategory
        }

        function saveItem(){
            res.locals.item.save(err => {})
        }

        function addItemToCategory(){

            
            res.locals.currentCategory.items = [res.locals.item]
        }

        function saveCategory(){
            res.locals.currentCategory.save(err => {
                if(!err) {
                    res.status(200).send()
                } else {
                    res.status(500).json(err)
                }
            })
        }

    };

    
};

