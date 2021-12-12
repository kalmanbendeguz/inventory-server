

module.exports = function (objectRepository) {

    const CategoryModel = objectRepository['CategoryModel']

    return function (req, res, next) {

        req.body = JSON.parse(Object.keys(req.body)[0])
        
        function renameCategory(){
            CategoryModel.updateOne({ _id: req.body.category_id }, { name: req.body.new_name }, (err, category) => {

                if (!err && category) {
                    res.status(200).send()
                } else {
                    res.status(500).json(err)
                }

            });
        }

        renameCategory()

    };

    
};

