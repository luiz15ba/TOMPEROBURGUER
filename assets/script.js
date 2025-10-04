let cardapio = [
    {
        id: 1,
        nome: 'TÔMPERO CLÁSSICO ',
        descricao: 'Brioche caseiro, suculento blend bovino de 160g grelhado, mussarela derretida, alface fresquinha, tomate suculento e maionese verde.',
        vaslor: 27.00,
        img: './assets/imgs/tompero_classico.jpg'
    },
    {
        id: 2,
        nome: 'VITORIANA BACON',
        descricao: 'Brioche artesanal selado na manteiga, blend de 160g grelhado, bacon crocante, queijo cheddar e maionese de bacon.',
        vaslor: 29.00,
        img: './assets/imgs/vitoriana_bacon.png'
    },
    {
        id: 3,
        nome: 'SWEET ONION',
        descricao: 'Pão macio seladinho na manteiga, blend de 160g grelhado, cebola roxa caramelizada, queijo cheddar e maionese da casa.',
        vaslor: 30.00,
        img: './assets/imgs/sweet_onion.png'
    },
    {
        id: 4,
        nome: 'TROPICAL',
        descricao: 'Brioche fofinho selado na manteiga, blend de 160g, queijo mussarela derretido, abacaxi caramelizado, tomate grelhado e maionese da casa.',
        vaslor: 36.00,
        img: './assets/imgs/tropical.png'
    },
    {
        id: 5,
        nome: 'CASADINHO',
        descricao: 'Brioche leve, selado na manteiga, blend de 160g, queijo mussarela, queijo coalho banhado no mel, banana da terra frita, bacon crocante e um toque da maionese da casa.',
        vaslor: 38.00,
        img: './assets/imgs/casadinho.png'
    },
    {
        id: 6,
        nome: 'REFRIGERANTE GARRAFINHA',
        descricao: 'Guaraná Garrafinha 200ml',
        vaslor: 3.00,
        img: 'https://paulistaoatacadista.vtexassets.com/arquivos/ids/384405/RefrigeranteAntarctica200mlPetGua1.jpg?v=638532944722900000'
    },
    {
        id: 7,
        nome: 'REFRIGERANTE LATA',
        descricao: 'Coca Lata 350ml',
        vaslor: 6.00,
        img: 'https://zaffari.vtexassets.com/arquivos/ids/283217/1007841-00.jpg?v=638893856879230000'
    },
    {
        id: 8,
        nome: 'REFRIGERANTE LATA',
        descricao: 'Coca 0kcal Lata 350ml',
        vaslor: 6.00,
        img: 'https://www.coca-cola.com/content/dam/onexp/es/es/products/coca-cola-zero/es_coca-cola-zero_product_750.jpg'
    }
]

let acompanhamentos = [
    {
        id: 8,
        nome: 'CARNE',
        vaslor: 8.00
    },
    {
        id: 9,
        nome: 'MUSSARELA',
        vaslor: 3.00
    },
    {
        id: 10,
        nome: 'BACON',
        vaslor: 3.00
    },
    {
        id: 11,
        nome: 'CHEDDAR',
        vaslor: 2.00
    },
    {
        id: 12,
        nome: 'ABACAXI',
        vaslor: 2.00
    },
    {
        id: 13,
        nome: 'QUEIJO COALHO',
        vaslor: 5.00
    },
    {
        id: 14,
        nome: 'SALADA - alface e tomates',
        vaslor: 1.00
    }
]

let carrinho = [];


let areaRender = document.querySelector('.area-geral');
let btnCart = document.querySelector('.cart');
let btnCartOn = document.querySelector('.cart-on');
let areaCart = document.querySelector('.cart-area');
let quantidade = document.querySelector('.cart .qtd p');
let renderCart = document.querySelector('.render-cart');
let total = document.querySelector('.total');
let confirmar = document.querySelector('.enviar');
let acom = document.querySelector('.area-acom');


//chat

// Seleciona a área principal
const areaDados = document.querySelector('.area-dados');

// Header e o select de entrega/retirada
const header = areaDados.querySelector('.header');
const selectEntrega = header.querySelector('select');

// Inputs de dados da pessoa
const inputNome = areaDados.querySelector('.cliente');
const inputRua = areaDados.querySelector('.rua');
const inputBairro = areaDados.querySelector('.bairro');
const inputNumero = areaDados.querySelector('.numero');
const inputReferencia = areaDados.querySelector('.referencia');

// Observações
const obsContainer = areaDados.querySelector('.dados-pessoa.obs');
const inputObs = obsContainer.querySelector('input');

// Pagamento
const pagContainer = areaDados.querySelector('.dados-pessoa.pag');
const selectPagamento = pagContainer.querySelector('select');

