import { Router } from '@webexdx/koa-wrap';
import {
  createToken,
  getToken,
  getEnvironmentTokens,
  getUserTokens,
  updateToken,
  deleteToken,
  deactivateToken,
  getActiveTokens
} from './token.controller';
import { HTTPMethod } from '@webexdx/koa-wrap/build/src/router/interface';

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
  }
];

export default router; 