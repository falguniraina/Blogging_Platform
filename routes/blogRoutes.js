const router = require("express").Router();

const {getAllBlogs,getBlogById,createBlog,editBlogById,deleteBlogById, getAllBlogsByUserId} = require("../controllers/blogControllers");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Blogs:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the blog
 *         content:
 *           type: string
 *           description: The content of the blog
 *         author:
 *           type: object
 *           description: author ref to user
 *     
 */


/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: REST API For Managing Blogs
 * /api/blogs/getAllBlogs:
 *   get:
 *     tags: [Blogs]
 *     description: All Blogs
 *     responses:
 *       200:
 *         description: Returns all the blogs
 */
router.get("/getAllBlogs",authMiddleware,getAllBlogs);

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: REST API For Managing Blogs
 * /api/blogs/getAllBlogsByUserId:
 *   get:
 *     tags: [Blogs]
 *     description: All Blogs Of Particular User
 *     responses:
 *       200:
 *         description: Returns all the blogs of logged in user
 */
router.get("/getAllBlogsByUserId",authMiddleware,getAllBlogsByUserId);

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: REST API For Managing Blogs
 * /api/blogs/getBlogById/{id}:
 *   get:
 *     tags: [Blogs]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The Selected Blog ID.
 *     description: Selected Blog By Id
 *     responses:
 *       200:
 *         description: Returns the selected blog by id
 */
router.get("/getBlogById/:id",authMiddleware,getBlogById);

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: REST API For Managing Blogs
 * /api/blogs/createBlog:
 *   post:
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blogs'
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/createBlog",authMiddleware,createBlog);


/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: REST API For Managing Blogs
 * /api/blogs/editBlogById/{id}:
 *   put:
 *     tags: [Blogs]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The Selected Blog ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blogs'
 *     responses:
 *       200:
 *         description: Updated the selected blog by id
 */
router.put("/editBlogById/:id",authMiddleware,editBlogById);

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: REST API For Managing Blogs
 * /api/blogs/deleteBlogById/{id}:
 *   delete:
 *     tags: [Blogs]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        type: string
 *        description: The Selected Blog ID.
 *     description: Selected Blog By Id
 *     responses:
 *       200:
 *         description: Deleted the selected blog by id
 */
router.delete("/deleteBlogById/:id",authMiddleware,deleteBlogById);

module.exports = router;