document.addEventListener('DOMContentLoaded', function() {
    const dropdownBtns = document.querySelectorAll('.SGR-flecha-menu');
    
    // Asignar z-index inicial basado en la posición
    const cards = document.querySelectorAll('.card-dropdown-btn');
    cards.forEach((card, index) => {
        const totalCards = cards.length;
        card.style.zIndex = totalCards - index; // Los primeros elementos tendrán mayor z-index
    });

    dropdownBtns.forEach(btn => {
        btn.removeAttribute('onclick');
        
        const dropdownList = btn.closest('.card-dropdown-btn').querySelector('.dropdown-list');
        const isMenuButton = !btn.closest('.dropdown-arrow-container');
        
        function closeDropdown(event) {
            if (!event.target.closest('.card-dropdown-btn')) {
                dropdownList.hidden = true;
                btn.setAttribute('aria-expanded', 'false');
                document.removeEventListener('click', closeDropdown);
            }
        }

        if (isMenuButton) {
            btn.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();

                const isExpanded = btn.getAttribute('aria-expanded') === 'true';
                const currentCard = btn.closest('.card-dropdown-btn');
                
                // Cerrar otros menús abiertos
                document.querySelectorAll('.dropdown-list').forEach(list => {
                    if (list !== dropdownList) {
                        list.hidden = true;
                        const otherBtn = list.closest('.card-dropdown-btn').querySelector('.SGR-flecha-menu');
                        otherBtn.setAttribute('aria-expanded', 'false');
                    }
                });

                // Invertir el estado actual
                dropdownList.hidden = isExpanded;
                btn.setAttribute('aria-expanded', !isExpanded);

                // Ajustar z-index cuando se abre el menú
                if (!isExpanded) {
                    const maxZIndex = Math.max(...Array.from(cards).map(c => parseInt(c.style.zIndex) || 0));
                    currentCard.style.zIndex = maxZIndex + 1;
                    
                    setTimeout(() => {
                        document.addEventListener('click', closeDropdown);
                    }, 0);
                }
            });

            btn.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && !dropdownList.hidden) {
                    dropdownList.hidden = true;
                    btn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    });
});