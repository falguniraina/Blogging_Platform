const mongoose = require("mongoose");
const Blog = require("./blogModel");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  age: {
    type: Number,
    required: true,
    min: 15,
    max: 99,
  },
  gender: {
    type: String,
    enum: ['M', 'F'],
    maxlength: 1,
    required: true
  },
  role: {
    type: String,
    enum: ['author', 'admin'],
    default: 'author',
    required: true
  },
},{
    timestamps: true
});

// Delete blogs of the user when a user is deleted
userSchema.post('deleteOne', async function () {
    const user = this._conditions;
    await Blog.deleteMany({ author: user._id });
});


const userModel = mongoose.model("users",userSchema);

module.exports = userModel;