const fs = require('fs');
const path = 'cypress/reports';

if (fs.existsSync(path)) {
    fs.rmSync(path, { recursive: true, force: true });
    console.log('Reports limpos com sucesso.');
} else {
    console.log('Pasta de reports não encontrada, nada a limpar.');
}