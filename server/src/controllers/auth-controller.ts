import { Request, Response } from 'express';

export async function getProfile(req: Request, res: Response) {
  try {
    res.json({
      message: 'It works!',
    });
  } catch (error) {}
}
