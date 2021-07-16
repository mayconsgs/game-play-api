import BaseModel from "./_baseModel";

class ParticipantsModel extends BaseModel {
  constructor() {
    super("participants");
  }
}

export const participantsModel = new ParticipantsModel();
