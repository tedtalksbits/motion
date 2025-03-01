export interface MotionDocument {
  id: string;
  title: string;
  icon: string | null;
  content: any;
  user_id: string;
  parent_document_id: string | null;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  is_published: boolean;
  cover_image: string | null;
  children?: MotionDocument[];
  is_favorite?: boolean;
  is_shared?: boolean;
  shared_with?: string[];
}
