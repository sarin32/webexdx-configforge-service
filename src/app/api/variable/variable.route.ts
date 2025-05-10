import { HTTPMethod } from '@webexdx/koa-wrap/build/src/router/interface';
import {
  createVariable,
  deleteVariable,
  updateVariable,
} from './variable.controller';
import { Router } from '@webexdx/koa-wrap';

const router: Router = [
  {
    method: HTTPMethod.POST,
    path: '/create',
    handler: createVariable,
  },
  {
    method: HTTPMethod.POST,
    path: '/update',
    handler: updateVariable,
  },
  {
    method: HTTPMethod.POST,
    path: '/delete',
    handler: deleteVariable,
  },
];

export default router;
