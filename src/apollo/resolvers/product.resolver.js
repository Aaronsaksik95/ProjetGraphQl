const Product = require('../../models/product.model');
const { unsubscribe } = require('../../routes');

module.exports = {
    Query: {
        getProducts: () => {
            return Product.find();
        },
        getProduct: (parent, args) => {
            return Product.findById(args.id);
        }
    },

    Mutation: {
        createProduct: (parent, args) => {
            const product = new Product({
                id: args.id,
                name: args.name,
                price: args.price,
                description: args.description
            });
            product.save()
            return product
        },
        updateProduct: (parent, args) => {
            const product = Product.findByIdAndUpdate(
                args.id,
                {
                    name: args.name,
                    price: args.price,
                    description: args.description
                }
            )
            return product
        },
        deleteProduct: async (parent, args) => {
            const product = await Product.exists({_id: args.id})
            if (product){
                await Product.findByIdAndDelete(args.id)
                return{
                    message: "Deleted",
                    code: 204
                }
            }
            else{
                return{
                    message: "Product inexistant",
                    code: 404
                }
            }
        }
    }
}
