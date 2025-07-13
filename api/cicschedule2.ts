import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import { JSDOM } from 'jsdom';

function htmlTableToXml(html: string): string {
    const dom = new JSDOM(html);
    const rows = dom.window.document.querySelectorAll('table tbody tr');
    
    let xmlString = '<?xml version="1.0" encoding="UTF-8" ?>\n<tests>\n';
    const arrTag = ['commercedate', 'weekdate', 'session', 'trade', 'tradetype', 'language', 'location', 'room', 'class', 'standbyplace'];
    rows.forEach((row, index) => {
        if (index === 0) return; // Skip header row
        const cells = row.querySelectorAll('td');
        if (cells.length !== 10) return;
        xmlString += '  <test>\n';
        for (let i: number = 0; i < 10; i++) {
            xmlString += `    <${arrTag[i]}>${cells[i].textContent?.trim()}</${arrTag[i]}>\n`;    
        }
        xmlString += '  </test>\n';
    });
    xmlString += '</tests>';
    return xmlString;
}

function errmsg(msg: string): string {
    const _header = '<?xml version="1.0" encoding="UTF-8" ?>';
    return _header + '<errmsg>' + msg + '</errmsg>';
}

const fetchTableAsXml = async function handler(req: VercelRequest, res: VercelResponse){
    // Replace with the URL you want to scrape
    const url: string = "https://www.cic.hk/common/ttms/chi/";
    try {
        // Fetch the HTML content from the URL
        const response = await axios.get(url);
        const htmlContent = response.data;
        const xmlStr = htmlTableToXml(htmlContent);
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/xml');
        // Send the table as the response
        res.status(200).send(xmlStr || errmsg('Table not found'));
    } catch (error) {
        //console.error('Error fetching the table:', error);
        console.error(error);
        res.status(500).send(errmsg('Error fetching data'));
    }
}

export default fetchTableAsXml;