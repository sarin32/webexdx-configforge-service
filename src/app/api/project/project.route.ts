import { HTTPMethod, type Router } from '@webexdx/koa-wrap/server';
import {
  createProject,
  deleteProject,
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
  {
    method: HTTPMethod.DELETE,
    path: '/:id',
    handler: deleteProject,
  },
];

export default router;
