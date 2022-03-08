import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
// import cors from "cors";
import schema from "./gSchema";  

import db from "./models";

async function start () {
    const app: Express = express();

    const server = new ApolloServer({ schema: schema });

    await server.start();
    server.applyMiddleware({ app, path: "/graph"})

    const port = process.env.PORT || 3030;

    db.sequelize.sync().then(() => {
        app.listen(port, () => {
            console.log(`listening at port ${ port }`);   
        })
    })
}

start();