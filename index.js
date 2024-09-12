const { select, input, checkbox } = require ('@inquirer/prompts')

let mensagem = "Bem-vindo ao App de metas";
let meta = {
    value: 'Tomar 3L de água todo dia',
    checked: false,
}

let metas = [ meta ]

const cadastrarMetas = async () => {
    const meta = await input({ message: "Digite a meta:"})

    if(meta.length==0){
        mensagem = 'A meta não pode ser vazia.'
        return
    }

    metas.push(
        { value: meta, checked: false}
    )

    mensagem = "Meta cadastrada com sucesso!"
}

const listarMetas = async () => {
    //coletar os dados
    const respostas = await checkbox ({
        message: "Use as setas pra mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m)=>{
        m.checked = false
    })

    if(respostas.length==0){
        mensagem = "Nenhuma resposta foi selecionada!"
        return
    }



    //procura a resposta dada pelo usuario no array e marca true
    respostas.forEach((resposta) => {
        const meta = metas.find((m) =>{
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta(s) marcadas como concluída(s)"

}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        mensagem = 'Não existem metas realizadas :('
        return
    }

    await select({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if(abertas.length == 0){
        mensagem = 'Não existem metas abertas! :)'
        return
    }
    
    await select({
        message: "Metas abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false}
    })

    const itensADeletar = await checkbox ({
        message: "Selecione um item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if(itensADeletar == 0){
        mensagem  = "Nenhum item para deletar"
        return
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    console.log("Meta(s) deleta(s) com sucesso!")
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    
    while(true){
        mostrarMensagem()

        const opcao = await select({
            message: "Menu>",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
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
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break                
            case "sair":
                console.log("Até a próxima")
                return
        }
    }

}

start()
