import * as fs from 'fs'
import { fromDir, getConfig } from "../util"

const sortImports = (order, lines) => {
  let correctOrder: object[] = []

  order.forEach(orderRule => {
    let regexCase = RegExp(`^(import)(?:.*?(as))?(?:.*?(as))?(?:.*?(from)).*(')(${(orderRule.match == "end" || orderRule.match == "contains") ? ".*" : ""}${orderRule.name}${(orderRule.match == "start" || orderRule.match == "contains") ? ".*" : ""})(')$`)
    lines.filter(line => line.match(regexCase)).forEach((line, i) => {
        lines.splice(i,1)
        const group: object = orderRule.group
        correctOrder.push({group, line})
    })
  })

  lines.forEach(line => correctOrder.push({group: "misc", line}))

  return correctOrder
}

export const clean_inputs = (path) => {
  const allFiles: string[] = fromDir(path, '.ts')
  const config = getConfig() 
  let badFileRegex = /^(import)(?:.*?(as))?(?:.*?(as))?(?:.*?(from))*.*$/gm

  allFiles.forEach(file => {
    const allLines: string[] = fs.readFileSync(file).toString().split("\n")
    let matchedLines: string[] = []

    allLines.filter(line => line.match(badFileRegex)).map(line => {
        matchedLines.push(line)
    })

    const sortedImports = sortImports(config.importOrder, matchedLines)
    console.log(sortedImports)
  })
}