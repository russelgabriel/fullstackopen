const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let favorite = blogs[0];
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > favorite.likes) {
      favorite = blogs[i];
    }
  }

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  };
}

const mostBlogs = (blogs) => {
  const authorWithMostBlogs = _(blogs)
    .groupBy('author') // Group blogs by author
    .map((authorBlogs, author) => ({ // Map to an array of objects with author and blogs
      author: author,
      blogs: authorBlogs.length
    }))
    .orderBy('blogs', 'desc') // Order by number of blogs in descending order
    .head(); // Get the first item

  return authorWithMostBlogs || null; // Return the result or null if the array was empty
}

const mostLikes = (blogs) => {
  const authorWithMostLikes = _(blogs)
    .groupBy('author') // Group blogs by author
    .map((authorBlogs, author) => ({ // Map to an array of objects with author and likes
      author: author,
      likes: _.sumBy(authorBlogs, 'likes') // Sum the likes of each author's blogs
    }))
    .orderBy('likes', 'desc') // Order by number of likes in descending order
    .head(); // Get the first item

  return authorWithMostLikes || null; // Return the result or null if the array was empty
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}