import DOMPurify from 'dompurify';
import marked from 'marked';

export function sanitizeMarkdown(text: string) {
  return DOMPurify.sanitize(marked(text));
}
