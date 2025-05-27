function adicionarAoCarrinho(nome, preco, imagem) {
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            let existente = carrinho.find(p => p.nome === nome);
            if (existente) {
                existente.quantidade += 1;
            } else {
                carrinho.push({ nome, preco, imagem, quantidade: 1 });
            }
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            atualizarContadorCarrinho();
        }

        function atualizarContadorCarrinho() {
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
            let totalItens = carrinho.reduce((soma, p) => soma + p.quantidade, 0);
            document.querySelector(".cart-count").textContent = totalItens;
        }

        atualizarContadorCarrinho();