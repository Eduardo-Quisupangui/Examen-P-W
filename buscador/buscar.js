const colors = require("colors");
const fs = require("fs");
const csv = require("csv-parser");
let tareaPorHAcer = [];



const lecturacsv = async(file) => {
    //let vector = [];
    const g = fs.createReadStream(file)
        .on("error", (err) => console.log(err)) // Abrir archivo
        .pipe(csv({ cast: true, delimiter: ';' }))
    for await (const row of g) {
        //console.log(g.length);
        for (let i = 4; i < 65; i++) {
            if (row[i] == "" || row[i] == " " || row[i] == "") {
                row[i] = "0";
            }
        }
        tareaPorHAcer.push(row);
    }

    return 'Se ha terminado de leer el archivo';
};

//const fs = require("fs"); // filesystem
// const srv = require("../vista/servidor");
//const est = require("./calculos");
//const pag = require("./config/lista");
//let tareaPorHAcer = [];

const guardar = (file, country, year) => {
    mostrar(file, country, year).then(v => escribirtxt(v, year)).catch(msg => console.log(msg.message));
};
//Guardando en json
const escribirtxt = (vect, year) => {
    let data = JSON.stringify(vect);
    fs.writeFile(`./resultado/${year}.txt`, data, (err) => {
        if (err) throw new Error("No se pudo grabar", err);
    });
};



let mostrar = async(file, country, year) => {


    let doc = await lecturacsv(file);
    //let colum = await columna07(file, year)
    console.log(doc);
    console.log("lllll", await columna07(file, year));
    console.log(tareaPorHAcer);
    // let val = await validar(country, year);

    let est = {
        //MiVector: await columna07(file, year)
        // Menor_Mayor: await media(country, year),
        // Menores: await menores(country, year),
        // Mayores: await mayores(country, year),
        // top5: await topcinco(year)
    };

    return est;

}

const columna07 = async(file, year) => {
    let vectorparajason = [];
    let doc = await lecturacsv(file);
    for (let i = 3; i < 65; i++) {
        //console.log(year, "==", tareaPorHAcer[3][i]);
        if (year.toString() === tareaPorHAcer[3][i]) {

            for (let j = 3; j < tareaPorHAcer.length; j++) {
                vectorparajason.push(tareaPorHAcer[j][i]);

            }
        }

    }
    return vectorparajason;

};

module.exports = {
    mostrar,
    guardar

}