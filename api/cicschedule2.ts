import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';
import { load } from 'cheerio';
import { Builder } from 'xml2js';


/*
async function fetchTableAsXML(url: string): Promise<void> {
    try {
        // Fetch the webpage content
        const { data } = await axios.get(url);
        const $ = load(data);

        // Assuming the table is in the first <table> tag
        const tableData: string[][] = [];
        $('table tr').each((index, element) => {
            const rowData: string[] = [];
            $(element).find('td, th').each((i, el) => {
                rowData.push($(el).text().trim());
            });
            if (rowData.length) {
                tableData.push(rowData);
            }
        });

        // Convert to XML format
        const xmlBuilder = new Builder();
        const xml = xmlBuilder.buildObject({ table: tableData });

        console.log(xml);
    } catch (error) {
        console.error('Error fetching the table:', error);
    }
}
*/

// Replace with the URL you want to scrape
const url: string = 'https://www.cic.hk/common/ttms/chi/';
//fetchTableAsXML(url);

const fetchTableAsXml = async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
    try {
        // Fetch the webpage content
        const { data } = await axios.get(url);
        const $ = load(data);

        // Assuming the table is in the first <table> tag
        const tableData: string[][] = [];
        $('table tr').each((index, element) => {
            const rowData: string[] = [];
            $(element).find('td, th').each((i, el) => {
                rowData.push($(el).text().trim());
            });
            if (rowData.length) {
                tableData.push(rowData);
            }
        });

        // Convert to XML format
        const xmlBuilder = new Builder();
        const xml = xmlBuilder.buildObject({ table: tableData });

        console.log(xml);
    } catch (error) {
        console.error('Error fetching the table:', error);
    }
}

export default fetchTableAsXml;