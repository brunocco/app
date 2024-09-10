/*Arrays*/
/*======================================================================*/
let metas = ["Maria", "alo"]

//imprimir todo array
console.log(metas)

//imprimir uma posição
console.log(metas[0])

//concatenar(juntar) um com outro
console.log(metas[0] + metas[1])

console.log(metas[1] + " " + metas[0])

/*======================================================================*/
/*Objetos : todo objeto tem uma propriedade e um valor. declrado com chaves.*/


// unico objetos meta
let meta = {
    value: 'ler um livro por dia',
    checked: true

}

//conjunto de metas

let meta2 = [
    meta,
    {
        value: 'caminhar 20 min todos os dias',
        checked: false
    }

]
console.log(meta.value)
console.log(meta2[1].value)

/*======================================================================*/

/*Método esta dentro de um objeto e Função esta fora*/

//Function 
//criando uma errow function e atribuindo a uma variável

const criarMeta = () => {}

// criando uma função criarMeta

//function criarMeta() {}