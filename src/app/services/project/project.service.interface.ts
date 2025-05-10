import { ObjectId } from '@i/common.interface';

export interface CreateProjectParams {
  name: string;
  userId: ObjectId;
}

export interface CreateProjectResult {
  projectId: ObjectId;
}

export interface AddProjectUserParams {
  name: string;
  userId: ObjectId;
}

export interface GetProjectParams {
  userId: ObjectId;
}

export interface ProjectInfo {
  projectId: ObjectId;
  createdAt: Date;
  environmentCount: number;
  name: string;
}

export interface HasAccessParams {
  roleId: ObjectId;
}

export interface HasAccessToProjectParams {
  projectId: ObjectId;
  userId: ObjectId;
}

export type GetProjectListResult = ProjectInfo[];

export interface UpdateProjectParams {
  projectId: ObjectId;
  name: string;
}

export interface GetProjectDataInDetailParams {
  projectId: ObjectId;
  userId: ObjectId;
}
export interface GetProjectDataInDetailResult {
  id: ObjectId;
  name: string;
  createdAt: Date;
  environments: {
    id: ObjectId;
    environmentName: string;
    variables: {
      key: string;
      value: string;
      isOverride: boolean;
    }[];
  }[];
}
export interface ProjectServiceInterface {
  createProject(params: CreateProjectParams): Promise<CreateProjectResult>;

  getProjectList(params: GetProjectParams): Promise<GetProjectListResult>;

  // addProjectUser(params: AddProjectUserParams): Promise<void>;

  updateProject(params: UpdateProjectParams): Promise<void>;

  hasAccessToCreateProject(params: HasAccessParams): Promise<boolean>;

  hasAccessToReadProject(params: HasAccessParams): Promise<boolean>;

  hasEditAccessToProject(params: HasAccessToProjectParams): Promise<boolean>;

  hasReadAccessToProject(params: HasAccessToProjectParams): Promise<boolean>;

  getProjectDataInDetail(
    params: GetProjectDataInDetailParams
  ): Promise<GetProjectDataInDetailResult>;
}
