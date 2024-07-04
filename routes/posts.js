import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  getSinglePost,
  updatePost,
} from "../controllers/postController.js";
const router = express.Router();

// GET Single Post
router.get("/:id", getSinglePost);

// GET Posts
router.get("/", getPosts);

// Create Post
router.post("/create", createPost);

// Update Post
router.put("/update/:id", updatePost);

// Delete Post
router.delete("/delete/:id", deletePost);

export default router;
