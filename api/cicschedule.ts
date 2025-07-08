import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { load } from 'cheerio';

const fetchWeb = async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        // Fetch the HTML from the specified URL
        const response = await axios.get('https://www.cic.hk/common/ttms/chi/');

        // Load the HTML into Cheerio
        const $ = load(response.data);

        // Extract the <table> tag
        const table = $('table').html();

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'text/html');

        // Send the table as the response
        res.status(200).send(table || 'Table not found');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data');
    }    
}

export default fetchWeb;