// Botão de enviar
const btnEnviar = areaDados.querySelector('.enviar.pedido');
const Rmv = areaDados.querySelector('.remv');


//fim chat

let valor = 0;
let totalItens = 0;

const adicionarCarrinho = (index) => {
    const item = cardapio[index];
    carrinho.push(item)
    atualizarQtd()

}

const adicionarAcompanhamento = (index) => {
    const item = acompanhamentos[index];
    carrinho.push(item)
    atualizarQtd()

}


const RenderCardapio = () => {
    areaRender.innerHTML = ''
    cardapio.forEach((item, index) => {
        areaRender.innerHTML += `<div class="item">
        <img class="item-foto" src="${item.img}" alt="produto">
        <p class="produto-titulo">${item.nome}</p>
        <p class='desc'>${item.descricao}</p>
        <p class='preco'>R$${item.vaslor.toFixed(2)}</p>
        <img class='add' onclick="adicionarCarrinho(${index})" src='https://cdn.pixabay.com/photo/2016/03/21/05/05/plus-1270001_1280.png'/>
    </div>`;
    });

    acompanhamentos.forEach((item, index) => {
        acom.innerHTML += `<div class="item acom">
        <p class="produto-titulo">${item.nome}</p>
        <p class='preco'>R$${item.vaslor.toFixed(2)}</p>
        <img class='add' onclick="adicionarAcompanhamento(${index})" src='https://cdn.pixabay.com/photo/2016/03/21/05/05/plus-1270001_1280.png'/>
    </div>`;
    });

}
const atualizarQtd = () => {
    quantidade.innerHTML = `${carrinho.length}`
    Calculo();
}

btnCart.addEventListener('click', () => {
    areaCart.classList.toggle('hidden')
    renderItens();
})

btnCartOn.addEventListener('click', () => {
    areaCart.classList.toggle('hidden')
})

confirmar.addEventListener('click', () => {
    areaDados.classList.toggle('hidden')
})

Rmv.addEventListener('click', () => {
    areaDados.classList.toggle('hidden')
})

const apagarItem = (index) => {
    carrinho.splice(index, 1);
    console.log(carrinho.length)
    renderItens();
    atualizarQtd()
}

const Calculo = () => {
    valor = 0; // resetar antes de somar
    carrinho.forEach((item) => {
        valor += item.vaslor;
    })
    totalItens = carrinho.length; // atualizar quantidade total
    atualizarValores();
}
const atualizarValores = () => {
    total.innerHTML = `Total de Produtos = ${totalItens} Valor Total = R$${valor.toFixed(2)}`;
}

const renderItens = () => {
    renderCart.innerHTML = '';
    atualizarValores()
    carrinho.forEach((item, index) => {
        renderCart.innerHTML += `
        <div class="cart-item">
            ${item.img ? `<img src="${item.img}" alt="foto">` : '<p>(ADICIONAL)</p>'}
            <p>${item.nome}</p>
            <div><p>R$${item.vaslor}</p></div>
            <div class="apagar" onclick="apagarItem(${index})">Remover</div>
        </div>
        `;
    })
}


btnEnviar.addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    // Monta o resumo do pedido
    let resumoPedido = '';
    carrinho.forEach((item, index) => {
        resumoPedido += `📌 ${item.nome} - R$${item.vaslor.toFixed(2)}\n`;
    });

    // Verifica se é entrega ou retirada
    let tipoEntrega = selectEntrega.value === 'Retirada' ? 'Retirada no balcão' :
        `${inputRua.value}, ${inputNumero.value}\n${inputBairro.value}\nReferência: ${inputReferencia.value}`;

    // Monta a mensagem final
    const mensagem = `
✏ SEU PEDIDO: TÔMPERO BURGUER
Acompanhe abaixo o pedido

Realizado em: ${new Date().toLocaleDateString('pt-BR')} - ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}

-----------------------------
🍽 RESUMO DO PEDIDO
${resumoPedido}

-----------------------------
PAGAMENTO
▪ Forma de Pagamento: ${selectPagamento.value.toUpperCase()}
▪ Valor Total do Pedido: R$${valor.toFixed(2)}

-----------------------------
${selectEntrega.value === 'Retirada' ? '🏃 RETIRADA' : '🏠 ENDEREÇO DE ENTREGA'}
${tipoEntrega}

-----------------------------
🤩 ${inputNome.value}
📝 Obs: ${inputObs.value}
`.trim();

    // Número da lanchonete
    const numeroLanchonete = "5577999573447";

    // Gera o link do WhatsApp
    const linkWhatsApp = `https://wa.me/${numeroLanchonete}?text=${encodeURIComponent(mensagem)}`;

    // Abre o WhatsApp Web ou app
    window.open(linkWhatsApp, '_blank');
});


RenderCardapio()
atualizarQtd()