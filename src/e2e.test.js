import puppeteer from 'puppeteer-core';
import { fireEvent } from '@testing-library/react';


describe('rejestracja (widz) - logowanie - obejrzenie filmu', ()=> {
  jest.setTimeout(60000);
  let browser;
  let page;

  const TEST_PROFILE_EMAIL = "piotr@piotr.pl";
  const TEST_PROFILE_PASSWORD = "Password1!2@";
  const TEST_PROFILE_SURNAME = "jankiewicz";
  const TEST_PROFILE_NICKNAME = "piotrus";
  const WRONG_TEST_PASSWORD ='Password1!2@1234';

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
    await page.goto("http://localhost:3000",  {waitUntil: 'load', timeout: 60000});
    await page.waitForSelector(".homeText");

    const text = await page.$eval(
      ".homeText",
      (e) => e.textContent
    );
    expect(text).toContain("Co chcesz obejrzeć ?");
  });
  // 2. Użytkownik wchodzi na stronę logowania, wpisując e-mail i hasło
  it("Użytkownik wchodzi na stronę logowania, wpisując e-mail i hasło", async () => {
    await page.goto("http://localhost:3000/log-in",  {waitUntil: 'load', timeout: 60000});
    await page.waitForSelector(".loginForm");

    await page.click("#loginEmailInput");
    await page.type("#loginEmailInput", TEST_PROFILE_EMAIL);

    await page.click("#loginPasswordInput");
    await page.type("#loginPasswordInput",TEST_PROFILE_PASSWORD);

    await page.click("#loginSubmitButton");

    await page.waitForSelector("#profileDataDiv");

    const nickname = await page.$eval(
      "#profilePageDataNickname",
      (e) => e.textContent
    );
    expect(nickname).toContain(TEST_PROFILE_NICKNAME);


    const surname = await page.$eval(
      "#profilePageDataSurname",
      (e) => e.textContent
    );
    expect(surname).toContain(TEST_PROFILE_SURNAME);

    const email = await page.$eval(
      "#profilePageDataEmail",
      (e) => e.textContent
    );
    expect(email).toContain(TEST_PROFILE_EMAIL);

    await page.click("#logoutButton");
    await page.waitForSelector(".loginForm");
    const loginFormTitle = await page.$eval(
      "#loginTitleText",
      (e) => e.textContent
    );
    expect(loginFormTitle).toContain("Log In");

  });


  // 3. Konto użytkownika nie istnieje, więc pojawia się stosowny błąd
  it("Konto użytkownika nie istnieje, więc pojawia się stosowny błąd", async () => {
    await page.goto("http://localhost:3000/log-in",  {waitUntil: 'load', timeout: 60000});
    await page.waitForSelector(".loginForm");

    await page.click("#loginEmailInput");
    await page.type("#loginEmailInput", TEST_PROFILE_EMAIL);

    await page.click("#loginPasswordInput");
    await page.type("#loginPasswordInput", WRONG_TEST_PASSWORD);

    await page.click("#loginSubmitButton");

    await page.waitForSelector("#loginErrorDiv");

    const message = await page.$eval(
      "#loginErrorMessage",
      (e) => e.textContent
    );
    expect(message).toContain("Incorrect password.");
  });
  // 4. Użytkownik przechodzi do strony rejestracji
it("Użytkownik przechodzi do strony rejestracji", async () => {
  await page.goto("http://localhost:3000/register",  {waitUntil: 'load', timeout: 60000});
  await page.waitForSelector("#registerForm");
  const registerFormTitle = await page.$eval(
    "#registerTitleText",
    (e) => e.textContent
  );
  expect(registerFormTitle).toContain("Register");
});



  it("Użytkownik wprowadza błędne dane w formularzu, zatwierdza, poprawia i zatwierdza", async () => {
    // 5. Użytkownik wprowadza błędne dane w formularzu
    let email = "abdc123";
    let nickname = "";
    let name = "Krzysztof";
    let surname = "Kowalski";
    let password = "kicia345";

    await page.goto("http://localhost:3000/register",  {waitUntil: 'load', timeout: 60000});
    await page.waitForSelector("#registerForm");
    const registerFormTitle = await page.$eval(
      "#registerTitleText",
      (e) => e.textContent
    );
    expect(registerFormTitle).toContain("Register");

    await page.click("#registerEmailInput");
    await page.type("#registerEmailInput", email);

    await page.click("#registerNicknameInput");
    await page.type("#registerNicknameInput", nickname);

    await page.click("#registerNameInput");
    await page.type("#registerNameInput", name);

    await page.click("#registerSurnameInput");
    await page.type("#registerSurnameInput", surname);

    await page.click("#registerPasswordInput");
    await page.type("#registerPasswordInput", password);
    await page.click("#registerConfirmPasswordInput");
    await page.type("#registerConfirmPasswordInput", password);

    await page.select('#registerUserTypeInput', 'viewer')

    // 6. Użytkownik zatwierdza formularz rejestracji
    await page.click("#registerSubmitButton");

    // 7. Użytkownik otrzymuje komunikat o błądach w formularzu:
    //   - niepoprawny adres e-mail
    //   - brak pseudonimu


    //
    const passwordErrorMessage = await page.$eval(
      "#passwordErrorMessage",
      (e) => e.textContent
    );
    expect(passwordErrorMessage).toContain("Password is required.Password requires an uppercase letter");


    const nickNameErrorMessage = await page.$eval(
      "#nickNameErrorMessage",
      (e) => e.textContent
    );
    expect(nickNameErrorMessage).toContain("Nick name is required.");


    // 8. Użytkownik wprowadza poprawione dane:
    //  adres e-mail: krzyskowal@pw.edu.pl
    //  pseudonim: krzyskowal
    // 9. Użytkownik zatwierdza formularz rejestracji
    // 10. Użytkownik zostaje zarejestrowany i przekierowany do strony logowania
    //   11. Użytkownik loguje się na nowo założone konto wpisując niepoprawne hasło
    //   12. Użytkownik dostaje informację o niepoprawnym haśle
    //   13. Użytkownik wpisuje poprawne hasło i zatwierdza formularz logowania
    //   14. Użytkownik zostaje pomyślnie zalogowany i przekierowany do strony głównej serwisu

  });

  //TODO: dotąd napisać testy

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