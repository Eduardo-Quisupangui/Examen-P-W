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
        for (let i = 4; i < 295; i++) {
            if (row[i] == "" || row[i] == " " || row[i] == "") {
                row[i] = "0";
            }
        }
        tareaPorHAcer.push(row);
    }
    //console.log(tareaPorHAcer);
    return 'Se ha terminado de leer el archivo';
};




let mostrar = async(archivo, anio, pais) => {


    //let doc = await lecturacsv(archivo);
    //let colum = await columna07(file, year)
    //console.log(doc);
    console.log(anio);
    console.log("llamada metodo", await columna07(archivo, anio));
    //console.log(tareaPorHAcer);
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

const columna07 = async(archivo, anio) => {
    let vectorparajason = [];
    let doc = await lecturacsv(archivo);
    console.log("dd", doc);
    console.log(anio);
    console.log("dato", tareaPorHAcer[4][5], "_");

    for (let i = 0; i < 65; i++) {
        //console.log(year, "==", tareaPorHAcer[3][i]);
        //console.log("i:", tareaPorHAcer[3][i]);
        // console.log(anio.toString() === tareaPorHAcer[3][i]);
        if (anio.toString() === tareaPorHAcer[3][i]) {
            console.log("1", tareaPorHAcer[i][2]);
            console.log("2", tareaPorHAcer[i][0]);
            console.log("3", tareaPorHAcer[3][i]);
            console.log("4", tareaPorHAcer[6][i]);

            console.log("5", tareaPorHAcer[i][i]);

            // for (let j = 3; j < tareaPorHAcer.length; j++) {
            //     vectorparajason.push(tareaPorHAcer[j][i]);

            // }
        }

    }
    return vectorparajason;

};

module.exports = {
    mostrar,

}