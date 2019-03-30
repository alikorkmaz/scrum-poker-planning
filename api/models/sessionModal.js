const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    name: {
      type: String
    },
    numberOfVoters: {
      type: Number
    },
    stories: [
      {
        content: { type: String },
        isActive: { type: Boolean },
        masterVote: { type: String },
        developerVotes: [
          { browserId: { type: String }, vote: { type: String } }
        ],
        finalScore: { type: String }
      }
    ]
  },
  { collection: "Sessions" }
);

module.exports = mongoose.model("Sessions", sessionSchema);
