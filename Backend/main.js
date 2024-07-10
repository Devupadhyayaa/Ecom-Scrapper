const puppeteer = require( 'puppeteer');
async function main(url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({ width: 2000, height: 1800 });
    
    await page.waitForSelector('#productTitle', { visible: true });
    
    // Run JavaScript in the page context to get the product name
    const product_name = await page.evaluate(() => {
        return document.querySelector("#productTitle").innerText;
    });
    const price = await page.evaluate(() => {
        // Select the price element and extract the text
        const priceElement = document.querySelector('span.a-offscreen');
        return priceElement ? priceElement.innerText : null;
    });
    const productPoints = await page.evaluate(() => {
        // Query all list items within the 'About this item' section
        const points = document.querySelectorAll('#feature-bullets ul.a-unordered-list li.a-spacing-mini span.a-list-item');
        
        // Map through NodeList to get the text content
        return Array.from(points).map(point => point.innerText.trim());
    });

    const averageRating = await page.evaluate(() => {
        const ratingElement = document.querySelector('#averageCustomerReviews .a-size-base.a-color-base');
        return ratingElement ? ratingElement.innerText.trim() : null;
    });

    // Extract total number of ratings
    const totalRatings = await page.evaluate(() => {
        const ratingsElement = document.querySelector('#acrCustomerReviewText');
        return ratingsElement ? ratingsElement.innerText.trim() : null;
    });
    const imageUrls = await page.evaluate(() => {
        // Select all img elements and extract their src attribute
        return document.querySelector('#landingImage').src;
    });
    
    // Close the browser
    await browser.close();
    
    return {product_name,price,productPoints,averageRating,totalRatings,imageUrls};
}
// main("https://amzn.in/d/0cuT614d").then(ele => {
//     console.log(ele);
//   }).catch(err => {
//     console.log(err);
//   })
module.exports=main;