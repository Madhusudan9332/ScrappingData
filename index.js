const puppeteer = require("puppeteer");
const fs = require("fs");

// Custom delay function
const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

const run = async () => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("https://www.iplt20.com/stats/");

    // Function to scrape data
    const scrappedData = async () => {
      const data = await page.evaluate(() => {
        const result = [];
        const keysForData = Array.from(
          document.querySelectorAll("tr")[0].querySelectorAll("th")
        ).map((el) => el.innerText);
        for (let i = 1; i <= 10; i++) {
          const playerDoc = document.querySelectorAll("tr")[i];
          const playerData = {
            image: playerDoc
              .querySelector("img")
              .getAttribute("src")
              .split("?")[0],
          };
          Array.from(playerDoc.querySelectorAll("td")).forEach((el, index) => {
            playerData[keysForData[index]] = el.innerText;
          });
          result.push(playerData);
        }
        return result;
      });
      return data;
    };

    const arr = [
      'Orange Cap',
      'Most Fours (Innings)',
      'Most Sixes (Innings)',
      'Most Fifties',
      'Most Centuries'
    ];

    const allData = {};

    for (const category of arr) {
      console.log(`Navigating to ${category} stats...`);
      
      // Click the div element that matches the category
      await page.evaluate((category) => {
        const elements = document.getElementsByClassName("cSBListItems batters selected ng-binding ng-scope");
        for (let el of elements) {
          if (el.innerText.includes(category)) {
            el.click();
            break;
          }
        }
      }, category);

      await delay(2000); // Use the custom delay function
      allData[category] = await scrappedData();
    }

    // Save the data to a file
    fs.writeFileSync("ipl_stats.json", JSON.stringify(allData, null, 2), "utf-8");

    console.log("Data successfully scraped and saved!");

    await browser.close();
  } catch (err) {
    console.log(err);
  }
};

run();
