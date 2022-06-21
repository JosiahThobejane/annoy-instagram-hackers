import puppeteer from 'puppeteer';
import { uniqueNamesGenerator, Config, starWars, NumberDictionary, names} from 'unique-names-generator';

const getNumber = () => NumberDictionary.generate({ min: 100, max: 999 });

const generateDummyPassword = () => {
  return  uniqueNamesGenerator({ 
    dictionaries: [starWars, getNumber()],
    length: 2,
    style: 'lowerCase',
    separator: ''
  }).replace(' ', '');
}

// ->>> jangofett952 
// generates password based on star wars actors

const generateDummyUsername = () => {
  return uniqueNamesGenerator({dictionaries: [names]}).replace(' ', '');
}

// ->>> josiahthobejane232 
// generates password based on star wars actors

(async () => {

  const browser = await puppeteer.launch({
    headless: false, 
    args: ['--window-size=1920,1080'],
    defaultViewport: null
  });

  const page = await browser.newPage();
  // browser goes to this link
  await page.goto('http://cdf-wave.atwebpages.com', { waitUntil: 'networkidle0' });

  // login
  let i = 0;
  let stop = 500;
  
  do {
    let userName = generateDummyUsername();
    let passWord = generateDummyPassword();

    i = i + 1;
    // you may have to change the Username and Password selectors
    await page.focus('#username')
    await page.keyboard.type(userName)
    await page.focus('#password')
    await page.keyboard.type(passWord)
    // you may also have to change the login/submit button selector
    await page.click('#login')

    console.log(`\n\n${i} \nName: ${userName} \nPassword: ${passWord}  `);

    await page.waitForTimeout(3400);

    await page.reload()

  } while ( i != stop)

  browser.close();
})();
