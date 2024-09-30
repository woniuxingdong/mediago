import { injectable } from "inversify";
import { DataSource, EntityManager } from "typeorm";
import { Favorite } from "../entity/Favorite.ts";
import { Vendor } from "../core/vendor.ts";
import { Video } from "../entity/Video.ts";
import { Config } from "../entity/Config.ts";

@injectable()
export default class DatabaseService implements Vendor {
  appDataSource: DataSource;

  constructor() {
    this.appDataSource = new DataSource({
      type: "mysql",
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      synchronize: true,
      logging: false,
      // charset: "utf8mb4",
      entities: [Favorite, Video, Config],
      migrations: [],
      subscribers: [],
    });
  }

  async init() {
    await this.appDataSource.initialize();
  }

  get manager(): EntityManager {
    return this.appDataSource.manager;
  }
}