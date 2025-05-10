import { Context } from 'koa';
import { tokenService } from '../../services/token/token.service';
import {
  objectIdSchema,
  objectSchema,
  stringSchema,
  validateObject,
} from '../../utils/schema-validator';
import { BadRequestError, ForbiddenError } from '../../errors';
import { objectId } from '../../utils/data-type-util';

const createTokenSchema = objectSchema({
  object: {
    name: stringSchema({ min: 3, max: 50 }),
    environmentId: objectIdSchema(),
    userId: objectIdSchema(false),
    expiresInDays: stringSchema({ required: false }),
  },
});

const updateTokenSchema = objectSchema({
  object: {
    tokenId: objectIdSchema(),
    name: stringSchema({ min: 3, max: 50, required: false }),
    isActive: stringSchema({ required: false }),
    expiresInDays: stringSchema({ required: false }),
  },
});

const getTokenSchema = objectSchema({
  object: {
    tokenId: objectIdSchema(),
  },
});

const getEnvironmentTokensSchema = objectSchema({
  object: {
    environmentId: objectIdSchema(),
  },
});

const getUserTokensSchema = objectSchema({
  object: {
    userId: objectIdSchema(),
  },
});

export async function createToken(ctx: Context) {
  const { error, value } = validateObject<{
    name: string;
    environmentId: string;
    userId?: string;
    expiresInDays?: string;
  }>(createTokenSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const { userId, roleId } = ctx.state.user;

  if (!(await tokenService.hasAccessToCreateToken({ roleId })))
    throw new ForbiddenError('You dont have the access to create token');

  const { name, environmentId, expiresInDays } = value;

  ctx.body = await tokenService.createToken({
    userId,
    name,
    environmentId: objectId(environmentId),
    expiresInDays: expiresInDays ? parseInt(expiresInDays) : undefined,
  });
}

export async function getToken(ctx: Context) {
  const { error, value } = validateObject<{ tokenId: string }>(
    getTokenSchema,
    ctx.request.body
  );

  if (error) throw new BadRequestError(error.message);

  const { userId, roleId } = ctx.state.user;

  if (!(await tokenService.hasAccessToReadToken({ roleId })))
    throw new ForbiddenError('You dont have the access to read token');

  const { tokenId } = value;

  if (
    !(await tokenService.hasReadAccessToToken({
      tokenId: objectId(tokenId),
      userId,
    }))
  )
    throw new ForbiddenError('You dont have the access to this token');

  ctx.body = await tokenService.getToken({
    userId,
    tokenId: objectId(tokenId),
  });
}

export async function getEnvironmentTokens(ctx: Context) {
  const { error, value } = validateObject<{ environmentId: string }>(
    getEnvironmentTokensSchema,
    ctx.request.body
  );

  if (error) throw new BadRequestError(error.message);

  const { userId, roleId } = ctx.state.user;

  if (!(await tokenService.hasAccessToReadToken({ roleId })))
    throw new ForbiddenError('You dont have the access to read tokens');

  const { environmentId } = value;

  ctx.body = await tokenService.getEnvironmentTokens({
    userId,
    environmentId: objectId(environmentId),
  });
}

export async function getUserTokens(ctx: Context) {
  const { error, value } = validateObject<{ userId: string }>(
    getUserTokensSchema,
    ctx.request.body
  );

  if (error) throw new BadRequestError(error.message);

  const { userId, roleId } = ctx.state.user;

  if (!(await tokenService.hasAccessToReadToken({ roleId })))
    throw new ForbiddenError('You dont have the access to read tokens');

  const { userId: targetUserId } = value;

  ctx.body = await tokenService.getUserTokens({
    userId,
    targetUserId: objectId(targetUserId),
  });
}

export async function updateToken(ctx: Context) {
  const { error, value } = validateObject<{
    tokenId: string;
    name?: string;
    isActive?: string;
    expiresInDays?: string;
  }>(updateTokenSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const { userId, roleId } = ctx.state.user;

  if (!(await tokenService.hasAccessToUpdateToken({ roleId })))
    throw new ForbiddenError('You dont have the access to update token');

  const { tokenId, name, isActive, expiresInDays } = value;

  if (
    !(await tokenService.hasUpdateAccessToToken({
      tokenId: objectId(tokenId),
      userId,
    }))
  )
    throw new ForbiddenError('You dont have the access to this token');

  ctx.body = await tokenService.updateToken({
    userId,
    tokenId: objectId(tokenId),
    name,
    isActive: isActive === 'true',
    expiresInDays: expiresInDays ? parseInt(expiresInDays) : undefined,
  });
}

export async function deleteToken(ctx: Context) {
  const { error, value } = validateObject<{ tokenId: string }>(
    getTokenSchema,
    ctx.request.body
  );

  if (error) throw new BadRequestError(error.message);

  const { userId, roleId } = ctx.state.user;

  if (!(await tokenService.hasAccessToDeleteToken({ roleId })))
    throw new ForbiddenError('You dont have the access to delete token');

  const { tokenId } = value;

  if (
    !(await tokenService.hasDeleteAccessToToken({
      tokenId: objectId(tokenId),
      userId,
    }))
  )
    throw new ForbiddenError('You dont have the access to this token');

  ctx.body = await tokenService.deleteToken({
    userId,
    tokenId: objectId(tokenId),
  });
}

export async function deactivateToken(ctx: Context) {
  const { error, value } = validateObject<{ tokenId: string }>(
    getTokenSchema,
    ctx.request.body
  );

  if (error) throw new BadRequestError(error.message);

  const { userId, roleId } = ctx.state.user;

  if (!(await tokenService.hasAccessToUpdateToken({ roleId })))
    throw new ForbiddenError('You dont have the access to deactivate token');

  const { tokenId } = value;

  if (
    !(await tokenService.hasUpdateAccessToToken({
      tokenId: objectId(tokenId),
      userId,
    }))
  )
    throw new ForbiddenError('You dont have the access to this token');

  ctx.body = await tokenService.deactivateToken({
    userId,
    tokenId: objectId(tokenId),
  });
}

export async function getActiveTokens(ctx: Context) {
  const { error, value } = validateObject<{ environmentId: string }>(
    getEnvironmentTokensSchema,
    ctx.request.body
  );

  if (error) throw new BadRequestError(error.message);

  const { userId, roleId } = ctx.state.user;

  if (!(await tokenService.hasAccessToReadToken({ roleId })))
    throw new ForbiddenError('You dont have the access to read tokens');

  const { environmentId } = value;

  ctx.body = await tokenService.getActiveTokens({
    userId,
    environmentId: objectId(environmentId),
  });
} 