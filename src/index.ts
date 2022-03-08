import express from "express";
import db from "./models";

import { projectSeed } from "./seeders/project.seeders";
import { projAssSeeders } from "./seeders/projAssign.seeders";
import { users } from "./seeders/users.seedes";

const app = express();

const port = process.env.PORT || 3030;

app.get("/", async (req, res) => {
    try {
        const users = await db.User.findAll({
            include: {
                model: db.Project,
                through: {
                    attributes: []
                }
            }
        });
    
        res.json(users);
    } catch (error) {
        console.log(error);
    }
});

app.get("/ass", async (req, res) => {
    try {
        const users = await db.Project.findAll({
            include: {
                model: db.User,
                through: {
                    attributes: []
                }
            }
        });
    
        res.json(users);
    } catch (error) {
        console.log(error);
    }
});

app.get("/project", async (req, res) => {
    try {
        const users = await db.Project.findOne({where: {id: 2}});
    
        res.json(users);
    } catch (error) {
        console.log(error);
    }
});

db.sequelize.sync({}).then(async () => {
    // await db.User.bulkCreate(users);
    // await db.Project.bulkCreate(projectSeed);
    // await db.Up.bulkCreate(projAssSeeders);

    app.listen(port, () => {
        console.log("listening at port 3030")
    })
}).catch((ex: any) => console.log(ex));