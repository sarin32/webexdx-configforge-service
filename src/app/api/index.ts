import { Router } from '@webexdx/koa-wrap';
import environmentRoute from './environment/environment.route';
import projectRoute from './project/project.route';
import variableRoute from './variable/variable.route';
import tokenRoute from './tokens/token.route';
import { tokenMiddleware } from '../middlewares';

const router: Router = [
  {
    path: '/environment',
    middlewares: tokenMiddleware,
    children: environmentRoute,
  },
  {
    path: '/project',
    middlewares: tokenMiddleware,
    children: projectRoute,
  },
  {
    path: '/variable',
    middlewares: tokenMiddleware,
    children: variableRoute,
  },
  {
    path: '/tokens',
    middlewares: tokenMiddleware,
    children: tokenRoute,
  }
];
export default router;
