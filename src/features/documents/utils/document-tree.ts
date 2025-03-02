import { MotionDocument } from '../types/document';

export function buildTree(documents: MotionDocument[]): MotionDocument[] {
  try {
    const documentMap = new Map<string, MotionDocument>();
    const tree: MotionDocument[] = [];

    // Create a map of documents by their ID
    documents.forEach((doc) => {
      documentMap.set(doc.id, { ...doc, children: [] }); // Add children array
    });

    // Build the tree by linking children to parents
    documents.forEach((doc) => {
      if (doc.parent_document_id) {
        const parent = documentMap.get(doc.parent_document_id);
        if (parent) {
          (parent.children ||= []).push(documentMap.get(doc.id)!);
        }
      } else {
        tree.push(documentMap.get(doc.id)!);
      }
    });

    console.log('built tree', tree);

    return tree;
  } catch (e) {
    console.error('Error building document tree:', e);
    return [];
  }
}
