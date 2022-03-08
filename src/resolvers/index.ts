import userRes from "./user";

import project from "./project";

class Resolver {
    private get resolver () {
        const resolver = {
            Query: {
                getUserById: userRes.getUserById,
                getProjects: project.getProjects,
                getUsers: userRes.getUsers,
                getProjectById: project.getProjectById,
            },
        
            Mutation: {
                createUser: userRes.createUser,
                createProject: project.createProject,
                updateUser: userRes.updateUser,
                updateProject: project.updateProjects,
                deleteUser: userRes.deleteUser,
                deleteProject: project.deleteProject,
            },
        
            User: {
                projects: userRes.getUserProjects
            },
        
            Project: {
                users: project.getProjectUsers
            }
        }

        return resolver;
    }

    public static init () {
        const res = new Resolver();
        return res.resolver
    }
}


export default Resolver.init();