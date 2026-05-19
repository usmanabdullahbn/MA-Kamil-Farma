const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  blogs: {
    list: (p={}) => {
      const q = new URLSearchParams(p);
      return fetch(`${BASE}/blogs?${q}`).then(r=>r.json());
    },
    get: (slug) => fetch(`${BASE}/blogs/${slug}`).then(r=>r.json()),
    categories: () => fetch(`${BASE}/blogs/categories`).then(r=>r.json()),
  }
};
