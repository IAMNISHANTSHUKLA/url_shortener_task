import axios from 'axios';

export default async function handler(req, res) {
  const { shortUrl } = req.query;

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${shortUrl}`);
    if (response.status === 200) {
      res.redirect(response.data.original_url);
    } else {
      res.status(response.status).json(response.data);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
