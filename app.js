const express = require('express');
const app = express();
const port = 3000;
const puppeteer = require('puppeteer');

app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/generate-pdf', async (req, res) => {
    try {
        const dateValue = req.query.date;

        const browser = await puppeteer.launch({executablePath: '/usr/bin/chromium-browser'});
        const page = await browser.newPage();
              
        await page.goto('https://unique-biscotti-fecc9f.netlify.app'); // Replace with the desired URL

        // Execute JavaScript code in the page context to set the date value
        await page.evaluate((date) => {
            // Replace the selector with the appropriate input selector on your page
            const inputElement = document.querySelector('input[type="date"]');
            inputElement.value = date;
        }, dateValue);

        // Click the button to generate the PDF
        await page.click('.btn-primary');

        const pdfBuffer = await page.pdf({ format: 'A4', scale: 0.9 });

        await browser.close();
        console.log('PDF successfully created!');

        res.contentType('application/pdf');
        res.send(pdfBuffer);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
