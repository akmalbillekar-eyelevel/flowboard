import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export function useChecklist(postId) {
  return useQuery({
    queryKey: ['checklist', postId],
    queryFn: () => api.get(`/posts/${postId}/checklist`).then((r) => r.data),
    enabled: !!postId,
  });
}

export function useAddChecklistItem(postId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data) => api.post(`/posts/${postId}/checklist`, data).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['checklist', postId] }),
  });
}

export function useToggleChecklistItem(postId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (itemId) => api.patch(`/posts/${postId}/checklist/${itemId}`).then((r) => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['checklist', postId] }),
  });
}

export function useDeleteChecklistItem(postId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (itemId) => api.delete(`/posts/${postId}/checklist/${itemId}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['checklist', postId] }),
  });
}
