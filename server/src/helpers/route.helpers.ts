import { wrap } from './common.helpers';

type ValidRouteInputType = 'body' | 'params' | 'querystring';
type ValidRoutePayloadTypes = 'object' | 'number' | 'string' | 'boolean';
type RouteReponseSchema<T> = Record<number, RouteSchemaKey<T>>;
interface RouteRequestSchema<T> {
  body?: RouteSchemaKey<T>;
  params?: RouteSchemaKey<T>;
  querystring?: RouteSchemaKey<T>;
}

export enum RouteSchemaType {
  REQUEST = 'REQUEST',
  RESPONSE = 'RESPONSE',
}

export interface RouteRequest<T> {
  opts: {
    schema: RouteRequestSchema<T>;
  };
}
export interface RouteResponse<T> {
  opts: {
    schema: {
      response: RouteReponseSchema<T>;
    };
  };
}
interface RouteSchemaKey<T> {
  type: ValidRoutePayloadTypes;
  properties: T;
}

export function createValidationSchema<T>(
  inputType: ValidRouteInputType | undefined,
  input: T
): RouteRequest<T> | null {
  if (!inputType) return null;
  return {
    opts: {
      schema: {
        [inputType]: input,
      },
    },
  };
}

export const createSerializerSchema = <T>(
  statusCode: number,
  input: T
): RouteResponse<T> | null => {
  const type = typeof input;

  switch (type) {
    case 'string':
    case 'object':
    case 'number':
    case 'boolean':
      return {
        opts: {
          schema: {
            response: {
              [statusCode]: {
                type,
                properties: input,
              },
            },
          },
        },
      };
    default:
      return null;
  }
};

export class RouteSchema<T> {
  public schema: RouteRequest<T> | RouteResponse<T> | null;

  constructor(type: RouteSchemaType, args: { payload: T; routeInputType?: ValidRouteInputType }) {
    this.schema = wrap(() => {
      switch (type) {
        case RouteSchemaType.REQUEST:
          return createValidationSchema(args.routeInputType, args.payload);
        case RouteSchemaType.RESPONSE:
          return createSerializerSchema(200, args.payload);
        default:
          return null;
      }
    });
  }
}
