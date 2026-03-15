import { NextApiRequest, NextApiResponse } from 'next';
import { getApiDocs } from '@/lib/swagger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const spec = await getApiDocs();
  res.status(200).json(spec);
}

