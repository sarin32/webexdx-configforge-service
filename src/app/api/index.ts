import type { Router } from '@webexdx/koa-wrap/server';
import { authMiddleware } from '../middlewares/auth.middleware';
import environmentRoute from './environment/environment.route';
import projectRoute from './project/project.route';
import tokenRoute from './tokens/token.route';
import variableRoute from './variable/variable.route';

const router: Router = [
  {
    path: '/environment',
    middlewares: authMiddleware,
    children: environmentRoute,
  },
  {
    path: '/project',
    middlewares: authMiddleware,
    children: projectRoute,
  },
  {
    path: '/variable',
    middlewares: authMiddleware,
    children: variableRoute,
  },
  {
    path: '/tokens',
    middlewares: authMiddleware,
    children: tokenRoute,
  },
];
export default router;
