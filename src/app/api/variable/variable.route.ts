import { Router, HTTPMethod } from '@webexdx/koa-wrap/server';
import {
  createVariable,
  deleteVariable,
  updateVariable,
} from './variable.controller';

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
