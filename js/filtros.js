document.addEventListener('DOMContentLoaded', () => {
    const checkboxTodos = document.getElementById('filter-todos');
    const checkboxes = document.querySelectorAll('.filter-cb');
    const cards = document.querySelectorAll('.products-grid article');

    if (!checkboxTodos || cards.length === 0) return;

    checkboxTodos.addEventListener('change', (e) => {
        if (e.target.checked) {
            checkboxes.forEach(cb => cb.checked = false); 
            filtrarProdutos();
        } else {
            const algumMarcado = Array.from(checkboxes).some(cb => cb.checked);
            if (!algumMarcado) {
                e.target.checked = true;
            }
        }
    });

    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const algumMarcado = Array.from(checkboxes).some(check => check.checked);
            
            if (algumMarcado) {
                checkboxTodos.checked = false;
            } else {
                checkboxTodos.checked = true;
            }
            
            filtrarProdutos();
        });
    });

    function filtrarProdutos() {
        const categoriasAtivas = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);

        cards.forEach(card => {
            const categoriaCard = card.getAttribute('data-category');
            card.style.animation = 'none';
            card.offsetHeight; 
            card.style.animation = null;

            if (checkboxTodos.checked) {
                
                card.style.display = 'flex'; 
            } else {
               
                if (categoriasAtivas.includes(categoriaCard)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }
});