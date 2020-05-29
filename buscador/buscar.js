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

    let lista_mostrar = await mos(archivo, anio, pais)

    for (let j = 0; j < 4; j++) {

        console.log(lista_mostrar[j]);

    }
}
let guardar = async(archivo, anio, pais) => {
    console.log(await gua(archivo, anio, pais));
}

const mos = async(archivo, anio) => {

    let lista = []
    let doc = await lecturacsv(archivo);
    console.log("año: ", anio);


    for (let i = 0; i < 65; i++) {

        if (anio.toString() === tareaPorHAcer[3][i]) {

            lista = [`Datos: ${tareaPorHAcer[i][2]}`, `Pais: ${tareaPorHAcer[i][0]}`,
                `Año: ${tareaPorHAcer[3][i]}`, `Valor: ${tareaPorHAcer[i][i]}`, `${tareaPorHAcer[i][1]}`, `${tareaPorHAcer[3][i]}`
            ]

        }

    }
    return lista;

};

const gua = async(archivo, anio, pais) => {
    let lista_buscada = (await mos(archivo, anio, pais));
    let lista_guardar = [];
    for (let j = 0; j < 4; j++) {
        lista_guardar.push(lista_buscada[j]);

    }

    fs.appendFile(`./resultados/${lista_buscada[4]}-${lista_buscada[5]}.txt`, lista_guardar, (error) => {
        if (error) {
            throw error;
        }
        console.log("se creo el archivo");
    });

}


module.exports = {
    mostrar,
    guardar

}