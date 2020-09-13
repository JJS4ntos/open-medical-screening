import fs from "fs";

const saveFile = (fileName, fileContent) => {
  fs.writeFileSync(fileName, fileContent);
};

export { saveFile };
