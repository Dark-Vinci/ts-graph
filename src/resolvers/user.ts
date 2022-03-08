import { Model } from "sequelize";

import dd from "../models/index";

type dbObj = { sequelize: any, Sequelize: any, User: Model, Project:Model };

class User {
    readonly db: dbObj = dd;

    public async createUser (_: any, args: { inp: { name: any; age: any; }}) {
        const { name, age } = args.inp;

        try {
            // @ts-ignore
            const user = await dd.User.create({name, age});
            return user;
        } catch (ex) {
            throw new Error("invalid arguments");
        }
    }

    public async getUserById(_: any, args: { id: string }): Promise<any> {
        //@ts-ignore
        const users = await dd.User.findOne({ where: { id: args.id }});
        return users;
    }

    public async getUsers(): Promise<any> {
        console.log(dd)
        console.log(this.db);
        //@ts-ignore
        const users = await dd.User.findAll();
        return users;
    }

    public async deleteUser(_: any, args: { id: string }) {
        try {
            const { id } = args;
            // @ts-ignore
            const user = await dd.User.findOne({ where: { id: id }});
            await user.destroy();
            return user
        } catch (ex: any) {
            throw new Error(ex.message);
        }
    }

    public async updateUser(_:any, args: { name: string, age: number, id: number }) {
        const { name, age, id } = args;
        //@ts-ignore
        const user = await dd.User.findOne({ where: { id: id }});

        if (!user) {
            throw new Error("invalid user id")       
        }

        user.set({ name, age });
        await user.save();

        return user;
    }

    public static init(): User {
        return new User();
    }

    public async getUserProjects(parent: any) {
        const { id } = parent;
        console.log({ id });

        const userProjects = await dd.Project.findAll({
            include: {
                model: dd.User,
                through: {
                    attributes: []
                },
                where: {
                    UserId: id
                },
            }
        });

        return userProjects;
    }
}

export default User.init()