import { BadRequestError, ForbiddenError } from '@webexdx/koa-wrap/errors';
import type { Context } from 'koa';
import { tokenService } from '../../services/token/token.service';
import { objectId } from '../../utils/data-type-util';
import { validateObject } from '../../utils/schema-validator';
import {
  createTokenSchema,
  getEnvironmentTokensSchema,
  getUserTokensSchema,
  updateTokenSchema,
} from './token.schema';

export async function createToken(ctx: Context) {
  const { error, value } = validateObject<{
    name: string;
    environmentId: string;
    expiresInDays?: string | number;
  }>(createTokenSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const { userId } = ctx.state.user;

  const { name, environmentId, expiresInDays } = value;

  ctx.body = await tokenService.createToken({
    userId,
    name,
    environmentId: objectId(environmentId),
    expiresInDays: expiresInDays ? parseInt(expiresInDays.toString()) : undefined,
  });
}

export async function getToken(ctx: Context) {
  const { id } = ctx.params;
  const { userId } = ctx.state.user;

  if (
    !(await tokenService.hasReadAccessToToken({
      tokenId: objectId(id),
      userId,
    }))
  )
    throw new ForbiddenError('You dont have the access to this token');

  ctx.body = await tokenService.getToken({
    userId,
    tokenId: objectId(id),
  });
}

export async function getEnvironmentTokens(ctx: Context) {
  const { error, value } = validateObject<{ environmentId: string }>(
    getEnvironmentTokensSchema,
    ctx.request.body,
  );

  if (error) throw new BadRequestError(error.message);

  const { userId } = ctx.state.user;

  const { environmentId } = value;

  ctx.body = await tokenService.getEnvironmentTokens({
    userId,
    environmentId: objectId(environmentId),
  });
}

export async function getUserTokens(ctx: Context) {
  const { error, value } = validateObject<{ userId: string }>(
    getUserTokensSchema,
    ctx.request.body,
  );

  if (error) throw new BadRequestError(error.message);

  const { userId } = ctx.state.user;

  const { userId: targetUserId } = value;

  ctx.body = await tokenService.getUserTokens({
    userId,
    targetUserId: objectId(targetUserId),
  });
}

export async function updateToken(ctx: Context) {
  const { id } = ctx.params;
  const { error, value } = validateObject<{
    name?: string;
    isActive?: string | boolean;
    expiresInDays?: string | number;
  }>(updateTokenSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const { userId } = ctx.state.user;

  if (
    !(await tokenService.hasUpdateAccessToToken({
      tokenId: objectId(id),
      userId,
    }))
  )
    throw new ForbiddenError('You dont have the access to this token');

  const { name, isActive, expiresInDays } = value;

  ctx.body = await tokenService.updateToken({
    userId,
    tokenId: objectId(id),
    name,
    isActive: typeof isActive === 'boolean' ? isActive : isActive === 'true',
    expiresInDays: expiresInDays ? parseInt(expiresInDays.toString()) : undefined,
  });
}

export async function deleteToken(ctx: Context) {
  const { id } = ctx.params;
  const { userId } = ctx.state.user;

  if (
    !(await tokenService.hasDeleteAccessToToken({
      tokenId: objectId(id),
      userId,
    }))
  )
    throw new ForbiddenError('You dont have the access to this token');

  ctx.body = await tokenService.deleteToken({
    userId,
    tokenId: objectId(id),
  });
}

export async function deactivateToken(ctx: Context) {
  const { id } = ctx.params;
  const { userId } = ctx.state.user;

  if (
    !(await tokenService.hasUpdateAccessToToken({
      tokenId: objectId(id),
      userId,
    }))
  )
    throw new ForbiddenError('You dont have the access to this token');

  ctx.body = await tokenService.deactivateToken({
    userId,
    tokenId: objectId(id),
  });
}

export async function getActiveTokens(ctx: Context) {
  const { error, value } = validateObject<{ environmentId: string }>(
    getEnvironmentTokensSchema,
    ctx.request.body,
  );

  if (error) throw new BadRequestError(error.message);

  const { userId } = ctx.state.user;

  const { environmentId } = value;

  ctx.body = await tokenService.getActiveTokens({
    userId,
    environmentId: objectId(environmentId),
  });
}
