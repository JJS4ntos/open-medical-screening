import fs from "fs";

const saveFile = (fileName, fileContent) => {
  fs.writeFileSync(fileName, fileContent);
};

const loadFile = (fileName) => {
  return fs.readFileSync(fileName, "utf8");
};

const fileExist = (fileName) => {
  return fs.existsSync(fileName);
};

export { saveFile, loadFile, fileExist };
