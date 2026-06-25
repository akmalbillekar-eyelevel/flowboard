import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export function usePosts(filters = {}, { enabled = true } = {}) {
  const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v != null && v !== ''));
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => api.get('/posts', { params }).then((r) => r.data),
    enabled,
  });
}

export function usePost(id) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => api.get(`/posts/${id}`).then((r) => r.data),
    enabled: !!id,
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post('/posts', data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts'] }),
  });
}

export function useUpdatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }) => api.put(`/posts/${id}`, data).then((r) => r.data),
    onSuccess: (post) => {
      qc.invalidateQueries({ queryKey: ['posts'] });
      qc.setQueryData(['posts', post.id], post);
    },
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/posts/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts'] }),
  });
}
