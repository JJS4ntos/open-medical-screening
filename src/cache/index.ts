import fs from "fs";

const saveFile = (fileName: string, fileContent: any) => {
  fs.writeFileSync(fileName, fileContent);
};

const loadFile = (fileName: string) => {
  return fs.readFileSync(fileName, "utf8");
};

const fileExist = (fileName: string) => {
  return fs.existsSync(fileName);
};

export { saveFile, loadFile, fileExist };
