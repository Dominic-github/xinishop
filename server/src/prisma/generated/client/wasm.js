
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.17.0
 * Query Engine version: 393aa359c9ad4a4bb28630fb5613f9c281cde053
 */
Prisma.prismaVersion = {
  client: "5.17.0",
  engine: "393aa359c9ad4a4bb28630fb5613f9c281cde053"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AddressScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.AdministrativeRegionsScalarFieldEnum = {
  id: 'id',
  name: 'name',
  name_en: 'name_en',
  code_name: 'code_name',
  code_name_en: 'code_name_en'
};

exports.Prisma.AdministrativeUnitsScalarFieldEnum = {
  id: 'id',
  full_name: 'full_name',
  full_name_en: 'full_name_en',
  short_name: 'short_name',
  short_name_en: 'short_name_en',
  code_name: 'code_name',
  code_name_en: 'code_name_en'
};

exports.Prisma.ProvincesScalarFieldEnum = {
  code: 'code',
  name: 'name',
  name_en: 'name_en',
  full_name: 'full_name',
  full_name_en: 'full_name_en',
  code_name: 'code_name',
  administrative_region_id: 'administrative_region_id',
  administrative_unit_id: 'administrative_unit_id'
};

exports.Prisma.DistrictsScalarFieldEnum = {
  code: 'code',
  name: 'name',
  name_en: 'name_en',
  full_name: 'full_name',
  full_name_en: 'full_name_en',
  code_name: 'code_name',
  province_code: 'province_code',
  administrative_unit_id: 'administrative_unit_id'
};

exports.Prisma.WardsScalarFieldEnum = {
  code: 'code',
  name: 'name',
  name_en: 'name_en',
  full_name: 'full_name',
  full_name_en: 'full_name_en',
  code_name: 'code_name',
  district_code: 'district_code',
  administrative_unit_id: 'administrative_unit_id'
};

exports.Prisma.ApiKeyScalarFieldEnum = {
  key: 'key',
  status: 'status',
  permissions: 'permissions',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.CartScalarFieldEnum = {
  id: 'id',
  cart_state: 'cart_state',
  cart_count_product: 'cart_count_product',
  cart_user_id: 'cart_user_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.CartProductScalarFieldEnum = {
  cart_id: 'cart_id',
  product_id: 'product_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.CommentScalarFieldEnum = {
  comment_product_id: 'comment_product_id',
  comment_user_id: 'comment_user_id',
  comment_left: 'comment_left',
  comment_right: 'comment_right',
  comment_parent_id: 'comment_parent_id',
  is_deleted: 'is_deleted',
  created_at: 'created_at',
  updated_at: 'updated_at',
  commentId: 'commentId'
};

exports.Prisma.DiscountScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.OtpScalarFieldEnum = {
  id: 'id',
  key: 'key',
  otp: 'otp',
  data: 'data',
  time: 'time',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  username: 'username',
  password: 'password',
  email: 'email',
  emailConfirmed: 'emailConfirmed',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  product_name: 'product_name',
  product_thumb: 'product_thumb',
  product_description: 'product_description',
  product_slug: 'product_slug',
  product_price: 'product_price',
  product_quality: 'product_quality',
  product_type: 'product_type',
  product_shop: 'product_shop',
  product_attributes: 'product_attributes',
  product_ratingsAverage: 'product_ratingsAverage',
  product_variations: 'product_variations',
  isDraft: 'isDraft',
  isPublished: 'isPublished',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.RoleScalarFieldEnum = {
  id: 'id',
  role_name: 'role_name',
  role_slug: 'role_slug',
  role_status: 'role_status',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.GrantScalarFieldEnum = {
  resource: 'resource',
  actions: 'actions',
  attributes: 'attributes',
  role_id: 'role_id'
};

exports.Prisma.ShippingScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ShopScalarFieldEnum = {
  user_id: 'user_id',
  shop_name: 'shop_name',
  shop_password: 'shop_password',
  shop_email: 'shop_email',
  shop_msisdn: 'shop_msisdn',
  shop_status: 'shop_status',
  shop_verify: 'shop_verify',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.TokenScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  public_key: 'public_key',
  private_key: 'private_key',
  refresh_token: 'refresh_token',
  refresh_token_used: 'refresh_token_used',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  user_name: 'user_name',
  user_full_name: 'user_full_name',
  user_slug: 'user_slug',
  user_password: 'user_password',
  user_email: 'user_email',
  user_email_confirmed: 'user_email_confirmed',
  user_salt: 'user_salt',
  user_phone: 'user_phone',
  user_sex: 'user_sex',
  user_status: 'user_status',
  user_role: 'user_role',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.cart_state = exports.$Enums.cart_state = {
  active: 'active',
  completed: 'completed',
  fail: 'fail',
  pending: 'pending',
  lock: 'lock'
};

exports.ProductType = exports.$Enums.ProductType = {
  clothing: 'clothing'
};

exports.role_name = exports.$Enums.role_name = {
  user: 'user',
  shop: 'shop',
  admin: 'admin'
};

exports.role_status = exports.$Enums.role_status = {
  pending: 'pending',
  active: 'active',
  block: 'block'
};

exports.ShopStatus = exports.$Enums.ShopStatus = {
  active: 'active',
  inactive: 'inactive',
  deleted: 'deleted'
};

exports.UserStatus = exports.$Enums.UserStatus = {
  pending: 'pending',
  active: 'active',
  block: 'block'
};

exports.Prisma.ModelName = {
  Address: 'Address',
  AdministrativeRegions: 'AdministrativeRegions',
  AdministrativeUnits: 'AdministrativeUnits',
  Provinces: 'Provinces',
  Districts: 'Districts',
  Wards: 'Wards',
  ApiKey: 'ApiKey',
  Cart: 'Cart',
  CartProduct: 'CartProduct',
  Category: 'Category',
  Comment: 'Comment',
  Discount: 'Discount',
  Notification: 'Notification',
  Order: 'Order',
  Otp: 'Otp',
  Payment: 'Payment',
  Product: 'Product',
  Role: 'Role',
  Grant: 'Grant',
  Shipping: 'Shipping',
  Shop: 'Shop',
  Token: 'Token',
  User: 'User'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
