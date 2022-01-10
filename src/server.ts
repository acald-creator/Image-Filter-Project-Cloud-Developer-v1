import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {
    // Initialize the Express app
    const app = express();
    // Call port 8082
    const port = process.env.PORT || 8082;
    // Use body parser middlware for post requests
    app.use(bodyParser.json());
    // @TODO
    app.get('/filteredimage', async(req: Request, res: Response) => {
        let { image_url } = req.query as any;
        if (!image_url) {
            // Throws 400 error in case there is no URL provided or Invalid Url
            return res.status(400).send(`Invalid url or no url provided.`);
        }

        // To download the image, send downloaded image to the client and then delete file from server
        filterImageFromURL(image_url).then(filteredpath => {
            res.status(200).sendFile(filteredpath, () => { deleteLocalFiles })
        })
    })
    // End @TODO

    app.get('/', async(req: Request, res: Response) => {
        res.send('Try GET /filteredimage?image={{}}')
    })

    app.listen(port, () => {
        console.log(`server running http://localhost:${port}`)
        console.log(`press CTRL+C to stop server`)
    })
})()