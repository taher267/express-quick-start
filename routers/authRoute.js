import { Router } from 'express';
import passport from 'passport';
const router = Router();
import * as authCTRLs from '../controllers/authController';
import * as authMidWare from '../middlewires/auth';

router
    .get('/signup', authCTRLs.getRegister)
    //@desc POST /auth/signup
    .post('/signup/:id', authMidWare.unAuthenticated, authCTRLs.regiserCtrl)

    //@desc POST /auth/login
    .get('/login', authCTRLs.getLogin)
    .post('/login', authMidWare.unAuthenticated, authCTRLs.loginCtrl)

    .get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))//'https://www.google.com/m8/feeds'

    .get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        })
    //Flicker
    .get('/flicker/auth-token', authCTRLs.flickerRequestTokenCtrl)
    .get('/flicker/access-token', authCTRLs.flickerAccessTokenCtrl)
    .get('/flicker/auth-verifier', authCTRLs.flickerAuthVerifierCtrl)
export default router;