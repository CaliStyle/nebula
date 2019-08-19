import * as fs from 'fs';
import * as path from 'path';

export function fromDir(startPath, filter) {
  let allFiles = []

  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath)
    return
  }

  const files = fs.readdirSync(startPath)
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i])
    const stat = fs.lstatSync(filename)
    if (stat.isDirectory()) {
      allFiles.push(...fromDir(filename, filter)) // recurse
    } else if (filename.indexOf(filter) >= 0) {
      allFiles.push(filename)
    }
  }

  return allFiles
}