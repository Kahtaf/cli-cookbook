import {JsonDB} from 'node-json-db'
import {Config} from 'node-json-db/dist/lib/JsonDBConfig'

export class BaseRepository {
  repositoryName: string
  repository: JsonDB

  constructor(repositoryName: string) {
    const dataDirectory = process.env.DATA_DIR || 'data'
    this.repositoryName = repositoryName
    this.repository = new JsonDB(new Config(`${dataDirectory}/${repositoryName}.json`, true, true, '/'))
  }
}
