const fs = require("fs/promises");
const path = require("path");
const ts = require("typescript")

const componentsDirPath = path.resolve(__dirname, "../src/components");

async function main() {
  const directories = await fs.readdir(componentsDirPath)
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  
  for (let index = 0; index < directories.length; index++) {
    const directory = directories[index];
    const directoryPath = path.join(componentsDirPath, directory);
    
    if ((await fs.lstat(directoryPath)).isDirectory()) {
      const tsxFile = path.join(directoryPath, "index.tsx");
      const program = ts.createProgram([tsxFile], {});
      const sourceFile = program.getSourceFile(tsxFile);
      sourceFile.statements.forEach(statement => {
        if (statement.kind === 262) {
          const moduleSpecifierText = statement.moduleSpecifier.text;
          if (moduleSpecifierText === "./style.scss") {
            statement.moduleSpecifier.text = `./${directory}.scss`
          } else if (moduleSpecifierText.startsWith("../")) {
            const relativePaths = moduleSpecifierText.split("/");
            if (relativePaths.length === 2) {
              statement.moduleSpecifier.text = `./${relativePaths[relativePaths.length - 1]}`;
            } else {
              statement.moduleSpecifier.text = moduleSpecifierText.split("/").slice(1).join("/");
            }
          } else if (moduleSpecifierText === "..") {
            statement.moduleSpecifier.text = `./`
          }
        }
      })
      await fs.writeFile(path.join(directoryPath, `index.tsx`), printer.printFile(sourceFile), "utf-8");
  
      const files = await fs.readdir(directoryPath);
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        const extension = path.extname(file);
        await fs.rename(path.join(directoryPath, file), path.join(componentsDirPath, `${directory}${extension}`));
      }
      await fs.rmdir(directoryPath)
      console.log(directory)
    }
  }
}

main();