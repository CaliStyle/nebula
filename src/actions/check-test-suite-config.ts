const path = require('path')
const fs = require('fs')
const chalk = require('chalk');
import { fromDir } from "../util";

export const check_test_suite_config = (path) => {
  console.log(chalk.bold.inverse("Test Suite Config Check"))
  console.log('Checking for spec files without accelerated test suite...')
  
  const allFiles = fromDir(path, '.spec.ts')
  
  let badFiles = []
  
  let cwdLength = process.cwd().length + 1
  
  for (const file of allFiles) {
    const contents = fs.readFileSync(file).toString()
    if (!contents.includes('configureTestSuite(')) {
      // looks for strings matching "it("
      let regex = /(it\()/g
      if ((contents.match('TestBed.configureTestingModule') || []).length > 0) {
        badFiles.push(file.substr(cwdLength))
      }
    }
  }
  
  if (badFiles.length > 0) {
    console.log(chalk.yellow('The following files have not been properly accelerated:'))
    for (let file of badFiles) {
      console.log(chalk.yellow('+ ' + file))
    }
  } else {
    console.log(chalk.green('All component spec files have been properly accelerated!'))
  }
}
