import { extractBlankCountForFIBQuestion } from "../../src/utils/extractBlankCountForFIBQuestion";

it(`Should extract both text and code blank count`, () => {
  expect(extractBlankCountForFIBQuestion(`first line\nsecond line.___:\n# comment\n(text.___(___))`)).toBe(3)
})