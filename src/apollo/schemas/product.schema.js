const { gql } = require('apollo-server-express');

module.exports = gql`
    type Product {
        id: ID
        name: String
        price: Int
        description: String
    }

    type Query {
        getProducts:[Product]
        getProduct(id:ID):Product
    }
    type Message {
        message: String
        code: Int
    }

    input ProductInput {
        id: ID
        name: String
        price: Int
        description: String
    }
    
    type Mutation {
        createProduct(id: ID, name: String, price: Int, description: String):Product
        updateProduct(id: ID, name: String, price: Int, description: String):Product
        deleteProduct(id: ID): Message
    }
`
