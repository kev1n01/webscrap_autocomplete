const { chromium } = require('playwright');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('dataobs.json', 'utf-8'));

(async () => {
    const userDataDir = './user_data'; // Cambia esto a la ruta donde quieras guardar el perfil
    const browser = await chromium.launchPersistentContext(userDataDir, {
        headless: false,
    });

    const page = await browser.newPage();

    // Navegar a Google Forms
    await page.goto('https://docs.google.com/forms/d/e/1FAIpQLScXBkPYjz2xvlIa2NQ4Y0htz1Z_45GE-J7LXEBOSV3k_IjW8A/viewform');

    // Seleccionar todos los div con clase Xb9hP que contengan inputs
    // const divsConInput = await page.$$('.Xb9hP input');

    // // Recorrer cada input y extraer el atributo aria-describedby
    // for (const div of divsConInput) {
    //     const ariaDescribedBy = await div.getAttribute('aria-describedby');
    //     console.log(`aria-describedby: ${ariaDescribedBy}`);
    // }

    // Iterar sobre cada registro en el archivo JSON
    for (const register of data) {

        // Llenar las entradas del formulario
        await page.click('#i5');
        await page.fill('input[aria-describedby="i9 i10"]', '2018110451');
        await page.fill('input[aria-describedby="i13 i14"]', register.titulo);
        await page.fill('input[aria-describedby="i37 i38"]', register.pagina);
        await page.fill('textarea[aria-describedby="i33 i34"]', register.observaciones);
        await page.fill('input[aria-describedby="i41 i42"]', register.link);
        if(register.tipo === 'material'){
            await page.click('#i20');
        }
        if(register.tipo === 'metodologica'){
            await page.click('#i23');
        }
        if(register.tipo === 'similitud'){
            await page.click('#i26');
        }
        if(register.tipo === 'script'){
            await page.click('#129');
        }

        // Enviar el formulario
        await page.click('div[role="button"].uArJ5e.UQuaGc.Y5sE8d.VkkpIf.QvWxOd')

        console.log(`send ${register.tipo}`)

        await page.reload();
        await page.reload();

        // Esperar una confirmación o un redireccionamiento antes de enviar el siguiente formulario
        await page.waitForTimeout(3000);
    }

    // Cerrar navegador
    await browser.close();
})();