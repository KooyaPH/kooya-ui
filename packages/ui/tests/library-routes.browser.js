// Scoped regression: the hash family must resolve only a registered template.
async (page) => {
  const evidence = Date.now(), checks = [], requests = [], errors = [], sockets = [];
  page.setDefaultTimeout(5000);
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => requests.push({url: request.url(), type: request.resourceType()}));
  page.on('websocket', socket => sockets.push(socket.url()));
  const check = (name, pass, detail) => {
    checks.push({name, pass, detail});
    if (!pass) throw Error(name + ': ' + JSON.stringify(detail));
  };
  const base = 'http://127.0.0.1:5211/';
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  for (const width of [1440, 320]) {
    await page.setViewportSize({width, height:900});
    for (const family of ['constructor', '__proto__', 'toString', 'not-a-template']) {
      await page.goto(base + '#/templates/' + family);
      await page.getByRole('heading', {level:1, name:'Template library', exact:true}).waitFor();
      check(`${width} ${family} fallback`,
        await page.getByRole('status').innerText() === 'Template not found. Choose a registered template below.' &&
        await page.getByRole('link', {name:/Open example/}).count() === 17 &&
        await page.getByRole('link', {name:'Kooya UI overview', exact:true}).isVisible(), {});
      await page.screenshot({path:`output/playwright/${evidence}-layout-fix1-${width}-${family}.png`});
      await page.getByRole('link', {name:/Dashboard Open example/}).click();
      await page.getByRole('region', {name:'Live template example', exact:true}).waitFor();
      check(`${width} ${family} can open registered route`, page.url().endsWith('/templates/dashboard') && await page.getByRole('combobox', {name:'Example state', exact:true}).isVisible(), {});
      await page.goBack();
      await page.getByRole('heading', {name:'Template library', level:1, exact:true}).waitFor();
      check(`${width} ${family} back remains usable`, page.url().endsWith('/templates/' + family) && await page.getByRole('link', {name:/Open example/}).count() === 17, {});
    }
    for (const family of ['dashboard','collection','detail','form','wizard','settings','board','inbox','feed','content','media','analytics','audit','profile','business','portal','tool']) {
      await page.goto(base + '#/templates/' + family);
      await page.getByRole('region', {name:'Live template example', exact:true}).waitFor();
      check(`${width} valid ${family}`,
        await page.getByRole('combobox', {name:'Example state', exact:true}).isVisible() &&
        await page.getByRole('link', {name:'← All templates', exact:true}).isVisible() &&
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), {});
    }
    await page.getByRole('link', {name:'← All templates', exact:true}).click();
    await page.getByRole('heading', {name:'Template library', level:1, exact:true}).waitFor();
    check(`${width} gallery navigation`, await page.getByRole('link', {name:/Open example/}).count() === 17, {});
  }
  check('no page errors', errors.length === 0, errors);
  check('no API/external/socket attempts', sockets.length === 0 && !requests.some(r => !r.url.startsWith(base) || ['fetch','xhr'].includes(r.type)), {requests:requests.length, sockets});
  return {checks, requests, errors, sockets};
}
