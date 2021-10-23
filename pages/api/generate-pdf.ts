import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer  from 'puppeteer'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    let filename = `example.pdf`
    return downloadPDF(res, filename, await generatePDF())
}

function downloadPDF(res: NextApiResponse, filename: string, data: Buffer) {
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.status(201).send(data)
}

async function generatePDF() {
    let browser = await puppeteer.launch()
    let page = await browser.newPage()
    await page.goto(`http://localhost:3000/`)

    let pdfBuffer = await page.pdf({ printBackground: true, format: 'a4', preferCSSPageSize: true })

    browser.close()
    
    await browser.close()

    return pdfBuffer
}