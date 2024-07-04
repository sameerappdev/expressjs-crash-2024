let posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
  { id: 3, title: "Post Three" },
  { id: 4, title: "Post Four" },
  { id: 5, title: "Post Five" },
];

// @desc Get all posts
// @route GET /api/posts
export const getPosts = (req, res) => {
  // Handle Query for filtering like (limit, asc, desc) and SQL injection
  const limit = parseInt(req.query.limit);
  // console.log("query", req.query);
  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts); // Passing Status Codes
};

// @desc Get single post
// @route GET /api/posts/:id
export const getSinglePost = (req, res, next) => {
  const id = parseInt(req.params?.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`A post with the id ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(post);
};

// @desc Create Post
// @route POST /api/create
export const createPost = (req, res, next) => {
  //   console.log(req.body);
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
  };
  if (!newPost.title) {
    const error = new Error("Please enter title");
    error.status = 400;
    return next(error);
  } else if (posts.find((post) => post.title === req.body.title)) {
    const error = new Error("Post with same title already exists");
    error.status = 409;
    return next(error);
  } else {
    posts.push(newPost);
    res.status(201).json(posts);
  }
};

// @desc Update Post
// @route PUT /update/:id
export const updatePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`A post with the id ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  post.title = req.body.title;
  res.status(200).json(posts);
};

// @desc Delete Post
// @route DELETE /delete/:id
export const deletePost = (req, res, next) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    const error = new Error(`A post with the id ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  posts = posts.filter((post) => post.id !== id);
  res.status(200).json(posts);
};
