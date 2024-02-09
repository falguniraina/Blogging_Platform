const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5, // Minimum length of 5 characters for the title
        maxlength: 100, // Maximum length of 100 characters for the title
      },
      content: {
        type: String,
        required: true,
        minlength: 50, // Minimum length of 50 characters for the content
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      },
},{
    timestamps: true
});

const blogModel = mongoose.model("blogs",blogSchema);

module.exports = blogModel;