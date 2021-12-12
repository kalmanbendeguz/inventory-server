const Types = require('mongoose').Types;

module.exports = function (objectRepository) {

    const CategoryModel = objectRepository['CategoryModel']

    return function (req, res, next) {

        req.body = JSON.parse(Object.keys(req.body)[0])
        
        newCategory = new CategoryModel()
        
        if(typeof req.body.parent_category_id !== "undefined"){
            newCategory.parent_category = Types.ObjectId(req.body.parent_category_id)
        } else {
            newCategory.parent_category = null
        }

        newCategory.name = req.body.name
        newCategory.subcategories = []
        newCategory.items = []

        newCategory.save((err) => {
            if(err) console.log(err)
            CategoryModel.updateOne({ _id: newCategory.parent_category }, { $push: { subcategories: newCategory }}, (err, category) => {

                if (!err) {
                    res.status(200).send()
                } else {
                    res.status(500).json(err)
                }

            });
        })
    };

    
};

