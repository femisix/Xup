const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

//CREATE  a post

router.post('/', async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE  a post

router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json('Post has been updated');
    } else {
      res.status(403).json('you can update only your post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE  a post

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json('Post has been deleted');
    } else {
      res.status(403).json('you can delete only your post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//LIKE  a post

router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      //to check if the like array includes the user or not
      await post.updateOne({ $push: { likes: req.body.userId } }); //to like
      res.status(200).json('The post has been liked');
    } else {
      //to dislike
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('The post has been disliked');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET  a post

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET timeline post                  to get all followings of the user and all the post of the user

router.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    res.status(200).json(userPosts.concat(...friendPosts)); //it'll take all the friend post and concat with this post
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friend's post
// API route to get posts for a friend's profile
router.get('/timeline/friend/:userId/:friendUsername', async (req, res) => {
  try {
    const { userId, friendUsername } = req.params;
    const friend = await User.findOne({
      _id: userId,
      userName: friendUsername,
    });
    console.log('userId:', userId);
    console.log('friendUsername:', friendUsername);
    console.log('friend:', friend);

    if (!friend) {
      return res.status(404).json({ error: 'Friend not found' });
    }

    const posts = await Post.find({ userId: friend._id }).sort({
      createdAt: -1,
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// API endpoint for getting posts from user and friends timeline
// router.get('/timeline/:userId', async (req, res) => {
//     const userId = req.params.userId;

//     try {
//       // Find the user based on the userId
//       const user = await User.findById(userId).populate('followers');

//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       // Get friendIds from the user's friends array
//       const friendIds = [userId, ...user.followers.map(friend => friend._id)];

//       // Find posts from the user and friends
//       const timelinePosts = await Post.find({
//         userId: { $in: friendIds }
//       }).populate('userId');

//       res.json(timelinePosts);
//     } catch (error) {
//       console.error('Error retrieving timeline posts:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });

//get all the user's posts
router.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/", (req, res) =>{
//     console.log("post page")
// } );

module.exports = router;
