const { chromium } = require('playwright');
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));

(async () => {
    const userDataDir = './user_data'; // Cambia esto a la ruta donde quieras guardar el perfil
    const browser = await chromium.launchPersistentContext(userDataDir, {
        headless: false,
    });

    const page = await browser.newPage();

    // Navegar a Google Forms
    await page.goto('https://docs.google.com/forms/d/e/1FAIpQLSffu5oMKvp2cnvheiJb_C_tiLvOUeObb9lX4pHg_Y_T6ZJlRw/viewform');

    // Seleccionar todos los div con clase Xb9hP que contengan inputs
    // const divsConInput = await page.$$('.Xb9hP input');

    // Recorrer cada input y extraer el atributo aria-describedby
    // for (const div of divsConInput) {
    //     const ariaDescribedBy = await div.getAttribute('aria-describedby');
    //     console.log(`aria-describedby: ${ariaDescribedBy}`);
    // }

    // Iterar sobre cada registro en el archivo JSON
    for (const register of data) {

        // Llenar las entradas del formulario
        await page.click('#i5');
        await page.fill('input[aria-describedby="i9 i10"]', register.titulo);
        await page.fill('input[aria-describedby="i13 i14"]', register.link);
        await page.fill('input[aria-describedby="i17 i18"]', register.asesor);
        await page.fill('input[aria-describedby="i21 i22"]', register.jurado1);
        await page.fill('input[aria-describedby="i25 i26"]', register.jurado2);
        await page.fill('input[aria-describedby="i29 i30"]', register.jurado3);
        await page.fill('input[aria-describedby="i33 i34"]', register.lugar);
        await page.fill('input[aria-describedby="i37 i38"]', register.quienes);
        await page.fill('input[aria-describedby="i41 i42"]', register.var_dep);
        await page.fill('input[aria-describedby="i45 i46"]', register.var_ind);
        await page.fill('input[aria-describedby="i49 i50"]', register.enfoque);
        await page.fill('input[aria-describedby="i53 i54"]', register.nivel);
        await page.fill('input[aria-describedby="i57 i58"]', register.diseño);
        await page.fill('input[aria-describedby="i61 i62"]', register.problema_gen);
        await page.fill('input[aria-describedby="i65 i66"]', register.problema1);
        await page.fill('input[aria-describedby="i69 i70"]', register.problema2);
        await page.fill('input[aria-describedby="i73 i74"]', register.problema3);
        await page.fill('input[aria-describedby="i77 i78"]', register.problema4);
        await page.fill('input[aria-describedby="i81 i82"]', register.objetivo_gen);
        await page.fill('input[aria-describedby="i85 i86"]', register.objetivo1);
        await page.fill('input[aria-describedby="i89 i90"]', register.objetivo2);
        await page.fill('input[aria-describedby="i93 i94"]', register.objetivo3);
        await page.fill('input[aria-describedby="i97 i98"]', register.objetivo4);
        await page.fill('input[aria-describedby="i101 i102"]', register.hipotesis_gen);
        await page.fill('input[aria-describedby="i105 i106"]', register.hipotesis1);
        await page.fill('input[aria-describedby="i109 i110"]', register.hipotesis2);
        await page.fill('input[aria-describedby="i113 i114"]', register.hipotesis3);
        await page.fill('input[aria-describedby="i117 i118"]', register.hipotesis4);
        await page.fill('input[aria-describedby="i121 i122"]', register.linea);
        await page.fill('input[aria-describedby="i125 i126"]', register.poblacion_desc);
        await page.fill('input[aria-describedby="i129 i130"]', register.poblacion_cant);
        await page.fill('input[aria-describedby="i133 i134"]', register.muestra_cant);
        await page.fill('input[aria-describedby="i137 i138"]', register.prueba);
        await page.fill('input[aria-describedby="i141 i142"]', register.observacion);
        await page.fill('input[aria-labelledby="i148"]', `${register.ano}-${register.mes}-${register.dia}`);

        // Enviar el formulario
        await page.click('div[role="button"].uArJ5e.UQuaGc.Y5sE8d.VkkpIf.QvWxOd')

        console.log(`send ${register.link}`)

        await page.reload();
        await page.reload();

        // Esperar una confirmación o un redireccionamiento antes de enviar el siguiente formulario
        await page.waitForTimeout(3000);
    }

    // Cerrar navegador
      await browser.close();
})();