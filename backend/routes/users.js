const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

//UPDATE user
router.put('/:id', async (req, res) => {
  //the PUT is used to update POSTED user
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      //if user try to update password
      try {
        const salt = await bcrypt.genSalt(10); //to generate new password
        req.body.password = await bcrypt.hash(req.body.password, salt); //then update the password
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      //to update actual user details
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body, //this will automatically set all input in the body
      });
      res.status(200).json('Account has been updated');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(401).json('Only your account can be deleted');
  }
});

//DELETE user

router.delete('/:id', async (req, res) => {
  if (req.body.userId == req.params.id || req.body.isAdmin) {
    try {
      //to delete user
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json('Account has been deleted');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(401).json('Only your account can be deleted');
  }
});

//GET user
router.get('/', async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username }); //to be able to use the username or userId
    const { password, updatedAt, ...other } = user._doc; //the _doc carries our object of user(name, password et.c)
    res.status(200).json(other); //this code removes the password, UpdatedAt from the object of user in postman
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get('/friends/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );

    let friendList = [];
    friends.map((friend) => {
      const { _id, userName, profilepicture, coverpicture, works } = friend;
      friendList.push({
        _id,
        userName,
        profilepicture,
        coverpicture,
        works,
      });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friend's followings

router.get('/followers/:followerId/friends', async (req, res) => {
  const followerId = req.params.followerId;

  try {
    const follower = await User.findById(followerId);
    if (!follower) {
      return res.status(404).json({ error: 'Follower not found' });
    }

    const friends = await User.find({ _id: { $in: follower.followings } });
    res.json(friends);
  } catch (error) {
    console.error('Error fetching follower friends:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//to get friend's data
router.get('/friend/:friendId', async (req, res) => {
  try {
    const userId = req.params.friendId;
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// router.get('/friends/:userId', async (req, res) => {
//     const { userId } = req.params; // Assuming you have the authenticated user's ID available in the request object

//     try {
//       // Find the authenticated user
//       const user = await User.findById(userId).populate('followings');

//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       const followings = user.followings.map(({ _id, userName, profilepicture }) => ({
//         _id,
//         userName,
//         profilepicture,
//       }));

//       return res.status(200).json(followings);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Server Error' });
//     }
//   });

//FOLLOW a user

router.put('/:id/follow', async (req, res) => {
  const userId = req.params.id;
  const { userId: followerId } = req.body;

  try {
    if (userId === followerId) {
      return res.status(400).json('You cannot follow yourself');
    }

    const user = await User.findById(userId);
    const follower = await User.findById(followerId);

    if (!user || !follower) {
      return res.status(404).json('User or follower not found');
    }

    if (!user.followers.includes(followerId)) {
      await user.updateOne({ $push: { followers: followerId } });
      await follower.updateOne({ $push: { followings: userId } });
      res.status(200).json('User has been followed');
    } else {
      res.status(403).json('You are already following this user');
    }
  } catch (error) {
    res.status(500).json('Server error');
  }
});

//UNFOLLOW a user

router.put('/:id/unfollow', async (req, res) => {
  try {
    const { userId } = req.body;
    const friendId = req.params.id;

    if (userId === friendId) {
      return res.status(403).json('You cannot unfollow yourself');
    }

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json('User or friend not found');
    }

    if (user.followings.includes(friendId)) {
      await user.updateOne({ $pull: { followings: friendId } });
      await friend.updateOne({ $pull: { followers: userId } });
      res.status(200).json('Unfollowed successfully');
    } else {
      res.status(403).json('You are not following this user');
    }
  } catch (error) {
    res.status(500).json('Server error');
  }
});

//to check if user is following
router.get('/check-follow/:friendId', async (req, res) => {
  try {
    const { friendId } = req.params;
    const { _id } = req.user; // Assuming you have user information in req.user

    // Find the user and the friend by their IDs
    const user = await User.findById(_id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    // Check if the user's followings include the friend's ID
    const isFollowing = user.followings.includes(friendId);

    res.json({ isFollowing });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
