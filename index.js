const { select, input, checkbox } = require ('@inquirer/prompts')

let meta = {
    value: 'Tomar 3L de água todo dia',
    checked: false,
}

let metas = [ meta ]

const cadastrarMetas = async () => {
    const meta = await input({ message: "Digite a meta:"})

    if(meta.length==0){
        console.log('A meta não pode ser vazia.')
        return
    }

    metas.push(
        { value: meta, checked: false}
    )
}

const listarMetas = async () => {
    //coletar os dados
    const respostas = await checkbox ({
        message: "Use as setas pra mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    if(respostas.length==0){
        console.log("Nenhuma resposta foi selecionada!")
        return
    }

    metas.forEach((m)=>{
        m.checked = false
    })

    //procura a resposta dada pelo usuario no array e marca true
    respostas.forEach((resposta) => {
        const meta = metas.find((m) =>{
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log("Meta(s) marcadas como concluída(s)")

}

const start = async () => {
    
    while(true){

        const opcao = await select({
            message: "Menu>",
            choices: [
                {
                    name: "cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "listar metas",
                    value: "listar"
                },
                {
                    name: "sair",
                    value: "sair"
                }                                
        ]

        })

        switch (opcao){
            case "cadastrar":
                await cadastrarMetas()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "sair":
                console.log("Até a próxima")
                return
        }
    }

}

start()
