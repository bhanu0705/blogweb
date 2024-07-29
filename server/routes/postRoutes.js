// routes/postRoutes.js
const express = require('express');
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getLatestPosts
} = require('../controllers/postController');
const commentRoutes = require('./commentRoutes');
const upload = require('../middlewares/multer');

const router = express.Router();

router.get('/', getAllPosts);
router.get('/latest', getLatestPosts); 
router.get('/:id', getPostById);
router.post('/',upload.single('file'), createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

router.use('/:postId/comments', commentRoutes);

module.exports = router;
