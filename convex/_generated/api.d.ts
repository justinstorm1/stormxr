/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as accounts from "../accounts.js";
import type * as activity from "../activity.js";
import type * as articles from "../articles.js";
import type * as auth from "../auth.js";
import type * as authHelpers from "../authHelpers.js";
import type * as crons from "../crons.js";
import type * as http from "../http.js";
import type * as media from "../media.js";
import type * as messages from "../messages.js";
import type * as signInEmail from "../signInEmail.js";
import type * as user from "../user.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  accounts: typeof accounts;
  activity: typeof activity;
  articles: typeof articles;
  auth: typeof auth;
  authHelpers: typeof authHelpers;
  crons: typeof crons;
  http: typeof http;
  media: typeof media;
  messages: typeof messages;
  signInEmail: typeof signInEmail;
  user: typeof user;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
