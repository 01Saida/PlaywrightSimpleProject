const { test, expect } = require('@playwright/test');

/**
 * API Test Suite using JSONPlaceholder - a free fake REST API
 * https://jsonplaceholder.typicode.com
 */
const API_BASE = 'https://jsonplaceholder.typicode.com';

test.describe('API Tests', () => {
  test('should get list of users', async ({ request }) => {
    const response = await request.get(`${API_BASE}/users`);

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
  });

  test('should get single user by ID', async ({ request }) => {
    const response = await request.get(`${API_BASE}/users/1`);

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('email');
  });

  test('should create new post', async ({ request }) => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post body',
      userId: 1,
    };

    const response = await request.post(`${API_BASE}/posts`, {
      data: newPost,
    });

    expect(response.status()).toBe(201);

    const data = await response.json();
    expect(data).toHaveProperty('title', newPost.title);
    expect(data).toHaveProperty('body', newPost.body);
    expect(data).toHaveProperty('id');
  });

  test('should update existing post', async ({ request }) => {
    const updateData = {
      title: 'Updated Title',
      body: 'Updated body content',
      userId: 1,
    };

    const response = await request.put(`${API_BASE}/posts/1`, {
      data: updateData,
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('title', updateData.title);
  });

  test('should patch existing post', async ({ request }) => {
    const patchData = {
      title: 'Patched Title',
    };

    const response = await request.patch(`${API_BASE}/posts/1`, {
      data: patchData,
    });

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('title', patchData.title);
  });

  test('should delete post', async ({ request }) => {
    const response = await request.delete(`${API_BASE}/posts/1`);

    expect(response.status()).toBe(200);
  });

  test('should get posts by user', async ({ request }) => {
    const response = await request.get(`${API_BASE}/posts?userId=1`);

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    data.forEach((post) => {
      expect(post.userId).toBe(1);
    });
  });

  test('should get comments for a post', async ({ request }) => {
    const response = await request.get(`${API_BASE}/posts/1/comments`);

    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
  });
});
