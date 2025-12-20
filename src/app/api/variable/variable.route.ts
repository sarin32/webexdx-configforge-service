import { HTTPMethod, type Router } from '@webexdx/koa-wrap/server';
import {
  createVariable,
  deleteVariable,
  updateVariable,
} from './variable.controller';

const router: Router = [
  {
    method: HTTPMethod.POST,
    path: '/',
    handler: createVariable,
  },
  {
    method: HTTPMethod.PUT,
    path: '/:id',
    handler: updateVariable,
  },
  {
    method: HTTPMethod.DELETE,
    path: '/:id',
    handler: deleteVariable,
  },
];

export default router;
