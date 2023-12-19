const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Blog 1",
    author: "Author 1",
    url: "https://example.com/blog1",
    likes: 10
  },
  {
    title: "Blog 2",
    author: "Author 2",
    url: "https://example.com/blog2",
    likes: 5
  },
  {
    title: "Blog 3",
    author: "Author 3",
    url: "https://example.com/blog3",
    likes: 15
  }
];

const initialUsers = [
	{
		username: "testuser1",
		name: "Test User 1",
		password: "testpassword1"
	},
	{
		username: "testuser2",
		name: "Test User 2",
		password: "testpassword2"
	},
	{
		username: "testuser3",
		name: "Test User 3",
		password: "testpassword3"
	}
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon", url: "https://example.com" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
	initialUsers,
  nonExistingId,
  blogsInDb,
	usersInDb
}
