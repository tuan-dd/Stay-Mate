import userController from '@/controllers/user.controller';
import {
  catchError,
  checkParamsId,
  checkRole,
  checkUser,
  validateRequest,
} from '@/middleware/validate';
import { Role } from '@/models/User';
import {
  chargeSchema,
  createUserSchema,
  queryUserSchema,
  updateUserSchema,
  updateUserSchemaByAdmin,
} from '@/schema/user.schema';
import express from 'express';

const router = express.Router();

/**
 * @Admin send new pass(random)to email user
 * block user
 * see all user ( cant not see money,password)
 * @user can see all my account
 */

// create Account
// sign-up phải nằm bên auth /api/user/sign-up /api/auth/sign-in
router.post(
  '/sign-up',
  validateRequest(createUserSchema),
  catchError(userController.createUser),
);

// check header
router.use(checkUser);

router.put(
  '/user-update',
  validateRequest(updateUserSchema),
  catchError(userController.updateUser),
);

// payment
router.put(
  '/charge',
  validateRequest(chargeSchema),
  catchError(userController.chargeMoney),
);

// check role is admin
router.use(checkRole(Role.ADMIN));

router.get(
  '/',
  validateRequest(queryUserSchema),
  catchError(userController.queryUsers),
);

// check Id
// router.use(checkParamsId);

// never change isActive admin = false
router.put(
  '/admin-update/:id',
  checkParamsId,
  validateRequest(updateUserSchemaByAdmin),
  catchError(userController.updateByAdmin),
);

router.get(
  '/:id',
  checkParamsId,
  validateRequest(updateUserSchema),
  catchError(userController.detailUser),
);

export default router;
