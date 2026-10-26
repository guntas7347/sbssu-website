
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Notice
 * 
 */
export type Notice = $Result.DefaultSelection<Prisma.$NoticePayload>
/**
 * Model Page
 * 
 */
export type Page = $Result.DefaultSelection<Prisma.$PagePayload>
/**
 * Model Department
 * 
 */
export type Department = $Result.DefaultSelection<Prisma.$DepartmentPayload>
/**
 * Model Placements
 * 
 */
export type Placements = $Result.DefaultSelection<Prisma.$PlacementsPayload>
/**
 * Model LegacyWebsite
 * 
 */
export type LegacyWebsite = $Result.DefaultSelection<Prisma.$LegacyWebsitePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PageScope: {
  CENTRAL: 'CENTRAL',
  DEPARTMENT: 'DEPARTMENT'
};

export type PageScope = (typeof PageScope)[keyof typeof PageScope]


export const Role: {
  SUPER_ADMIN: 'SUPER_ADMIN',
  CENTRAL_EDITOR: 'CENTRAL_EDITOR',
  HOD: 'HOD',
  DEPT_EDITOR: 'DEPT_EDITOR'
};

export type Role = (typeof Role)[keyof typeof Role]


export const NoticeScope: {
  CENTRAL: 'CENTRAL',
  DEPARTMENT: 'DEPARTMENT'
};

export type NoticeScope = (typeof NoticeScope)[keyof typeof NoticeScope]

}

export type PageScope = $Enums.PageScope

export const PageScope: typeof $Enums.PageScope

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type NoticeScope = $Enums.NoticeScope

