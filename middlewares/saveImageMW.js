const Types = require('mongoose').Types;

module.exports = function (objectRepository) {

    const ImageModel = objectRepository['ImageModel']

    return function (req, res, next) {

        let image = new ImageModel()
        image.item_code = req.body.item_code
        image.data = req.body.image //base64 string

        image.save(err => {
            if (err) {
                console.log(err);
                res.status(500).send(err)
            }
            else {
                res.status(200).send()
            }
        });
    
    };   
};

