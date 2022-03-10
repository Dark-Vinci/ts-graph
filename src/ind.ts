import express, { Express } from "express";
import { ApolloServer } from "apollo-server-express";
// import cors from "cors";
import schema from "./gSchema";  

import db from "./models";

class Server {
    public static init () {
        const server = new Server();
        return server.start();
    }

    private async start (): Promise<void> {
        const app: Express = express();

        const server = new ApolloServer({ schema: schema });
    
        await server.start();
        server.applyMiddleware({ app, path: "/graph" })
    
        const port: string | 3030 = process.env.PORT || 3030;
    
        await db.sequelize.sync({});
        app.listen(port, () => { console.log(`listening at port ${ port }`) });
    }
}

Server.init();