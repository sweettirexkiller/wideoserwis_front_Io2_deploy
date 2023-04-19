import puppeteer from 'puppeteer-core';

describe('rejestracja (widz) - logowanie - obejrzenie filmu', ()=> {

  let browser;
  let page;

  beforeAll(async ()=>{
    browser = await puppeteer.launch({
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      headless: false,
      slowMo: 30,
      ignoreDefaultArgs: ['--disable-extensions'],
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });
    page = await browser.newPage();
  });

  // 1. Użytkownik otwiera stronę w przeglądarce
  it("Użytkownik otwiera stronę w przeglądarce", async () => {
    await page.goto("http://localhost:3000");
    await page.waitForSelector(".homeText");

    const text = await page.$eval(
      ".homeText",
      (e) => e.textContent
    );
    expect(text).toContain("Co chcesz obejrzeć ?");
  });
  // 2. Użytkownik wchodzi na stronę logowania, wpisując e-mail i hasło




  afterAll(()=> browser.close());
});