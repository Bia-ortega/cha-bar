// Mapeando o nome da categoria no banco para o ID do elemento HTML correspondente
const categoriaMap = {
    'Bar': 'categoria-bar',
    'Cozinha': 'categoria-cozinha',
    'Banheiro': 'categoria-banheiro',
    'Área de Serviço': 'categoria-area',
    'Quarto': 'categoria-quarto'
};

// Buscar presentes do backend
fetch('/presentes')
    .then(res => res.json())
    .then(data => {
        data.forEach(presente => {
            const ulId = categoriaMap[presente.categoria];
            const ul = document.getElementById(ulId);

            const li = document.createElement('li');
            li.textContent = presente.nome;
            li.dataset.id = presente.id;

            if (presente.reservado) {
                li.classList.add('reservado');
                li.textContent += ' (Reservado)';
            }

            li.addEventListener('click', () => {
                if (!li.classList.contains('reservado')) {
                    // Reservar presente
                    fetch(`/presentes/reservar/${presente.id}`, { method: 'POST' })
                        .then(() => {
                            li.classList.add('reservado');
                            li.textContent += ' (Reservado)';
                            alert('Presente reservado com sucesso!');
                        })
                        .catch(err => console.error('Erro ao reservar:', err));
                } else {
                    // Desmarcar presente
                    if (confirm('Deseja desmarcar este presente?')) {
                        fetch(`/presentes/desmarcar/${presente.id}`, { method: 'POST' })
                            .then(() => {
                                li.classList.remove('reservado');
                                li.textContent = presente.nome; // remove o "(Reservado)"
                                alert('Presente desmarcado!');
                            })
                            .catch(err => console.error('Erro ao desmarcar:', err));
                    }
                }
            });

            ul.appendChild(li);
        });
    })
    .catch(err => console.error('Erro ao carregar presentes:', err));
