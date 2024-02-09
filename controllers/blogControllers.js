const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const getAllBlogs = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userid });
    if (user) {
      const blogs = await Blog.find().populate("author");
      if (blogs.length != 0) {
        res.status(200).send({
          data: blogs,
          message: "All blogs fetched successfully.",
          success: true,
        });
      } else {
        res.status(404).send({
          data: null,
          message: "No blogs to display.",
          success: false,
        });
      }
    } else {
      res.status(401).send({
        data: null,
        message: "Not logged in user. Can't display blogs.",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
};

const getAllBlogsByUserId = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userid });
      if (user) {
        const blogs = await Blog.find({ author: user._id }).populate("author");
        if (blogs.length != 0) {
          res.status(200).send({
            data: blogs,
            message: `All blogs of currently logged in user: ${user.name} are fetched successfully.`,
            success: true,
          });
        } else {
          res.status(404).send({
            data: null,
            message: "No blogs to display.",
            success: false,
          });
        }
      } else {
        res.status(401).send({
          data: null,
          message: "Not logged in user. Can't display blogs.",
          success: false,
        });
      }
    } catch (error) {
      res.status(500).send({
        data: null,
        message: error.message,
        success: false,
      });
    }
  };

const getBlogById = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userid });
      if (user) {
        const blog = await Blog.findOne({ _id: req.params.id }).populate("author");
        if (blog) {
          res.status(200).send({
            data: blog,
            message: `Blog with id : ${blog._id}, title : ${blog.title} is fetched successfully.`,
            success: true,
          });
        } else {
          res.status(404).send({
            data: null,
            message: `Blog with id : ${req.params.id} doesnot exists.`,
            success: false,
          });
        }
      } else {
        res.status(401).send({
          data: null,
          message: "Not logged in user. Can't display the requested blog.",
          success: false,
        });
      }
    } catch (error) {
      res.status(500).send({
        data: null,
        message: error.message,
        success: false,
      });
    }
  };

const createBlog = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userid });
    if (user) {
      const blog = await Blog.findOne({
        title: req.body.title
      }).populate("author");
      if (blog) {
        res.status(403).send({
          data: null,
          message: `Blog with title: ${blog.title} already exists.`,
          success: false,
        });
      } else {
        try {
          req.body.author = req.body.userid;
          const newBlog = new Blog(req.body);
          await newBlog.save();
          res.status(200).send({
            data: null,
            message: `Blog with title: ${req.body.title} is created successfully.`,
            success: true,
          });
        } catch (error) {
          res.status(400).send({
            data: null,
            message: error.message,
            success: false,
          });
        }
      }
    } else {
      res.status(401).send({
        data: null,
        message: "Not logged in user. Can't display blogs.",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      data: null,
      message: error.message,
      success: false,
    });
  }
};

const editBlogById = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userid });
      if (user) {
        let blog = await Blog.findOne({ _id: req.params.id, author: user._id });
        if (blog) {
          blog.title = req.body.title;
          blog.content = req.body.content;
          await blog.save();
          res.status(200).send({
            data: null,
            message: `Blog with id : ${blog._id} is updated successfully.`,
            success: true,
          });
        } else {
          res.status(404).send({
            data: null,
            message: `Blog with id : ${req.params.id} doesnot exists.`,
            success: false,
          });
        }
      }
    // if admin user has to edit blog details for any blog then remove comments of the below part and replace user with user && user.role==="author" in if block above
    //   else if(user && user.role==="admin"){
    //     let blog = await Blog.findOne({ _id: req.params.id });
    //     if (blog) {
    //       blog.title = req.body.title;
    //       blog.content = req.body.content;
    //       await blog.save();
    //       res.status(200).send({
    //         data: null,
    //         message: `Blog with id : ${blog._id} is updated successfully by admin user : ${user.name} respectively.`,
    //         success: true,
    //       });
    //     } else {
    //       res.status(404).send({
    //         data: null,
    //         message: `Blog with id : ${req.params.id} doesnot exists.`,
    //         success: false,
    //       });
    //     }
    //   }
      else {
        res.status(401).send({
          data: null,
          message: "Not logged in user/trying to update other user blog. Can't edit the requested blog.",
          success: false,
        });
      }
    } catch (error) {
      res.status(500).send({
        data: null,
        message: error.message,
        success: false,
      });
    }
  };

  const deleteBlogById = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userid });
      if (user) {
        let blog = await Blog.findOne({ _id: req.params.id, author: user._id });
        if (blog) {
          await Blog.deleteOne({ _id: blog._id });
          res.status(200).send({
            data: null,
            message: `Blog with id : ${blog._id} is deleted successfully.`,
            success: true,
          });
        }
        else {
          res.status(404).send({
            data: null,
            message: `Blog with id : ${req.params.id} doesnot exists.`,
            success: false,
          });
        }
      } 
    // if admin user has to delete any blog then remove comments of the below part and replace user with user && user.role==="author" in if block above 
    //   else if(user && user.role==="admin"){
    //     let blog = await Blog.findOne({ _id: req.params.id, author: user._id });
    //     if (blog) {
    //       await Blog.deleteOne({ _id: blog._id });
    //       res.status(200).send({
    //         data: null,
    //         message: `Blog with id : ${blog._id} is deleted successfully by admin user : ${user.name} respectively.`,
    //         success: true,
    //       });
    //     }
    //     else {
    //       res.status(404).send({
    //         data: null,
    //         message: `Blog with id : ${req.params.id} doesnot exists.`,
    //         success: false,
    //       });
    //     }
    //   }
      else {
        res.status(401).send({
          data: null,
          message: "Not logged in user/trying to delete other user blog. Can't delete the requested blog.",
          success: false,
        });
      }
    } catch (error) {
      res.status(500).send({
        data: null,
        message: error.message,
        success: false,
      });
    }
  };




module.exports = { getAllBlogs, getAllBlogsByUserId, getBlogById, createBlog, editBlogById, deleteBlogById }