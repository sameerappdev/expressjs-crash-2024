const output = document.querySelector("#posts-output");
const button = document.querySelector("#get-posts-button");
const form = document.querySelector("#add-post-form");

const showPosts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/posts");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const posts = await res.json();
    output.innerHTML = "";

    posts.forEach((post) => {
      const postData = document.createElement("div");
      postData.textContent = post.title;
      output.appendChild(postData);
    });
  } catch (error) {
    console.log("Error fetching posts:", error);
  }
};

const createPost = async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const title = formData.get('title');
  try {
    const res = await fetch("http://localhost:3000/api/posts/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title})
    });
    if (!res.ok) {
      throw new Error("Failed to add post");
    }
    const newPost = await res.json();

    const postData = document.createElement("div");
    postData.textContent = newPost.title;
    output.appendChild(postData);
    form.reset();
    showPosts();
  } catch (error) {
    console.log("Error adding post");
  }
};

// Event Listener
button.addEventListener("click", showPosts);
form.addEventListener('submit', createPost);