import { errorMiddleware as errorMWGenerator } from '@webexdx/koa-wrap/middlewares';

const errorMiddleware = errorMWGenerator();

export default errorMiddleware;
