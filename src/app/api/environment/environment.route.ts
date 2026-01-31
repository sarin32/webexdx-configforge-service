import { HTTPMethod, type Router } from '@webexdx/koa-wrap/server';
import {
  createEnvironment,
  deleteEnvironment,
  updateEnvironment,
} from './environment.controller';

const router: Router = [
  {
    method: HTTPMethod.POST,
    path: '/',
    handler: createEnvironment,
  },
  {
    method: HTTPMethod.PUT,
    path: '/:id',
    handler: updateEnvironment,
  },
  {
    method: HTTPMethod.DELETE,
    path: '/:id',
    handler: deleteEnvironment,
  },
];
export default router;
