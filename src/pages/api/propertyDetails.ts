import axios from 'axios';
import cheerio from 'cheerio';

const getPropertyDetails = async (req: { method: string; body: { url: any; }; }, res: { statusCode: number; json: (arg0: { price?: number; postCode?: string; error?: string; }) => any; }) => {
  if (req.method === 'POST') {
    const url = req.body.url;
    console.log(url);

    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const priceString = $("._1gfnqJ3Vtd1z40MlC0MzXu span").first().text();
      const price = +priceString.replace('£', '').replaceAll(",", "")
      const address = $("._2uQQ3SV0eMHL1P6t5ZDo2q").text();
      const postCode = address.split(',').at(-1) || ""
     

      res.statusCode = 200
      return res.json({
        price: price,
        postCode: postCode,
      })
    } catch (e) {
      res.statusCode = 404
      return res.json({
        error: "Invalid url"
      })
    }
  }
}

export default getPropertyDetails;
