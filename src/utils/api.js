const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getAdminHeaders() {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'x-admin-token': token }),
  };
}

export const api = {
  blogs: {
    list: (p={}) => {
      const q = new URLSearchParams(p);
      return fetch(`${BASE}/blogs?${q}`).then(r=>r.json());
    },
    get: (slug) => fetch(`${BASE}/blogs/${slug}`).then(r=>r.json()),
    categories: () => fetch(`${BASE}/blogs/categories`).then(r=>r.json()),
    create: (data) => fetch(`${BASE}/blogs`, {
      method: 'POST',
      headers: getAdminHeaders(),
      body: JSON.stringify(data),
    }).then(r=>r.json()),
    update: (id, data) => fetch(`${BASE}/blogs/${id}`, {
      method: 'PUT',
      headers: getAdminHeaders(),
      body: JSON.stringify(data),
    }).then(r=>r.json()),
    delete: (id) => fetch(`${BASE}/blogs/${id}`, {
      method: 'DELETE',
      headers: getAdminHeaders(),
    }).then(r=>r.json()),
  }
};
