declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE: string;
    ACCESS_TOKEN_SECRET_KEY: string;
    ACCESS_TOKEN_EXP: string;
  }
}
