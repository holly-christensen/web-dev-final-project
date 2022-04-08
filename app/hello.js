// var { graphql, buildSchema } = require('graphql');
import {graphql, buildSchema} from "graphql";
let schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

graphql(schema, '{ hello }', root).then((response) => {
    console.log(response);
});