export const NoticeScope: typeof $Enums.NoticeScope

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notice`: Exposes CRUD operations for the **Notice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notices
    * const notices = await prisma.notice.findMany()
    * ```
    */
  get notice(): Prisma.NoticeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.page`: Exposes CRUD operations for the **Page** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pages
    * const pages = await prisma.page.findMany()
    * ```
    */
  get page(): Prisma.PageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.department`: Exposes CRUD operations for the **Department** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.department.findMany()
    * ```
    */
  get department(): Prisma.DepartmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.placements`: Exposes CRUD operations for the **Placements** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Placements
    * const placements = await prisma.placements.findMany()
    * ```
    */
  get placements(): Prisma.PlacementsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.legacyWebsite`: Exposes CRUD operations for the **LegacyWebsite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LegacyWebsites
    * const legacyWebsites = await prisma.legacyWebsite.findMany()
    * ```
    */
  get legacyWebsite(): Prisma.LegacyWebsiteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.1
   * Query Engine version: d1b3f377ca835d73fd50954a5e22128b9ebdd6b8
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Notice: 'Notice',
    Page: 'Page',
    Department: 'Department',
    Placements: 'Placements',
    LegacyWebsite: 'LegacyWebsite'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "notice" | "page" | "department" | "placements" | "legacyWebsite"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Notice: {
        payload: Prisma.$NoticePayload<ExtArgs>
        fields: Prisma.NoticeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NoticeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NoticeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          findFirst: {
            args: Prisma.NoticeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NoticeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          findMany: {
            args: Prisma.NoticeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>[]
          }
          create: {
            args: Prisma.NoticeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          createMany: {
            args: Prisma.NoticeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NoticeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>[]
          }
          delete: {
            args: Prisma.NoticeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          update: {
            args: Prisma.NoticeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          deleteMany: {
            args: Prisma.NoticeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NoticeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NoticeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>[]
          }
          upsert: {
            args: Prisma.NoticeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          aggregate: {
            args: Prisma.NoticeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotice>
          }
          groupBy: {
            args: Prisma.NoticeGroupByArgs<ExtArgs>
            result: $Utils.Optional<NoticeGroupByOutputType>[]
          }
          count: {
            args: Prisma.NoticeCountArgs<ExtArgs>
            result: $Utils.Optional<NoticeCountAggregateOutputType> | number
          }
        }
      }
      Page: {
        payload: Prisma.$PagePayload<ExtArgs>
        fields: Prisma.PageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          findFirst: {
            args: Prisma.PageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          findMany: {
            args: Prisma.PageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          create: {
            args: Prisma.PageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          createMany: {
            args: Prisma.PageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          delete: {
            args: Prisma.PageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          update: {
            args: Prisma.PageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          deleteMany: {
            args: Prisma.PageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>[]
          }
          upsert: {
            args: Prisma.PageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PagePayload>
          }
          aggregate: {
            args: Prisma.PageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePage>
          }
          groupBy: {
            args: Prisma.PageGroupByArgs<ExtArgs>
            result: $Utils.Optional<PageGroupByOutputType>[]
          }
          count: {
            args: Prisma.PageCountArgs<ExtArgs>
            result: $Utils.Optional<PageCountAggregateOutputType> | number
          }
        }
      }
      Department: {
        payload: Prisma.$DepartmentPayload<ExtArgs>
        fields: Prisma.DepartmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DepartmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DepartmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findFirst: {
            args: Prisma.DepartmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DepartmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findMany: {
            args: Prisma.DepartmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          create: {
            args: Prisma.DepartmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          createMany: {
            args: Prisma.DepartmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DepartmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          delete: {
            args: Prisma.DepartmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          update: {
            args: Prisma.DepartmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          deleteMany: {
            args: Prisma.DepartmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DepartmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DepartmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          upsert: {
            args: Prisma.DepartmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          aggregate: {
            args: Prisma.DepartmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDepartment>
          }
          groupBy: {
            args: Prisma.DepartmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DepartmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DepartmentCountArgs<ExtArgs>
            result: $Utils.Optional<DepartmentCountAggregateOutputType> | number
          }
        }
      }
      Placements: {
        payload: Prisma.$PlacementsPayload<ExtArgs>
        fields: Prisma.PlacementsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlacementsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlacementsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementsPayload>
          }
          findFirst: {
            args: Prisma.PlacementsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlacementsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementsPayload>
          }
          findMany: {
            args: Prisma.PlacementsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementsPayload>[]
          }
          create: {
            args: Prisma.PlacementsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementsPayload>
          }
          createMany: {
            args: Prisma.PlacementsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlacementsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementsPayload>[]
          }
          delete: {
            args: Prisma.PlacementsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementsPayload>
          }
          update: {
            args: Prisma.PlacementsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementsPayload>
          }
          deleteMany: {
            args: Prisma.PlacementsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlacementsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlacementsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementsPayload>[]
          }
          upsert: {
            args: Prisma.PlacementsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlacementsPayload>
          }
          aggregate: {
            args: Prisma.PlacementsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlacements>
          }
          groupBy: {
            args: Prisma.PlacementsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlacementsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlacementsCountArgs<ExtArgs>
            result: $Utils.Optional<PlacementsCountAggregateOutputType> | number
          }
        }
      }
      LegacyWebsite: {
        payload: Prisma.$LegacyWebsitePayload<ExtArgs>
        fields: Prisma.LegacyWebsiteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LegacyWebsiteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyWebsitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LegacyWebsiteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyWebsitePayload>
          }
          findFirst: {
            args: Prisma.LegacyWebsiteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyWebsitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LegacyWebsiteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyWebsitePayload>
          }
          findMany: {
            args: Prisma.LegacyWebsiteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyWebsitePayload>[]
          }
          create: {
            args: Prisma.LegacyWebsiteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyWebsitePayload>
          }
          createMany: {
            args: Prisma.LegacyWebsiteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LegacyWebsiteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyWebsitePayload>[]
          }
          delete: {
            args: Prisma.LegacyWebsiteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyWebsitePayload>
          }
          update: {
            args: Prisma.LegacyWebsiteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyWebsitePayload>
          }
          deleteMany: {
            args: Prisma.LegacyWebsiteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LegacyWebsiteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LegacyWebsiteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyWebsitePayload>[]
          }
          upsert: {
            args: Prisma.LegacyWebsiteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LegacyWebsitePayload>
          }
          aggregate: {
            args: Prisma.LegacyWebsiteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLegacyWebsite>
          }
          groupBy: {
            args: Prisma.LegacyWebsiteGroupByArgs<ExtArgs>
            result: $Utils.Optional<LegacyWebsiteGroupByOutputType>[]
          }
          count: {
            args: Prisma.LegacyWebsiteCountArgs<ExtArgs>
            result: $Utils.Optional<LegacyWebsiteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    notice?: NoticeOmit
    page?: PageOmit
    department?: DepartmentOmit
    placements?: PlacementsOmit
    legacyWebsite?: LegacyWebsiteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    notices: number
    pages: number
    placements: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notices?: boolean | UserCountOutputTypeCountNoticesArgs
    pages?: boolean | UserCountOutputTypeCountPagesArgs
    placements?: boolean | UserCountOutputTypeCountPlacementsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNoticesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoticeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPlacementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlacementsWhereInput
  }


  /**
   * Count Type DepartmentCountOutputType
   */

  export type DepartmentCountOutputType = {
    users: number
    pages: number
    notices: number
  }

  export type DepartmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | DepartmentCountOutputTypeCountUsersArgs
    pages?: boolean | DepartmentCountOutputTypeCountPagesArgs
    notices?: boolean | DepartmentCountOutputTypeCountNoticesArgs
  }

  // Custom InputTypes
  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DepartmentCountOutputType
     */
    select?: DepartmentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountPagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
  }

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountNoticesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoticeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    passwordHash: string | null
    email: string | null
    fullName: string | null
    staffCode: string | null
    designation: string | null
    phone: string | null
    departmentId: string | null
    loginEnabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    passwordHash: string | null
    email: string | null
    fullName: string | null
    staffCode: string | null
    designation: string | null
    phone: string | null
    departmentId: string | null
    loginEnabled: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    passwordHash: number
    email: number
    fullName: number
    staffCode: number
    designation: number
    phone: number
    departmentId: number
    roles: number
    loginEnabled: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    email?: true
    fullName?: true
    staffCode?: true
    designation?: true
    phone?: true
    departmentId?: true
    loginEnabled?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    email?: true
    fullName?: true
    staffCode?: true
    designation?: true
    phone?: true
    departmentId?: true
    loginEnabled?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    email?: true
    fullName?: true
    staffCode?: true
    designation?: true
    phone?: true
    departmentId?: true
    roles?: true
    loginEnabled?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    passwordHash: string
    email: string
    fullName: string
    staffCode: string | null
    designation: string | null
    phone: string | null
    departmentId: string | null
    roles: $Enums.Role[]
    loginEnabled: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    email?: boolean
    fullName?: boolean
    staffCode?: boolean
    designation?: boolean
    phone?: boolean
    departmentId?: boolean
    roles?: boolean
    loginEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    department?: boolean | User$departmentArgs<ExtArgs>
    notices?: boolean | User$noticesArgs<ExtArgs>
    pages?: boolean | User$pagesArgs<ExtArgs>
    placements?: boolean | User$placementsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    email?: boolean
    fullName?: boolean
    staffCode?: boolean
    designation?: boolean
    phone?: boolean
    departmentId?: boolean
    roles?: boolean
    loginEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    department?: boolean | User$departmentArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    email?: boolean
    fullName?: boolean
    staffCode?: boolean
    designation?: boolean
    phone?: boolean
    departmentId?: boolean
    roles?: boolean
    loginEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    department?: boolean | User$departmentArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    email?: boolean
    fullName?: boolean
    staffCode?: boolean
    designation?: boolean
    phone?: boolean
    departmentId?: boolean
    roles?: boolean
    loginEnabled?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "passwordHash" | "email" | "fullName" | "staffCode" | "designation" | "phone" | "departmentId" | "roles" | "loginEnabled" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | User$departmentArgs<ExtArgs>
    notices?: boolean | User$noticesArgs<ExtArgs>
    pages?: boolean | User$pagesArgs<ExtArgs>
    placements?: boolean | User$placementsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | User$departmentArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | User$departmentArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      department: Prisma.$DepartmentPayload<ExtArgs> | null
      notices: Prisma.$NoticePayload<ExtArgs>[]
      pages: Prisma.$PagePayload<ExtArgs>[]
      placements: Prisma.$PlacementsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      passwordHash: string
      email: string
      fullName: string
      staffCode: string | null
      designation: string | null
      phone: string | null
      departmentId: string | null
      roles: $Enums.Role[]
      loginEnabled: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    department<T extends User$departmentArgs<ExtArgs> = {}>(args?: Subset<T, User$departmentArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    notices<T extends User$noticesArgs<ExtArgs> = {}>(args?: Subset<T, User$noticesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pages<T extends User$pagesArgs<ExtArgs> = {}>(args?: Subset<T, User$pagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    placements<T extends User$placementsArgs<ExtArgs> = {}>(args?: Subset<T, User$placementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly staffCode: FieldRef<"User", 'String'>
    readonly designation: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly departmentId: FieldRef<"User", 'String'>
    readonly roles: FieldRef<"User", 'Role[]'>
    readonly loginEnabled: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.department
   */
  export type User$departmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    where?: DepartmentWhereInput
  }

  /**
   * User.notices
   */
  export type User$noticesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    where?: NoticeWhereInput
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    cursor?: NoticeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoticeScalarFieldEnum | NoticeScalarFieldEnum[]
  }

  /**
   * User.pages
   */
  export type User$pagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    where?: PageWhereInput
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    cursor?: PageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * User.placements
   */
  export type User$placementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placements
     */
    select?: PlacementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placements
     */
    omit?: PlacementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementsInclude<ExtArgs> | null
    where?: PlacementsWhereInput
    orderBy?: PlacementsOrderByWithRelationInput | PlacementsOrderByWithRelationInput[]
    cursor?: PlacementsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlacementsScalarFieldEnum | PlacementsScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Notice
   */

  export type AggregateNotice = {
    _count: NoticeCountAggregateOutputType | null
    _min: NoticeMinAggregateOutputType | null
    _max: NoticeMaxAggregateOutputType | null
  }

  export type NoticeMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    refNumber: string | null
    date: Date | null
    showTill: Date | null
    category: string | null
    fileName: string | null
    filePath: string | null
    scope: $Enums.NoticeScope | null
    departmentId: string | null
    createdAt: Date | null
    createdBy: string | null
  }

  export type NoticeMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    refNumber: string | null
    date: Date | null
    showTill: Date | null
    category: string | null
    fileName: string | null
    filePath: string | null
    scope: $Enums.NoticeScope | null
    departmentId: string | null
    createdAt: Date | null
    createdBy: string | null
  }

  export type NoticeCountAggregateOutputType = {
    id: number
    title: number
    description: number
    refNumber: number
    date: number
    showTill: number
    category: number
    fileName: number
    filePath: number
    scope: number
    departmentId: number
    createdAt: number
    createdBy: number
    _all: number
  }


  export type NoticeMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    refNumber?: true
    date?: true
    showTill?: true
    category?: true
    fileName?: true
    filePath?: true
    scope?: true
    departmentId?: true
    createdAt?: true
    createdBy?: true
  }

  export type NoticeMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    refNumber?: true
    date?: true
    showTill?: true
    category?: true
    fileName?: true
    filePath?: true
    scope?: true
    departmentId?: true
    createdAt?: true
    createdBy?: true
  }

  export type NoticeCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    refNumber?: true
    date?: true
    showTill?: true
    category?: true
    fileName?: true
    filePath?: true
    scope?: true
    departmentId?: true
    createdAt?: true
    createdBy?: true
    _all?: true
  }

  export type NoticeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notice to aggregate.
     */
    where?: NoticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notices to fetch.
     */
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NoticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notices
    **/
    _count?: true | NoticeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NoticeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NoticeMaxAggregateInputType
  }

  export type GetNoticeAggregateType<T extends NoticeAggregateArgs> = {
        [P in keyof T & keyof AggregateNotice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotice[P]>
      : GetScalarType<T[P], AggregateNotice[P]>
  }




  export type NoticeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoticeWhereInput
    orderBy?: NoticeOrderByWithAggregationInput | NoticeOrderByWithAggregationInput[]
    by: NoticeScalarFieldEnum[] | NoticeScalarFieldEnum
    having?: NoticeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NoticeCountAggregateInputType | true
    _min?: NoticeMinAggregateInputType
    _max?: NoticeMaxAggregateInputType
  }

  export type NoticeGroupByOutputType = {
    id: string
    title: string
    description: string | null
    refNumber: string | null
    date: Date
    showTill: Date | null
    category: string
    fileName: string | null
    filePath: string | null
    scope: $Enums.NoticeScope | null
    departmentId: string | null
    createdAt: Date
    createdBy: string | null
    _count: NoticeCountAggregateOutputType | null
    _min: NoticeMinAggregateOutputType | null
    _max: NoticeMaxAggregateOutputType | null
  }

  type GetNoticeGroupByPayload<T extends NoticeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NoticeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NoticeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NoticeGroupByOutputType[P]>
            : GetScalarType<T[P], NoticeGroupByOutputType[P]>
        }
      >
    >


  export type NoticeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    refNumber?: boolean
    date?: boolean
    showTill?: boolean
    category?: boolean
    fileName?: boolean
    filePath?: boolean
    scope?: boolean
    departmentId?: boolean
    createdAt?: boolean
    createdBy?: boolean
    department?: boolean | Notice$departmentArgs<ExtArgs>
    creator?: boolean | Notice$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["notice"]>

  export type NoticeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    refNumber?: boolean
    date?: boolean
    showTill?: boolean
    category?: boolean
    fileName?: boolean
    filePath?: boolean
    scope?: boolean
    departmentId?: boolean
    createdAt?: boolean
    createdBy?: boolean
    department?: boolean | Notice$departmentArgs<ExtArgs>
    creator?: boolean | Notice$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["notice"]>

  export type NoticeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    refNumber?: boolean
    date?: boolean
    showTill?: boolean
    category?: boolean
    fileName?: boolean
    filePath?: boolean
    scope?: boolean
    departmentId?: boolean
    createdAt?: boolean
    createdBy?: boolean
    department?: boolean | Notice$departmentArgs<ExtArgs>
    creator?: boolean | Notice$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["notice"]>

  export type NoticeSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    refNumber?: boolean
    date?: boolean
    showTill?: boolean
    category?: boolean
    fileName?: boolean
    filePath?: boolean
    scope?: boolean
    departmentId?: boolean
    createdAt?: boolean
    createdBy?: boolean
  }

  export type NoticeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "refNumber" | "date" | "showTill" | "category" | "fileName" | "filePath" | "scope" | "departmentId" | "createdAt" | "createdBy", ExtArgs["result"]["notice"]>
  export type NoticeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | Notice$departmentArgs<ExtArgs>
    creator?: boolean | Notice$creatorArgs<ExtArgs>
  }
  export type NoticeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | Notice$departmentArgs<ExtArgs>
    creator?: boolean | Notice$creatorArgs<ExtArgs>
  }
  export type NoticeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | Notice$departmentArgs<ExtArgs>
    creator?: boolean | Notice$creatorArgs<ExtArgs>
  }

  export type $NoticePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notice"
    objects: {
      department: Prisma.$DepartmentPayload<ExtArgs> | null
      creator: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      refNumber: string | null
      date: Date
      showTill: Date | null
      category: string
      fileName: string | null
      filePath: string | null
      scope: $Enums.NoticeScope | null
      departmentId: string | null
      createdAt: Date
      createdBy: string | null
    }, ExtArgs["result"]["notice"]>
    composites: {}
  }

  type NoticeGetPayload<S extends boolean | null | undefined | NoticeDefaultArgs> = $Result.GetResult<Prisma.$NoticePayload, S>

  type NoticeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NoticeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NoticeCountAggregateInputType | true
    }

  export interface NoticeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notice'], meta: { name: 'Notice' } }
    /**
     * Find zero or one Notice that matches the filter.
     * @param {NoticeFindUniqueArgs} args - Arguments to find a Notice
     * @example
     * // Get one Notice
     * const notice = await prisma.notice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NoticeFindUniqueArgs>(args: SelectSubset<T, NoticeFindUniqueArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NoticeFindUniqueOrThrowArgs} args - Arguments to find a Notice
     * @example
     * // Get one Notice
     * const notice = await prisma.notice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NoticeFindUniqueOrThrowArgs>(args: SelectSubset<T, NoticeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeFindFirstArgs} args - Arguments to find a Notice
     * @example
     * // Get one Notice
     * const notice = await prisma.notice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NoticeFindFirstArgs>(args?: SelectSubset<T, NoticeFindFirstArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeFindFirstOrThrowArgs} args - Arguments to find a Notice
     * @example
     * // Get one Notice
     * const notice = await prisma.notice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NoticeFindFirstOrThrowArgs>(args?: SelectSubset<T, NoticeFindFirstOrThrowArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notices
     * const notices = await prisma.notice.findMany()
     * 
     * // Get first 10 Notices
     * const notices = await prisma.notice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const noticeWithIdOnly = await prisma.notice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NoticeFindManyArgs>(args?: SelectSubset<T, NoticeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notice.
     * @param {NoticeCreateArgs} args - Arguments to create a Notice.
     * @example
     * // Create one Notice
     * const Notice = await prisma.notice.create({
     *   data: {
     *     // ... data to create a Notice
     *   }
     * })
     * 
     */
    create<T extends NoticeCreateArgs>(args: SelectSubset<T, NoticeCreateArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notices.
     * @param {NoticeCreateManyArgs} args - Arguments to create many Notices.
     * @example
     * // Create many Notices
     * const notice = await prisma.notice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NoticeCreateManyArgs>(args?: SelectSubset<T, NoticeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notices and returns the data saved in the database.
     * @param {NoticeCreateManyAndReturnArgs} args - Arguments to create many Notices.
     * @example
     * // Create many Notices
     * const notice = await prisma.notice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notices and only return the `id`
     * const noticeWithIdOnly = await prisma.notice.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NoticeCreateManyAndReturnArgs>(args?: SelectSubset<T, NoticeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notice.
     * @param {NoticeDeleteArgs} args - Arguments to delete one Notice.
     * @example
     * // Delete one Notice
     * const Notice = await prisma.notice.delete({
     *   where: {
     *     // ... filter to delete one Notice
     *   }
     * })
     * 
     */
    delete<T extends NoticeDeleteArgs>(args: SelectSubset<T, NoticeDeleteArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notice.
     * @param {NoticeUpdateArgs} args - Arguments to update one Notice.
     * @example
     * // Update one Notice
     * const notice = await prisma.notice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NoticeUpdateArgs>(args: SelectSubset<T, NoticeUpdateArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notices.
     * @param {NoticeDeleteManyArgs} args - Arguments to filter Notices to delete.
     * @example
     * // Delete a few Notices
     * const { count } = await prisma.notice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NoticeDeleteManyArgs>(args?: SelectSubset<T, NoticeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notices
     * const notice = await prisma.notice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NoticeUpdateManyArgs>(args: SelectSubset<T, NoticeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notices and returns the data updated in the database.
     * @param {NoticeUpdateManyAndReturnArgs} args - Arguments to update many Notices.
     * @example
     * // Update many Notices
     * const notice = await prisma.notice.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notices and only return the `id`
     * const noticeWithIdOnly = await prisma.notice.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NoticeUpdateManyAndReturnArgs>(args: SelectSubset<T, NoticeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notice.
     * @param {NoticeUpsertArgs} args - Arguments to update or create a Notice.
     * @example
     * // Update or create a Notice
     * const notice = await prisma.notice.upsert({
     *   create: {
     *     // ... data to create a Notice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notice we want to update
     *   }
     * })
     */
    upsert<T extends NoticeUpsertArgs>(args: SelectSubset<T, NoticeUpsertArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeCountArgs} args - Arguments to filter Notices to count.
     * @example
     * // Count the number of Notices
     * const count = await prisma.notice.count({
     *   where: {
     *     // ... the filter for the Notices we want to count
     *   }
     * })
    **/
    count<T extends NoticeCountArgs>(
      args?: Subset<T, NoticeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NoticeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NoticeAggregateArgs>(args: Subset<T, NoticeAggregateArgs>): Prisma.PrismaPromise<GetNoticeAggregateType<T>>

    /**
     * Group by Notice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NoticeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NoticeGroupByArgs['orderBy'] }
        : { orderBy?: NoticeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NoticeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNoticeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notice model
   */
  readonly fields: NoticeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NoticeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    department<T extends Notice$departmentArgs<ExtArgs> = {}>(args?: Subset<T, Notice$departmentArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    creator<T extends Notice$creatorArgs<ExtArgs> = {}>(args?: Subset<T, Notice$creatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notice model
   */
  interface NoticeFieldRefs {
    readonly id: FieldRef<"Notice", 'String'>
    readonly title: FieldRef<"Notice", 'String'>
    readonly description: FieldRef<"Notice", 'String'>
    readonly refNumber: FieldRef<"Notice", 'String'>
    readonly date: FieldRef<"Notice", 'DateTime'>
    readonly showTill: FieldRef<"Notice", 'DateTime'>
    readonly category: FieldRef<"Notice", 'String'>
    readonly fileName: FieldRef<"Notice", 'String'>
    readonly filePath: FieldRef<"Notice", 'String'>
    readonly scope: FieldRef<"Notice", 'NoticeScope'>
    readonly departmentId: FieldRef<"Notice", 'String'>
    readonly createdAt: FieldRef<"Notice", 'DateTime'>
    readonly createdBy: FieldRef<"Notice", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Notice findUnique
   */
  export type NoticeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * Filter, which Notice to fetch.
     */
    where: NoticeWhereUniqueInput
  }

  /**
   * Notice findUniqueOrThrow
   */
  export type NoticeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * Filter, which Notice to fetch.
     */
    where: NoticeWhereUniqueInput
  }

  /**
   * Notice findFirst
   */
  export type NoticeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * Filter, which Notice to fetch.
     */
    where?: NoticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notices to fetch.
     */
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notices.
     */
    cursor?: NoticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notices.
     */
    distinct?: NoticeScalarFieldEnum | NoticeScalarFieldEnum[]
  }

  /**
   * Notice findFirstOrThrow
   */
  export type NoticeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * Filter, which Notice to fetch.
     */
    where?: NoticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notices to fetch.
     */
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notices.
     */
    cursor?: NoticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notices.
     */
    distinct?: NoticeScalarFieldEnum | NoticeScalarFieldEnum[]
  }

  /**
   * Notice findMany
   */
  export type NoticeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * Filter, which Notices to fetch.
     */
    where?: NoticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notices to fetch.
     */
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notices.
     */
    cursor?: NoticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notices.
     */
    distinct?: NoticeScalarFieldEnum | NoticeScalarFieldEnum[]
  }

  /**
   * Notice create
   */
  export type NoticeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * The data needed to create a Notice.
     */
    data: XOR<NoticeCreateInput, NoticeUncheckedCreateInput>
  }

  /**
   * Notice createMany
   */
  export type NoticeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notices.
     */
    data: NoticeCreateManyInput | NoticeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notice createManyAndReturn
   */
  export type NoticeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * The data used to create many Notices.
     */
    data: NoticeCreateManyInput | NoticeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notice update
   */
  export type NoticeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * The data needed to update a Notice.
     */
    data: XOR<NoticeUpdateInput, NoticeUncheckedUpdateInput>
    /**
     * Choose, which Notice to update.
     */
    where: NoticeWhereUniqueInput
  }

  /**
   * Notice updateMany
   */
  export type NoticeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notices.
     */
    data: XOR<NoticeUpdateManyMutationInput, NoticeUncheckedUpdateManyInput>
    /**
     * Filter which Notices to update
     */
    where?: NoticeWhereInput
    /**
     * Limit how many Notices to update.
     */
    limit?: number
  }

  /**
   * Notice updateManyAndReturn
   */
  export type NoticeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * The data used to update Notices.
     */
    data: XOR<NoticeUpdateManyMutationInput, NoticeUncheckedUpdateManyInput>
    /**
     * Filter which Notices to update
     */
    where?: NoticeWhereInput
    /**
     * Limit how many Notices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notice upsert
   */
  export type NoticeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * The filter to search for the Notice to update in case it exists.
     */
    where: NoticeWhereUniqueInput
    /**
     * In case the Notice found by the `where` argument doesn't exist, create a new Notice with this data.
     */
    create: XOR<NoticeCreateInput, NoticeUncheckedCreateInput>
    /**
     * In case the Notice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NoticeUpdateInput, NoticeUncheckedUpdateInput>
  }

  /**
   * Notice delete
   */
  export type NoticeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    /**
     * Filter which Notice to delete.
     */
    where: NoticeWhereUniqueInput
  }

  /**
   * Notice deleteMany
   */
  export type NoticeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notices to delete
     */
    where?: NoticeWhereInput
    /**
     * Limit how many Notices to delete.
     */
    limit?: number
  }

  /**
   * Notice.department
   */
  export type Notice$departmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    where?: DepartmentWhereInput
  }

  /**
   * Notice.creator
   */
  export type Notice$creatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Notice without action
   */
  export type NoticeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
  }


  /**
   * Model Page
   */

  export type AggregatePage = {
    _count: PageCountAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  export type PageMinAggregateOutputType = {
    id: string | null
    pageKey: string | null
    scope: $Enums.PageScope | null
    departmentId: string | null
    updatedAt: Date | null
    createdAt: Date | null
    createdBy: string | null
  }

  export type PageMaxAggregateOutputType = {
    id: string | null
    pageKey: string | null
    scope: $Enums.PageScope | null
    departmentId: string | null
    updatedAt: Date | null
    createdAt: Date | null
    createdBy: string | null
  }

  export type PageCountAggregateOutputType = {
    id: number
    pageKey: number
    scope: number
    departmentId: number
    data: number
    updatedAt: number
    createdAt: number
    createdBy: number
    _all: number
  }


  export type PageMinAggregateInputType = {
    id?: true
    pageKey?: true
    scope?: true
    departmentId?: true
    updatedAt?: true
    createdAt?: true
    createdBy?: true
  }

  export type PageMaxAggregateInputType = {
    id?: true
    pageKey?: true
    scope?: true
    departmentId?: true
    updatedAt?: true
    createdAt?: true
    createdBy?: true
  }

  export type PageCountAggregateInputType = {
    id?: true
    pageKey?: true
    scope?: true
    departmentId?: true
    data?: true
    updatedAt?: true
    createdAt?: true
    createdBy?: true
    _all?: true
  }

  export type PageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Page to aggregate.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pages
    **/
    _count?: true | PageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PageMaxAggregateInputType
  }

  export type GetPageAggregateType<T extends PageAggregateArgs> = {
        [P in keyof T & keyof AggregatePage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePage[P]>
      : GetScalarType<T[P], AggregatePage[P]>
  }




  export type PageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PageWhereInput
    orderBy?: PageOrderByWithAggregationInput | PageOrderByWithAggregationInput[]
    by: PageScalarFieldEnum[] | PageScalarFieldEnum
    having?: PageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PageCountAggregateInputType | true
    _min?: PageMinAggregateInputType
    _max?: PageMaxAggregateInputType
  }

  export type PageGroupByOutputType = {
    id: string
    pageKey: string
    scope: $Enums.PageScope
    departmentId: string
    data: JsonValue
    updatedAt: Date
    createdAt: Date
    createdBy: string
    _count: PageCountAggregateOutputType | null
    _min: PageMinAggregateOutputType | null
    _max: PageMaxAggregateOutputType | null
  }

  type GetPageGroupByPayload<T extends PageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PageGroupByOutputType[P]>
            : GetScalarType<T[P], PageGroupByOutputType[P]>
        }
      >
    >


  export type PageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageKey?: boolean
    scope?: boolean
    departmentId?: boolean
    data?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    createdBy?: boolean
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageKey?: boolean
    scope?: boolean
    departmentId?: boolean
    data?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    createdBy?: boolean
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageKey?: boolean
    scope?: boolean
    departmentId?: boolean
    data?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    createdBy?: boolean
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["page"]>

  export type PageSelectScalar = {
    id?: boolean
    pageKey?: boolean
    scope?: boolean
    departmentId?: boolean
    data?: boolean
    updatedAt?: boolean
    createdAt?: boolean
    createdBy?: boolean
  }

  export type PageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pageKey" | "scope" | "departmentId" | "data" | "updatedAt" | "createdAt" | "createdBy", ExtArgs["result"]["page"]>
  export type PageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Page"
    objects: {
      department: Prisma.$DepartmentPayload<ExtArgs>
      creator: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pageKey: string
      scope: $Enums.PageScope
      departmentId: string
      data: Prisma.JsonValue
      updatedAt: Date
      createdAt: Date
      createdBy: string
    }, ExtArgs["result"]["page"]>
    composites: {}
  }

  type PageGetPayload<S extends boolean | null | undefined | PageDefaultArgs> = $Result.GetResult<Prisma.$PagePayload, S>

  type PageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PageCountAggregateInputType | true
    }

  export interface PageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Page'], meta: { name: 'Page' } }
    /**
     * Find zero or one Page that matches the filter.
     * @param {PageFindUniqueArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PageFindUniqueArgs>(args: SelectSubset<T, PageFindUniqueArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Page that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PageFindUniqueOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PageFindUniqueOrThrowArgs>(args: SelectSubset<T, PageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Page that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PageFindFirstArgs>(args?: SelectSubset<T, PageFindFirstArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Page that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindFirstOrThrowArgs} args - Arguments to find a Page
     * @example
     * // Get one Page
     * const page = await prisma.page.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PageFindFirstOrThrowArgs>(args?: SelectSubset<T, PageFindFirstOrThrowArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pages
     * const pages = await prisma.page.findMany()
     * 
     * // Get first 10 Pages
     * const pages = await prisma.page.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pageWithIdOnly = await prisma.page.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PageFindManyArgs>(args?: SelectSubset<T, PageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Page.
     * @param {PageCreateArgs} args - Arguments to create a Page.
     * @example
     * // Create one Page
     * const Page = await prisma.page.create({
     *   data: {
     *     // ... data to create a Page
     *   }
     * })
     * 
     */
    create<T extends PageCreateArgs>(args: SelectSubset<T, PageCreateArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pages.
     * @param {PageCreateManyArgs} args - Arguments to create many Pages.
     * @example
     * // Create many Pages
     * const page = await prisma.page.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PageCreateManyArgs>(args?: SelectSubset<T, PageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pages and returns the data saved in the database.
     * @param {PageCreateManyAndReturnArgs} args - Arguments to create many Pages.
     * @example
     * // Create many Pages
     * const page = await prisma.page.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pages and only return the `id`
     * const pageWithIdOnly = await prisma.page.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PageCreateManyAndReturnArgs>(args?: SelectSubset<T, PageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Page.
     * @param {PageDeleteArgs} args - Arguments to delete one Page.
     * @example
     * // Delete one Page
     * const Page = await prisma.page.delete({
     *   where: {
     *     // ... filter to delete one Page
     *   }
     * })
     * 
     */
    delete<T extends PageDeleteArgs>(args: SelectSubset<T, PageDeleteArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Page.
     * @param {PageUpdateArgs} args - Arguments to update one Page.
     * @example
     * // Update one Page
     * const page = await prisma.page.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PageUpdateArgs>(args: SelectSubset<T, PageUpdateArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pages.
     * @param {PageDeleteManyArgs} args - Arguments to filter Pages to delete.
     * @example
     * // Delete a few Pages
     * const { count } = await prisma.page.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PageDeleteManyArgs>(args?: SelectSubset<T, PageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pages
     * const page = await prisma.page.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PageUpdateManyArgs>(args: SelectSubset<T, PageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pages and returns the data updated in the database.
     * @param {PageUpdateManyAndReturnArgs} args - Arguments to update many Pages.
     * @example
     * // Update many Pages
     * const page = await prisma.page.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pages and only return the `id`
     * const pageWithIdOnly = await prisma.page.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PageUpdateManyAndReturnArgs>(args: SelectSubset<T, PageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Page.
     * @param {PageUpsertArgs} args - Arguments to update or create a Page.
     * @example
     * // Update or create a Page
     * const page = await prisma.page.upsert({
     *   create: {
     *     // ... data to create a Page
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Page we want to update
     *   }
     * })
     */
    upsert<T extends PageUpsertArgs>(args: SelectSubset<T, PageUpsertArgs<ExtArgs>>): Prisma__PageClient<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageCountArgs} args - Arguments to filter Pages to count.
     * @example
     * // Count the number of Pages
     * const count = await prisma.page.count({
     *   where: {
     *     // ... the filter for the Pages we want to count
     *   }
     * })
    **/
    count<T extends PageCountArgs>(
      args?: Subset<T, PageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PageAggregateArgs>(args: Subset<T, PageAggregateArgs>): Prisma.PrismaPromise<GetPageAggregateType<T>>

    /**
     * Group by Page.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PageGroupByArgs['orderBy'] }
        : { orderBy?: PageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Page model
   */
  readonly fields: PageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Page.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    department<T extends DepartmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DepartmentDefaultArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Page model
   */
  interface PageFieldRefs {
    readonly id: FieldRef<"Page", 'String'>
    readonly pageKey: FieldRef<"Page", 'String'>
    readonly scope: FieldRef<"Page", 'PageScope'>
    readonly departmentId: FieldRef<"Page", 'String'>
    readonly data: FieldRef<"Page", 'Json'>
    readonly updatedAt: FieldRef<"Page", 'DateTime'>
    readonly createdAt: FieldRef<"Page", 'DateTime'>
    readonly createdBy: FieldRef<"Page", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Page findUnique
   */
  export type PageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page findUniqueOrThrow
   */
  export type PageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page findFirst
   */
  export type PageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page findFirstOrThrow
   */
  export type PageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Page to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page findMany
   */
  export type PageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter, which Pages to fetch.
     */
    where?: PageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pages to fetch.
     */
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pages.
     */
    cursor?: PageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pages.
     */
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Page create
   */
  export type PageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The data needed to create a Page.
     */
    data: XOR<PageCreateInput, PageUncheckedCreateInput>
  }

  /**
   * Page createMany
   */
  export type PageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pages.
     */
    data: PageCreateManyInput | PageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Page createManyAndReturn
   */
  export type PageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * The data used to create many Pages.
     */
    data: PageCreateManyInput | PageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Page update
   */
  export type PageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The data needed to update a Page.
     */
    data: XOR<PageUpdateInput, PageUncheckedUpdateInput>
    /**
     * Choose, which Page to update.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page updateMany
   */
  export type PageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pages.
     */
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyInput>
    /**
     * Filter which Pages to update
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to update.
     */
    limit?: number
  }

  /**
   * Page updateManyAndReturn
   */
  export type PageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * The data used to update Pages.
     */
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyInput>
    /**
     * Filter which Pages to update
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Page upsert
   */
  export type PageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * The filter to search for the Page to update in case it exists.
     */
    where: PageWhereUniqueInput
    /**
     * In case the Page found by the `where` argument doesn't exist, create a new Page with this data.
     */
    create: XOR<PageCreateInput, PageUncheckedCreateInput>
    /**
     * In case the Page was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PageUpdateInput, PageUncheckedUpdateInput>
  }

  /**
   * Page delete
   */
  export type PageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    /**
     * Filter which Page to delete.
     */
    where: PageWhereUniqueInput
  }

  /**
   * Page deleteMany
   */
  export type PageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pages to delete
     */
    where?: PageWhereInput
    /**
     * Limit how many Pages to delete.
     */
    limit?: number
  }

  /**
   * Page without action
   */
  export type PageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
  }


  /**
   * Model Department
   */

  export type AggregateDepartment = {
    _count: DepartmentCountAggregateOutputType | null
    _avg: DepartmentAvgAggregateOutputType | null
    _sum: DepartmentSumAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  export type DepartmentAvgAggregateOutputType = {
    establishmentYear: number | null
  }

  export type DepartmentSumAggregateOutputType = {
    establishmentYear: number | null
  }

  export type DepartmentMinAggregateOutputType = {
    id: string | null
    name: string | null
    departmentCode: string | null
    description: string | null
    establishmentYear: number | null
    location: string | null
  }

  export type DepartmentMaxAggregateOutputType = {
    id: string | null
    name: string | null
    departmentCode: string | null
    description: string | null
    establishmentYear: number | null
    location: string | null
  }

  export type DepartmentCountAggregateOutputType = {
    id: number
    name: number
    departmentCode: number
    description: number
    establishmentYear: number
    location: number
    _all: number
  }


  export type DepartmentAvgAggregateInputType = {
    establishmentYear?: true
  }

  export type DepartmentSumAggregateInputType = {
    establishmentYear?: true
  }

  export type DepartmentMinAggregateInputType = {
    id?: true
    name?: true
    departmentCode?: true
    description?: true
    establishmentYear?: true
    location?: true
  }

  export type DepartmentMaxAggregateInputType = {
    id?: true
    name?: true
    departmentCode?: true
    description?: true
    establishmentYear?: true
    location?: true
  }

  export type DepartmentCountAggregateInputType = {
    id?: true
    name?: true
    departmentCode?: true
    description?: true
    establishmentYear?: true
    location?: true
    _all?: true
  }

  export type DepartmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Department to aggregate.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Departments
    **/
    _count?: true | DepartmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DepartmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DepartmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartmentMaxAggregateInputType
  }

  export type GetDepartmentAggregateType<T extends DepartmentAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartment[P]>
      : GetScalarType<T[P], AggregateDepartment[P]>
  }




  export type DepartmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DepartmentWhereInput
    orderBy?: DepartmentOrderByWithAggregationInput | DepartmentOrderByWithAggregationInput[]
    by: DepartmentScalarFieldEnum[] | DepartmentScalarFieldEnum
    having?: DepartmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartmentCountAggregateInputType | true
    _avg?: DepartmentAvgAggregateInputType
    _sum?: DepartmentSumAggregateInputType
    _min?: DepartmentMinAggregateInputType
    _max?: DepartmentMaxAggregateInputType
  }

  export type DepartmentGroupByOutputType = {
    id: string
    name: string
    departmentCode: string
    description: string | null
    establishmentYear: number | null
    location: string | null
    _count: DepartmentCountAggregateOutputType | null
    _avg: DepartmentAvgAggregateOutputType | null
    _sum: DepartmentSumAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  type GetDepartmentGroupByPayload<T extends DepartmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DepartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
        }
      >
    >


  export type DepartmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    departmentCode?: boolean
    description?: boolean
    establishmentYear?: boolean
    location?: boolean
    users?: boolean | Department$usersArgs<ExtArgs>
    pages?: boolean | Department$pagesArgs<ExtArgs>
    notices?: boolean | Department$noticesArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    departmentCode?: boolean
    description?: boolean
    establishmentYear?: boolean
    location?: boolean
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    departmentCode?: boolean
    description?: boolean
    establishmentYear?: boolean
    location?: boolean
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectScalar = {
    id?: boolean
    name?: boolean
    departmentCode?: boolean
    description?: boolean
    establishmentYear?: boolean
    location?: boolean
  }

  export type DepartmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "departmentCode" | "description" | "establishmentYear" | "location", ExtArgs["result"]["department"]>
  export type DepartmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Department$usersArgs<ExtArgs>
    pages?: boolean | Department$pagesArgs<ExtArgs>
    notices?: boolean | Department$noticesArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DepartmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DepartmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DepartmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Department"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      pages: Prisma.$PagePayload<ExtArgs>[]
      notices: Prisma.$NoticePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      departmentCode: string
      description: string | null
      establishmentYear: number | null
      location: string | null
    }, ExtArgs["result"]["department"]>
    composites: {}
  }

  type DepartmentGetPayload<S extends boolean | null | undefined | DepartmentDefaultArgs> = $Result.GetResult<Prisma.$DepartmentPayload, S>

  type DepartmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DepartmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DepartmentCountAggregateInputType | true
    }

  export interface DepartmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Department'], meta: { name: 'Department' } }
    /**
     * Find zero or one Department that matches the filter.
     * @param {DepartmentFindUniqueArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DepartmentFindUniqueArgs>(args: SelectSubset<T, DepartmentFindUniqueArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Department that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DepartmentFindUniqueOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DepartmentFindUniqueOrThrowArgs>(args: SelectSubset<T, DepartmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Department that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DepartmentFindFirstArgs>(args?: SelectSubset<T, DepartmentFindFirstArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Department that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DepartmentFindFirstOrThrowArgs>(args?: SelectSubset<T, DepartmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departments
     * const departments = await prisma.department.findMany()
     * 
     * // Get first 10 Departments
     * const departments = await prisma.department.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const departmentWithIdOnly = await prisma.department.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DepartmentFindManyArgs>(args?: SelectSubset<T, DepartmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Department.
     * @param {DepartmentCreateArgs} args - Arguments to create a Department.
     * @example
     * // Create one Department
     * const Department = await prisma.department.create({
     *   data: {
     *     // ... data to create a Department
     *   }
     * })
     * 
     */
    create<T extends DepartmentCreateArgs>(args: SelectSubset<T, DepartmentCreateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Departments.
     * @param {DepartmentCreateManyArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DepartmentCreateManyArgs>(args?: SelectSubset<T, DepartmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Departments and returns the data saved in the database.
     * @param {DepartmentCreateManyAndReturnArgs} args - Arguments to create many Departments.
     * @example
     * // Create many Departments
     * const department = await prisma.department.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DepartmentCreateManyAndReturnArgs>(args?: SelectSubset<T, DepartmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Department.
     * @param {DepartmentDeleteArgs} args - Arguments to delete one Department.
     * @example
     * // Delete one Department
     * const Department = await prisma.department.delete({
     *   where: {
     *     // ... filter to delete one Department
     *   }
     * })
     * 
     */
    delete<T extends DepartmentDeleteArgs>(args: SelectSubset<T, DepartmentDeleteArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Department.
     * @param {DepartmentUpdateArgs} args - Arguments to update one Department.
     * @example
     * // Update one Department
     * const department = await prisma.department.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DepartmentUpdateArgs>(args: SelectSubset<T, DepartmentUpdateArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Departments.
     * @param {DepartmentDeleteManyArgs} args - Arguments to filter Departments to delete.
     * @example
     * // Delete a few Departments
     * const { count } = await prisma.department.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DepartmentDeleteManyArgs>(args?: SelectSubset<T, DepartmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DepartmentUpdateManyArgs>(args: SelectSubset<T, DepartmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments and returns the data updated in the database.
     * @param {DepartmentUpdateManyAndReturnArgs} args - Arguments to update many Departments.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Departments and only return the `id`
     * const departmentWithIdOnly = await prisma.department.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DepartmentUpdateManyAndReturnArgs>(args: SelectSubset<T, DepartmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Department.
     * @param {DepartmentUpsertArgs} args - Arguments to update or create a Department.
     * @example
     * // Update or create a Department
     * const department = await prisma.department.upsert({
     *   create: {
     *     // ... data to create a Department
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Department we want to update
     *   }
     * })
     */
    upsert<T extends DepartmentUpsertArgs>(args: SelectSubset<T, DepartmentUpsertArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentCountArgs} args - Arguments to filter Departments to count.
     * @example
     * // Count the number of Departments
     * const count = await prisma.department.count({
     *   where: {
     *     // ... the filter for the Departments we want to count
     *   }
     * })
    **/
    count<T extends DepartmentCountArgs>(
      args?: Subset<T, DepartmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DepartmentAggregateArgs>(args: Subset<T, DepartmentAggregateArgs>): Prisma.PrismaPromise<GetDepartmentAggregateType<T>>

    /**
     * Group by Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DepartmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DepartmentGroupByArgs['orderBy'] }
        : { orderBy?: DepartmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Department model
   */
  readonly fields: DepartmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Department.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DepartmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Department$usersArgs<ExtArgs> = {}>(args?: Subset<T, Department$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pages<T extends Department$pagesArgs<ExtArgs> = {}>(args?: Subset<T, Department$pagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notices<T extends Department$noticesArgs<ExtArgs> = {}>(args?: Subset<T, Department$noticesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Department model
   */
  interface DepartmentFieldRefs {
    readonly id: FieldRef<"Department", 'String'>
    readonly name: FieldRef<"Department", 'String'>
    readonly departmentCode: FieldRef<"Department", 'String'>
    readonly description: FieldRef<"Department", 'String'>
    readonly establishmentYear: FieldRef<"Department", 'Int'>
    readonly location: FieldRef<"Department", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Department findUnique
   */
  export type DepartmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findUniqueOrThrow
   */
  export type DepartmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department findFirst
   */
  export type DepartmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findFirstOrThrow
   */
  export type DepartmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department findMany
   */
  export type DepartmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Departments to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }

  /**
   * Department create
   */
  export type DepartmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Department.
     */
    data: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
  }

  /**
   * Department createMany
   */
  export type DepartmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Department createManyAndReturn
   */
  export type DepartmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Department update
   */
  export type DepartmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Department.
     */
    data: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
    /**
     * Choose, which Department to update.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department updateMany
   */
  export type DepartmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to update.
     */
    limit?: number
  }

  /**
   * Department updateManyAndReturn
   */
  export type DepartmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to update.
     */
    limit?: number
  }

  /**
   * Department upsert
   */
  export type DepartmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Department to update in case it exists.
     */
    where: DepartmentWhereUniqueInput
    /**
     * In case the Department found by the `where` argument doesn't exist, create a new Department with this data.
     */
    create: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
    /**
     * In case the Department was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
  }

  /**
   * Department delete
   */
  export type DepartmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter which Department to delete.
     */
    where: DepartmentWhereUniqueInput
  }

  /**
   * Department deleteMany
   */
  export type DepartmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Departments to delete
     */
    where?: DepartmentWhereInput
    /**
     * Limit how many Departments to delete.
     */
    limit?: number
  }

  /**
   * Department.users
   */
  export type Department$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Department.pages
   */
  export type Department$pagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Page
     */
    select?: PageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Page
     */
    omit?: PageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PageInclude<ExtArgs> | null
    where?: PageWhereInput
    orderBy?: PageOrderByWithRelationInput | PageOrderByWithRelationInput[]
    cursor?: PageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PageScalarFieldEnum | PageScalarFieldEnum[]
  }

  /**
   * Department.notices
   */
  export type Department$noticesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notice
     */
    omit?: NoticeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NoticeInclude<ExtArgs> | null
    where?: NoticeWhereInput
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    cursor?: NoticeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NoticeScalarFieldEnum | NoticeScalarFieldEnum[]
  }

  /**
   * Department without action
   */
  export type DepartmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Department
     */
    omit?: DepartmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DepartmentInclude<ExtArgs> | null
  }


  /**
   * Model Placements
   */

  export type AggregatePlacements = {
    _count: PlacementsCountAggregateOutputType | null
    _min: PlacementsMinAggregateOutputType | null
    _max: PlacementsMaxAggregateOutputType | null
  }

  export type PlacementsMinAggregateOutputType = {
    id: string | null
    month: string | null
    passing: string | null
    studentName: string | null
    course: string | null
    branch: string | null
    package: string | null
    jobTitle: string | null
    company: string | null
    createdAt: Date | null
    createdBy: string | null
  }

  export type PlacementsMaxAggregateOutputType = {
    id: string | null
    month: string | null
    passing: string | null
    studentName: string | null
    course: string | null
    branch: string | null
    package: string | null
    jobTitle: string | null
    company: string | null
    createdAt: Date | null
    createdBy: string | null
  }

  export type PlacementsCountAggregateOutputType = {
    id: number
    month: number
    passing: number
    studentName: number
    course: number
    branch: number
    package: number
    jobTitle: number
    company: number
    createdAt: number
    createdBy: number
    _all: number
  }


  export type PlacementsMinAggregateInputType = {
    id?: true
    month?: true
    passing?: true
    studentName?: true
    course?: true
    branch?: true
    package?: true
    jobTitle?: true
    company?: true
    createdAt?: true
    createdBy?: true
  }

  export type PlacementsMaxAggregateInputType = {
    id?: true
    month?: true
    passing?: true
    studentName?: true
    course?: true
    branch?: true
    package?: true
    jobTitle?: true
    company?: true
    createdAt?: true
    createdBy?: true
  }

  export type PlacementsCountAggregateInputType = {
    id?: true
    month?: true
    passing?: true
    studentName?: true
    course?: true
    branch?: true
    package?: true
    jobTitle?: true
    company?: true
    createdAt?: true
    createdBy?: true
    _all?: true
  }

  export type PlacementsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Placements to aggregate.
     */
    where?: PlacementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Placements to fetch.
     */
    orderBy?: PlacementsOrderByWithRelationInput | PlacementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlacementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Placements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Placements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Placements
    **/
    _count?: true | PlacementsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlacementsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlacementsMaxAggregateInputType
  }

  export type GetPlacementsAggregateType<T extends PlacementsAggregateArgs> = {
        [P in keyof T & keyof AggregatePlacements]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlacements[P]>
      : GetScalarType<T[P], AggregatePlacements[P]>
  }




  export type PlacementsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlacementsWhereInput
    orderBy?: PlacementsOrderByWithAggregationInput | PlacementsOrderByWithAggregationInput[]
    by: PlacementsScalarFieldEnum[] | PlacementsScalarFieldEnum
    having?: PlacementsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlacementsCountAggregateInputType | true
    _min?: PlacementsMinAggregateInputType
    _max?: PlacementsMaxAggregateInputType
  }

  export type PlacementsGroupByOutputType = {
    id: string
    month: string | null
    passing: string | null
    studentName: string | null
    course: string | null
    branch: string | null
    package: string | null
    jobTitle: string | null
    company: string | null
    createdAt: Date
    createdBy: string | null
    _count: PlacementsCountAggregateOutputType | null
    _min: PlacementsMinAggregateOutputType | null
    _max: PlacementsMaxAggregateOutputType | null
  }

  type GetPlacementsGroupByPayload<T extends PlacementsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlacementsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlacementsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlacementsGroupByOutputType[P]>
            : GetScalarType<T[P], PlacementsGroupByOutputType[P]>
        }
      >
    >


  export type PlacementsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    month?: boolean
    passing?: boolean
    studentName?: boolean
    course?: boolean
    branch?: boolean
    package?: boolean
    jobTitle?: boolean
    company?: boolean
    createdAt?: boolean
    createdBy?: boolean
    creator?: boolean | Placements$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["placements"]>

  export type PlacementsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    month?: boolean
    passing?: boolean
    studentName?: boolean
    course?: boolean
    branch?: boolean
    package?: boolean
    jobTitle?: boolean
    company?: boolean
    createdAt?: boolean
    createdBy?: boolean
    creator?: boolean | Placements$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["placements"]>

  export type PlacementsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    month?: boolean
    passing?: boolean
    studentName?: boolean
    course?: boolean
    branch?: boolean
    package?: boolean
    jobTitle?: boolean
    company?: boolean
    createdAt?: boolean
    createdBy?: boolean
    creator?: boolean | Placements$creatorArgs<ExtArgs>
  }, ExtArgs["result"]["placements"]>

  export type PlacementsSelectScalar = {
    id?: boolean
    month?: boolean
    passing?: boolean
    studentName?: boolean
    course?: boolean
    branch?: boolean
    package?: boolean
    jobTitle?: boolean
    company?: boolean
    createdAt?: boolean
    createdBy?: boolean
  }

  export type PlacementsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "month" | "passing" | "studentName" | "course" | "branch" | "package" | "jobTitle" | "company" | "createdAt" | "createdBy", ExtArgs["result"]["placements"]>
  export type PlacementsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | Placements$creatorArgs<ExtArgs>
  }
  export type PlacementsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | Placements$creatorArgs<ExtArgs>
  }
  export type PlacementsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | Placements$creatorArgs<ExtArgs>
  }

  export type $PlacementsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Placements"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      month: string | null
      passing: string | null
      studentName: string | null
      course: string | null
      branch: string | null
      package: string | null
      jobTitle: string | null
      company: string | null
      createdAt: Date
      createdBy: string | null
    }, ExtArgs["result"]["placements"]>
    composites: {}
  }

  type PlacementsGetPayload<S extends boolean | null | undefined | PlacementsDefaultArgs> = $Result.GetResult<Prisma.$PlacementsPayload, S>

  type PlacementsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlacementsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlacementsCountAggregateInputType | true
    }

  export interface PlacementsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Placements'], meta: { name: 'Placements' } }
    /**
     * Find zero or one Placements that matches the filter.
     * @param {PlacementsFindUniqueArgs} args - Arguments to find a Placements
     * @example
     * // Get one Placements
     * const placements = await prisma.placements.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlacementsFindUniqueArgs>(args: SelectSubset<T, PlacementsFindUniqueArgs<ExtArgs>>): Prisma__PlacementsClient<$Result.GetResult<Prisma.$PlacementsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Placements that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlacementsFindUniqueOrThrowArgs} args - Arguments to find a Placements
     * @example
     * // Get one Placements
     * const placements = await prisma.placements.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlacementsFindUniqueOrThrowArgs>(args: SelectSubset<T, PlacementsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlacementsClient<$Result.GetResult<Prisma.$PlacementsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Placements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementsFindFirstArgs} args - Arguments to find a Placements
     * @example
     * // Get one Placements
     * const placements = await prisma.placements.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlacementsFindFirstArgs>(args?: SelectSubset<T, PlacementsFindFirstArgs<ExtArgs>>): Prisma__PlacementsClient<$Result.GetResult<Prisma.$PlacementsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Placements that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementsFindFirstOrThrowArgs} args - Arguments to find a Placements
     * @example
     * // Get one Placements
     * const placements = await prisma.placements.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlacementsFindFirstOrThrowArgs>(args?: SelectSubset<T, PlacementsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlacementsClient<$Result.GetResult<Prisma.$PlacementsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Placements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Placements
     * const placements = await prisma.placements.findMany()
     * 
     * // Get first 10 Placements
     * const placements = await prisma.placements.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const placementsWithIdOnly = await prisma.placements.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlacementsFindManyArgs>(args?: SelectSubset<T, PlacementsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Placements.
     * @param {PlacementsCreateArgs} args - Arguments to create a Placements.
     * @example
     * // Create one Placements
     * const Placements = await prisma.placements.create({
     *   data: {
     *     // ... data to create a Placements
     *   }
     * })
     * 
     */
    create<T extends PlacementsCreateArgs>(args: SelectSubset<T, PlacementsCreateArgs<ExtArgs>>): Prisma__PlacementsClient<$Result.GetResult<Prisma.$PlacementsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Placements.
     * @param {PlacementsCreateManyArgs} args - Arguments to create many Placements.
     * @example
     * // Create many Placements
     * const placements = await prisma.placements.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlacementsCreateManyArgs>(args?: SelectSubset<T, PlacementsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Placements and returns the data saved in the database.
     * @param {PlacementsCreateManyAndReturnArgs} args - Arguments to create many Placements.
     * @example
     * // Create many Placements
     * const placements = await prisma.placements.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Placements and only return the `id`
     * const placementsWithIdOnly = await prisma.placements.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlacementsCreateManyAndReturnArgs>(args?: SelectSubset<T, PlacementsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Placements.
     * @param {PlacementsDeleteArgs} args - Arguments to delete one Placements.
     * @example
     * // Delete one Placements
     * const Placements = await prisma.placements.delete({
     *   where: {
     *     // ... filter to delete one Placements
     *   }
     * })
     * 
     */
    delete<T extends PlacementsDeleteArgs>(args: SelectSubset<T, PlacementsDeleteArgs<ExtArgs>>): Prisma__PlacementsClient<$Result.GetResult<Prisma.$PlacementsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Placements.
     * @param {PlacementsUpdateArgs} args - Arguments to update one Placements.
     * @example
     * // Update one Placements
     * const placements = await prisma.placements.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlacementsUpdateArgs>(args: SelectSubset<T, PlacementsUpdateArgs<ExtArgs>>): Prisma__PlacementsClient<$Result.GetResult<Prisma.$PlacementsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Placements.
     * @param {PlacementsDeleteManyArgs} args - Arguments to filter Placements to delete.
     * @example
     * // Delete a few Placements
     * const { count } = await prisma.placements.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlacementsDeleteManyArgs>(args?: SelectSubset<T, PlacementsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Placements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Placements
     * const placements = await prisma.placements.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlacementsUpdateManyArgs>(args: SelectSubset<T, PlacementsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Placements and returns the data updated in the database.
     * @param {PlacementsUpdateManyAndReturnArgs} args - Arguments to update many Placements.
     * @example
     * // Update many Placements
     * const placements = await prisma.placements.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Placements and only return the `id`
     * const placementsWithIdOnly = await prisma.placements.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlacementsUpdateManyAndReturnArgs>(args: SelectSubset<T, PlacementsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlacementsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Placements.
     * @param {PlacementsUpsertArgs} args - Arguments to update or create a Placements.
     * @example
     * // Update or create a Placements
     * const placements = await prisma.placements.upsert({
     *   create: {
     *     // ... data to create a Placements
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Placements we want to update
     *   }
     * })
     */
    upsert<T extends PlacementsUpsertArgs>(args: SelectSubset<T, PlacementsUpsertArgs<ExtArgs>>): Prisma__PlacementsClient<$Result.GetResult<Prisma.$PlacementsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Placements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementsCountArgs} args - Arguments to filter Placements to count.
     * @example
     * // Count the number of Placements
     * const count = await prisma.placements.count({
     *   where: {
     *     // ... the filter for the Placements we want to count
     *   }
     * })
    **/
    count<T extends PlacementsCountArgs>(
      args?: Subset<T, PlacementsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlacementsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Placements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlacementsAggregateArgs>(args: Subset<T, PlacementsAggregateArgs>): Prisma.PrismaPromise<GetPlacementsAggregateType<T>>

    /**
     * Group by Placements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlacementsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlacementsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlacementsGroupByArgs['orderBy'] }
        : { orderBy?: PlacementsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlacementsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlacementsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Placements model
   */
  readonly fields: PlacementsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Placements.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlacementsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends Placements$creatorArgs<ExtArgs> = {}>(args?: Subset<T, Placements$creatorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Placements model
   */
  interface PlacementsFieldRefs {
    readonly id: FieldRef<"Placements", 'String'>
    readonly month: FieldRef<"Placements", 'String'>
    readonly passing: FieldRef<"Placements", 'String'>
    readonly studentName: FieldRef<"Placements", 'String'>
    readonly course: FieldRef<"Placements", 'String'>
    readonly branch: FieldRef<"Placements", 'String'>
    readonly package: FieldRef<"Placements", 'String'>
    readonly jobTitle: FieldRef<"Placements", 'String'>
    readonly company: FieldRef<"Placements", 'String'>
    readonly createdAt: FieldRef<"Placements", 'DateTime'>
    readonly createdBy: FieldRef<"Placements", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Placements findUnique
   */
  export type PlacementsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placements
     */
    select?: PlacementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placements
     */
    omit?: PlacementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementsInclude<ExtArgs> | null
    /**
     * Filter, which Placements to fetch.
     */
    where: PlacementsWhereUniqueInput
  }

  /**
   * Placements findUniqueOrThrow
   */
  export type PlacementsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placements
     */
    select?: PlacementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placements
     */
    omit?: PlacementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementsInclude<ExtArgs> | null
    /**
     * Filter, which Placements to fetch.
     */
    where: PlacementsWhereUniqueInput
  }

  /**
   * Placements findFirst
   */
  export type PlacementsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placements
     */
    select?: PlacementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placements
     */
    omit?: PlacementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementsInclude<ExtArgs> | null
    /**
     * Filter, which Placements to fetch.
     */
    where?: PlacementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Placements to fetch.
     */
    orderBy?: PlacementsOrderByWithRelationInput | PlacementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Placements.
     */
    cursor?: PlacementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Placements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Placements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Placements.
     */
    distinct?: PlacementsScalarFieldEnum | PlacementsScalarFieldEnum[]
  }

  /**
   * Placements findFirstOrThrow
   */
  export type PlacementsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placements
     */
    select?: PlacementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placements
     */
    omit?: PlacementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementsInclude<ExtArgs> | null
    /**
     * Filter, which Placements to fetch.
     */
    where?: PlacementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Placements to fetch.
     */
    orderBy?: PlacementsOrderByWithRelationInput | PlacementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Placements.
     */
    cursor?: PlacementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Placements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Placements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Placements.
     */
    distinct?: PlacementsScalarFieldEnum | PlacementsScalarFieldEnum[]
  }

  /**
   * Placements findMany
   */
  export type PlacementsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placements
     */
    select?: PlacementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placements
     */
    omit?: PlacementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementsInclude<ExtArgs> | null
    /**
     * Filter, which Placements to fetch.
     */
    where?: PlacementsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Placements to fetch.
     */
    orderBy?: PlacementsOrderByWithRelationInput | PlacementsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Placements.
     */
    cursor?: PlacementsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Placements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Placements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Placements.
     */
    distinct?: PlacementsScalarFieldEnum | PlacementsScalarFieldEnum[]
  }

  /**
   * Placements create
   */
  export type PlacementsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placements
     */
    select?: PlacementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placements
     */
    omit?: PlacementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementsInclude<ExtArgs> | null
    /**
     * The data needed to create a Placements.
     */
    data?: XOR<PlacementsCreateInput, PlacementsUncheckedCreateInput>
  }

  /**
   * Placements createMany
   */
  export type PlacementsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Placements.
     */
    data: PlacementsCreateManyInput | PlacementsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Placements createManyAndReturn
   */
  export type PlacementsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placements
     */
    select?: PlacementsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Placements
     */
    omit?: PlacementsOmit<ExtArgs> | null
    /**
     * The data used to create many Placements.
     */
    data: PlacementsCreateManyInput | PlacementsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Placements update
   */
  export type PlacementsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placements
     */
    select?: PlacementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placements
     */
    omit?: PlacementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementsInclude<ExtArgs> | null
    /**
     * The data needed to update a Placements.
     */
    data: XOR<PlacementsUpdateInput, PlacementsUncheckedUpdateInput>
    /**
     * Choose, which Placements to update.
     */
    where: PlacementsWhereUniqueInput
  }

  /**
   * Placements updateMany
   */
  export type PlacementsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Placements.
     */
    data: XOR<PlacementsUpdateManyMutationInput, PlacementsUncheckedUpdateManyInput>
    /**
     * Filter which Placements to update
     */
    where?: PlacementsWhereInput
    /**
     * Limit how many Placements to update.
     */
    limit?: number
  }

  /**
   * Placements updateManyAndReturn
   */
  export type PlacementsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placements
     */
    select?: PlacementsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Placements
     */
    omit?: PlacementsOmit<ExtArgs> | null
    /**
     * The data used to update Placements.
     */
    data: XOR<PlacementsUpdateManyMutationInput, PlacementsUncheckedUpdateManyInput>
    /**
     * Filter which Placements to update
     */
    where?: PlacementsWhereInput
    /**
     * Limit how many Placements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Placements upsert
   */
  export type PlacementsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placements
     */
    select?: PlacementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placements
     */
    omit?: PlacementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementsInclude<ExtArgs> | null
    /**
     * The filter to search for the Placements to update in case it exists.
     */
    where: PlacementsWhereUniqueInput
    /**
     * In case the Placements found by the `where` argument doesn't exist, create a new Placements with this data.
     */
    create: XOR<PlacementsCreateInput, PlacementsUncheckedCreateInput>
    /**
     * In case the Placements was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlacementsUpdateInput, PlacementsUncheckedUpdateInput>
  }

  /**
   * Placements delete
   */
  export type PlacementsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placements
     */
    select?: PlacementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placements
     */
    omit?: PlacementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementsInclude<ExtArgs> | null
    /**
     * Filter which Placements to delete.
     */
    where: PlacementsWhereUniqueInput
  }

  /**
   * Placements deleteMany
   */
  export type PlacementsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Placements to delete
     */
    where?: PlacementsWhereInput
    /**
     * Limit how many Placements to delete.
     */
    limit?: number
  }

  /**
   * Placements.creator
   */
  export type Placements$creatorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Placements without action
   */
  export type PlacementsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Placements
     */
    select?: PlacementsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Placements
     */
    omit?: PlacementsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlacementsInclude<ExtArgs> | null
  }


  /**
   * Model LegacyWebsite
   */

  export type AggregateLegacyWebsite = {
    _count: LegacyWebsiteCountAggregateOutputType | null
    _avg: LegacyWebsiteAvgAggregateOutputType | null
    _sum: LegacyWebsiteSumAggregateOutputType | null
    _min: LegacyWebsiteMinAggregateOutputType | null
    _max: LegacyWebsiteMaxAggregateOutputType | null
  }

  export type LegacyWebsiteAvgAggregateOutputType = {
    id: number | null
    category: number | null
  }

  export type LegacyWebsiteSumAggregateOutputType = {
    id: number | null
    category: number | null
  }

  export type LegacyWebsiteMinAggregateOutputType = {
    id: number | null
    category: number | null
    name: string | null
    image: string | null
    company: string | null
    description: string | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    contactNo: string | null
    email: string | null
    webSite: string | null
    advertisement: string | null
    video: string | null
    type: boolean | null
    approve: boolean | null
  }

  export type LegacyWebsiteMaxAggregateOutputType = {
    id: number | null
    category: number | null
    name: string | null
    image: string | null
    company: string | null
    description: string | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    contactNo: string | null
    email: string | null
    webSite: string | null
    advertisement: string | null
    video: string | null
    type: boolean | null
    approve: boolean | null
  }

  export type LegacyWebsiteCountAggregateOutputType = {
    id: number
    category: number
    name: number
    image: number
    company: number
    description: number
    address: number
    city: number
    state: number
    country: number
    contactNo: number
    email: number
    webSite: number
    advertisement: number
    video: number
    type: number
    approve: number
    _all: number
  }


  export type LegacyWebsiteAvgAggregateInputType = {
    id?: true
    category?: true
  }

  export type LegacyWebsiteSumAggregateInputType = {
    id?: true
    category?: true
  }

  export type LegacyWebsiteMinAggregateInputType = {
    id?: true
    category?: true
    name?: true
    image?: true
    company?: true
    description?: true
    address?: true
    city?: true
    state?: true
    country?: true
    contactNo?: true
    email?: true
    webSite?: true
    advertisement?: true
    video?: true
    type?: true
    approve?: true
  }

  export type LegacyWebsiteMaxAggregateInputType = {
    id?: true
    category?: true
    name?: true
    image?: true
    company?: true
    description?: true
    address?: true
    city?: true
    state?: true
    country?: true
    contactNo?: true
    email?: true
    webSite?: true
    advertisement?: true
    video?: true
    type?: true
    approve?: true
  }

  export type LegacyWebsiteCountAggregateInputType = {
    id?: true
    category?: true
    name?: true
    image?: true
    company?: true
    description?: true
    address?: true
    city?: true
    state?: true
    country?: true
    contactNo?: true
    email?: true
    webSite?: true
    advertisement?: true
    video?: true
    type?: true
    approve?: true
    _all?: true
  }

  export type LegacyWebsiteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LegacyWebsite to aggregate.
     */
    where?: LegacyWebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LegacyWebsites to fetch.
     */
    orderBy?: LegacyWebsiteOrderByWithRelationInput | LegacyWebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LegacyWebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LegacyWebsites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LegacyWebsites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LegacyWebsites
    **/
    _count?: true | LegacyWebsiteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LegacyWebsiteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LegacyWebsiteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LegacyWebsiteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LegacyWebsiteMaxAggregateInputType
  }

  export type GetLegacyWebsiteAggregateType<T extends LegacyWebsiteAggregateArgs> = {
        [P in keyof T & keyof AggregateLegacyWebsite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLegacyWebsite[P]>
      : GetScalarType<T[P], AggregateLegacyWebsite[P]>
  }




  export type LegacyWebsiteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LegacyWebsiteWhereInput
    orderBy?: LegacyWebsiteOrderByWithAggregationInput | LegacyWebsiteOrderByWithAggregationInput[]
    by: LegacyWebsiteScalarFieldEnum[] | LegacyWebsiteScalarFieldEnum
    having?: LegacyWebsiteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LegacyWebsiteCountAggregateInputType | true
    _avg?: LegacyWebsiteAvgAggregateInputType
    _sum?: LegacyWebsiteSumAggregateInputType
    _min?: LegacyWebsiteMinAggregateInputType
    _max?: LegacyWebsiteMaxAggregateInputType
  }

  export type LegacyWebsiteGroupByOutputType = {
    id: number
    category: number | null
    name: string | null
    image: string | null
    company: string | null
    description: string | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    contactNo: string | null
    email: string | null
    webSite: string | null
    advertisement: string | null
    video: string | null
    type: boolean | null
    approve: boolean | null
    _count: LegacyWebsiteCountAggregateOutputType | null
    _avg: LegacyWebsiteAvgAggregateOutputType | null
    _sum: LegacyWebsiteSumAggregateOutputType | null
    _min: LegacyWebsiteMinAggregateOutputType | null
    _max: LegacyWebsiteMaxAggregateOutputType | null
  }

  type GetLegacyWebsiteGroupByPayload<T extends LegacyWebsiteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LegacyWebsiteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LegacyWebsiteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LegacyWebsiteGroupByOutputType[P]>
            : GetScalarType<T[P], LegacyWebsiteGroupByOutputType[P]>
        }
      >
    >


  export type LegacyWebsiteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    name?: boolean
    image?: boolean
    company?: boolean
    description?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    contactNo?: boolean
    email?: boolean
    webSite?: boolean
    advertisement?: boolean
    video?: boolean
    type?: boolean
    approve?: boolean
  }, ExtArgs["result"]["legacyWebsite"]>

  export type LegacyWebsiteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    name?: boolean
    image?: boolean
    company?: boolean
    description?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    contactNo?: boolean
    email?: boolean
    webSite?: boolean
    advertisement?: boolean
    video?: boolean
    type?: boolean
    approve?: boolean
  }, ExtArgs["result"]["legacyWebsite"]>

  export type LegacyWebsiteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    category?: boolean
    name?: boolean
    image?: boolean
    company?: boolean
    description?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    contactNo?: boolean
    email?: boolean
    webSite?: boolean
    advertisement?: boolean
    video?: boolean
    type?: boolean
    approve?: boolean
  }, ExtArgs["result"]["legacyWebsite"]>

  export type LegacyWebsiteSelectScalar = {
    id?: boolean
    category?: boolean
    name?: boolean
    image?: boolean
    company?: boolean
    description?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    contactNo?: boolean
    email?: boolean
    webSite?: boolean
    advertisement?: boolean
    video?: boolean
    type?: boolean
    approve?: boolean
  }

  export type LegacyWebsiteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "category" | "name" | "image" | "company" | "description" | "address" | "city" | "state" | "country" | "contactNo" | "email" | "webSite" | "advertisement" | "video" | "type" | "approve", ExtArgs["result"]["legacyWebsite"]>

  export type $LegacyWebsitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LegacyWebsite"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      category: number | null
      name: string | null
      image: string | null
      company: string | null
      description: string | null
      address: string | null
      city: string | null
      state: string | null
      country: string | null
      contactNo: string | null
      email: string | null
      webSite: string | null
      advertisement: string | null
      video: string | null
      type: boolean | null
      approve: boolean | null
    }, ExtArgs["result"]["legacyWebsite"]>
    composites: {}
  }

  type LegacyWebsiteGetPayload<S extends boolean | null | undefined | LegacyWebsiteDefaultArgs> = $Result.GetResult<Prisma.$LegacyWebsitePayload, S>

  type LegacyWebsiteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LegacyWebsiteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LegacyWebsiteCountAggregateInputType | true
    }

  export interface LegacyWebsiteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LegacyWebsite'], meta: { name: 'LegacyWebsite' } }
    /**
     * Find zero or one LegacyWebsite that matches the filter.
     * @param {LegacyWebsiteFindUniqueArgs} args - Arguments to find a LegacyWebsite
     * @example
     * // Get one LegacyWebsite
     * const legacyWebsite = await prisma.legacyWebsite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LegacyWebsiteFindUniqueArgs>(args: SelectSubset<T, LegacyWebsiteFindUniqueArgs<ExtArgs>>): Prisma__LegacyWebsiteClient<$Result.GetResult<Prisma.$LegacyWebsitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LegacyWebsite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LegacyWebsiteFindUniqueOrThrowArgs} args - Arguments to find a LegacyWebsite
     * @example
     * // Get one LegacyWebsite
     * const legacyWebsite = await prisma.legacyWebsite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LegacyWebsiteFindUniqueOrThrowArgs>(args: SelectSubset<T, LegacyWebsiteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LegacyWebsiteClient<$Result.GetResult<Prisma.$LegacyWebsitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LegacyWebsite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegacyWebsiteFindFirstArgs} args - Arguments to find a LegacyWebsite
     * @example
     * // Get one LegacyWebsite
     * const legacyWebsite = await prisma.legacyWebsite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LegacyWebsiteFindFirstArgs>(args?: SelectSubset<T, LegacyWebsiteFindFirstArgs<ExtArgs>>): Prisma__LegacyWebsiteClient<$Result.GetResult<Prisma.$LegacyWebsitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LegacyWebsite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegacyWebsiteFindFirstOrThrowArgs} args - Arguments to find a LegacyWebsite
     * @example
     * // Get one LegacyWebsite
     * const legacyWebsite = await prisma.legacyWebsite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LegacyWebsiteFindFirstOrThrowArgs>(args?: SelectSubset<T, LegacyWebsiteFindFirstOrThrowArgs<ExtArgs>>): Prisma__LegacyWebsiteClient<$Result.GetResult<Prisma.$LegacyWebsitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LegacyWebsites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegacyWebsiteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LegacyWebsites
     * const legacyWebsites = await prisma.legacyWebsite.findMany()
     * 
     * // Get first 10 LegacyWebsites
     * const legacyWebsites = await prisma.legacyWebsite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const legacyWebsiteWithIdOnly = await prisma.legacyWebsite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LegacyWebsiteFindManyArgs>(args?: SelectSubset<T, LegacyWebsiteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LegacyWebsitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LegacyWebsite.
     * @param {LegacyWebsiteCreateArgs} args - Arguments to create a LegacyWebsite.
     * @example
     * // Create one LegacyWebsite
     * const LegacyWebsite = await prisma.legacyWebsite.create({
     *   data: {
     *     // ... data to create a LegacyWebsite
     *   }
     * })
     * 
     */
    create<T extends LegacyWebsiteCreateArgs>(args: SelectSubset<T, LegacyWebsiteCreateArgs<ExtArgs>>): Prisma__LegacyWebsiteClient<$Result.GetResult<Prisma.$LegacyWebsitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LegacyWebsites.
     * @param {LegacyWebsiteCreateManyArgs} args - Arguments to create many LegacyWebsites.
     * @example
     * // Create many LegacyWebsites
     * const legacyWebsite = await prisma.legacyWebsite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LegacyWebsiteCreateManyArgs>(args?: SelectSubset<T, LegacyWebsiteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LegacyWebsites and returns the data saved in the database.
     * @param {LegacyWebsiteCreateManyAndReturnArgs} args - Arguments to create many LegacyWebsites.
     * @example
     * // Create many LegacyWebsites
     * const legacyWebsite = await prisma.legacyWebsite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LegacyWebsites and only return the `id`
     * const legacyWebsiteWithIdOnly = await prisma.legacyWebsite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LegacyWebsiteCreateManyAndReturnArgs>(args?: SelectSubset<T, LegacyWebsiteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LegacyWebsitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LegacyWebsite.
     * @param {LegacyWebsiteDeleteArgs} args - Arguments to delete one LegacyWebsite.
     * @example
     * // Delete one LegacyWebsite
     * const LegacyWebsite = await prisma.legacyWebsite.delete({
     *   where: {
     *     // ... filter to delete one LegacyWebsite
     *   }
     * })
     * 
     */
    delete<T extends LegacyWebsiteDeleteArgs>(args: SelectSubset<T, LegacyWebsiteDeleteArgs<ExtArgs>>): Prisma__LegacyWebsiteClient<$Result.GetResult<Prisma.$LegacyWebsitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LegacyWebsite.
     * @param {LegacyWebsiteUpdateArgs} args - Arguments to update one LegacyWebsite.
     * @example
     * // Update one LegacyWebsite
     * const legacyWebsite = await prisma.legacyWebsite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LegacyWebsiteUpdateArgs>(args: SelectSubset<T, LegacyWebsiteUpdateArgs<ExtArgs>>): Prisma__LegacyWebsiteClient<$Result.GetResult<Prisma.$LegacyWebsitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LegacyWebsites.
     * @param {LegacyWebsiteDeleteManyArgs} args - Arguments to filter LegacyWebsites to delete.
     * @example
     * // Delete a few LegacyWebsites
     * const { count } = await prisma.legacyWebsite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LegacyWebsiteDeleteManyArgs>(args?: SelectSubset<T, LegacyWebsiteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LegacyWebsites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegacyWebsiteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LegacyWebsites
     * const legacyWebsite = await prisma.legacyWebsite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LegacyWebsiteUpdateManyArgs>(args: SelectSubset<T, LegacyWebsiteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LegacyWebsites and returns the data updated in the database.
     * @param {LegacyWebsiteUpdateManyAndReturnArgs} args - Arguments to update many LegacyWebsites.
     * @example
     * // Update many LegacyWebsites
     * const legacyWebsite = await prisma.legacyWebsite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LegacyWebsites and only return the `id`
     * const legacyWebsiteWithIdOnly = await prisma.legacyWebsite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LegacyWebsiteUpdateManyAndReturnArgs>(args: SelectSubset<T, LegacyWebsiteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LegacyWebsitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LegacyWebsite.
     * @param {LegacyWebsiteUpsertArgs} args - Arguments to update or create a LegacyWebsite.
     * @example
     * // Update or create a LegacyWebsite
     * const legacyWebsite = await prisma.legacyWebsite.upsert({
     *   create: {
     *     // ... data to create a LegacyWebsite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LegacyWebsite we want to update
     *   }
     * })
     */
    upsert<T extends LegacyWebsiteUpsertArgs>(args: SelectSubset<T, LegacyWebsiteUpsertArgs<ExtArgs>>): Prisma__LegacyWebsiteClient<$Result.GetResult<Prisma.$LegacyWebsitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LegacyWebsites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegacyWebsiteCountArgs} args - Arguments to filter LegacyWebsites to count.
     * @example
     * // Count the number of LegacyWebsites
     * const count = await prisma.legacyWebsite.count({
     *   where: {
     *     // ... the filter for the LegacyWebsites we want to count
     *   }
     * })
    **/
    count<T extends LegacyWebsiteCountArgs>(
      args?: Subset<T, LegacyWebsiteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LegacyWebsiteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LegacyWebsite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegacyWebsiteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LegacyWebsiteAggregateArgs>(args: Subset<T, LegacyWebsiteAggregateArgs>): Prisma.PrismaPromise<GetLegacyWebsiteAggregateType<T>>

    /**
     * Group by LegacyWebsite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LegacyWebsiteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LegacyWebsiteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LegacyWebsiteGroupByArgs['orderBy'] }
        : { orderBy?: LegacyWebsiteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LegacyWebsiteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLegacyWebsiteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LegacyWebsite model
   */
  readonly fields: LegacyWebsiteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LegacyWebsite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LegacyWebsiteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LegacyWebsite model
   */
  interface LegacyWebsiteFieldRefs {
    readonly id: FieldRef<"LegacyWebsite", 'Int'>
    readonly category: FieldRef<"LegacyWebsite", 'Int'>
    readonly name: FieldRef<"LegacyWebsite", 'String'>
    readonly image: FieldRef<"LegacyWebsite", 'String'>
    readonly company: FieldRef<"LegacyWebsite", 'String'>
    readonly description: FieldRef<"LegacyWebsite", 'String'>
    readonly address: FieldRef<"LegacyWebsite", 'String'>
    readonly city: FieldRef<"LegacyWebsite", 'String'>
    readonly state: FieldRef<"LegacyWebsite", 'String'>
    readonly country: FieldRef<"LegacyWebsite", 'String'>
    readonly contactNo: FieldRef<"LegacyWebsite", 'String'>
    readonly email: FieldRef<"LegacyWebsite", 'String'>
    readonly webSite: FieldRef<"LegacyWebsite", 'String'>
    readonly advertisement: FieldRef<"LegacyWebsite", 'String'>
    readonly video: FieldRef<"LegacyWebsite", 'String'>
    readonly type: FieldRef<"LegacyWebsite", 'Boolean'>
    readonly approve: FieldRef<"LegacyWebsite", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * LegacyWebsite findUnique
   */
  export type LegacyWebsiteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegacyWebsite
     */
    select?: LegacyWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegacyWebsite
     */
    omit?: LegacyWebsiteOmit<ExtArgs> | null
    /**
     * Filter, which LegacyWebsite to fetch.
     */
    where: LegacyWebsiteWhereUniqueInput
  }

  /**
   * LegacyWebsite findUniqueOrThrow
   */
  export type LegacyWebsiteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegacyWebsite
     */
    select?: LegacyWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegacyWebsite
     */
    omit?: LegacyWebsiteOmit<ExtArgs> | null
    /**
     * Filter, which LegacyWebsite to fetch.
     */
    where: LegacyWebsiteWhereUniqueInput
  }

  /**
   * LegacyWebsite findFirst
   */
  export type LegacyWebsiteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegacyWebsite
     */
    select?: LegacyWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegacyWebsite
     */
    omit?: LegacyWebsiteOmit<ExtArgs> | null
    /**
     * Filter, which LegacyWebsite to fetch.
     */
    where?: LegacyWebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LegacyWebsites to fetch.
     */
    orderBy?: LegacyWebsiteOrderByWithRelationInput | LegacyWebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LegacyWebsites.
     */
    cursor?: LegacyWebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LegacyWebsites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LegacyWebsites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LegacyWebsites.
     */
    distinct?: LegacyWebsiteScalarFieldEnum | LegacyWebsiteScalarFieldEnum[]
  }

  /**
   * LegacyWebsite findFirstOrThrow
   */
  export type LegacyWebsiteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegacyWebsite
     */
    select?: LegacyWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegacyWebsite
     */
    omit?: LegacyWebsiteOmit<ExtArgs> | null
    /**
     * Filter, which LegacyWebsite to fetch.
     */
    where?: LegacyWebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LegacyWebsites to fetch.
     */
    orderBy?: LegacyWebsiteOrderByWithRelationInput | LegacyWebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LegacyWebsites.
     */
    cursor?: LegacyWebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LegacyWebsites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LegacyWebsites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LegacyWebsites.
     */
    distinct?: LegacyWebsiteScalarFieldEnum | LegacyWebsiteScalarFieldEnum[]
  }

  /**
   * LegacyWebsite findMany
   */
  export type LegacyWebsiteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegacyWebsite
     */
    select?: LegacyWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegacyWebsite
     */
    omit?: LegacyWebsiteOmit<ExtArgs> | null
    /**
     * Filter, which LegacyWebsites to fetch.
     */
    where?: LegacyWebsiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LegacyWebsites to fetch.
     */
    orderBy?: LegacyWebsiteOrderByWithRelationInput | LegacyWebsiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LegacyWebsites.
     */
    cursor?: LegacyWebsiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LegacyWebsites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LegacyWebsites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LegacyWebsites.
     */
    distinct?: LegacyWebsiteScalarFieldEnum | LegacyWebsiteScalarFieldEnum[]
  }

  /**
   * LegacyWebsite create
   */
  export type LegacyWebsiteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegacyWebsite
     */
    select?: LegacyWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegacyWebsite
     */
    omit?: LegacyWebsiteOmit<ExtArgs> | null
    /**
     * The data needed to create a LegacyWebsite.
     */
    data: XOR<LegacyWebsiteCreateInput, LegacyWebsiteUncheckedCreateInput>
  }

  /**
   * LegacyWebsite createMany
   */
  export type LegacyWebsiteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LegacyWebsites.
     */
    data: LegacyWebsiteCreateManyInput | LegacyWebsiteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LegacyWebsite createManyAndReturn
   */
  export type LegacyWebsiteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegacyWebsite
     */
    select?: LegacyWebsiteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LegacyWebsite
     */
    omit?: LegacyWebsiteOmit<ExtArgs> | null
    /**
     * The data used to create many LegacyWebsites.
     */
    data: LegacyWebsiteCreateManyInput | LegacyWebsiteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LegacyWebsite update
   */
  export type LegacyWebsiteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegacyWebsite
     */
    select?: LegacyWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegacyWebsite
     */
    omit?: LegacyWebsiteOmit<ExtArgs> | null
    /**
     * The data needed to update a LegacyWebsite.
     */
    data: XOR<LegacyWebsiteUpdateInput, LegacyWebsiteUncheckedUpdateInput>
    /**
     * Choose, which LegacyWebsite to update.
     */
    where: LegacyWebsiteWhereUniqueInput
  }

  /**
   * LegacyWebsite updateMany
   */
  export type LegacyWebsiteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LegacyWebsites.
     */
    data: XOR<LegacyWebsiteUpdateManyMutationInput, LegacyWebsiteUncheckedUpdateManyInput>
    /**
     * Filter which LegacyWebsites to update
     */
    where?: LegacyWebsiteWhereInput
    /**
     * Limit how many LegacyWebsites to update.
     */
    limit?: number
  }

  /**
   * LegacyWebsite updateManyAndReturn
   */
  export type LegacyWebsiteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegacyWebsite
     */
    select?: LegacyWebsiteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LegacyWebsite
     */
    omit?: LegacyWebsiteOmit<ExtArgs> | null
    /**
     * The data used to update LegacyWebsites.
     */
    data: XOR<LegacyWebsiteUpdateManyMutationInput, LegacyWebsiteUncheckedUpdateManyInput>
    /**
     * Filter which LegacyWebsites to update
     */
    where?: LegacyWebsiteWhereInput
    /**
     * Limit how many LegacyWebsites to update.
     */
    limit?: number
  }

  /**
   * LegacyWebsite upsert
   */
  export type LegacyWebsiteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegacyWebsite
     */
    select?: LegacyWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegacyWebsite
     */
    omit?: LegacyWebsiteOmit<ExtArgs> | null
    /**
     * The filter to search for the LegacyWebsite to update in case it exists.
     */
    where: LegacyWebsiteWhereUniqueInput
    /**
     * In case the LegacyWebsite found by the `where` argument doesn't exist, create a new LegacyWebsite with this data.
     */
    create: XOR<LegacyWebsiteCreateInput, LegacyWebsiteUncheckedCreateInput>
    /**
     * In case the LegacyWebsite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LegacyWebsiteUpdateInput, LegacyWebsiteUncheckedUpdateInput>
  }

  /**
   * LegacyWebsite delete
   */
  export type LegacyWebsiteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegacyWebsite
     */
    select?: LegacyWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegacyWebsite
     */
    omit?: LegacyWebsiteOmit<ExtArgs> | null
    /**
     * Filter which LegacyWebsite to delete.
     */
    where: LegacyWebsiteWhereUniqueInput
  }

  /**
   * LegacyWebsite deleteMany
   */
  export type LegacyWebsiteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LegacyWebsites to delete
     */
    where?: LegacyWebsiteWhereInput
    /**
     * Limit how many LegacyWebsites to delete.
     */
    limit?: number
  }

  /**
   * LegacyWebsite without action
   */
  export type LegacyWebsiteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LegacyWebsite
     */
    select?: LegacyWebsiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LegacyWebsite
     */
    omit?: LegacyWebsiteOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    passwordHash: 'passwordHash',
    email: 'email',
    fullName: 'fullName',
    staffCode: 'staffCode',
    designation: 'designation',
    phone: 'phone',
    departmentId: 'departmentId',
    roles: 'roles',
    loginEnabled: 'loginEnabled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const NoticeScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    refNumber: 'refNumber',
    date: 'date',
    showTill: 'showTill',
    category: 'category',
    fileName: 'fileName',
    filePath: 'filePath',
    scope: 'scope',
    departmentId: 'departmentId',
    createdAt: 'createdAt',
    createdBy: 'createdBy'
  };

  export type NoticeScalarFieldEnum = (typeof NoticeScalarFieldEnum)[keyof typeof NoticeScalarFieldEnum]


  export const PageScalarFieldEnum: {
    id: 'id',
    pageKey: 'pageKey',
    scope: 'scope',
    departmentId: 'departmentId',
    data: 'data',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt',
    createdBy: 'createdBy'
  };

  export type PageScalarFieldEnum = (typeof PageScalarFieldEnum)[keyof typeof PageScalarFieldEnum]


  export const DepartmentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    departmentCode: 'departmentCode',
    description: 'description',
    establishmentYear: 'establishmentYear',
    location: 'location'
  };

  export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum]


  export const PlacementsScalarFieldEnum: {
    id: 'id',
    month: 'month',
    passing: 'passing',
    studentName: 'studentName',
    course: 'course',
    branch: 'branch',
    package: 'package',
    jobTitle: 'jobTitle',
    company: 'company',
    createdAt: 'createdAt',
    createdBy: 'createdBy'
  };

  export type PlacementsScalarFieldEnum = (typeof PlacementsScalarFieldEnum)[keyof typeof PlacementsScalarFieldEnum]


  export const LegacyWebsiteScalarFieldEnum: {
    id: 'id',
    category: 'category',
    name: 'name',
    image: 'image',
    company: 'company',
    description: 'description',
    address: 'address',
    city: 'city',
    state: 'state',
    country: 'country',
    contactNo: 'contactNo',
    email: 'email',
    webSite: 'webSite',
    advertisement: 'advertisement',
    video: 'video',
    type: 'type',
    approve: 'approve'
  };

  export type LegacyWebsiteScalarFieldEnum = (typeof LegacyWebsiteScalarFieldEnum)[keyof typeof LegacyWebsiteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'NoticeScope'
   */
  export type EnumNoticeScopeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NoticeScope'>
    


  /**
   * Reference to a field of type 'NoticeScope[]'
   */
  export type ListEnumNoticeScopeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NoticeScope[]'>
    


  /**
   * Reference to a field of type 'PageScope'
   */
  export type EnumPageScopeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PageScope'>
    


  /**
   * Reference to a field of type 'PageScope[]'
   */
  export type ListEnumPageScopeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PageScope[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    staffCode?: StringNullableFilter<"User"> | string | null
    designation?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    departmentId?: StringNullableFilter<"User"> | string | null
    roles?: EnumRoleNullableListFilter<"User">
    loginEnabled?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    department?: XOR<DepartmentNullableScalarRelationFilter, DepartmentWhereInput> | null
    notices?: NoticeListRelationFilter
    pages?: PageListRelationFilter
    placements?: PlacementsListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    staffCode?: SortOrderInput | SortOrder
    designation?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    departmentId?: SortOrderInput | SortOrder
    roles?: SortOrder
    loginEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    department?: DepartmentOrderByWithRelationInput
    notices?: NoticeOrderByRelationAggregateInput
    pages?: PageOrderByRelationAggregateInput
    placements?: PlacementsOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    staffCode?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    designation?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    departmentId?: StringNullableFilter<"User"> | string | null
    roles?: EnumRoleNullableListFilter<"User">
    loginEnabled?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    department?: XOR<DepartmentNullableScalarRelationFilter, DepartmentWhereInput> | null
    notices?: NoticeListRelationFilter
    pages?: PageListRelationFilter
    placements?: PlacementsListRelationFilter
  }, "id" | "username" | "staffCode">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    staffCode?: SortOrderInput | SortOrder
    designation?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    departmentId?: SortOrderInput | SortOrder
    roles?: SortOrder
    loginEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    staffCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    designation?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    departmentId?: StringNullableWithAggregatesFilter<"User"> | string | null
    roles?: EnumRoleNullableListFilter<"User">
    loginEnabled?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type NoticeWhereInput = {
    AND?: NoticeWhereInput | NoticeWhereInput[]
    OR?: NoticeWhereInput[]
    NOT?: NoticeWhereInput | NoticeWhereInput[]
    id?: StringFilter<"Notice"> | string
    title?: StringFilter<"Notice"> | string
    description?: StringNullableFilter<"Notice"> | string | null
    refNumber?: StringNullableFilter<"Notice"> | string | null
    date?: DateTimeFilter<"Notice"> | Date | string
    showTill?: DateTimeNullableFilter<"Notice"> | Date | string | null
    category?: StringFilter<"Notice"> | string
    fileName?: StringNullableFilter<"Notice"> | string | null
    filePath?: StringNullableFilter<"Notice"> | string | null
    scope?: EnumNoticeScopeNullableFilter<"Notice"> | $Enums.NoticeScope | null
    departmentId?: StringNullableFilter<"Notice"> | string | null
    createdAt?: DateTimeFilter<"Notice"> | Date | string
    createdBy?: StringNullableFilter<"Notice"> | string | null
    department?: XOR<DepartmentNullableScalarRelationFilter, DepartmentWhereInput> | null
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type NoticeOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    refNumber?: SortOrderInput | SortOrder
    date?: SortOrder
    showTill?: SortOrderInput | SortOrder
    category?: SortOrder
    fileName?: SortOrderInput | SortOrder
    filePath?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    departmentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    department?: DepartmentOrderByWithRelationInput
    creator?: UserOrderByWithRelationInput
  }

  export type NoticeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NoticeWhereInput | NoticeWhereInput[]
    OR?: NoticeWhereInput[]
    NOT?: NoticeWhereInput | NoticeWhereInput[]
    title?: StringFilter<"Notice"> | string
    description?: StringNullableFilter<"Notice"> | string | null
    refNumber?: StringNullableFilter<"Notice"> | string | null
    date?: DateTimeFilter<"Notice"> | Date | string
    showTill?: DateTimeNullableFilter<"Notice"> | Date | string | null
    category?: StringFilter<"Notice"> | string
    fileName?: StringNullableFilter<"Notice"> | string | null
    filePath?: StringNullableFilter<"Notice"> | string | null
    scope?: EnumNoticeScopeNullableFilter<"Notice"> | $Enums.NoticeScope | null
    departmentId?: StringNullableFilter<"Notice"> | string | null
    createdAt?: DateTimeFilter<"Notice"> | Date | string
    createdBy?: StringNullableFilter<"Notice"> | string | null
    department?: XOR<DepartmentNullableScalarRelationFilter, DepartmentWhereInput> | null
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type NoticeOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    refNumber?: SortOrderInput | SortOrder
    date?: SortOrder
    showTill?: SortOrderInput | SortOrder
    category?: SortOrder
    fileName?: SortOrderInput | SortOrder
    filePath?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    departmentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    _count?: NoticeCountOrderByAggregateInput
    _max?: NoticeMaxOrderByAggregateInput
    _min?: NoticeMinOrderByAggregateInput
  }

  export type NoticeScalarWhereWithAggregatesInput = {
    AND?: NoticeScalarWhereWithAggregatesInput | NoticeScalarWhereWithAggregatesInput[]
    OR?: NoticeScalarWhereWithAggregatesInput[]
    NOT?: NoticeScalarWhereWithAggregatesInput | NoticeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notice"> | string
    title?: StringWithAggregatesFilter<"Notice"> | string
    description?: StringNullableWithAggregatesFilter<"Notice"> | string | null
    refNumber?: StringNullableWithAggregatesFilter<"Notice"> | string | null
    date?: DateTimeWithAggregatesFilter<"Notice"> | Date | string
    showTill?: DateTimeNullableWithAggregatesFilter<"Notice"> | Date | string | null
    category?: StringWithAggregatesFilter<"Notice"> | string
    fileName?: StringNullableWithAggregatesFilter<"Notice"> | string | null
    filePath?: StringNullableWithAggregatesFilter<"Notice"> | string | null
    scope?: EnumNoticeScopeNullableWithAggregatesFilter<"Notice"> | $Enums.NoticeScope | null
    departmentId?: StringNullableWithAggregatesFilter<"Notice"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Notice"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"Notice"> | string | null
  }

  export type PageWhereInput = {
    AND?: PageWhereInput | PageWhereInput[]
    OR?: PageWhereInput[]
    NOT?: PageWhereInput | PageWhereInput[]
    id?: StringFilter<"Page"> | string
    pageKey?: StringFilter<"Page"> | string
    scope?: EnumPageScopeFilter<"Page"> | $Enums.PageScope
    departmentId?: StringFilter<"Page"> | string
    data?: JsonFilter<"Page">
    updatedAt?: DateTimeFilter<"Page"> | Date | string
    createdAt?: DateTimeFilter<"Page"> | Date | string
    createdBy?: StringFilter<"Page"> | string
    department?: XOR<DepartmentScalarRelationFilter, DepartmentWhereInput>
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PageOrderByWithRelationInput = {
    id?: SortOrder
    pageKey?: SortOrder
    scope?: SortOrder
    departmentId?: SortOrder
    data?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    department?: DepartmentOrderByWithRelationInput
    creator?: UserOrderByWithRelationInput
  }

  export type PageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    pageKey_departmentId?: PagePageKeyDepartmentIdCompoundUniqueInput
    AND?: PageWhereInput | PageWhereInput[]
    OR?: PageWhereInput[]
    NOT?: PageWhereInput | PageWhereInput[]
    pageKey?: StringFilter<"Page"> | string
    scope?: EnumPageScopeFilter<"Page"> | $Enums.PageScope
    departmentId?: StringFilter<"Page"> | string
    data?: JsonFilter<"Page">
    updatedAt?: DateTimeFilter<"Page"> | Date | string
    createdAt?: DateTimeFilter<"Page"> | Date | string
    createdBy?: StringFilter<"Page"> | string
    department?: XOR<DepartmentScalarRelationFilter, DepartmentWhereInput>
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "pageKey_departmentId">

  export type PageOrderByWithAggregationInput = {
    id?: SortOrder
    pageKey?: SortOrder
    scope?: SortOrder
    departmentId?: SortOrder
    data?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
    _count?: PageCountOrderByAggregateInput
    _max?: PageMaxOrderByAggregateInput
    _min?: PageMinOrderByAggregateInput
  }

  export type PageScalarWhereWithAggregatesInput = {
    AND?: PageScalarWhereWithAggregatesInput | PageScalarWhereWithAggregatesInput[]
    OR?: PageScalarWhereWithAggregatesInput[]
    NOT?: PageScalarWhereWithAggregatesInput | PageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Page"> | string
    pageKey?: StringWithAggregatesFilter<"Page"> | string
    scope?: EnumPageScopeWithAggregatesFilter<"Page"> | $Enums.PageScope
    departmentId?: StringWithAggregatesFilter<"Page"> | string
    data?: JsonWithAggregatesFilter<"Page">
    updatedAt?: DateTimeWithAggregatesFilter<"Page"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Page"> | Date | string
    createdBy?: StringWithAggregatesFilter<"Page"> | string
  }

  export type DepartmentWhereInput = {
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    id?: StringFilter<"Department"> | string
    name?: StringFilter<"Department"> | string
    departmentCode?: StringFilter<"Department"> | string
    description?: StringNullableFilter<"Department"> | string | null
    establishmentYear?: IntNullableFilter<"Department"> | number | null
    location?: StringNullableFilter<"Department"> | string | null
    users?: UserListRelationFilter
    pages?: PageListRelationFilter
    notices?: NoticeListRelationFilter
  }

  export type DepartmentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    departmentCode?: SortOrder
    description?: SortOrderInput | SortOrder
    establishmentYear?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    users?: UserOrderByRelationAggregateInput
    pages?: PageOrderByRelationAggregateInput
    notices?: NoticeOrderByRelationAggregateInput
  }

  export type DepartmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    departmentCode?: string
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    name?: StringFilter<"Department"> | string
    description?: StringNullableFilter<"Department"> | string | null
    establishmentYear?: IntNullableFilter<"Department"> | number | null
    location?: StringNullableFilter<"Department"> | string | null
    users?: UserListRelationFilter
    pages?: PageListRelationFilter
    notices?: NoticeListRelationFilter
  }, "id" | "departmentCode">

  export type DepartmentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    departmentCode?: SortOrder
    description?: SortOrderInput | SortOrder
    establishmentYear?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    _count?: DepartmentCountOrderByAggregateInput
    _avg?: DepartmentAvgOrderByAggregateInput
    _max?: DepartmentMaxOrderByAggregateInput
    _min?: DepartmentMinOrderByAggregateInput
    _sum?: DepartmentSumOrderByAggregateInput
  }

  export type DepartmentScalarWhereWithAggregatesInput = {
    AND?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    OR?: DepartmentScalarWhereWithAggregatesInput[]
    NOT?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Department"> | string
    name?: StringWithAggregatesFilter<"Department"> | string
    departmentCode?: StringWithAggregatesFilter<"Department"> | string
    description?: StringNullableWithAggregatesFilter<"Department"> | string | null
    establishmentYear?: IntNullableWithAggregatesFilter<"Department"> | number | null
    location?: StringNullableWithAggregatesFilter<"Department"> | string | null
  }

  export type PlacementsWhereInput = {
    AND?: PlacementsWhereInput | PlacementsWhereInput[]
    OR?: PlacementsWhereInput[]
    NOT?: PlacementsWhereInput | PlacementsWhereInput[]
    id?: StringFilter<"Placements"> | string
    month?: StringNullableFilter<"Placements"> | string | null
    passing?: StringNullableFilter<"Placements"> | string | null
    studentName?: StringNullableFilter<"Placements"> | string | null
    course?: StringNullableFilter<"Placements"> | string | null
    branch?: StringNullableFilter<"Placements"> | string | null
    package?: StringNullableFilter<"Placements"> | string | null
    jobTitle?: StringNullableFilter<"Placements"> | string | null
    company?: StringNullableFilter<"Placements"> | string | null
    createdAt?: DateTimeFilter<"Placements"> | Date | string
    createdBy?: StringNullableFilter<"Placements"> | string | null
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type PlacementsOrderByWithRelationInput = {
    id?: SortOrder
    month?: SortOrderInput | SortOrder
    passing?: SortOrderInput | SortOrder
    studentName?: SortOrderInput | SortOrder
    course?: SortOrderInput | SortOrder
    branch?: SortOrderInput | SortOrder
    package?: SortOrderInput | SortOrder
    jobTitle?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    creator?: UserOrderByWithRelationInput
  }

  export type PlacementsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlacementsWhereInput | PlacementsWhereInput[]
    OR?: PlacementsWhereInput[]
    NOT?: PlacementsWhereInput | PlacementsWhereInput[]
    month?: StringNullableFilter<"Placements"> | string | null
    passing?: StringNullableFilter<"Placements"> | string | null
    studentName?: StringNullableFilter<"Placements"> | string | null
    course?: StringNullableFilter<"Placements"> | string | null
    branch?: StringNullableFilter<"Placements"> | string | null
    package?: StringNullableFilter<"Placements"> | string | null
    jobTitle?: StringNullableFilter<"Placements"> | string | null
    company?: StringNullableFilter<"Placements"> | string | null
    createdAt?: DateTimeFilter<"Placements"> | Date | string
    createdBy?: StringNullableFilter<"Placements"> | string | null
    creator?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type PlacementsOrderByWithAggregationInput = {
    id?: SortOrder
    month?: SortOrderInput | SortOrder
    passing?: SortOrderInput | SortOrder
    studentName?: SortOrderInput | SortOrder
    course?: SortOrderInput | SortOrder
    branch?: SortOrderInput | SortOrder
    package?: SortOrderInput | SortOrder
    jobTitle?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    _count?: PlacementsCountOrderByAggregateInput
    _max?: PlacementsMaxOrderByAggregateInput
    _min?: PlacementsMinOrderByAggregateInput
  }

  export type PlacementsScalarWhereWithAggregatesInput = {
    AND?: PlacementsScalarWhereWithAggregatesInput | PlacementsScalarWhereWithAggregatesInput[]
    OR?: PlacementsScalarWhereWithAggregatesInput[]
    NOT?: PlacementsScalarWhereWithAggregatesInput | PlacementsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Placements"> | string
    month?: StringNullableWithAggregatesFilter<"Placements"> | string | null
    passing?: StringNullableWithAggregatesFilter<"Placements"> | string | null
    studentName?: StringNullableWithAggregatesFilter<"Placements"> | string | null
    course?: StringNullableWithAggregatesFilter<"Placements"> | string | null
    branch?: StringNullableWithAggregatesFilter<"Placements"> | string | null
    package?: StringNullableWithAggregatesFilter<"Placements"> | string | null
    jobTitle?: StringNullableWithAggregatesFilter<"Placements"> | string | null
    company?: StringNullableWithAggregatesFilter<"Placements"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Placements"> | Date | string
    createdBy?: StringNullableWithAggregatesFilter<"Placements"> | string | null
  }

  export type LegacyWebsiteWhereInput = {
    AND?: LegacyWebsiteWhereInput | LegacyWebsiteWhereInput[]
    OR?: LegacyWebsiteWhereInput[]
    NOT?: LegacyWebsiteWhereInput | LegacyWebsiteWhereInput[]
    id?: IntFilter<"LegacyWebsite"> | number
    category?: IntNullableFilter<"LegacyWebsite"> | number | null
    name?: StringNullableFilter<"LegacyWebsite"> | string | null
    image?: StringNullableFilter<"LegacyWebsite"> | string | null
    company?: StringNullableFilter<"LegacyWebsite"> | string | null
    description?: StringNullableFilter<"LegacyWebsite"> | string | null
    address?: StringNullableFilter<"LegacyWebsite"> | string | null
    city?: StringNullableFilter<"LegacyWebsite"> | string | null
    state?: StringNullableFilter<"LegacyWebsite"> | string | null
    country?: StringNullableFilter<"LegacyWebsite"> | string | null
    contactNo?: StringNullableFilter<"LegacyWebsite"> | string | null
    email?: StringNullableFilter<"LegacyWebsite"> | string | null
    webSite?: StringNullableFilter<"LegacyWebsite"> | string | null
    advertisement?: StringNullableFilter<"LegacyWebsite"> | string | null
    video?: StringNullableFilter<"LegacyWebsite"> | string | null
    type?: BoolNullableFilter<"LegacyWebsite"> | boolean | null
    approve?: BoolNullableFilter<"LegacyWebsite"> | boolean | null
  }

  export type LegacyWebsiteOrderByWithRelationInput = {
    id?: SortOrder
    category?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    contactNo?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    webSite?: SortOrderInput | SortOrder
    advertisement?: SortOrderInput | SortOrder
    video?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    approve?: SortOrderInput | SortOrder
  }

  export type LegacyWebsiteWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LegacyWebsiteWhereInput | LegacyWebsiteWhereInput[]
    OR?: LegacyWebsiteWhereInput[]
    NOT?: LegacyWebsiteWhereInput | LegacyWebsiteWhereInput[]
    category?: IntNullableFilter<"LegacyWebsite"> | number | null
    name?: StringNullableFilter<"LegacyWebsite"> | string | null
    image?: StringNullableFilter<"LegacyWebsite"> | string | null
    company?: StringNullableFilter<"LegacyWebsite"> | string | null
    description?: StringNullableFilter<"LegacyWebsite"> | string | null
    address?: StringNullableFilter<"LegacyWebsite"> | string | null
    city?: StringNullableFilter<"LegacyWebsite"> | string | null
    state?: StringNullableFilter<"LegacyWebsite"> | string | null
    country?: StringNullableFilter<"LegacyWebsite"> | string | null
    contactNo?: StringNullableFilter<"LegacyWebsite"> | string | null
    email?: StringNullableFilter<"LegacyWebsite"> | string | null
    webSite?: StringNullableFilter<"LegacyWebsite"> | string | null
    advertisement?: StringNullableFilter<"LegacyWebsite"> | string | null
    video?: StringNullableFilter<"LegacyWebsite"> | string | null
    type?: BoolNullableFilter<"LegacyWebsite"> | boolean | null
    approve?: BoolNullableFilter<"LegacyWebsite"> | boolean | null
  }, "id">

  export type LegacyWebsiteOrderByWithAggregationInput = {
    id?: SortOrder
    category?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    company?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    contactNo?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    webSite?: SortOrderInput | SortOrder
    advertisement?: SortOrderInput | SortOrder
    video?: SortOrderInput | SortOrder
    type?: SortOrderInput | SortOrder
    approve?: SortOrderInput | SortOrder
    _count?: LegacyWebsiteCountOrderByAggregateInput
    _avg?: LegacyWebsiteAvgOrderByAggregateInput
    _max?: LegacyWebsiteMaxOrderByAggregateInput
    _min?: LegacyWebsiteMinOrderByAggregateInput
    _sum?: LegacyWebsiteSumOrderByAggregateInput
  }

  export type LegacyWebsiteScalarWhereWithAggregatesInput = {
    AND?: LegacyWebsiteScalarWhereWithAggregatesInput | LegacyWebsiteScalarWhereWithAggregatesInput[]
    OR?: LegacyWebsiteScalarWhereWithAggregatesInput[]
    NOT?: LegacyWebsiteScalarWhereWithAggregatesInput | LegacyWebsiteScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"LegacyWebsite"> | number
    category?: IntNullableWithAggregatesFilter<"LegacyWebsite"> | number | null
    name?: StringNullableWithAggregatesFilter<"LegacyWebsite"> | string | null
    image?: StringNullableWithAggregatesFilter<"LegacyWebsite"> | string | null
    company?: StringNullableWithAggregatesFilter<"LegacyWebsite"> | string | null
    description?: StringNullableWithAggregatesFilter<"LegacyWebsite"> | string | null
    address?: StringNullableWithAggregatesFilter<"LegacyWebsite"> | string | null
    city?: StringNullableWithAggregatesFilter<"LegacyWebsite"> | string | null
    state?: StringNullableWithAggregatesFilter<"LegacyWebsite"> | string | null
    country?: StringNullableWithAggregatesFilter<"LegacyWebsite"> | string | null
    contactNo?: StringNullableWithAggregatesFilter<"LegacyWebsite"> | string | null
    email?: StringNullableWithAggregatesFilter<"LegacyWebsite"> | string | null
    webSite?: StringNullableWithAggregatesFilter<"LegacyWebsite"> | string | null
    advertisement?: StringNullableWithAggregatesFilter<"LegacyWebsite"> | string | null
    video?: StringNullableWithAggregatesFilter<"LegacyWebsite"> | string | null
    type?: BoolNullableWithAggregatesFilter<"LegacyWebsite"> | boolean | null
    approve?: BoolNullableWithAggregatesFilter<"LegacyWebsite"> | boolean | null
  }

  export type UserCreateInput = {
    id?: string
    username: string
    passwordHash: string
    email: string
    fullName: string
    staffCode?: string | null
    designation?: string | null
    phone?: string | null
    roles?: UserCreaterolesInput | $Enums.Role[]
    loginEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    department?: DepartmentCreateNestedOneWithoutUsersInput
    notices?: NoticeCreateNestedManyWithoutCreatorInput
    pages?: PageCreateNestedManyWithoutCreatorInput
    placements?: PlacementsCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    passwordHash: string
    email: string
    fullName: string
    staffCode?: string | null
    designation?: string | null
    phone?: string | null
    departmentId?: string | null
    roles?: UserCreaterolesInput | $Enums.Role[]
    loginEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    notices?: NoticeUncheckedCreateNestedManyWithoutCreatorInput
    pages?: PageUncheckedCreateNestedManyWithoutCreatorInput
    placements?: PlacementsUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.Role[]
    loginEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneWithoutUsersNestedInput
    notices?: NoticeUpdateManyWithoutCreatorNestedInput
    pages?: PageUpdateManyWithoutCreatorNestedInput
    placements?: PlacementsUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.Role[]
    loginEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notices?: NoticeUncheckedUpdateManyWithoutCreatorNestedInput
    pages?: PageUncheckedUpdateManyWithoutCreatorNestedInput
    placements?: PlacementsUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    passwordHash: string
    email: string
    fullName: string
    staffCode?: string | null
    designation?: string | null
    phone?: string | null
    departmentId?: string | null
    roles?: UserCreaterolesInput | $Enums.Role[]
    loginEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.Role[]
    loginEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.Role[]
    loginEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoticeCreateInput = {
    id?: string
    title: string
    description?: string | null
    refNumber?: string | null
    date?: Date | string
    showTill?: Date | string | null
    category?: string
    fileName?: string | null
    filePath?: string | null
    scope?: $Enums.NoticeScope | null
    createdAt?: Date | string
    department?: DepartmentCreateNestedOneWithoutNoticesInput
    creator?: UserCreateNestedOneWithoutNoticesInput
  }

  export type NoticeUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    refNumber?: string | null
    date?: Date | string
    showTill?: Date | string | null
    category?: string
    fileName?: string | null
    filePath?: string | null
    scope?: $Enums.NoticeScope | null
    departmentId?: string | null
    createdAt?: Date | string
    createdBy?: string | null
  }

  export type NoticeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    refNumber?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    showTill?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableEnumNoticeScopeFieldUpdateOperationsInput | $Enums.NoticeScope | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneWithoutNoticesNestedInput
    creator?: UserUpdateOneWithoutNoticesNestedInput
  }

  export type NoticeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    refNumber?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    showTill?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableEnumNoticeScopeFieldUpdateOperationsInput | $Enums.NoticeScope | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NoticeCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    refNumber?: string | null
    date?: Date | string
    showTill?: Date | string | null
    category?: string
    fileName?: string | null
    filePath?: string | null
    scope?: $Enums.NoticeScope | null
    departmentId?: string | null
    createdAt?: Date | string
    createdBy?: string | null
  }

  export type NoticeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    refNumber?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    showTill?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableEnumNoticeScopeFieldUpdateOperationsInput | $Enums.NoticeScope | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoticeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    refNumber?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    showTill?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableEnumNoticeScopeFieldUpdateOperationsInput | $Enums.NoticeScope | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PageCreateInput = {
    id?: string
    pageKey: string
    scope: $Enums.PageScope
    data: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    createdAt?: Date | string
    department: DepartmentCreateNestedOneWithoutPagesInput
    creator: UserCreateNestedOneWithoutPagesInput
  }

  export type PageUncheckedCreateInput = {
    id?: string
    pageKey: string
    scope: $Enums.PageScope
    departmentId: string
    data: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    createdAt?: Date | string
    createdBy: string
  }

  export type PageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageKey?: StringFieldUpdateOperationsInput | string
    scope?: EnumPageScopeFieldUpdateOperationsInput | $Enums.PageScope
    data?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneRequiredWithoutPagesNestedInput
    creator?: UserUpdateOneRequiredWithoutPagesNestedInput
  }

  export type PageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageKey?: StringFieldUpdateOperationsInput | string
    scope?: EnumPageScopeFieldUpdateOperationsInput | $Enums.PageScope
    departmentId?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type PageCreateManyInput = {
    id?: string
    pageKey: string
    scope: $Enums.PageScope
    departmentId: string
    data: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    createdAt?: Date | string
    createdBy: string
  }

  export type PageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageKey?: StringFieldUpdateOperationsInput | string
    scope?: EnumPageScopeFieldUpdateOperationsInput | $Enums.PageScope
    data?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageKey?: StringFieldUpdateOperationsInput | string
    scope?: EnumPageScopeFieldUpdateOperationsInput | $Enums.PageScope
    departmentId?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type DepartmentCreateInput = {
    id?: string
    name: string
    departmentCode: string
    description?: string | null
    establishmentYear?: number | null
    location?: string | null
    users?: UserCreateNestedManyWithoutDepartmentInput
    pages?: PageCreateNestedManyWithoutDepartmentInput
    notices?: NoticeCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateInput = {
    id?: string
    name: string
    departmentCode: string
    description?: string | null
    establishmentYear?: number | null
    location?: string | null
    users?: UserUncheckedCreateNestedManyWithoutDepartmentInput
    pages?: PageUncheckedCreateNestedManyWithoutDepartmentInput
    notices?: NoticeUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    establishmentYear?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUpdateManyWithoutDepartmentNestedInput
    pages?: PageUpdateManyWithoutDepartmentNestedInput
    notices?: NoticeUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    establishmentYear?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUncheckedUpdateManyWithoutDepartmentNestedInput
    pages?: PageUncheckedUpdateManyWithoutDepartmentNestedInput
    notices?: NoticeUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentCreateManyInput = {
    id?: string
    name: string
    departmentCode: string
    description?: string | null
    establishmentYear?: number | null
    location?: string | null
  }

  export type DepartmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    establishmentYear?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type DepartmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    establishmentYear?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlacementsCreateInput = {
    id?: string
    month?: string | null
    passing?: string | null
    studentName?: string | null
    course?: string | null
    branch?: string | null
    package?: string | null
    jobTitle?: string | null
    company?: string | null
    createdAt?: Date | string
    creator?: UserCreateNestedOneWithoutPlacementsInput
  }

  export type PlacementsUncheckedCreateInput = {
    id?: string
    month?: string | null
    passing?: string | null
    studentName?: string | null
    course?: string | null
    branch?: string | null
    package?: string | null
    jobTitle?: string | null
    company?: string | null
    createdAt?: Date | string
    createdBy?: string | null
  }

  export type PlacementsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: NullableStringFieldUpdateOperationsInput | string | null
    passing?: NullableStringFieldUpdateOperationsInput | string | null
    studentName?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    package?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutPlacementsNestedInput
  }

  export type PlacementsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: NullableStringFieldUpdateOperationsInput | string | null
    passing?: NullableStringFieldUpdateOperationsInput | string | null
    studentName?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    package?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PlacementsCreateManyInput = {
    id?: string
    month?: string | null
    passing?: string | null
    studentName?: string | null
    course?: string | null
    branch?: string | null
    package?: string | null
    jobTitle?: string | null
    company?: string | null
    createdAt?: Date | string
    createdBy?: string | null
  }

  export type PlacementsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: NullableStringFieldUpdateOperationsInput | string | null
    passing?: NullableStringFieldUpdateOperationsInput | string | null
    studentName?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    package?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlacementsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: NullableStringFieldUpdateOperationsInput | string | null
    passing?: NullableStringFieldUpdateOperationsInput | string | null
    studentName?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    package?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type LegacyWebsiteCreateInput = {
    id: number
    category?: number | null
    name?: string | null
    image?: string | null
    company?: string | null
    description?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    contactNo?: string | null
    email?: string | null
    webSite?: string | null
    advertisement?: string | null
    video?: string | null
    type?: boolean | null
    approve?: boolean | null
  }

  export type LegacyWebsiteUncheckedCreateInput = {
    id: number
    category?: number | null
    name?: string | null
    image?: string | null
    company?: string | null
    description?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    contactNo?: string | null
    email?: string | null
    webSite?: string | null
    advertisement?: string | null
    video?: string | null
    type?: boolean | null
    approve?: boolean | null
  }

  export type LegacyWebsiteUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    category?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    contactNo?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    webSite?: NullableStringFieldUpdateOperationsInput | string | null
    advertisement?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableBoolFieldUpdateOperationsInput | boolean | null
    approve?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type LegacyWebsiteUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    category?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    contactNo?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    webSite?: NullableStringFieldUpdateOperationsInput | string | null
    advertisement?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableBoolFieldUpdateOperationsInput | boolean | null
    approve?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type LegacyWebsiteCreateManyInput = {
    id: number
    category?: number | null
    name?: string | null
    image?: string | null
    company?: string | null
    description?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    contactNo?: string | null
    email?: string | null
    webSite?: string | null
    advertisement?: string | null
    video?: string | null
    type?: boolean | null
    approve?: boolean | null
  }

  export type LegacyWebsiteUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    category?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    contactNo?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    webSite?: NullableStringFieldUpdateOperationsInput | string | null
    advertisement?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableBoolFieldUpdateOperationsInput | boolean | null
    approve?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type LegacyWebsiteUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    category?: NullableIntFieldUpdateOperationsInput | number | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    contactNo?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    webSite?: NullableStringFieldUpdateOperationsInput | string | null
    advertisement?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    type?: NullableBoolFieldUpdateOperationsInput | boolean | null
    approve?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel> | null
    has?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    hasSome?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DepartmentNullableScalarRelationFilter = {
    is?: DepartmentWhereInput | null
    isNot?: DepartmentWhereInput | null
  }

  export type NoticeListRelationFilter = {
    every?: NoticeWhereInput
    some?: NoticeWhereInput
    none?: NoticeWhereInput
  }

  export type PageListRelationFilter = {
    every?: PageWhereInput
    some?: PageWhereInput
    none?: PageWhereInput
  }

  export type PlacementsListRelationFilter = {
    every?: PlacementsWhereInput
    some?: PlacementsWhereInput
    none?: PlacementsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type NoticeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlacementsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    staffCode?: SortOrder
    designation?: SortOrder
    phone?: SortOrder
    departmentId?: SortOrder
    roles?: SortOrder
    loginEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    staffCode?: SortOrder
    designation?: SortOrder
    phone?: SortOrder
    departmentId?: SortOrder
    loginEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    staffCode?: SortOrder
    designation?: SortOrder
    phone?: SortOrder
    departmentId?: SortOrder
    loginEnabled?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumNoticeScopeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.NoticeScope | EnumNoticeScopeFieldRefInput<$PrismaModel> | null
    in?: $Enums.NoticeScope[] | ListEnumNoticeScopeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.NoticeScope[] | ListEnumNoticeScopeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumNoticeScopeNullableFilter<$PrismaModel> | $Enums.NoticeScope | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type NoticeCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    refNumber?: SortOrder
    date?: SortOrder
    showTill?: SortOrder
    category?: SortOrder
    fileName?: SortOrder
    filePath?: SortOrder
    scope?: SortOrder
    departmentId?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type NoticeMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    refNumber?: SortOrder
    date?: SortOrder
    showTill?: SortOrder
    category?: SortOrder
    fileName?: SortOrder
    filePath?: SortOrder
    scope?: SortOrder
    departmentId?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type NoticeMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    refNumber?: SortOrder
    date?: SortOrder
    showTill?: SortOrder
    category?: SortOrder
    fileName?: SortOrder
    filePath?: SortOrder
    scope?: SortOrder
    departmentId?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumNoticeScopeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NoticeScope | EnumNoticeScopeFieldRefInput<$PrismaModel> | null
    in?: $Enums.NoticeScope[] | ListEnumNoticeScopeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.NoticeScope[] | ListEnumNoticeScopeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumNoticeScopeNullableWithAggregatesFilter<$PrismaModel> | $Enums.NoticeScope | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumNoticeScopeNullableFilter<$PrismaModel>
    _max?: NestedEnumNoticeScopeNullableFilter<$PrismaModel>
  }

  export type EnumPageScopeFilter<$PrismaModel = never> = {
    equals?: $Enums.PageScope | EnumPageScopeFieldRefInput<$PrismaModel>
    in?: $Enums.PageScope[] | ListEnumPageScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PageScope[] | ListEnumPageScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumPageScopeFilter<$PrismaModel> | $Enums.PageScope
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DepartmentScalarRelationFilter = {
    is?: DepartmentWhereInput
    isNot?: DepartmentWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PagePageKeyDepartmentIdCompoundUniqueInput = {
    pageKey: string
    departmentId: string
  }

  export type PageCountOrderByAggregateInput = {
    id?: SortOrder
    pageKey?: SortOrder
    scope?: SortOrder
    departmentId?: SortOrder
    data?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type PageMaxOrderByAggregateInput = {
    id?: SortOrder
    pageKey?: SortOrder
    scope?: SortOrder
    departmentId?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type PageMinOrderByAggregateInput = {
    id?: SortOrder
    pageKey?: SortOrder
    scope?: SortOrder
    departmentId?: SortOrder
    updatedAt?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type EnumPageScopeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PageScope | EnumPageScopeFieldRefInput<$PrismaModel>
    in?: $Enums.PageScope[] | ListEnumPageScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PageScope[] | ListEnumPageScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumPageScopeWithAggregatesFilter<$PrismaModel> | $Enums.PageScope
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPageScopeFilter<$PrismaModel>
    _max?: NestedEnumPageScopeFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DepartmentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    departmentCode?: SortOrder
    description?: SortOrder
    establishmentYear?: SortOrder
    location?: SortOrder
  }

  export type DepartmentAvgOrderByAggregateInput = {
    establishmentYear?: SortOrder
  }

  export type DepartmentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    departmentCode?: SortOrder
    description?: SortOrder
    establishmentYear?: SortOrder
    location?: SortOrder
  }

  export type DepartmentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    departmentCode?: SortOrder
    description?: SortOrder
    establishmentYear?: SortOrder
    location?: SortOrder
  }

  export type DepartmentSumOrderByAggregateInput = {
    establishmentYear?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PlacementsCountOrderByAggregateInput = {
    id?: SortOrder
    month?: SortOrder
    passing?: SortOrder
    studentName?: SortOrder
    course?: SortOrder
    branch?: SortOrder
    package?: SortOrder
    jobTitle?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type PlacementsMaxOrderByAggregateInput = {
    id?: SortOrder
    month?: SortOrder
    passing?: SortOrder
    studentName?: SortOrder
    course?: SortOrder
    branch?: SortOrder
    package?: SortOrder
    jobTitle?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type PlacementsMinOrderByAggregateInput = {
    id?: SortOrder
    month?: SortOrder
    passing?: SortOrder
    studentName?: SortOrder
    course?: SortOrder
    branch?: SortOrder
    package?: SortOrder
    jobTitle?: SortOrder
    company?: SortOrder
    createdAt?: SortOrder
    createdBy?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type LegacyWebsiteCountOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    name?: SortOrder
    image?: SortOrder
    company?: SortOrder
    description?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    contactNo?: SortOrder
    email?: SortOrder
    webSite?: SortOrder
    advertisement?: SortOrder
    video?: SortOrder
    type?: SortOrder
    approve?: SortOrder
  }

  export type LegacyWebsiteAvgOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
  }

  export type LegacyWebsiteMaxOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    name?: SortOrder
    image?: SortOrder
    company?: SortOrder
    description?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    contactNo?: SortOrder
    email?: SortOrder
    webSite?: SortOrder
    advertisement?: SortOrder
    video?: SortOrder
    type?: SortOrder
    approve?: SortOrder
  }

  export type LegacyWebsiteMinOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
    name?: SortOrder
    image?: SortOrder
    company?: SortOrder
    description?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    contactNo?: SortOrder
    email?: SortOrder
    webSite?: SortOrder
    advertisement?: SortOrder
    video?: SortOrder
    type?: SortOrder
    approve?: SortOrder
  }

  export type LegacyWebsiteSumOrderByAggregateInput = {
    id?: SortOrder
    category?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type UserCreaterolesInput = {
    set: $Enums.Role[]
  }

  export type DepartmentCreateNestedOneWithoutUsersInput = {
    create?: XOR<DepartmentCreateWithoutUsersInput, DepartmentUncheckedCreateWithoutUsersInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutUsersInput
    connect?: DepartmentWhereUniqueInput
  }

  export type NoticeCreateNestedManyWithoutCreatorInput = {
    create?: XOR<NoticeCreateWithoutCreatorInput, NoticeUncheckedCreateWithoutCreatorInput> | NoticeCreateWithoutCreatorInput[] | NoticeUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: NoticeCreateOrConnectWithoutCreatorInput | NoticeCreateOrConnectWithoutCreatorInput[]
    createMany?: NoticeCreateManyCreatorInputEnvelope
    connect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
  }

  export type PageCreateNestedManyWithoutCreatorInput = {
    create?: XOR<PageCreateWithoutCreatorInput, PageUncheckedCreateWithoutCreatorInput> | PageCreateWithoutCreatorInput[] | PageUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: PageCreateOrConnectWithoutCreatorInput | PageCreateOrConnectWithoutCreatorInput[]
    createMany?: PageCreateManyCreatorInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type PlacementsCreateNestedManyWithoutCreatorInput = {
    create?: XOR<PlacementsCreateWithoutCreatorInput, PlacementsUncheckedCreateWithoutCreatorInput> | PlacementsCreateWithoutCreatorInput[] | PlacementsUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: PlacementsCreateOrConnectWithoutCreatorInput | PlacementsCreateOrConnectWithoutCreatorInput[]
    createMany?: PlacementsCreateManyCreatorInputEnvelope
    connect?: PlacementsWhereUniqueInput | PlacementsWhereUniqueInput[]
  }

  export type NoticeUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<NoticeCreateWithoutCreatorInput, NoticeUncheckedCreateWithoutCreatorInput> | NoticeCreateWithoutCreatorInput[] | NoticeUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: NoticeCreateOrConnectWithoutCreatorInput | NoticeCreateOrConnectWithoutCreatorInput[]
    createMany?: NoticeCreateManyCreatorInputEnvelope
    connect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
  }

  export type PageUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<PageCreateWithoutCreatorInput, PageUncheckedCreateWithoutCreatorInput> | PageCreateWithoutCreatorInput[] | PageUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: PageCreateOrConnectWithoutCreatorInput | PageCreateOrConnectWithoutCreatorInput[]
    createMany?: PageCreateManyCreatorInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type PlacementsUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<PlacementsCreateWithoutCreatorInput, PlacementsUncheckedCreateWithoutCreatorInput> | PlacementsCreateWithoutCreatorInput[] | PlacementsUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: PlacementsCreateOrConnectWithoutCreatorInput | PlacementsCreateOrConnectWithoutCreatorInput[]
    createMany?: PlacementsCreateManyCreatorInputEnvelope
    connect?: PlacementsWhereUniqueInput | PlacementsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdaterolesInput = {
    set?: $Enums.Role[]
    push?: $Enums.Role | $Enums.Role[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DepartmentUpdateOneWithoutUsersNestedInput = {
    create?: XOR<DepartmentCreateWithoutUsersInput, DepartmentUncheckedCreateWithoutUsersInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutUsersInput
    upsert?: DepartmentUpsertWithoutUsersInput
    disconnect?: DepartmentWhereInput | boolean
    delete?: DepartmentWhereInput | boolean
    connect?: DepartmentWhereUniqueInput
    update?: XOR<XOR<DepartmentUpdateToOneWithWhereWithoutUsersInput, DepartmentUpdateWithoutUsersInput>, DepartmentUncheckedUpdateWithoutUsersInput>
  }

  export type NoticeUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<NoticeCreateWithoutCreatorInput, NoticeUncheckedCreateWithoutCreatorInput> | NoticeCreateWithoutCreatorInput[] | NoticeUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: NoticeCreateOrConnectWithoutCreatorInput | NoticeCreateOrConnectWithoutCreatorInput[]
    upsert?: NoticeUpsertWithWhereUniqueWithoutCreatorInput | NoticeUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: NoticeCreateManyCreatorInputEnvelope
    set?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    disconnect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    delete?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    connect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    update?: NoticeUpdateWithWhereUniqueWithoutCreatorInput | NoticeUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: NoticeUpdateManyWithWhereWithoutCreatorInput | NoticeUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: NoticeScalarWhereInput | NoticeScalarWhereInput[]
  }

  export type PageUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<PageCreateWithoutCreatorInput, PageUncheckedCreateWithoutCreatorInput> | PageCreateWithoutCreatorInput[] | PageUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: PageCreateOrConnectWithoutCreatorInput | PageCreateOrConnectWithoutCreatorInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutCreatorInput | PageUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: PageCreateManyCreatorInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutCreatorInput | PageUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: PageUpdateManyWithWhereWithoutCreatorInput | PageUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type PlacementsUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<PlacementsCreateWithoutCreatorInput, PlacementsUncheckedCreateWithoutCreatorInput> | PlacementsCreateWithoutCreatorInput[] | PlacementsUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: PlacementsCreateOrConnectWithoutCreatorInput | PlacementsCreateOrConnectWithoutCreatorInput[]
    upsert?: PlacementsUpsertWithWhereUniqueWithoutCreatorInput | PlacementsUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: PlacementsCreateManyCreatorInputEnvelope
    set?: PlacementsWhereUniqueInput | PlacementsWhereUniqueInput[]
    disconnect?: PlacementsWhereUniqueInput | PlacementsWhereUniqueInput[]
    delete?: PlacementsWhereUniqueInput | PlacementsWhereUniqueInput[]
    connect?: PlacementsWhereUniqueInput | PlacementsWhereUniqueInput[]
    update?: PlacementsUpdateWithWhereUniqueWithoutCreatorInput | PlacementsUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: PlacementsUpdateManyWithWhereWithoutCreatorInput | PlacementsUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: PlacementsScalarWhereInput | PlacementsScalarWhereInput[]
  }

  export type NoticeUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<NoticeCreateWithoutCreatorInput, NoticeUncheckedCreateWithoutCreatorInput> | NoticeCreateWithoutCreatorInput[] | NoticeUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: NoticeCreateOrConnectWithoutCreatorInput | NoticeCreateOrConnectWithoutCreatorInput[]
    upsert?: NoticeUpsertWithWhereUniqueWithoutCreatorInput | NoticeUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: NoticeCreateManyCreatorInputEnvelope
    set?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    disconnect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    delete?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    connect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    update?: NoticeUpdateWithWhereUniqueWithoutCreatorInput | NoticeUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: NoticeUpdateManyWithWhereWithoutCreatorInput | NoticeUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: NoticeScalarWhereInput | NoticeScalarWhereInput[]
  }

  export type PageUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<PageCreateWithoutCreatorInput, PageUncheckedCreateWithoutCreatorInput> | PageCreateWithoutCreatorInput[] | PageUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: PageCreateOrConnectWithoutCreatorInput | PageCreateOrConnectWithoutCreatorInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutCreatorInput | PageUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: PageCreateManyCreatorInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutCreatorInput | PageUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: PageUpdateManyWithWhereWithoutCreatorInput | PageUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type PlacementsUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<PlacementsCreateWithoutCreatorInput, PlacementsUncheckedCreateWithoutCreatorInput> | PlacementsCreateWithoutCreatorInput[] | PlacementsUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: PlacementsCreateOrConnectWithoutCreatorInput | PlacementsCreateOrConnectWithoutCreatorInput[]
    upsert?: PlacementsUpsertWithWhereUniqueWithoutCreatorInput | PlacementsUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: PlacementsCreateManyCreatorInputEnvelope
    set?: PlacementsWhereUniqueInput | PlacementsWhereUniqueInput[]
    disconnect?: PlacementsWhereUniqueInput | PlacementsWhereUniqueInput[]
    delete?: PlacementsWhereUniqueInput | PlacementsWhereUniqueInput[]
    connect?: PlacementsWhereUniqueInput | PlacementsWhereUniqueInput[]
    update?: PlacementsUpdateWithWhereUniqueWithoutCreatorInput | PlacementsUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: PlacementsUpdateManyWithWhereWithoutCreatorInput | PlacementsUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: PlacementsScalarWhereInput | PlacementsScalarWhereInput[]
  }

  export type DepartmentCreateNestedOneWithoutNoticesInput = {
    create?: XOR<DepartmentCreateWithoutNoticesInput, DepartmentUncheckedCreateWithoutNoticesInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutNoticesInput
    connect?: DepartmentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutNoticesInput = {
    create?: XOR<UserCreateWithoutNoticesInput, UserUncheckedCreateWithoutNoticesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNoticesInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableEnumNoticeScopeFieldUpdateOperationsInput = {
    set?: $Enums.NoticeScope | null
  }

  export type DepartmentUpdateOneWithoutNoticesNestedInput = {
    create?: XOR<DepartmentCreateWithoutNoticesInput, DepartmentUncheckedCreateWithoutNoticesInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutNoticesInput
    upsert?: DepartmentUpsertWithoutNoticesInput
    disconnect?: DepartmentWhereInput | boolean
    delete?: DepartmentWhereInput | boolean
    connect?: DepartmentWhereUniqueInput
    update?: XOR<XOR<DepartmentUpdateToOneWithWhereWithoutNoticesInput, DepartmentUpdateWithoutNoticesInput>, DepartmentUncheckedUpdateWithoutNoticesInput>
  }

  export type UserUpdateOneWithoutNoticesNestedInput = {
    create?: XOR<UserCreateWithoutNoticesInput, UserUncheckedCreateWithoutNoticesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNoticesInput
    upsert?: UserUpsertWithoutNoticesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNoticesInput, UserUpdateWithoutNoticesInput>, UserUncheckedUpdateWithoutNoticesInput>
  }

  export type DepartmentCreateNestedOneWithoutPagesInput = {
    create?: XOR<DepartmentCreateWithoutPagesInput, DepartmentUncheckedCreateWithoutPagesInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutPagesInput
    connect?: DepartmentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPagesInput = {
    create?: XOR<UserCreateWithoutPagesInput, UserUncheckedCreateWithoutPagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPagesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumPageScopeFieldUpdateOperationsInput = {
    set?: $Enums.PageScope
  }

  export type DepartmentUpdateOneRequiredWithoutPagesNestedInput = {
    create?: XOR<DepartmentCreateWithoutPagesInput, DepartmentUncheckedCreateWithoutPagesInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutPagesInput
    upsert?: DepartmentUpsertWithoutPagesInput
    connect?: DepartmentWhereUniqueInput
    update?: XOR<XOR<DepartmentUpdateToOneWithWhereWithoutPagesInput, DepartmentUpdateWithoutPagesInput>, DepartmentUncheckedUpdateWithoutPagesInput>
  }

  export type UserUpdateOneRequiredWithoutPagesNestedInput = {
    create?: XOR<UserCreateWithoutPagesInput, UserUncheckedCreateWithoutPagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutPagesInput
    upsert?: UserUpsertWithoutPagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPagesInput, UserUpdateWithoutPagesInput>, UserUncheckedUpdateWithoutPagesInput>
  }

  export type UserCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<UserCreateWithoutDepartmentInput, UserUncheckedCreateWithoutDepartmentInput> | UserCreateWithoutDepartmentInput[] | UserUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: UserCreateOrConnectWithoutDepartmentInput | UserCreateOrConnectWithoutDepartmentInput[]
    createMany?: UserCreateManyDepartmentInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PageCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<PageCreateWithoutDepartmentInput, PageUncheckedCreateWithoutDepartmentInput> | PageCreateWithoutDepartmentInput[] | PageUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: PageCreateOrConnectWithoutDepartmentInput | PageCreateOrConnectWithoutDepartmentInput[]
    createMany?: PageCreateManyDepartmentInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type NoticeCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<NoticeCreateWithoutDepartmentInput, NoticeUncheckedCreateWithoutDepartmentInput> | NoticeCreateWithoutDepartmentInput[] | NoticeUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: NoticeCreateOrConnectWithoutDepartmentInput | NoticeCreateOrConnectWithoutDepartmentInput[]
    createMany?: NoticeCreateManyDepartmentInputEnvelope
    connect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<UserCreateWithoutDepartmentInput, UserUncheckedCreateWithoutDepartmentInput> | UserCreateWithoutDepartmentInput[] | UserUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: UserCreateOrConnectWithoutDepartmentInput | UserCreateOrConnectWithoutDepartmentInput[]
    createMany?: UserCreateManyDepartmentInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PageUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<PageCreateWithoutDepartmentInput, PageUncheckedCreateWithoutDepartmentInput> | PageCreateWithoutDepartmentInput[] | PageUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: PageCreateOrConnectWithoutDepartmentInput | PageCreateOrConnectWithoutDepartmentInput[]
    createMany?: PageCreateManyDepartmentInputEnvelope
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
  }

  export type NoticeUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<NoticeCreateWithoutDepartmentInput, NoticeUncheckedCreateWithoutDepartmentInput> | NoticeCreateWithoutDepartmentInput[] | NoticeUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: NoticeCreateOrConnectWithoutDepartmentInput | NoticeCreateOrConnectWithoutDepartmentInput[]
    createMany?: NoticeCreateManyDepartmentInputEnvelope
    connect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<UserCreateWithoutDepartmentInput, UserUncheckedCreateWithoutDepartmentInput> | UserCreateWithoutDepartmentInput[] | UserUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: UserCreateOrConnectWithoutDepartmentInput | UserCreateOrConnectWithoutDepartmentInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutDepartmentInput | UserUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: UserCreateManyDepartmentInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutDepartmentInput | UserUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: UserUpdateManyWithWhereWithoutDepartmentInput | UserUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PageUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<PageCreateWithoutDepartmentInput, PageUncheckedCreateWithoutDepartmentInput> | PageCreateWithoutDepartmentInput[] | PageUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: PageCreateOrConnectWithoutDepartmentInput | PageCreateOrConnectWithoutDepartmentInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutDepartmentInput | PageUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: PageCreateManyDepartmentInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutDepartmentInput | PageUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: PageUpdateManyWithWhereWithoutDepartmentInput | PageUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type NoticeUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<NoticeCreateWithoutDepartmentInput, NoticeUncheckedCreateWithoutDepartmentInput> | NoticeCreateWithoutDepartmentInput[] | NoticeUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: NoticeCreateOrConnectWithoutDepartmentInput | NoticeCreateOrConnectWithoutDepartmentInput[]
    upsert?: NoticeUpsertWithWhereUniqueWithoutDepartmentInput | NoticeUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: NoticeCreateManyDepartmentInputEnvelope
    set?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    disconnect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    delete?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    connect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    update?: NoticeUpdateWithWhereUniqueWithoutDepartmentInput | NoticeUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: NoticeUpdateManyWithWhereWithoutDepartmentInput | NoticeUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: NoticeScalarWhereInput | NoticeScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<UserCreateWithoutDepartmentInput, UserUncheckedCreateWithoutDepartmentInput> | UserCreateWithoutDepartmentInput[] | UserUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: UserCreateOrConnectWithoutDepartmentInput | UserCreateOrConnectWithoutDepartmentInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutDepartmentInput | UserUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: UserCreateManyDepartmentInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutDepartmentInput | UserUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: UserUpdateManyWithWhereWithoutDepartmentInput | UserUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PageUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<PageCreateWithoutDepartmentInput, PageUncheckedCreateWithoutDepartmentInput> | PageCreateWithoutDepartmentInput[] | PageUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: PageCreateOrConnectWithoutDepartmentInput | PageCreateOrConnectWithoutDepartmentInput[]
    upsert?: PageUpsertWithWhereUniqueWithoutDepartmentInput | PageUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: PageCreateManyDepartmentInputEnvelope
    set?: PageWhereUniqueInput | PageWhereUniqueInput[]
    disconnect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    delete?: PageWhereUniqueInput | PageWhereUniqueInput[]
    connect?: PageWhereUniqueInput | PageWhereUniqueInput[]
    update?: PageUpdateWithWhereUniqueWithoutDepartmentInput | PageUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: PageUpdateManyWithWhereWithoutDepartmentInput | PageUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: PageScalarWhereInput | PageScalarWhereInput[]
  }

  export type NoticeUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<NoticeCreateWithoutDepartmentInput, NoticeUncheckedCreateWithoutDepartmentInput> | NoticeCreateWithoutDepartmentInput[] | NoticeUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: NoticeCreateOrConnectWithoutDepartmentInput | NoticeCreateOrConnectWithoutDepartmentInput[]
    upsert?: NoticeUpsertWithWhereUniqueWithoutDepartmentInput | NoticeUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: NoticeCreateManyDepartmentInputEnvelope
    set?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    disconnect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    delete?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    connect?: NoticeWhereUniqueInput | NoticeWhereUniqueInput[]
    update?: NoticeUpdateWithWhereUniqueWithoutDepartmentInput | NoticeUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: NoticeUpdateManyWithWhereWithoutDepartmentInput | NoticeUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: NoticeScalarWhereInput | NoticeScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPlacementsInput = {
    create?: XOR<UserCreateWithoutPlacementsInput, UserUncheckedCreateWithoutPlacementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlacementsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutPlacementsNestedInput = {
    create?: XOR<UserCreateWithoutPlacementsInput, UserUncheckedCreateWithoutPlacementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlacementsInput
    upsert?: UserUpsertWithoutPlacementsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPlacementsInput, UserUpdateWithoutPlacementsInput>, UserUncheckedUpdateWithoutPlacementsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumNoticeScopeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.NoticeScope | EnumNoticeScopeFieldRefInput<$PrismaModel> | null
    in?: $Enums.NoticeScope[] | ListEnumNoticeScopeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.NoticeScope[] | ListEnumNoticeScopeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumNoticeScopeNullableFilter<$PrismaModel> | $Enums.NoticeScope | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumNoticeScopeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NoticeScope | EnumNoticeScopeFieldRefInput<$PrismaModel> | null
    in?: $Enums.NoticeScope[] | ListEnumNoticeScopeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.NoticeScope[] | ListEnumNoticeScopeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumNoticeScopeNullableWithAggregatesFilter<$PrismaModel> | $Enums.NoticeScope | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumNoticeScopeNullableFilter<$PrismaModel>
    _max?: NestedEnumNoticeScopeNullableFilter<$PrismaModel>
  }

  export type NestedEnumPageScopeFilter<$PrismaModel = never> = {
    equals?: $Enums.PageScope | EnumPageScopeFieldRefInput<$PrismaModel>
    in?: $Enums.PageScope[] | ListEnumPageScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PageScope[] | ListEnumPageScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumPageScopeFilter<$PrismaModel> | $Enums.PageScope
  }

  export type NestedEnumPageScopeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PageScope | EnumPageScopeFieldRefInput<$PrismaModel>
    in?: $Enums.PageScope[] | ListEnumPageScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PageScope[] | ListEnumPageScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumPageScopeWithAggregatesFilter<$PrismaModel> | $Enums.PageScope
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPageScopeFilter<$PrismaModel>
    _max?: NestedEnumPageScopeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type DepartmentCreateWithoutUsersInput = {
    id?: string
    name: string
    departmentCode: string
    description?: string | null
    establishmentYear?: number | null
    location?: string | null
    pages?: PageCreateNestedManyWithoutDepartmentInput
    notices?: NoticeCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    departmentCode: string
    description?: string | null
    establishmentYear?: number | null
    location?: string | null
    pages?: PageUncheckedCreateNestedManyWithoutDepartmentInput
    notices?: NoticeUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentCreateOrConnectWithoutUsersInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutUsersInput, DepartmentUncheckedCreateWithoutUsersInput>
  }

  export type NoticeCreateWithoutCreatorInput = {
    id?: string
    title: string
    description?: string | null
    refNumber?: string | null
    date?: Date | string
    showTill?: Date | string | null
    category?: string
    fileName?: string | null
    filePath?: string | null
    scope?: $Enums.NoticeScope | null
    createdAt?: Date | string
    department?: DepartmentCreateNestedOneWithoutNoticesInput
  }

  export type NoticeUncheckedCreateWithoutCreatorInput = {
    id?: string
    title: string
    description?: string | null
    refNumber?: string | null
    date?: Date | string
    showTill?: Date | string | null
    category?: string
    fileName?: string | null
    filePath?: string | null
    scope?: $Enums.NoticeScope | null
    departmentId?: string | null
    createdAt?: Date | string
  }

  export type NoticeCreateOrConnectWithoutCreatorInput = {
    where: NoticeWhereUniqueInput
    create: XOR<NoticeCreateWithoutCreatorInput, NoticeUncheckedCreateWithoutCreatorInput>
  }

  export type NoticeCreateManyCreatorInputEnvelope = {
    data: NoticeCreateManyCreatorInput | NoticeCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type PageCreateWithoutCreatorInput = {
    id?: string
    pageKey: string
    scope: $Enums.PageScope
    data: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    createdAt?: Date | string
    department: DepartmentCreateNestedOneWithoutPagesInput
  }

  export type PageUncheckedCreateWithoutCreatorInput = {
    id?: string
    pageKey: string
    scope: $Enums.PageScope
    departmentId: string
    data: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type PageCreateOrConnectWithoutCreatorInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutCreatorInput, PageUncheckedCreateWithoutCreatorInput>
  }

  export type PageCreateManyCreatorInputEnvelope = {
    data: PageCreateManyCreatorInput | PageCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type PlacementsCreateWithoutCreatorInput = {
    id?: string
    month?: string | null
    passing?: string | null
    studentName?: string | null
    course?: string | null
    branch?: string | null
    package?: string | null
    jobTitle?: string | null
    company?: string | null
    createdAt?: Date | string
  }

  export type PlacementsUncheckedCreateWithoutCreatorInput = {
    id?: string
    month?: string | null
    passing?: string | null
    studentName?: string | null
    course?: string | null
    branch?: string | null
    package?: string | null
    jobTitle?: string | null
    company?: string | null
    createdAt?: Date | string
  }

  export type PlacementsCreateOrConnectWithoutCreatorInput = {
    where: PlacementsWhereUniqueInput
    create: XOR<PlacementsCreateWithoutCreatorInput, PlacementsUncheckedCreateWithoutCreatorInput>
  }

  export type PlacementsCreateManyCreatorInputEnvelope = {
    data: PlacementsCreateManyCreatorInput | PlacementsCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type DepartmentUpsertWithoutUsersInput = {
    update: XOR<DepartmentUpdateWithoutUsersInput, DepartmentUncheckedUpdateWithoutUsersInput>
    create: XOR<DepartmentCreateWithoutUsersInput, DepartmentUncheckedCreateWithoutUsersInput>
    where?: DepartmentWhereInput
  }

  export type DepartmentUpdateToOneWithWhereWithoutUsersInput = {
    where?: DepartmentWhereInput
    data: XOR<DepartmentUpdateWithoutUsersInput, DepartmentUncheckedUpdateWithoutUsersInput>
  }

  export type DepartmentUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    establishmentYear?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    pages?: PageUpdateManyWithoutDepartmentNestedInput
    notices?: NoticeUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    establishmentYear?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    pages?: PageUncheckedUpdateManyWithoutDepartmentNestedInput
    notices?: NoticeUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type NoticeUpsertWithWhereUniqueWithoutCreatorInput = {
    where: NoticeWhereUniqueInput
    update: XOR<NoticeUpdateWithoutCreatorInput, NoticeUncheckedUpdateWithoutCreatorInput>
    create: XOR<NoticeCreateWithoutCreatorInput, NoticeUncheckedCreateWithoutCreatorInput>
  }

  export type NoticeUpdateWithWhereUniqueWithoutCreatorInput = {
    where: NoticeWhereUniqueInput
    data: XOR<NoticeUpdateWithoutCreatorInput, NoticeUncheckedUpdateWithoutCreatorInput>
  }

  export type NoticeUpdateManyWithWhereWithoutCreatorInput = {
    where: NoticeScalarWhereInput
    data: XOR<NoticeUpdateManyMutationInput, NoticeUncheckedUpdateManyWithoutCreatorInput>
  }

  export type NoticeScalarWhereInput = {
    AND?: NoticeScalarWhereInput | NoticeScalarWhereInput[]
    OR?: NoticeScalarWhereInput[]
    NOT?: NoticeScalarWhereInput | NoticeScalarWhereInput[]
    id?: StringFilter<"Notice"> | string
    title?: StringFilter<"Notice"> | string
    description?: StringNullableFilter<"Notice"> | string | null
    refNumber?: StringNullableFilter<"Notice"> | string | null
    date?: DateTimeFilter<"Notice"> | Date | string
    showTill?: DateTimeNullableFilter<"Notice"> | Date | string | null
    category?: StringFilter<"Notice"> | string
    fileName?: StringNullableFilter<"Notice"> | string | null
    filePath?: StringNullableFilter<"Notice"> | string | null
    scope?: EnumNoticeScopeNullableFilter<"Notice"> | $Enums.NoticeScope | null
    departmentId?: StringNullableFilter<"Notice"> | string | null
    createdAt?: DateTimeFilter<"Notice"> | Date | string
    createdBy?: StringNullableFilter<"Notice"> | string | null
  }

  export type PageUpsertWithWhereUniqueWithoutCreatorInput = {
    where: PageWhereUniqueInput
    update: XOR<PageUpdateWithoutCreatorInput, PageUncheckedUpdateWithoutCreatorInput>
    create: XOR<PageCreateWithoutCreatorInput, PageUncheckedCreateWithoutCreatorInput>
  }

  export type PageUpdateWithWhereUniqueWithoutCreatorInput = {
    where: PageWhereUniqueInput
    data: XOR<PageUpdateWithoutCreatorInput, PageUncheckedUpdateWithoutCreatorInput>
  }

  export type PageUpdateManyWithWhereWithoutCreatorInput = {
    where: PageScalarWhereInput
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyWithoutCreatorInput>
  }

  export type PageScalarWhereInput = {
    AND?: PageScalarWhereInput | PageScalarWhereInput[]
    OR?: PageScalarWhereInput[]
    NOT?: PageScalarWhereInput | PageScalarWhereInput[]
    id?: StringFilter<"Page"> | string
    pageKey?: StringFilter<"Page"> | string
    scope?: EnumPageScopeFilter<"Page"> | $Enums.PageScope
    departmentId?: StringFilter<"Page"> | string
    data?: JsonFilter<"Page">
    updatedAt?: DateTimeFilter<"Page"> | Date | string
    createdAt?: DateTimeFilter<"Page"> | Date | string
    createdBy?: StringFilter<"Page"> | string
  }

  export type PlacementsUpsertWithWhereUniqueWithoutCreatorInput = {
    where: PlacementsWhereUniqueInput
    update: XOR<PlacementsUpdateWithoutCreatorInput, PlacementsUncheckedUpdateWithoutCreatorInput>
    create: XOR<PlacementsCreateWithoutCreatorInput, PlacementsUncheckedCreateWithoutCreatorInput>
  }

  export type PlacementsUpdateWithWhereUniqueWithoutCreatorInput = {
    where: PlacementsWhereUniqueInput
    data: XOR<PlacementsUpdateWithoutCreatorInput, PlacementsUncheckedUpdateWithoutCreatorInput>
  }

  export type PlacementsUpdateManyWithWhereWithoutCreatorInput = {
    where: PlacementsScalarWhereInput
    data: XOR<PlacementsUpdateManyMutationInput, PlacementsUncheckedUpdateManyWithoutCreatorInput>
  }

  export type PlacementsScalarWhereInput = {
    AND?: PlacementsScalarWhereInput | PlacementsScalarWhereInput[]
    OR?: PlacementsScalarWhereInput[]
    NOT?: PlacementsScalarWhereInput | PlacementsScalarWhereInput[]
    id?: StringFilter<"Placements"> | string
    month?: StringNullableFilter<"Placements"> | string | null
    passing?: StringNullableFilter<"Placements"> | string | null
    studentName?: StringNullableFilter<"Placements"> | string | null
    course?: StringNullableFilter<"Placements"> | string | null
    branch?: StringNullableFilter<"Placements"> | string | null
    package?: StringNullableFilter<"Placements"> | string | null
    jobTitle?: StringNullableFilter<"Placements"> | string | null
    company?: StringNullableFilter<"Placements"> | string | null
    createdAt?: DateTimeFilter<"Placements"> | Date | string
    createdBy?: StringNullableFilter<"Placements"> | string | null
  }

  export type DepartmentCreateWithoutNoticesInput = {
    id?: string
    name: string
    departmentCode: string
    description?: string | null
    establishmentYear?: number | null
    location?: string | null
    users?: UserCreateNestedManyWithoutDepartmentInput
    pages?: PageCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateWithoutNoticesInput = {
    id?: string
    name: string
    departmentCode: string
    description?: string | null
    establishmentYear?: number | null
    location?: string | null
    users?: UserUncheckedCreateNestedManyWithoutDepartmentInput
    pages?: PageUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentCreateOrConnectWithoutNoticesInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutNoticesInput, DepartmentUncheckedCreateWithoutNoticesInput>
  }

  export type UserCreateWithoutNoticesInput = {
    id?: string
    username: string
    passwordHash: string
    email: string
    fullName: string
    staffCode?: string | null
    designation?: string | null
    phone?: string | null
    roles?: UserCreaterolesInput | $Enums.Role[]
    loginEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    department?: DepartmentCreateNestedOneWithoutUsersInput
    pages?: PageCreateNestedManyWithoutCreatorInput
    placements?: PlacementsCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutNoticesInput = {
    id?: string
    username: string
    passwordHash: string
    email: string
    fullName: string
    staffCode?: string | null
    designation?: string | null
    phone?: string | null
    departmentId?: string | null
    roles?: UserCreaterolesInput | $Enums.Role[]
    loginEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    pages?: PageUncheckedCreateNestedManyWithoutCreatorInput
    placements?: PlacementsUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutNoticesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNoticesInput, UserUncheckedCreateWithoutNoticesInput>
  }

  export type DepartmentUpsertWithoutNoticesInput = {
    update: XOR<DepartmentUpdateWithoutNoticesInput, DepartmentUncheckedUpdateWithoutNoticesInput>
    create: XOR<DepartmentCreateWithoutNoticesInput, DepartmentUncheckedCreateWithoutNoticesInput>
    where?: DepartmentWhereInput
  }

  export type DepartmentUpdateToOneWithWhereWithoutNoticesInput = {
    where?: DepartmentWhereInput
    data: XOR<DepartmentUpdateWithoutNoticesInput, DepartmentUncheckedUpdateWithoutNoticesInput>
  }

  export type DepartmentUpdateWithoutNoticesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    establishmentYear?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUpdateManyWithoutDepartmentNestedInput
    pages?: PageUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateWithoutNoticesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    establishmentYear?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUncheckedUpdateManyWithoutDepartmentNestedInput
    pages?: PageUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type UserUpsertWithoutNoticesInput = {
    update: XOR<UserUpdateWithoutNoticesInput, UserUncheckedUpdateWithoutNoticesInput>
    create: XOR<UserCreateWithoutNoticesInput, UserUncheckedCreateWithoutNoticesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNoticesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNoticesInput, UserUncheckedUpdateWithoutNoticesInput>
  }

  export type UserUpdateWithoutNoticesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.Role[]
    loginEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneWithoutUsersNestedInput
    pages?: PageUpdateManyWithoutCreatorNestedInput
    placements?: PlacementsUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutNoticesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.Role[]
    loginEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pages?: PageUncheckedUpdateManyWithoutCreatorNestedInput
    placements?: PlacementsUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type DepartmentCreateWithoutPagesInput = {
    id?: string
    name: string
    departmentCode: string
    description?: string | null
    establishmentYear?: number | null
    location?: string | null
    users?: UserCreateNestedManyWithoutDepartmentInput
    notices?: NoticeCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateWithoutPagesInput = {
    id?: string
    name: string
    departmentCode: string
    description?: string | null
    establishmentYear?: number | null
    location?: string | null
    users?: UserUncheckedCreateNestedManyWithoutDepartmentInput
    notices?: NoticeUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentCreateOrConnectWithoutPagesInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutPagesInput, DepartmentUncheckedCreateWithoutPagesInput>
  }

  export type UserCreateWithoutPagesInput = {
    id?: string
    username: string
    passwordHash: string
    email: string
    fullName: string
    staffCode?: string | null
    designation?: string | null
    phone?: string | null
    roles?: UserCreaterolesInput | $Enums.Role[]
    loginEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    department?: DepartmentCreateNestedOneWithoutUsersInput
    notices?: NoticeCreateNestedManyWithoutCreatorInput
    placements?: PlacementsCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutPagesInput = {
    id?: string
    username: string
    passwordHash: string
    email: string
    fullName: string
    staffCode?: string | null
    designation?: string | null
    phone?: string | null
    departmentId?: string | null
    roles?: UserCreaterolesInput | $Enums.Role[]
    loginEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    notices?: NoticeUncheckedCreateNestedManyWithoutCreatorInput
    placements?: PlacementsUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutPagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPagesInput, UserUncheckedCreateWithoutPagesInput>
  }

  export type DepartmentUpsertWithoutPagesInput = {
    update: XOR<DepartmentUpdateWithoutPagesInput, DepartmentUncheckedUpdateWithoutPagesInput>
    create: XOR<DepartmentCreateWithoutPagesInput, DepartmentUncheckedCreateWithoutPagesInput>
    where?: DepartmentWhereInput
  }

  export type DepartmentUpdateToOneWithWhereWithoutPagesInput = {
    where?: DepartmentWhereInput
    data: XOR<DepartmentUpdateWithoutPagesInput, DepartmentUncheckedUpdateWithoutPagesInput>
  }

  export type DepartmentUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    establishmentYear?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUpdateManyWithoutDepartmentNestedInput
    notices?: NoticeUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    departmentCode?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    establishmentYear?: NullableIntFieldUpdateOperationsInput | number | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUncheckedUpdateManyWithoutDepartmentNestedInput
    notices?: NoticeUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type UserUpsertWithoutPagesInput = {
    update: XOR<UserUpdateWithoutPagesInput, UserUncheckedUpdateWithoutPagesInput>
    create: XOR<UserCreateWithoutPagesInput, UserUncheckedCreateWithoutPagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPagesInput, UserUncheckedUpdateWithoutPagesInput>
  }

  export type UserUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.Role[]
    loginEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneWithoutUsersNestedInput
    notices?: NoticeUpdateManyWithoutCreatorNestedInput
    placements?: PlacementsUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutPagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.Role[]
    loginEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notices?: NoticeUncheckedUpdateManyWithoutCreatorNestedInput
    placements?: PlacementsUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserCreateWithoutDepartmentInput = {
    id?: string
    username: string
    passwordHash: string
    email: string
    fullName: string
    staffCode?: string | null
    designation?: string | null
    phone?: string | null
    roles?: UserCreaterolesInput | $Enums.Role[]
    loginEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    notices?: NoticeCreateNestedManyWithoutCreatorInput
    pages?: PageCreateNestedManyWithoutCreatorInput
    placements?: PlacementsCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutDepartmentInput = {
    id?: string
    username: string
    passwordHash: string
    email: string
    fullName: string
    staffCode?: string | null
    designation?: string | null
    phone?: string | null
    roles?: UserCreaterolesInput | $Enums.Role[]
    loginEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    notices?: NoticeUncheckedCreateNestedManyWithoutCreatorInput
    pages?: PageUncheckedCreateNestedManyWithoutCreatorInput
    placements?: PlacementsUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutDepartmentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDepartmentInput, UserUncheckedCreateWithoutDepartmentInput>
  }

  export type UserCreateManyDepartmentInputEnvelope = {
    data: UserCreateManyDepartmentInput | UserCreateManyDepartmentInput[]
    skipDuplicates?: boolean
  }

  export type PageCreateWithoutDepartmentInput = {
    id?: string
    pageKey: string
    scope: $Enums.PageScope
    data: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    createdAt?: Date | string
    creator: UserCreateNestedOneWithoutPagesInput
  }

  export type PageUncheckedCreateWithoutDepartmentInput = {
    id?: string
    pageKey: string
    scope: $Enums.PageScope
    data: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    createdAt?: Date | string
    createdBy: string
  }

  export type PageCreateOrConnectWithoutDepartmentInput = {
    where: PageWhereUniqueInput
    create: XOR<PageCreateWithoutDepartmentInput, PageUncheckedCreateWithoutDepartmentInput>
  }

  export type PageCreateManyDepartmentInputEnvelope = {
    data: PageCreateManyDepartmentInput | PageCreateManyDepartmentInput[]
    skipDuplicates?: boolean
  }

  export type NoticeCreateWithoutDepartmentInput = {
    id?: string
    title: string
    description?: string | null
    refNumber?: string | null
    date?: Date | string
    showTill?: Date | string | null
    category?: string
    fileName?: string | null
    filePath?: string | null
    scope?: $Enums.NoticeScope | null
    createdAt?: Date | string
    creator?: UserCreateNestedOneWithoutNoticesInput
  }

  export type NoticeUncheckedCreateWithoutDepartmentInput = {
    id?: string
    title: string
    description?: string | null
    refNumber?: string | null
    date?: Date | string
    showTill?: Date | string | null
    category?: string
    fileName?: string | null
    filePath?: string | null
    scope?: $Enums.NoticeScope | null
    createdAt?: Date | string
    createdBy?: string | null
  }

  export type NoticeCreateOrConnectWithoutDepartmentInput = {
    where: NoticeWhereUniqueInput
    create: XOR<NoticeCreateWithoutDepartmentInput, NoticeUncheckedCreateWithoutDepartmentInput>
  }

  export type NoticeCreateManyDepartmentInputEnvelope = {
    data: NoticeCreateManyDepartmentInput | NoticeCreateManyDepartmentInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutDepartmentInput, UserUncheckedUpdateWithoutDepartmentInput>
    create: XOR<UserCreateWithoutDepartmentInput, UserUncheckedCreateWithoutDepartmentInput>
  }

  export type UserUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutDepartmentInput, UserUncheckedUpdateWithoutDepartmentInput>
  }

  export type UserUpdateManyWithWhereWithoutDepartmentInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    staffCode?: StringNullableFilter<"User"> | string | null
    designation?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    departmentId?: StringNullableFilter<"User"> | string | null
    roles?: EnumRoleNullableListFilter<"User">
    loginEnabled?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type PageUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: PageWhereUniqueInput
    update: XOR<PageUpdateWithoutDepartmentInput, PageUncheckedUpdateWithoutDepartmentInput>
    create: XOR<PageCreateWithoutDepartmentInput, PageUncheckedCreateWithoutDepartmentInput>
  }

  export type PageUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: PageWhereUniqueInput
    data: XOR<PageUpdateWithoutDepartmentInput, PageUncheckedUpdateWithoutDepartmentInput>
  }

  export type PageUpdateManyWithWhereWithoutDepartmentInput = {
    where: PageScalarWhereInput
    data: XOR<PageUpdateManyMutationInput, PageUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type NoticeUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: NoticeWhereUniqueInput
    update: XOR<NoticeUpdateWithoutDepartmentInput, NoticeUncheckedUpdateWithoutDepartmentInput>
    create: XOR<NoticeCreateWithoutDepartmentInput, NoticeUncheckedCreateWithoutDepartmentInput>
  }

  export type NoticeUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: NoticeWhereUniqueInput
    data: XOR<NoticeUpdateWithoutDepartmentInput, NoticeUncheckedUpdateWithoutDepartmentInput>
  }

  export type NoticeUpdateManyWithWhereWithoutDepartmentInput = {
    where: NoticeScalarWhereInput
    data: XOR<NoticeUpdateManyMutationInput, NoticeUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type UserCreateWithoutPlacementsInput = {
    id?: string
    username: string
    passwordHash: string
    email: string
    fullName: string
    staffCode?: string | null
    designation?: string | null
    phone?: string | null
    roles?: UserCreaterolesInput | $Enums.Role[]
    loginEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    department?: DepartmentCreateNestedOneWithoutUsersInput
    notices?: NoticeCreateNestedManyWithoutCreatorInput
    pages?: PageCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutPlacementsInput = {
    id?: string
    username: string
    passwordHash: string
    email: string
    fullName: string
    staffCode?: string | null
    designation?: string | null
    phone?: string | null
    departmentId?: string | null
    roles?: UserCreaterolesInput | $Enums.Role[]
    loginEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    notices?: NoticeUncheckedCreateNestedManyWithoutCreatorInput
    pages?: PageUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutPlacementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPlacementsInput, UserUncheckedCreateWithoutPlacementsInput>
  }

  export type UserUpsertWithoutPlacementsInput = {
    update: XOR<UserUpdateWithoutPlacementsInput, UserUncheckedUpdateWithoutPlacementsInput>
    create: XOR<UserCreateWithoutPlacementsInput, UserUncheckedCreateWithoutPlacementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPlacementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPlacementsInput, UserUncheckedUpdateWithoutPlacementsInput>
  }

  export type UserUpdateWithoutPlacementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.Role[]
    loginEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneWithoutUsersNestedInput
    notices?: NoticeUpdateManyWithoutCreatorNestedInput
    pages?: PageUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutPlacementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.Role[]
    loginEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notices?: NoticeUncheckedUpdateManyWithoutCreatorNestedInput
    pages?: PageUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type NoticeCreateManyCreatorInput = {
    id?: string
    title: string
    description?: string | null
    refNumber?: string | null
    date?: Date | string
    showTill?: Date | string | null
    category?: string
    fileName?: string | null
    filePath?: string | null
    scope?: $Enums.NoticeScope | null
    departmentId?: string | null
    createdAt?: Date | string
  }

  export type PageCreateManyCreatorInput = {
    id?: string
    pageKey: string
    scope: $Enums.PageScope
    departmentId: string
    data: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    createdAt?: Date | string
  }

  export type PlacementsCreateManyCreatorInput = {
    id?: string
    month?: string | null
    passing?: string | null
    studentName?: string | null
    course?: string | null
    branch?: string | null
    package?: string | null
    jobTitle?: string | null
    company?: string | null
    createdAt?: Date | string
  }

  export type NoticeUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    refNumber?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    showTill?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableEnumNoticeScopeFieldUpdateOperationsInput | $Enums.NoticeScope | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneWithoutNoticesNestedInput
  }

  export type NoticeUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    refNumber?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    showTill?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableEnumNoticeScopeFieldUpdateOperationsInput | $Enums.NoticeScope | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoticeUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    refNumber?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    showTill?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableEnumNoticeScopeFieldUpdateOperationsInput | $Enums.NoticeScope | null
    departmentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageKey?: StringFieldUpdateOperationsInput | string
    scope?: EnumPageScopeFieldUpdateOperationsInput | $Enums.PageScope
    data?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    department?: DepartmentUpdateOneRequiredWithoutPagesNestedInput
  }

  export type PageUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageKey?: StringFieldUpdateOperationsInput | string
    scope?: EnumPageScopeFieldUpdateOperationsInput | $Enums.PageScope
    departmentId?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageKey?: StringFieldUpdateOperationsInput | string
    scope?: EnumPageScopeFieldUpdateOperationsInput | $Enums.PageScope
    departmentId?: StringFieldUpdateOperationsInput | string
    data?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlacementsUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: NullableStringFieldUpdateOperationsInput | string | null
    passing?: NullableStringFieldUpdateOperationsInput | string | null
    studentName?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    package?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlacementsUncheckedUpdateWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: NullableStringFieldUpdateOperationsInput | string | null
    passing?: NullableStringFieldUpdateOperationsInput | string | null
    studentName?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    package?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlacementsUncheckedUpdateManyWithoutCreatorInput = {
    id?: StringFieldUpdateOperationsInput | string
    month?: NullableStringFieldUpdateOperationsInput | string | null
    passing?: NullableStringFieldUpdateOperationsInput | string | null
    studentName?: NullableStringFieldUpdateOperationsInput | string | null
    course?: NullableStringFieldUpdateOperationsInput | string | null
    branch?: NullableStringFieldUpdateOperationsInput | string | null
    package?: NullableStringFieldUpdateOperationsInput | string | null
    jobTitle?: NullableStringFieldUpdateOperationsInput | string | null
    company?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyDepartmentInput = {
    id?: string
    username: string
    passwordHash: string
    email: string
    fullName: string
    staffCode?: string | null
    designation?: string | null
    phone?: string | null
    roles?: UserCreaterolesInput | $Enums.Role[]
    loginEnabled?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PageCreateManyDepartmentInput = {
    id?: string
    pageKey: string
    scope: $Enums.PageScope
    data: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    createdAt?: Date | string
    createdBy: string
  }

  export type NoticeCreateManyDepartmentInput = {
    id?: string
    title: string
    description?: string | null
    refNumber?: string | null
    date?: Date | string
    showTill?: Date | string | null
    category?: string
    fileName?: string | null
    filePath?: string | null
    scope?: $Enums.NoticeScope | null
    createdAt?: Date | string
    createdBy?: string | null
  }

  export type UserUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.Role[]
    loginEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notices?: NoticeUpdateManyWithoutCreatorNestedInput
    pages?: PageUpdateManyWithoutCreatorNestedInput
    placements?: PlacementsUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.Role[]
    loginEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notices?: NoticeUncheckedUpdateManyWithoutCreatorNestedInput
    pages?: PageUncheckedUpdateManyWithoutCreatorNestedInput
    placements?: PlacementsUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateManyWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    staffCode?: NullableStringFieldUpdateOperationsInput | string | null
    designation?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    roles?: UserUpdaterolesInput | $Enums.Role[]
    loginEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PageUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageKey?: StringFieldUpdateOperationsInput | string
    scope?: EnumPageScopeFieldUpdateOperationsInput | $Enums.PageScope
    data?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneRequiredWithoutPagesNestedInput
  }

  export type PageUncheckedUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageKey?: StringFieldUpdateOperationsInput | string
    scope?: EnumPageScopeFieldUpdateOperationsInput | $Enums.PageScope
    data?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type PageUncheckedUpdateManyWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageKey?: StringFieldUpdateOperationsInput | string
    scope?: EnumPageScopeFieldUpdateOperationsInput | $Enums.PageScope
    data?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type NoticeUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    refNumber?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    showTill?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableEnumNoticeScopeFieldUpdateOperationsInput | $Enums.NoticeScope | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creator?: UserUpdateOneWithoutNoticesNestedInput
  }

  export type NoticeUncheckedUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    refNumber?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    showTill?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableEnumNoticeScopeFieldUpdateOperationsInput | $Enums.NoticeScope | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NoticeUncheckedUpdateManyWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    refNumber?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    showTill?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    category?: StringFieldUpdateOperationsInput | string
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    filePath?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableEnumNoticeScopeFieldUpdateOperationsInput | $Enums.NoticeScope | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}