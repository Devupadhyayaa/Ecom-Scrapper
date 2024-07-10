const puppeteer = require( 'puppeteer');
async function main_flipkart(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({ width: 3200, height: 2400 });
    
    await page.waitForSelector('.VU-ZEz', { visible: true });
    
    // Run JavaScript in the page context to get the product name
    const product_name = await page.evaluate(() => {
        return document.querySelector(".VU-ZEz").innerText;
    });
    const price = await page.evaluate(() => {
        // Select the price element and extract the text
        const priceElement = document.querySelector('div.Nx9bqj.CxhGGd');
        return priceElement ? priceElement.innerText : null;
    });

    await page.waitForSelector('div.yN\\+eNk.w9jEaj');

    const productPoints = await page.evaluate(() => {
        // Query all list items within the 'About this item' section
        const descriptionElement = document.querySelector('.yN\\+eNk.w9jEaj p');
        
        // Return the text content of the paragraph element
        return descriptionElement ? descriptionElement.textContent.trim() : null;
    });

    const averageRating = await page.evaluate(() => {
        const ratingElement = document.querySelector('div.XQDdHH');
        return ratingElement ? ratingElement.textContent.trim() : null;
    });

    //Extract total number of ratings
    const totalRatings = await page.evaluate(() => {
        const ratingsElement = document.querySelector('.Wphh3N span');
        return ratingsElement ? ratingsElement.innerText.trim() : null;
    });
    const imageUrls = await page.evaluate(() => {
        // Select all img elements and extract their src attribute
        const imgElement = document.querySelector('img.DByuf4');
        return imgElement ? imgElement.src : null;
    });
    
    // Close the browser
    await browser.close();
    
    return {product_name,price,productPoints,averageRating,totalRatings,imageUrls};
}
module.exports=main_flipkart;