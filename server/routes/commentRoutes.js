const express = require('express');
const router = express.Router({ mergeParams: true });
const commentController = require('../controllers/commentController');

router.post('/', commentController.createComment);
router.get('/', commentController.getComments);
router.put('/:commentId', commentController.updateComment);
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;