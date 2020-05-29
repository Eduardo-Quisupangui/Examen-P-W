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
        for (let i = 4; i < 269; i++) {
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

        console.log(colors.green(lista_mostrar[j]));

    }
}
let guardar = async(archivo, anio, pais) => {
    console.log(await gua(archivo, anio, pais));
}

const mos = async(archivo, anio, pais) => {

    let lista = []
    let doc = await lecturacsv(archivo);
    console.log("año: ", anio, );
    console.log("pais: ", pais);
    try {
        for (let j = 4; j < 269; j++) {
            for (let i = 0; i < 65; i++) {
                if ((anio.toString() === tareaPorHAcer[3][i]) && (pais.toString() === tareaPorHAcer[j][1])) {
                    if ((tareaPorHAcer[j][1] !== undefined)) {
                        lista = [`Datos: ${tareaPorHAcer[j][2]}`, `Pais: ${tareaPorHAcer[j][0]}`,
                            `Año: ${tareaPorHAcer[3][i]}`, `Valor: ${tareaPorHAcer[j][i]}`, `${tareaPorHAcer[j][1]}`, `${tareaPorHAcer[3][i]}`
                        ]

                    }


                }

            }
        }
    } catch (e) {
        console.log("entering catch block");
        console.log(e);
        console.log("leaving catch block");
    }


    return lista;

};





const gua = async(archivo, anio, pais) => {
    let lista_buscada = (await mos(archivo, anio, pais));
    let lista_guardar = [];
    for (let j = 0; j < 4; j++) {
        lista_guardar.push(lista_buscada[j]);
        console.log(colors.blue(lista_guardar[j]));

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