const argv = require('./config/yargs').argv;
const control = require('./buscador/buscar')
let comando = argv._[0];
//Oscar
switch (comando) {
    case 'mostrar':
        control.mostrar(argv.archivo, argv.anio, argv.pais)
        break;
    case 'guardar':
        // control.guardar(argv.file, argv.country, argv.year, argv.out);
        // break;
        control.guardar(argv.archivo, argv.anio, argv.pais);
        break;
    default:
        console.log('Comando no reconocido');
}