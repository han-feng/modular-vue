#!/usr/bin/env node
/*
 * 临时解决 vuex-along 用 tsc 编译报错的问题，详细异常信息如下：
 * node_modules/vuex-along/lib/main.d.ts:30:78 - error TS2314: Generic type 'Store<S>' requires 1 type argument(s).
 */
const fs = require('fs')
const chalk = require('chalk')

// 目标文件集合
const targetFilePaths = [
  'node_modules/vuex-along/lib/main.d.ts'
]
// 需替换字符串匹配模式
const regex = /\(\s*store:\s*Store\s*\)/
const newString = '(store: Store<any>)'

/**
 * 修补函数
 * @param {*} filePath
 */
function fix (filePath) {
  if (!fs.existsSync(filePath)) {
    console.log(chalk.yellow(`noexist: ${filePath}`))
    return
  }
  const targetFile = fs.readFileSync(filePath, 'utf8')
  const match = targetFile.match(regex)
  if (!match) {
    console.log(chalk.yellow(`${filePath} file doesn't have a [${regex}].`))
    return
  }
  const oldString = match[0]
  fs.writeFileSync(filePath, targetFile.replace(oldString, newString), 'utf8')
  console.log(chalk.green(`replace '${oldString}' -> '${newString}'`))
}

targetFilePaths.forEach(filePath => fix(filePath))
