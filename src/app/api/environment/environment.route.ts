import { HTTPMethod, type Router } from '@webexdx/koa-wrap/server';
import { createEnvironment } from './environment.controller';

const router: Router = [
  {
    method: HTTPMethod.POST,
    path: '/create',
    handler: createEnvironment,
  },
];
export default router;
