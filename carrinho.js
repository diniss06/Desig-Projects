function carregarCarrinho() {
      const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      const container = document.getElementById("carrinho");
      const totalElem = document.getElementById("total");
      container.innerHTML = "";
      let total = 0;

      carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        const itemHTML = `
          <div class="item-carrinho">
            <img src="${item.imagem}" width="100">
            <h3>${item.nome}</h3>
            <p>Unidade: ${item.preco.toFixed(2)}€</p>
            <label>Quantidade:  
              <input type="number" min="1" value="${item.quantidade}" onchange="atualizarQuantidade(${index}, this.value)">
            </label>
            <p>Total: ${subtotal.toFixed(2)}€</p>
            <button onclick="removerItem(${index})">Remover</button>
            <hr>
          </div>
        `;

        container.innerHTML += itemHTML;
      });

      totalElem.textContent = `Total: ${total.toFixed(2)}€`;
      atualizarContador();
    }

    function atualizarQuantidade(index, novaQuantidade) {
      const carrinho = JSON.parse(localStorage.getItem("carrinho"));
      carrinho[index].quantidade = parseInt(novaQuantidade);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      carregarCarrinho();
    }

    function removerItem(index) {
      const carrinho = JSON.parse(localStorage.getItem("carrinho"));
      carrinho.splice(index, 1);
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      carregarCarrinho();
    }

    function finalizarCompra() {
      if (confirm("Tens a certeza que queres finalizar a compra?")) {
        localStorage.removeItem("carrinho");
        carregarCarrinho();
      }
    }

    function atualizarContador() {
      const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      const totalItems = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
      document.querySelector(".cart-count").textContent = totalItems;
    }

    carregarCarrinho();