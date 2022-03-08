import "graphql-import-node";
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";

import resolver from "../resolvers";

import * as userDef from "./graph/user.gql";
import * as projDef from "./graph/project.gql";
import * as queryDef from "./graph/query.gql";
import * as mutationDef from "./graph/mutation.gql";

class GraphSchema {
    public static init () {
        const schema = new GraphSchema();
        return schema.schemaFunc;
    }

    private get schemaFunc () {
        const schema: GraphQLSchema = makeExecutableSchema({
            typeDefs: [ userDef, projDef, queryDef, mutationDef ],
            resolvers: resolver,
        });

        return schema;
    }
}

export default GraphSchema.init();