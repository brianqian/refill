export interface EnvironmentSchema {
  PORT: string;
  MIKRO_ORM_TYPE: string;
  MIKRO_ORM_HOST: string;
  MIKRO_ORM_PORT: string;
  MIKRO_ORM_USER: string;
  MIKRO_ORM_PASSWORD: string;
  MIKRO_ORM_DB_NAME: string;
}

const schema = {
  type: 'object',
  required: [
    'MIKRO_ORM_TYPE',
    'MIKRO_ORM_HOST',
    'MIKRO_ORM_PORT',
    'MIKRO_ORM_USER',
    'MIKRO_ORM_PASSWORD',
    'MIKRO_ORM_DB_NAME',
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
  },
};

export const fastifyEnvOptions = Object.freeze({
  schema,
  dotenv: {
    path: `${__dirname}/.env}`,
    debug: true,
  },
});
