import { createClient } from '@/supabase/client';
import { MotionDocument } from '../types/document';
import { buildTree } from '../utils/document-tree';

export async function createDocument(
  title: string,
  parentDocumentId: string | null = null
) {
  const supabase = createClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) {
    throw new Error('User not authenticated');
  }
  const { data, error } = await supabase
    .schema('motion')
    .from('documents')
    .insert({
      title,
      user_id: userId,
      parent_document_id: parentDocumentId,
      content: {},
    })
    .select()
    .single();

  if (error) throw error;
  return data as MotionDocument;
}

export async function getDocuments() {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema('motion')
    .from('documents')
    .select('*')
    .eq('is_archived', false)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data as MotionDocument[];
}

export async function getArchivedDocuments() {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema('motion')
    .from('documents')
    .select('*')
    .eq('is_archived', true)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data as MotionDocument[];
}

export async function getDocument(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema('motion')
    .from('documents')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as MotionDocument;
}

export async function updateDocument(
  id: string,
  updates: Partial<MotionDocument>
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema('motion')
    .from('documents')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as MotionDocument;
}

export async function archiveDocument(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema('motion')
    .from('documents')
    .update({ is_archived: true })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as MotionDocument;
}

export async function restoreDocument(id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema('motion')
    .from('documents')
    .update({ is_archived: false })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as MotionDocument;
}

export async function getDocumentsTree() {
  const supabase = createClient();
  const { data, error } = await supabase
    .schema('motion')
    .from('documents')
    .select('*')
    .eq('is_archived', false)
    .order('updated_at', { ascending: false });

  if (error) throw error;

  return buildTree(data);
}

export async function deleteDocument(id: string) {
  const supabase = createClient();
  const { error } = await supabase
    .schema('motion')
    .from('documents')
    .delete()
    .eq('id', id);

  if (error) throw error;
}
