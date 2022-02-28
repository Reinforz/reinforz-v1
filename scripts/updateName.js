const fs = require("fs");
const path = require("path");

const componentsDirPath = path.resolve(__dirname, "../src/components");

const directories = fs.readdirSync(componentsDirPath)

for (let index = 0; index < directories.length; index++) {
  const directory = directories[index];
  const directoryPath = path.join(componentsDirPath, directory);
  
  if (fs.lstatSync(directoryPath).isDirectory()) {
    const files = fs.readdirSync(directoryPath);
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const extension = path.extname(file);
      fs.renameSync(path.join(directoryPath, file), path.join(componentsDirPath, `${directory}${extension}`));
    }
    fs.rmdirSync(directoryPath)
  }
}