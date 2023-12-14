const mostLikes = require('../utils/list_helper').mostLikes

describe('mostLikes', () => {
  test('returns the author with the greatest total amount of likes', () => {
    const blogs = [
      { _id: '1', author: 'John Doe', url: 'https://example.com/blog1', likes: 10, __v: 0 },
      { _id: '2', author: 'John Doe', url: 'https://example.com/blog2', likes: 5, __v: 0 },
      { _id: '3', author: 'Jane Smith', url: 'https://example.com/blog3', likes: 15, __v: 0 },
      { _id: '4', author: 'Jane Smith', url: 'https://example.com/blog4', likes: 20, __v: 0 },
      { _id: '5', author: 'Jane Smith', url: 'https://example.com/blog5', likes: 5, __v: 0 },
    ];

    const result = mostLikes(blogs);

    expect(result).toEqual({ author: 'Jane Smith', likes: 40 });
  });

  test('returns the author with the greatest total amount of likes when there is only one blog', () => {
    const blogs = [
      { _id: '1', author: 'John Doe', url: 'https://example.com/blog1', likes: 10, __v: 0 },
    ];

    const result = mostLikes(blogs);

    expect(result).toEqual({ author: 'John Doe', likes: 10 });
  });

  test('returns null when the blog list is empty', () => {
    const blogs = [];

    const result = mostLikes(blogs);

    expect(result).toBeNull();
  });

  test('returns the first author with the greatest total amount of likes when there are multiple authors with the same total likes', () => {
    const blogs = [
      { _id: '1', author: 'John Doe', url: 'https://example.com/blog1', likes: 10, __v: 0 },
      { _id: '2', author: 'John Doe', url: 'https://example.com/blog2', likes: 10, __v: 0 },
      { _id: '3', author: 'Jane Smith', url: 'https://example.com/blog3', likes: 15, __v: 0 },
      { _id: '4', author: 'Jane Smith', url: 'https://example.com/blog4', likes: 20, __v: 0 },
      { _id: '5', author: 'Jane Smith', url: 'https://example.com/blog5', likes: 5, __v: 0 },
      { _id: '6', author: 'John Doe', url: 'https://example.com/blog6', likes: 20, __v: 0 },
    ];

    const result = mostLikes(blogs);

    expect(result).toEqual({ author: 'John Doe', likes: 40 });
  });
});

