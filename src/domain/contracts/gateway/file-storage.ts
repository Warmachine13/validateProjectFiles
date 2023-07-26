export interface ReadFile {
  readFile: (input: ReadFile.Input) => Promise<ReadFile.Output>
}

export namespace ReadFile {
  export type Input = {
    filePath: string
  }
  export type Output = undefined | {
    content: string
  }
}


export interface StatFile {
  statFile: (input: StatFile.Input) => Promise<StatFile.Output>
}

export namespace StatFile {
  export type Input = {
    filePath: string
  }
  export type Output = undefined | {
    
  }
}
export interface IsDirectory {
  isDirectory: (input: IsDirectory.Input) => Promise<IsDirectory.Output>
}

export namespace IsDirectory {
  export type Input = {
    filePath: string
  }
  export type Output = undefined | {
    isDirectory: boolean
  }
}
export interface ReadDir {
  readDir: (input: ReadDir.Input) => Promise<ReadDir.Output>
}

export namespace ReadDir {
  export type Input = {
    filePath: string
  }
  export type Output = undefined | {
    files: string[]
  }
}
