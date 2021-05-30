import createDOMPurify from 'dompurify';
import marked from 'marked';

const DOMPurify = createDOMPurify(window);

export function sanitizeMarkdown(text: string) {
  return DOMPurify.sanitize(marked(text));
}
