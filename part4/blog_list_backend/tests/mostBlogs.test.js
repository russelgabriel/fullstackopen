const mostBlogs = require('../utils/list_helper').mostBlogs

describe('mostBlogs', () => {
  test('returns the author with the most amount of blogs', () => {
    const blogs = [
      { _id: '1', title: 'Blog 1', author: 'Author 1', url: 'url1', likes: 10, __v: 0 },
      { _id: '2', title: 'Blog 2', author: 'Author 2', url: 'url2', likes: 5, __v: 0 },
      { _id: '3', title: 'Blog 3', author: 'Author 1', url: 'url3', likes: 15, __v: 0 },
      { _id: '4', title: 'Blog 4', author: 'Author 3', url: 'url4', likes: 20, __v: 0 },
      { _id: '5', title: 'Blog 5', author: 'Author 1', url: 'url5', likes: 8, __v: 0 },
    ];

    const result = mostBlogs(blogs);

    expect(result).toEqual({ author: 'Author 1', blogs: 3 });
  });

  test('returns null when the list of blogs is empty', () => {
    const blogs = [];

    const result = mostBlogs(blogs);

    expect(result).toBeNull();
  });

  test('returns the author when the list of blogs only has one blog', () => {
    const blogs = [
      { _id: '1', title: 'Blog 1', author: 'Author 1', url: 'url1', likes: 10, __v: 0 },
    ];

    const result = mostBlogs(blogs);

    expect(result).toEqual({ author: 'Author 1', blogs: 1 });
  });

  test('returns the first author when all authors have the same amount of blogs', () => {
    const blogs = [
      { _id: '1', title: 'Blog 1', author: 'Author 1', url: 'url1', likes: 10, __v: 0 },
      { _id: '2', title: 'Blog 2', author: 'Author 2', url: 'url2', likes: 5, __v: 0 },
      { _id: '3', title: 'Blog 3', author: 'Author 3', url: 'url3', likes: 15, __v: 0 },
    ];

    const result = mostBlogs(blogs);

    expect(result).toEqual({ author: 'Author 1', blogs: 1 });
  });
});
