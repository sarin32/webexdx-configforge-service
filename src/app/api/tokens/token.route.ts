import { HTTPMethod, type Router } from '@webexdx/koa-wrap/server';
import {
  createToken,
  deactivateToken,
  deleteToken,
  getActiveTokens,
  getEnvironmentTokens,
  getToken,
  getUserTokens,
  updateToken,
} from './token.controller';

const router: Router = [
  {
    method: HTTPMethod.POST,
    path: '/',
    handler: createToken,
  },
  {
    method: HTTPMethod.GET,
    path: '/:id',
    handler: getToken,
  },
  {
    method: HTTPMethod.POST,
    path: '/environment-tokens',
    handler: getEnvironmentTokens,
  },
  {
    method: HTTPMethod.POST,
    path: '/user-tokens',
    handler: getUserTokens,
  },
  {
    method: HTTPMethod.PUT,
    path: '/:id',
    handler: updateToken,
  },
  {
    method: HTTPMethod.DELETE,
    path: '/:id',
    handler: deleteToken,
  },
  {
    method: HTTPMethod.PUT,
    path: '/:id/deactivate',
    handler: deactivateToken,
  },
  {
    method: HTTPMethod.POST,
    path: '/active-tokens',
    handler: getActiveTokens,
  },
];

export default router;
