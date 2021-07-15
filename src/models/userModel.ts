import BaseModel from "./baseModel";

class UserModel extends BaseModel {
  constructor() {
    super("users");
  }
}

export default new UserModel();
