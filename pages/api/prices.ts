import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../utils/db'

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  /* if u want add more prices */
  if (req.method === 'POST') {
    const { origin, destiny, perMin } = req.body

    if (!origin || !destiny || !perMin) {
      res.status(400).json({ error: 'Missing body param' })
      return
    }

    const { db } = await connect()
    const response = await db.collection('prices').insertOne({
      origin,
      destiny,
      perMin
    })
    res.status(200).json(response)

  } else if(req.method === 'GET') {

    const { db } = await connect()
    let response = await db.collection('prices').find({}).toArray()

    if (!response) {
      res.status(400).json({error: 'PRICES NOT FOUNDED'})
      return
    }

    res.status(200).json(response)
  } else {
    res.status(400).json({ error: 'Wrong method request!' })
  }
}