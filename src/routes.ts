/* eslint-disable import/prefer-default-export */
import { Router } from 'express';
// @ts-ignore
import { ensureAuthenticated } from './config/authentication/oauth/GitHub.ts';
// @ts-ignore
import AccountController from './controllers/AccountController.ts';
// @ts-ignore
import ProjectController from './controllers/ProjectController.ts';

const routes = Router();

routes.get('/user', ensureAuthenticated, (req, res) => res.json({
  authenticated: true,
  user: req.session?.passport,
}).send());

routes.post('/account', AccountController.create);
routes.get('/account/login/:email/:password', AccountController.login);

routes.post('/project', ProjectController.create);
routes.get('/project', ProjectController.index);

export { routes };
