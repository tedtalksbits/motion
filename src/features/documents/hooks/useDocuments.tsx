import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MotionDocument } from '../types/document';
import {
  createDocument,
  deleteDocument,
  getArchivedDocuments,
  getDocument,
  getDocuments,
  getDocumentsTree,
  updateDocument,
} from '../server/actions';

const useCreateDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['documents'],
    mutationFn: async (newDocument: Partial<MotionDocument>) => {
      if (!newDocument.title) {
        throw new Error(
          'Missing required fields: user_id, title, or parent_document_id'
        );
      }
      return await createDocument(
        newDocument.title,
        newDocument.parent_document_id
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['documents'],
        // predicate: (query) => {
        //   return query.queryKey[0] === 'documents';
        // }
      });
    },
  });
};

const useGetDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      return await getDocuments();
    },
  });
};

const useGetArchivedDocuments = () => {
  return useQuery({
    queryKey: ['archived-documents'],
    queryFn: async () => {
      return await getArchivedDocuments();
    },
  });
};

const useGetDocument = (id: string) => {
  return useQuery({
    queryKey: ['document', id],
    queryFn: async () => {
      return await getDocument(id);
    },
  });
};

const useUpdateDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['documents'],
    mutationFn: async (document: Partial<MotionDocument>) => {
      if (!document.id) {
        throw new Error('Missing required field: id');
      }
      return await updateDocument(document.id, document);
    },
    onSuccess: (doc) => {
      queryClient.invalidateQueries({
        queryKey: ['documents'],
      });
      queryClient.invalidateQueries({
        queryKey: ['document', doc.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['archived-documents'],
      });
    },
  });
};

const useArchiveDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['documents'],
    mutationFn: async (documentId: string) => {
      return await updateDocument(documentId, { is_archived: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['documents'],
      });
      queryClient.invalidateQueries({
        queryKey: ['archived-documents'],
      });
    },
  });
};

const useRestoreDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['documents'],
    mutationFn: async (documentId: string) => {
      return await updateDocument(documentId, { is_archived: false });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['documents'],
      });
      queryClient.invalidateQueries({
        queryKey: ['archived-documents'],
      });
    },
  });
};

const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['documents'],
    mutationFn: async (documentId: string) => {
      return await deleteDocument(documentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['archived-documents'],
      });
    },
  });
};

const useGetDocumentTree = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: async () => {
      return await getDocumentsTree();
    },
  });
};

export {
  useCreateDocument,
  useGetDocuments,
  useGetDocument,
  useUpdateDocument,
  useArchiveDocument,
  useRestoreDocument,
  useDeleteDocument,
  useGetArchivedDocuments,
  useGetDocumentTree,
};
