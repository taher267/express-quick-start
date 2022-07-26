import { Router } from 'express';
const router = Router();
import * as userCTRLs from '../controllers/userController';
import * as authMidWare from '../middlewires/auth';

const authenticate = [authMidWare.authenticated];
const authorize = [authMidWare.authenticated, authMidWare.authorized];

router
    // @desc GET /users/admin    ADMIN
    .get('/admin', authorize, userCTRLs.allUsers)
    // @desc GET /users/:id/admin  ADMIN
    .get('/:id/admin', authorize, userCTRLs.getUser)
    //@desc PUT  /users/:id/admin  ADMIN
    .put(authorize, userCTRLs.updateUserActivity)
    // @desc DELETE /users/:id/admin ADMIN
    .delete(authorize, userCTRLs.deleteUser)

    // @desc POST /users/create
    .post('/create', userCTRLs.createUser)

    // @desc POST /users/:id
    .route('/:id')
    .get(authenticate, userCTRLs.getUser)

    // @desc PATCH /users/:id
    .patch(authenticate, userCTRLs.updateUser);

router
    // @desc POST /users/forgot-password
    .post('/forgot-password', userCTRLs.forgotPassword)

    // @desc POST /users/forgot-password/:resetToken
    .post('/reset-password/:resetToken', userCTRLs.resetPassword);


export default router;