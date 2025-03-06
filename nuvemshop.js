const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false, 
    args: ['--disable-blink-features=AutomationControlled'],
  });
  const page = await browser.newPage();

  // Ir até o login
  await page.goto('https://www.nuvemshop.com.br/login');

  // Login
  await page.waitForSelector('input#user-mail.store-input-field.form-control.js-ga-trigger.valid');
  await page.type('input#user-mail.store-input-field.form-control.js-ga-trigger.valid', 'teste9785@gmail.com');
  console.log('Email concluido')//Aqui foi
  await page.waitForSelector('#pass');
  await page.type('#pass', 'Teste123#@!');//input#pass.password.form-control.js-ga-trigger.valid
  console.log('Senha concluida!')
  await page.click('input.btn.btn-primary.btn-lg.js-tkit-loading-button.js-ga-trigger.js-reset-password-type');
  console.log('Botão clickado')
  console.log('Login efetuado com sucesso')
  
  await page.waitForNavigation();
  // Entrar para a criação da página
  console.log('Vamos a pagina')
  await page.goto('https://teste9773.lojavirtualnuvem.com.br/admin/v2/pages?page=1');
  console.log('Redirecionado com sucesso')
  

  // Criação da página
  await page.waitForSelector('a.nimbus--link.nimbus--link--default.nimbus--link--base');
  await page.click('a.nimbus--link.nimbus--link--default.nimbus--link--base');
  console.log('Botão clicado com sucesso')
  await page.waitForSelector('[aria-label="Página em branco"]');
  await page.click('[aria-label="Página em branco"]');
  console.log('Chegamos na página')
   await page.waitForSelector('input[name="title"]');

  // Digitar o titúlo
  await page.type('input[name="title"]', 'Consegui automatizar a página');
  console.log('Título criado');

   //parte responsável por encontrar a caixa de texto. Está enclausulado no iframe react
  try {
        await page.waitForSelector('iframe[id^="tiny-react"]', { timeout: 60000 });
        const iframe = await page.frames().find(frame => frame.name().startsWith('tiny-react'));

        await iframe.waitForSelector('body', { timeout: 60000 });

        await iframe.type('body', 'Conteúdo da página');
        console.log('Texto digitado');

    } catch (error) {
        console.error('Erro', error);
    }

  console.log('Entramos no seletor')
  
  await page.click('button.nimbus--button.nimbus--button--primary');
  //Click no criar da página

  await page.waitForNavigation();

  console.log('Página criada com sucesso!');

  
})();