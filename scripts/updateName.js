const fs = require("fs");
const path = require("path");
const ts = require("typescript")

const componentsDirPath = path.resolve(__dirname, "../src/components");

const directories = fs.readdirSync(componentsDirPath)
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

for (let index = 0; index < directories.length; index++) {
  const directory = directories[index];
  const directoryPath = path.join(componentsDirPath, directory);
  
  if (fs.lstatSync(directoryPath).isDirectory()) {
    const tsxFile = path.join(directoryPath, "index.tsx");
    const program = ts.createProgram([tsxFile], {});
    const sourceFile = program.getSourceFile(tsxFile);
    sourceFile.statements.forEach(statement => {
      if (statement.kind === 262) {
        const moduleSpecifierText = statement.moduleSpecifier.text;
        if (moduleSpecifierText === "./style.scss") {
          statement.moduleSpecifier.text = `./${directory}.scss`
        } else if (moduleSpecifierText.startsWith("../")) {
          statement.moduleSpecifier.text = moduleSpecifierText.split("/").slice(1).join("/");
        } else if (moduleSpecifierText === "..") {
          statement.moduleSpecifier.text = `./`
        }
      }
    })
    fs.writeFileSync(path.join(directoryPath, `index.tsx`), printer.printFile(sourceFile), "utf-8");

    const files = fs.readdirSync(directoryPath);
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const extension = path.extname(file);
      fs.renameSync(path.join(directoryPath, file), path.join(componentsDirPath, `${directory}${extension}`));
    }
    fs.rmdirSync(directoryPath)
  }
}