import { Router } from 'express'
import { ensureAuthenticated } from './config/authentication/oauth/GitHub'
import AccountController from './controllers/AccountController'
const routes = Router()



routes.get('/user', ensureAuthenticated, (req, res) => {
    return res.json({
        authenticated: true,
        user: req.session?.passport
    }).send()
})

routes.post('/account', AccountController.create);
routes.get('/account/login/:email/:password', AccountController.login);


export { routes }