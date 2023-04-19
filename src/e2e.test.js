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

  it("Użytkownik wchodzi na stronę logowania, wpisując e-mail i hasło", async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector(".loginText");

    const text = await page.$eval(
      ".loginText",
      (e) => e.textContent
    );
    expect(text).toContain("Zaloguj się");
  });


  // 3. Konto użytkownika nie istnieje, więc pojawia się stosowny błąd
  it("Konto użytkownika nie istnieje, więc pojawia się stosowny błąd", async () => {
    await page.goto("http://localhost:3000/login");
    await page.waitForSelector(".loginText");

    const text = await page.$eval(
      ".loginText",
      (e) => e.textContent
    );
    expect(text).toContain("Zaloguj się");
  });
  // 4. Użytkownik przechodzi do strony rejestracji
  // 5. Użytkownik wprowadza dane w formularzu:
  //   adres e-mail: abdc123
  // pseudonim: <brak>
  //   imię: Krzysztof
  //   nazwisko: Kowalski
  //   hasło: kicia345
  //   widz/twórca: widz
  //   6. Użytkownik zatwierdza formularz rejestracji
  //   7. Użytkownik otrzymuje komunikat o błądach w formularzu:
  //   - niepoprawny adres e-mail
  //   - brak pseudonimu
  //   8. Użytkownik wprowadza poprawione dane:
  //   adres e-mail: krzyskowal@pw.edu.pl
  //   pseudonim: krzyskowal
  //   9. Użytkownik zatwierdza formularz rejestracji
  //   10. Użytkownik zostaje zarejestrowany i przekierowany do strony logowania
  //   11. Użytkownik loguje się na nowo założone konto wpisując niepoprawne hasło
  //   12. Użytkownik dostaje informację o niepoprawnym haśle
  //   13. Użytkownik wpisuje poprawne hasło i zatwierdza formularz logowania
  //   14. Użytkownik zostaje pomyślnie zalogowany i przekierowany do strony głównej serwisu
  //   15. Użytkownik wpisuje w formularz wyszukiwania kryterium wyszukiwania "Test Video 123"
  //   16. Użytkownik zostaje przekierowany do strony wyników wyszukiwania (lista wyników)
  //   17. Użytkownik klika na pierwszy z wyników  i zostaje przekierowany do strony filmu "Test Video 123"
  //   18. Po przejściu na stronę wybranego filmu strona odtwarza film po załadowaniu, zmiana stanu na "Odtwarzany"
  //   18. Strona filmu "Test Video 123" wyświetla tytuł, opis, komentarze (lub ich brak) oraz liczbę pozytywnych i negatywnych reakcji.
  //   19. Użytkownik zatrzymuje film po kliknięciu na odtwarzarkę, zmiana stanu na "Zapauzowany". Ponowne kliknięcie kontynuuje odtwarzanie filmu, zmiana stanu na "Odtwarzany".
  //   25. Odtwarzarka po odtworzeniu filmu w całości odznacza film jako obejrzany przez zalogowanego użytkownika (zmiana stanu na Obejrzany)
  //   26. W stanie filmu jako obejrzany wyświetla się element "Obejrzyć od nowa".


  afterAll(()=> browser.close());
});