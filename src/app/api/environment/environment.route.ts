import { Router } from '@webexdx/koa-wrap';
import { createEnvironment } from './environment.controller';
import { HTTPMethod } from '@webexdx/koa-wrap/build/src/router/interface';

const router: Router = [
  {
    method: HTTPMethod.POST,
    path: '/create',
    handler: createEnvironment,
  },
];
export default router;
