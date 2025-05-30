// Ativar botão apenas se o stock for 0
document.querySelectorAll('.product').forEach(product => {
    const stock = parseInt(product.getAttribute('data-stock'), 10);
    const button = product.querySelector('.order-btn');

    if (stock === 0) {
        button.disabled = false;
        button.style.backgroundColor = '#f97300';
        button.style.color = 'white';
        button.style.cursor = 'pointer';
    }
});
