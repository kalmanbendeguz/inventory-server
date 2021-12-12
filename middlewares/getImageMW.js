

module.exports = function (objectRepository) {

    const ImageModel = objectRepository['ImageModel']

    return function (req, res, next) {

        ImageModel.findOne({ item_code: req.query.item_code }, (err, image) => {

            if (image) {
                let almostBase64 = Buffer.from(image.data, 'binary').toString('utf8');
                let response = {}
                response.image = almostBase64
                res.status(200).json(response)
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

