import dd from "../models";

class Project {
    public async createProject (_: any, args: { title: any }) {
        const { title } = args;
        try {
            // @ts-ignore
            const project = await dd.Project.create({title});
            return project;
        } catch (ex) {
            throw new Error("invalid arguments");
        }
    }

    public async getProjectById(_: any, args: { id: string }): Promise<any> {
        //@ts-ignore
        const project = await dd.Project.findOne({ where: { id: args.id }});
        return project;
    }

    public async getProjects(): Promise<any> {
        //@ts-ignore
        const project = await dd.Project.findAll();
        return project;
    }

    public async deleteProject(_: any, args: { id: string }) {
        try {
            const { id } = args;
            // @ts-ignore
            const project = await dd.Project.findOne({ where: { id: id }});
            await project.destroy();
            return project
        } catch (ex: any) {
            throw new Error(ex.message);
        }
    }

    public async getProjectUsers(parent: any): Promise<any> {
        const { projectId } = parent;

        const userProjects = await dd.User.findAll({
            include: {
                model: dd.Project,
                through: {
                    attributes: []
                }
            }
        });

        return userProjects;
    }

    public async updateProjects(_:any, args: { title: string, id: number }) {
        const { title, id } = args;
        //@ts-ignore
        const project = await dd.Project.findOne({ where: { id: id }});

        if (!project) {
            throw new Error("invalid project id")       
        }

        project.set({ title });
        await project.save();

        return project;
    }

    public static init(): Project {
        return new Project();
    }
}

export default Project.init()