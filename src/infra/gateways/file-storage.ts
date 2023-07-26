import fs from 'fs'
import { IsDirectory, ReadDir, ReadFile } from '@/domain/contracts/gateway'

export class FileStorage implements
  // StatFile,
  IsDirectory, ReadFile, ReadDir {
  async readDir(input: ReadDir.Input): Promise<ReadDir.Output> {
    return {
      files: fs.readdirSync(input.filePath)
    }
  }
  async readFile(input: ReadFile.Input): Promise<ReadFile.Output> {
    return {
      content: fs.readFileSync(input.filePath).toString()
    }
  }

  async isDirectory(input: IsDirectory.Input): Promise<IsDirectory.Output> {
    const stats = fs.statSync(input.filePath)
    return {
      isDirectory: stats.isDirectory()
    }
  }


  // async statFile(input: StatFile.Input): Promise<StatFile.Output> {
  //   const stats = fs.statSync(input.filePath)
  //   return {
  //     size: fs.statSync(input.filename).size
  //   }
  // }

}
