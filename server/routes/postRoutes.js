const express = require('express');
const commentRoutes = require('./commentRoutes');
const upload = require('../middlewares/multer');
const router = express.Router();

const {
   getAllPosts,
   getPostById,
   createPost,
   updatePost,
   deletePost,
   getLatestPosts,
   getPostsByEmail, // Import the new function
} = require('../controllers/postController');


router.get('/my-blogs', getPostsByEmail);
router.get('/', getAllPosts);
router.get('/latest', getLatestPosts);
router.get('/:id', getPostById);
router.post('/', upload.single('file'), createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

router.use('/:postId/comments', commentRoutes);

module.exports = router;
