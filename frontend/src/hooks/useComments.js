import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export function useAddComment(postId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => api.post(`/posts/${postId}/comments`, { body }).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts', postId] }),
  });
}

export function useDeleteComment(postId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (commentId) => api.delete(`/posts/${postId}/comments/${commentId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts', postId] }),
  });
}
