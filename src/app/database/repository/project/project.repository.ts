import { projectModal } from '../../modals';
import {
  CreateProjectParams,
  GetAccessLevelToProjectParams,
  GetAccessLevelToProjectResult,
  GetProjectListParams,
  GetProjectListResult,
  GetProjectParams,
  GetProjectResult,
  ProjectRepositoryInterface,
  ProjectUserParams,
  UpdateProjectAccessParams,
  UpdateProjectParams,
} from './project.repository.interface';
import { ProjectUser } from '../../modals/project.modal.interface';
import { ProjectAccessLevel } from '../../../config';

class ProjectRepository implements ProjectRepositoryInterface {
  private modal = projectModal;

  async createProject({ name, userId }: CreateProjectParams) {
    const response = await this.modal.insertOne({
      createdAt: new Date(),
      name,
      createdBy: userId,
      users: [{ userId: userId, accessLevel: ProjectAccessLevel.ADMIN }],
      environmentCount: 0,
    });

    if (!response.acknowledged) {
      throw new Error('Failed to insert project data');
    }
    return { projectId: response.insertedId };
  }

  async getProject({ projectId }: GetProjectParams): Promise<GetProjectResult> {
    const project = await this.modal.findOne({ _id: projectId });

    if (!project) throw new Error('No project found with the given id');

    return project;
  }

  async addProjectUser({ projectId, userId, accessLevel }: ProjectUserParams) {
    const projectUser: ProjectUser = {
      accessLevel: accessLevel,
      userId: userId,
    };

    const response = await this.modal.updateOne(
      { _id: projectId },
      { users: { $push: projectUser } }
    );

    if (!response.acknowledged || response.modifiedCount !== 1) {
      throw new Error('Failed to update project data');
    }
  }

  async updateProjectAccess({
    projectId,
    updatedAccess,
    userId,
  }: UpdateProjectAccessParams) {
    const response = await this.modal.updateOne(
      { _id: projectId, 'users.userId': userId },
      { $set: { 'users.$.accessLevel': updatedAccess } }
    );

    if (!response.acknowledged || response.modifiedCount !== 1) {
      throw new Error('Failed to update project data');
    }
  }

  async getProjectList({
    userId,
  }: GetProjectListParams): Promise<GetProjectListResult> {
    const list = await this.modal
      .find(
        {
          users: { $elemMatch: { userId: userId } },
        },
        { projection: { createdAt: 1, environmentCount: 1, name: 1 } }
      )
      .toArray();

    return list.map(elem => {
      return {
        projectId: elem._id,
        createdAt: elem.createdAt,
        environmentCount: elem.environmentCount,
        name: elem.name,
      };
    });
  }

  async updateProject({ projectId, name }: UpdateProjectParams): Promise<void> {
    const response = await this.modal.updateOne(
      { _id: projectId },
      { $set: { name: name } }
    );

    if (!response.acknowledged || response.modifiedCount !== 1) {
      throw new Error('Failed to update project data');
    }
  }

  async getAccessLevelToProject({
    projectId,
    userId,
  }: GetAccessLevelToProjectParams): Promise<GetAccessLevelToProjectResult> {
    return (
      await this.modal.findOne(
        { _id: projectId, 'users.userId': userId },
        { projection: { users: 1 } }
      )
    )?.users.find(elem => {
      return elem.userId.toString() === userId.toString();
    })?.accessLevel;
  }
}

export const projectRepository = new ProjectRepository();
