// @ts-ignore
import Project from '../model/Projects.ts';

export default {
  render(project: Project) {
    return {
      id: project.id,
      name: project.name,
      platform: project.platform,
      description: project.description,
      scope: project.scope,
      account: project.accounts,
    };
  },

  renderMany(projects: Project[]) {
    return projects.map((project) => this.render(project));
  },
};
