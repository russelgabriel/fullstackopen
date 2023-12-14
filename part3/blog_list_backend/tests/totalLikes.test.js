const totalLikes = require('../utils/list_helper').totalLikes

describe('totalLikes', () => {
  test('returns 0 for an empty list of blogs', () => {
    const blogs = [];
    const result = totalLikes(blogs);
    expect(result).toBe(0);
  });

  test('returns the correct total likes for a list of blogs', () => {
    const blogs = [
      {
        _id: '1',
        title: 'Blog 1',
        author: 'Author 1',
        url: 'https://example.com/blog1',
        likes: 10,
        __v: 0,
      },
      {
        _id: '2',
        title: 'Blog 2',
        author: 'Author 2',
        url: 'https://example.com/blog2',
        likes: 5,
        __v: 0,
      },
      {
        _id: '3',
        title: 'Blog 3',
        author: 'Author 3',
        url: 'https://example.com/blog3',
        likes: 15,
        __v: 0,
      },
    ];
    const result = totalLikes(blogs);
    expect(result).toBe(30);
  });

  test('returns the correct total likes for a list of blogs with only one blog', () => {
    const blogs = [
      {
        _id: '1',
        title: 'Blog 1',
        author: 'Author 1',
        url: 'https://example.com/blog1',
        likes: 10,
        __v: 0,
      }
    ];
    const result = totalLikes(blogs);
    expect(result).toBe(10);
  });
});
