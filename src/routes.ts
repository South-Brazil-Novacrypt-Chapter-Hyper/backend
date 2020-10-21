import { Router } from 'express'
import { ensureAuthenticated } from './config/authentication/oauth/GitHub'
const routes = Router()



routes.get('/user', ensureAuthenticated, (req, res) => {
    res.json(req.session?.passport)
})




export { routes }