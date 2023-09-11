const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    //creating our schema
    userName: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },

    email: {
      type: String,
      require: true,
      max: 20,
      unique: true,
    },

    password: {
      type: String,
      require: true,
      min: 6,
    },

    profilepicture: {
      type: String,
      default: '',
    },

    coverpicture: {
      type: String,
      default: '',
    },

    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    desc: {
      type: String,
      max: 50,
    },

    city: {
      type: String,
      max: 50,
    },

    from: {
      type: String,
      max: 50,
    },
    works: {
      type: String,
      max: 50,
    },
    study: {
      type: String,
      max: 50,
    },

    lives: {
      type: String,
      max: 50,
    },

    relationship: {
      type: Number,
      enum: [1, 2, 3],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
