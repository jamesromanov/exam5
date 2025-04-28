import { Optional } from "sequelize";

export interface logger {
  time: string;
  ip: string;
  method: string;
}

export interface loggerUpdate extends Optional<logger, "ip"> {}
