import { Router } from 'express'
import { ensureAuthenticated } from './config/authentication/oauth/GitHub'
const routes = Router()



routes.get('/user', ensureAuthenticated, (req, res) => {
    return res.json({
        authenticated: true,
        user: req.session?.passport
    }).send()
})




export { routes }