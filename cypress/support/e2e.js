import './commands/api_commands'
import './commands/ui_commands'
import 'cypress-plugin-api';
import addContext from "mochawesome/src/addContext";


Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
        const screenshot = `assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
        addContext({ test }, screenshot);
    }
});

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('Minified React error #418') || err.message.includes('Hydration')) {
        return false;
    }
});