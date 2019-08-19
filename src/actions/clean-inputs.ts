import * as fs from 'fs'
import chalk from 'chalk'
import { fromDir, getConfig } from "../util"

const sortImports = (order, lines) => {
  let correctOrder: object[] = []

  order.forEach(orderRule => {
    let regexCase = RegExp(`^(import)(?:.*?(as))?(?:.*?(as))?(?:.*?(from)).*(')(${(orderRule.match == "end" || orderRule.match == "contains") ? ".*" : ""}${orderRule.name}${(orderRule.match == "start" || orderRule.match == "contains") ? ".*" : ""})(')$`)
    lines.forEach((line, i) => {
      if (line.match(regexCase)) {
        lines.splice(i,1)
        let group = orderRule.group
        if (!orderRule.hasOwnProperty("group")) {
          group = 'misc'
        }
        correctOrder.push({group, line})
      }
    })
  })

  correctOrder = [...correctOrder, ...lines]

  return correctOrder
}

export const clean_inputs = (path) => {
  const allFiles: string[] = fromDir(path, '.ts')
  const config = getConfig() 
  let badFileRegex = /^(import)(?:.*?(as))?(?:.*?(as))?(?:.*?(from))*.*$/gm

  for (const file of allFiles) {
    const allLines: string[] = fs.readFileSync(file).toString().split("\n")
    let matchedLines: string[] = []

    allLines.forEach(line => {
      if (line.match(badFileRegex)) {
        matchedLines.push(line)
      }
    })

    const sortedImports = sortImports(config.importOrder, matchedLines)
    console.log(sortedImports)
  }
}