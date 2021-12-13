module.exports = function (objectRepository) {

    const ImageModel = objectRepository['ImageModel']

    return function (req, res, next) {

        ImageModel.findOne({ code: req.query.item_code }, (err, image) => {
            if (image) {
                res.status(200).json(image)
            } else {
                if(err){
                    console.log(err)
                    res.status(500).json(err)
                } else {
                    res.status(200).json({})
                }
            }

        });

            

    };

    
};

