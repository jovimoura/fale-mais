import { Db, MongoClient } from 'mongodb'

interface ConnectType {
  db: Db,
  client: MongoClient
}

const url = process.env.DB_URL
const client = new MongoClient(url as string)

export default async function connect(): Promise<ConnectType> {
  await client.connect()
  const db = client.db('fale-mais')
  return { db, client }
}