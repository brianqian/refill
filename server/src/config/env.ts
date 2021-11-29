export interface EnvironmentVarSchema {
  PORT: string;
  MIKRO_ORM_TYPE: string;
  MIKRO_ORM_HOST: string;
  MIKRO_ORM_PORT: string;
  MIKRO_ORM_USER: string;
  MIKRO_ORM_PASSWORD: string;
  MIKRO_ORM_DB_NAME: string;
  JWT_SECRET: string;
  COOKIE_SECRET: string;
}

// interface ISchema  {
//   type: 'object';
//   required: keyof EnvironmentVarSchema[],
//   properties:

// }

const schema = {
  type: 'object',
  required: [
    'MIKRO_ORM_TYPE',
    'MIKRO_ORM_HOST',
    'MIKRO_ORM_PORT',
    'MIKRO_ORM_USER',
    'MIKRO_ORM_PASSWORD',
    'MIKRO_ORM_DB_NAME',
    'JWT_SECRET',
    'COOKIE_SECRET',
  ],
  properties: {
    PORT: {
      type: 'string',
      default: 8080,
    },

    MIKRO_ORM_TYPE: {
      type: 'string',
    },
    MIKRO_ORM_HOST: {
      type: 'string',
    },
    MIKRO_ORM_PORT: {
      type: 'string',
    },
    MIKRO_ORM_USER: {
      type: 'string',
    },
    MIKRO_ORM_PASSWORD: {
      type: 'string',
    },
    MIKRO_ORM_DB_NAME: {
      type: 'string',
    },
    JWT_SECRET: {
      type: 'string',
    },
    COOKIE_SECRET: {
      type: 'string',
    },
  },
};

export const fastifyEnvOptions = Object.freeze({
  schema,
  dotenv: {
    path: `${__dirname}/.env}`,
    debug: true,
  },
});
