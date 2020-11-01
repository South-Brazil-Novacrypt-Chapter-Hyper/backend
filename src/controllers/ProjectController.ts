/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
// @ts-ignore
import Account from '../model/Account.ts';
// @ts-ignore
import Project from '../model/Projects.ts';
// eslint-disable-next-line camelcase
import projects_view from '../view/projects_view';
import AccountController from './AccountController';

export default {
  async index(request: Request, response: Response) {
    const projectsRepository = getRepository(Project);

    const projects = await projectsRepository.find({ relations: ['accounts'] });

    return response.json(projects_view.renderMany(projects));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      platform,
      description,
      scope,
      accounts,
    } = request.body;

    const accountsList: Account[] = [];

    for (let i = 0; i < accounts.length; i++) {
      accountsList.push(await AccountController.getAccountUsingId(accounts[i]));
    }

    console.log(accountsList);

    const data: any = {
      name,
      platform,
      description,
      scope,
      accounts: accountsList,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      platform: Yup.string().required(),
      description: Yup.string().required(),
      scope: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const projectsRepository = getRepository(Project);

    const project = projectsRepository.create(data);

    await projectsRepository.save(project);

    return response.status(201).json(data);
  },
};
