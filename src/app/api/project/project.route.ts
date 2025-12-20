import { HTTPMethod, type Router } from '@webexdx/koa-wrap/server';
import {
  createProject,
  getProjectDataInDetail,
  getProjectlist,
  updateProjectDetails,
} from './project.controller';

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
