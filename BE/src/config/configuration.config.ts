export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  databaseMysql: {
    host: process.env.DB_MYSQL_HOST,
    port: parseInt(process.env.DB_MYSQL_PORT, 10) || 5432,
    user: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    name: process.env.DB_MYSQL_NAME,
    trigger: process.env.DB_MYSQL_TRIGGER
      ? JSON.parse(process.env.DB_MYSQL_TRIGGER)
      : '',
    timezone: process.env.DB_MYSQL_TZ,
  },
  auth: {
    secret: process.env.SECRET_KEY,
    exprie: process.env.EXPRIE_TOKEN + 's',
    secretKeyRegisterConfirm: process.env.SECRET_KEY_REGISTER_CONFIRM,
    secretKeyRefeshToken: process.env.SECRET_KEY_REFRESH_TOKEN,
    exprie_refresh_token: process.env.EXPRIE_REFRESH_TOKEN + 's',
  },
  timezone: process.env.TZ,
});
export enum EConfiguration {
  ENVIRONMENT = 'environment',
  APP_NAME = 'appName',
  PORT = 'port',
  DB_MYSQL_HOST = 'databaseMysql.host',
  DB_MYSQL_PORT = 'databaseMysql.port',
  DB_MYSQL_USER = 'databaseMysql.user',
  DB_MYSQL_PASSWORD = 'databaseMysql.password',
  DB_MYSQL_NAME = 'databaseMysql.name',
  DB_MYSQL_TRIGGER = 'databaseMysql.trigger',
  DB_MYSQL_TZ = 'databaseMysql.timezone',
  AUTH_SECRET_KEY = 'auth.secret',
  AUTH_TOKEN_EXPIRE = 'auth.exprie',
  AUTH_TOKEN_CONFIRM_REGISTER = 'auth.secretKeyRegisterConfirm',
  AUTH_SECRET_KEY_REFRESH_TOKEN = 'auth.secretKeyRefeshToken',
  AUTH_REFRESH_TOKEN_EXPIRE = 'auth.exprie_refresh_token',
  TZ = 'timezone',
}
