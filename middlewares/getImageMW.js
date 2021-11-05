

module.exports = function (objectRepository) {

    const ImageModel = objectRepository['ImageModel']

    return function (req, res, next) {

        ImageModel.findOne({ item_code: req.query.item_code }, (err, image) => {

            if (image) {
                res.status(200).json(image)
            } else {
                if(err){
                    console.log(err)
                    res.status(500).send(err)
                } else {
                    res.status(200).json({})
                }
            }

        });

            

    };

    
};

