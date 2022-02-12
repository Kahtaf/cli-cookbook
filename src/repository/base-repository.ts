import {JsonDB} from 'node-json-db'
import {Config} from 'node-json-db/dist/lib/JsonDBConfig'

export class BaseRepository {
  repositoryName: string
  repository: JsonDB

  constructor(repositoryName: string) {
    this.repositoryName = repositoryName
    this.repository = new JsonDB(new Config(`data/${repositoryName}.json`, true, true, '/'))
  }
}
