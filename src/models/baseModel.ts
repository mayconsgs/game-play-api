import database from "../database/connection";

class BaseModel {
  private table: string;

  constructor(table: string) {
    this.table = table;
  }

  async index() {
    return (await database(this.table).select()) as object[];
  }

  async get(queryParams: object) {
    const [data] = (await database(this.table)
      .select()
      .where(queryParams)) as object[];

    return data;
  }

  async create(data: object) {
    return await database(this.table).insert(data);
  }

  async update(data: object) {
    return await database(this.table).update(data);
  }

  async destroy(queryParams: object) {
    return await database(this.table).delete().where(queryParams);
  }
}

export default BaseModel;
