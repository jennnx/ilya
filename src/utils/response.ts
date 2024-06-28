import { z } from "zod";
import { type APIRoute as AstroAPIRoute } from "astro";

/**
    In order to narrow the return type of the default Response.json() method,
    we need to explicitly set a brand.
*/
type Brand<K, T> = T & { __brand: K };

/**
    TypedResponse assumes your handler is Async.
    Use awaited type for synchronous handlers.
*/
type TypedJSONResponse<T> = Brand<
  "TypedJSONResponse",
  Omit<Response, "json"> & { json(): Promise<T> }
>;

const createTypedJSONResponse = <T>(
  body: T,
  init?: ResponseInit,
): TypedJSONResponse<T> => {
  return Response.json(body, init) as TypedJSONResponse<T>;
};

export const json = createTypedJSONResponse;

export type IlyaEndpoint<T> = (
  context: Parameters<AstroAPIRoute>[0],
) => TypedJSONResponse<T> | Promise<TypedJSONResponse<T>>;

/**
    Fetches the given URL and validates the response against the given schema.
    Only throws if the response is not a valid shape
    Will not throw for when `ok` is false
*/
export const validatedFetch = async <T>(
  url: string,
  schema: z.ZodSchema<T>,
  options?: RequestInit,
): Promise<[Response, T]> => {
  const response = await fetch(url, options);
  const json = await response.json();
  return [response, schema.parse(json)];
};
