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
    path: '/create',
    handler: createToken,
  },
  {
    method: HTTPMethod.POST,
    path: '/get',
    handler: getToken,
  },
  {
    method: HTTPMethod.POST,
    path: '/getEnvironmentTokens',
    handler: getEnvironmentTokens,
  },
  {
    method: HTTPMethod.POST,
    path: '/getUserTokens',
    handler: getUserTokens,
  },
  {
    method: HTTPMethod.POST,
    path: '/update',
    handler: updateToken,
  },
  {
    method: HTTPMethod.POST,
    path: '/delete',
    handler: deleteToken,
  },
  {
    method: HTTPMethod.POST,
    path: '/deactivate',
    handler: deactivateToken,
  },
  {
    method: HTTPMethod.POST,
    path: '/getActiveTokens',
    handler: getActiveTokens,
  },
];

export default router;
