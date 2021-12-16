require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
const apiRouter = require('../routes');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const productSchema = require('../apollo/schemas/product.schema');
const productResolver = require('../apollo/resolvers/product.resolver');

const graphQlServer = new ApolloServer({
    typeDefs: productSchema,
    resolvers: productResolver
});
graphQlServer.applyMiddleware({ app, path: '/graphql' });
const port = process.env.PORT;
app.use(bodyParser.json());
app.use('/api/v1', apiRouter);

exports.start = () => {
    app.listen(port, (err) => {
        if (err) {
            console.log(`Error : ${err}`);
            process.exit();
        }
        console.log(`app is running on port ${port}`);
    });
}