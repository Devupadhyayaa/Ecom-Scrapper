const puppeteer = require( 'puppeteer');
async function main_myntra(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.goto(url);
    await page.setViewport({ width: 3200, height: 2400 });
    
    await page.waitForSelector('.image-grid-image', { visible: true });
    await page.waitForSelector('.pdp-productDescriptorsContainer');
    //Run JavaScript in the page context to get the product name
    const product_name = await page.evaluate(() => {
        return `${document.querySelector(".pdp-title").innerText} ${document.querySelector(".pdp-name").innerText}`
    });
    const price = await page.evaluate(() => {
        // Select the price element and extract the text
        const priceElement = document.querySelector('.pdp-price');
        return priceElement ? priceElement.innerText : null;
    });

    const productPoints = await page.evaluate(() => {
        // Query all list items within the 'About this item' section
        const productDetailsContainer = document.querySelector('.pdp-productDescriptorsContainer');
        const paragraphs = productDetailsContainer.querySelectorAll('p');
        const details = [];
        paragraphs.forEach(paragraph => {
            details.push(paragraph.innerText.trim()); // Trim to remove leading/trailing whitespace
        });
        const allDetails = details.join('\n');
        
        // Return the text content of the paragraph element
        return allDetails;
    });

    const averageRating = await page.evaluate(() => {
        const ratingElement = document.querySelector('.index-overallRating div');
        return ratingElement ? ratingElement.textContent.trim() : null;
    });

    // //Extract total number of ratings
    const totalRatings = await page.evaluate(() => {
        const ratingsElement = document.querySelector('.index-ratingsCount');
        return ratingsElement ? ratingsElement.innerText.trim() : null;
    });
    const imageUrls = await page.evaluate(() => {
        // Select all img elements and extract their src attribute
        const div = document.querySelector('.image-grid-image');
        const backgroundImageStyle = div.style.backgroundImage;
        const match = backgroundImageStyle.match(/url\("(.+)"\)/);
        return match[1];
    });
    
    // Close the browser
    await browser.close();
    
    return {product_name,price,productPoints,averageRating,totalRatings,imageUrls};
}
// main_myntra("https://www.myntra.com/sports-shoes/puma/puma-unisex-black-textile-amare-fresh-regular-running-sports-shoes/29582890/buy").then(ele => {
//     console.log(ele);
//   }).catch(err => {
//     console.log(err);
//   })
module.exports=main_myntra;