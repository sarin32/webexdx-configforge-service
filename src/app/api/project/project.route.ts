import { Router } from '@webexdx/koa-wrap';
import {
  createProject,
  getProjectDataInDetail,
  getProjectlist,
  updateProjectDetails,
} from './project.controller';
import { HTTPMethod } from '@webexdx/koa-wrap/build/src/router/interface';

const router: Router = [
  {
    method: HTTPMethod.POST,
    path: '/create',
    handler: createProject,
  },
  {
    method: HTTPMethod.POST,
    path: '/edit',
    handler: updateProjectDetails,
  },
  {
    method: HTTPMethod.POST,
    path: '/getList',
    handler: getProjectlist,
  },
  {
    method: HTTPMethod.POST,
    path: '/getDataInDetail',
    handler: getProjectDataInDetail,
  },
];

export default router;
