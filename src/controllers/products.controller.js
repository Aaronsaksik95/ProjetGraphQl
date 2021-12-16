const Product = require('../models/product.model');

exports.create = (req, res) => {
    const product = new Product({
        price: req.body.price,
        title: req.body.title,
        genre: req.body.genre,
        description: req.body.description,
        image: req.body.image,
    });

    product.save()
        .then((data) => {
            res.send({
                product: data,
                created: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating product"
            })
        })

}
exports.read = (req, res) => {
    Product.find()
        .then((data) => {
            res.send({
                products: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating product"
            })
        })

}

exports.readOne = (req, res) => {
    Product.findById(req.params.id)
        .then((data) => {
            res.send({
                product: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "NULL"
            })
        })
}

exports.readWithGenre = (req, res) => {
    Product.find({ genre: req.params.genre })
        .then((data) => {
            res.send({
                products: data,
                response: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "some error occured while creating product"
            })
        })
}

exports.update = (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        {
            price: req.body.price,
            title: req.body.title,
            genre: req.body.genre,
            description: req.body.description,
            image: req.body.image,
        }
    )
        .then(() => {
            getOne(req.params.id)
                .then((data) => {
                    res.send({
                        product: data,
                        update: true
                    })
                })
                .catch((err) => {
                    res.status(500).send({
                        error: 500,
                        message: err.message || "NULL"
                    })
                })
        })
        .catch((err) => {
            res.status(500).send({
                error: 500,
                message: err.message || "NULL"
            })
        })
}

exports.delete = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send({
                delete: true
            })
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({
                error: 500,
                message: err.message || "NULL"
            })
        })

}