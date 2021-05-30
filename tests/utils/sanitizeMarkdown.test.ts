import { sanitizeMarkdown } from '../../src/utils';

it(`Should sanitize and convert markdown to html`, () => {
  expect(sanitizeMarkdown('hello').trim()).toStrictEqual('<p>hello</p>');
});
