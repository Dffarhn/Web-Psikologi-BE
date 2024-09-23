import * as Joi from 'joi';

export const validationSchema = Joi.object({
  // Database config validation
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),

  // JWT secret validation
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),

  // NODE_ENV validation
  NODE_ENV: Joi.string().valid('development', 'production').default('development'),
});
