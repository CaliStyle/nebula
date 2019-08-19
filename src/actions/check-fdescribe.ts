const fs = require('fs')
const chalk = require('chalk')
import { fromDir } from "../util";

export const check_fdescribe = (path) => {
  console.log(chalk.bold.inverse("fdescribe Check"))
  console.log('Checking for outstanding instances of focused testing...')

  const allFiles = fromDir(path, '.spec.ts')

  let badFileEncountered = false

  let cwdLength = process.cwd().length + 1

  let badFileRegex = /(f|x)(describe|context|it)\(/

  let typedProcess: any = process.stdout

  if (typedProcess.clearLine != undefined) {
    typedProcess.clearLine() // clear current text
    typedProcess.cursorTo(0) // move cursor to beginning of line
  }

  for (const file of allFiles) {
    const contents = fs.readFileSync(file).toString()
    if (contents.match(badFileRegex)) {
      console.log(
        chalk.red(
          '+ ' +
            file.substr(cwdLength) +
            ' still contains an instance of focused testing. This should not be committed – please remove and try again.'
        )
      )
      badFileEncountered = true
    }
  }

  if (!badFileEncountered) {
    console.log(chalk.green('No instances of focused testing found!'))
  } else {
    console.log(chalk.yellow('Please go back and remove focus testing from spec files.'))
    process.exit(1)
  }
}