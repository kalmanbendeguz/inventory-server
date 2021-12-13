module.exports = function (objectRepository) {

    const ImageModel = objectRepository['ImageModel']

    return function (req, res, next) {
        let image = new ImageModel()
    
        image.code = req.body.code
        image.image = req.body.image

        image.save(err => {
            if(!err) {
                res.status(200).json("{}")
            } else {
                res.status(500).json(err)
            }
        })

    };   
};

