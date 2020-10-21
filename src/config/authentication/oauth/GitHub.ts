import Passport from 'passport'
import PassportGitHub from 'passport-github2'
import Router, {Response, Request, NextFunction} from 'express'

const gitHubAuthenticationRoutes = Router()

Passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
Passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });

const gitHubStrategy = PassportGitHub.Strategy
Passport.use(new gitHubStrategy({
    clientID: String(process.env.CLIENT_ID),
    clientSecret: String(process.env.CLIENT_SECRET),
    callbackURL: 'http://localhost:3333/auth/github/callback'

}, function(accessToken: string, refreshToken: string, profile: any, done: (arg0: null, arg1: any, arg2: { token: string }) => any) {
    return done( null, profile, { token: accessToken } )
}))

gitHubAuthenticationRoutes.get('/auth/github',Passport.authenticate('github', { scope: ['user:email']}))


gitHubAuthenticationRoutes.get('/auth/github/callback', Passport.authenticate('github', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/success');
});

gitHubAuthenticationRoutes.get('/logout', (req, res) => {
    req.logout()
    res.status(200).clearCookie('session', {
        path: '/'
      });
    req.session?.destroy((err) => {
        res.redirect('/')
    })
})

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }

export { ensureAuthenticated , gitHubAuthenticationRoutes }