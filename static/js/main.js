document.addEventListener('DOMContentLoaded', () => {
    const solveBtn = document.getElementById('solve-btn');
    const randomizeBtn = document.getElementById('randomize-btn'); 
    const capacitySelect = document.getElementById('capacity-select');
    const resultWrapper = document.getElementById('result-wrapper');
    const resultContainer = document.getElementById('result-items-container');
    const totalValueEl = document.getElementById('total-value');
    const usedWeightEl = document.getElementById('used-weight');

    // Randomizar pesos
    if (randomizeBtn) {
        randomizeBtn.addEventListener('click', async () => {
            const originalText = randomizeBtn.innerHTML;
            randomizeBtn.innerHTML = '🎲 Girando...';
            randomizeBtn.disabled = true;

            try {
                const response = await fetch('/randomize', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) throw new Error('Erro ao randomizar pesos');

                const data = await response.json();

                const itemCards = document.querySelectorAll('.item-card');
                
                // Percorre os cards e atualiza o texto do peso
                itemCards.forEach((card, index) => {
                    if (data[index]) {
                        const weightBadge = card.querySelector('.badge-weight');
                        if (weightBadge) {
                            weightBadge.textContent = `Peso: ${data[index].weight}kg`;
                            
                            weightBadge.style.transition = 'background-color 0.3s';
                            const originalColor = getComputedStyle(weightBadge).backgroundColor;
                            weightBadge.style.backgroundColor = '#0dcaf0'; // cor azul claro
                            
                            setTimeout(() => {
                                weightBadge.style.backgroundColor = '';
                            }, 500);
                        }
                    }
                });

              resultWrapper.classList.add('d-none');

            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao tentar randomizar os pesos.');
            } finally {
                // Restaura o botão
                randomizeBtn.innerHTML = originalText;
                randomizeBtn.disabled = false;
            }
        });
    }

    // Pegar itens 
    solveBtn.addEventListener('click', async () => {
        const originalBtnText = solveBtn.innerHTML;
        solveBtn.disabled = true;

        
        resultWrapper.classList.add('d-none');
        resultContainer.innerHTML = '';

        const capacity = parseInt(capacitySelect.value);

        try {
            // Faz a requisição ao backend
            const response = await fetch('/solve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ capacity: capacity })
            });

            if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
            }

            const data = await response.json();

            if (data.error) {
                alert('Erro: ' + data.error);
                return;
            }

            // Atualiza os dados na tela 
            totalValueEl.textContent = 'R$' + data.max_value + 'M';
            usedWeightEl.textContent = data.capacity_used;

            // Renderiza os cards dos itens escolhidos
            if (data.items.length === 0) {
                resultContainer.innerHTML = `
                    <div class="col-12">
                        <p class="text-muted fst-italic">Nenhum item cabe nesta mochila :(</p>
                    </div>`;
            } else {
                data.items.forEach(item => {
                    const col = document.createElement('div');
                    col.className = 'col-6 col-md-3 col-lg-2';
                    
                    // Card do item
                    col.innerHTML = `
                        <div class="card h-100 result-card shadow-sm">
                            <div class="position-absolute top-0 end-0 p-1">
                                <span class="badge bg-success">✓</span>
                            </div>
                            <img src="/static/images/${item.img}" class="card-img-top p-2" style="height: 100px; object-fit: contain;">
                            <div class="card-body p-2 text-center">
                                <small class="fw-bold d-block text-truncate">${item.name}</small>
                                <div class="d-flex justify-content-center gap-1 mt-1" style="font-size: 0.8rem;">
                                    <span class="badge bg-warning text-dark">R$${item.value}M</span>
                                    <span class="badge bg-secondary">${item.weight}kg</span>
                                </div>
                            </div>
                        </div>
                    `;
                    resultContainer.appendChild(col);
                });
            }

            resultWrapper.classList.remove('d-none');
            resultWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } catch (error) {
            console.error('Erro:', error);
            alert('Ocorreu um erro ao tentar processar o algoritmo.');
        } finally {
            solveBtn.disabled = false;
            solveBtn.innerHTML = originalBtnText;
        }
    });
});