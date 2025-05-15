import * as fs from 'fs'
import * as path from 'path'

const nocodbPackageFilePath = path.join(__dirname, '..', 'packages', 'nocodb', 'package.json')
const nocoLibPackage = JSON.parse(fs.readFileSync(nocodbPackageFilePath))

if (process.env.targetEnv === 'DEV') {
    // nightly build
    // e.g. 0.84.2-20220220-1250
    // pr build
    // e.g. 0.84.2-pr-1234-20220220-1250
    nocoLibPackage.version = `${nocoLibPackage.version}-${process.env.targetVersion}`
    nocoLibPackage.name += '-daily'
} else {
    nocoLibPackage.version = process.env.targetVersion
}

fs.writeFileSync(nocodbPackageFilePath, JSON.stringify(nocoLibPackage, null, 2));
