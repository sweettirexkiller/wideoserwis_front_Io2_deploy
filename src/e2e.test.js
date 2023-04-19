import puppeteer from 'puppeteer';





describe('rejestracja (widz) - logowanie - obejrzenie filmu', ()=> {

  let browser;
  let page;



  beforeAll(async ()=>{
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });


  // 1. Użytkownik otwiera stronę w przeglądarce


  // 2. Użytkownik wchodzi na stronę logowania, wpisując e-mail i hasło




  afterAll(()=> browser.close());
});