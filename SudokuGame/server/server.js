import express from 'express';
const app = express();
import express_graphql from 'express-graphql';
import { buildSchema } from 'graphql';
import bodyParser from 'body-parser';
import {makeExecutableSchema} from 'graphql-tools';
import {graphqlExpress,graphiqlExpress} from 'apollo-server-express';
import cors from 'cors';
import typeDefs from "./typedef.js";
import resolvers from "./resolver.js";

 app.listen(3040,function(){
   console.log("server listening");
 });

app.use(cors({origin:"*"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const schema = makeExecutableSchema({typeDefs, resolvers});

app.use('/graphql', bodyParser.json(), graphqlExpress({
	schema
}));
app.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql'
}));
