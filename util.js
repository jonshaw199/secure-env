import fs from "fs";
import path from "path";

export function fromDir(startPath, filter, callback, recursive = true) {
  const resultFiles = [];

  if (fs.existsSync(startPath)) {
    const files = fs.readdirSync(startPath);
    for (let i = 0; i < files.length; i++) {
      const filename = path.join(startPath, files[i]);
      const stat = fs.lstatSync(filename);

      if (stat.isDirectory() && recursive) {
        resultFiles.push(...fromDir(filename, filter, callback));
      } else if (filter.test(filename)) {
        if (callback(filename)) {
          resultFiles.push(filename);
        }
      }
    }
  } else {
    console.log(`Path not found: ${startPath}`);
  }

  return resultFiles;
}

/*
Example:

fromDir('../LiteScript', /\.html$/, function(filename) {
    console.log('-- found: ', filename);
});
*/
