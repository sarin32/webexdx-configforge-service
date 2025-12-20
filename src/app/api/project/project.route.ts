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
    path: '/',
    handler: createProject,
  },
  {
    method: HTTPMethod.PUT,
    path: '/:id',
    handler: updateProjectDetails,
  },
  {
    method: HTTPMethod.GET,
    path: '/',
    handler: getProjectlist,
  },
  {
    method: HTTPMethod.GET,
    path: '/:id',
    handler: getProjectDataInDetail,
  },
];

export default router;
