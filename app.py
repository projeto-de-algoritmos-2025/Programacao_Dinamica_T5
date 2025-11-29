import os
import random 
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# configuração dos itens disponíveis
ITEMS = [
    {'id': 'monalisa', 'name': 'Mona Lisa', 'weight': 10, 'value': 95, 'img': 'mona.jpg'},
    {'id': 'pearl', 'name': 'Moça com Brinco', 'weight': 3, 'value': 50, 'img': 'pearl.jpg'},
    {'id': 'scream', 'name': 'O Grito', 'weight': 6, 'value': 70, 'img': 'scream.jpg'},
    {'id': 'abaporu', 'name': 'Abaporu', 'weight': 15, 'value': 85, 'img': 'abaporu.jpg'},
    {'id': 'sunflower', 'name': 'Girassóis', 'weight': 5, 'value': 60, 'img': 'girassois.png'}, 
    {'id': 'bridge', 'name': 'Ponte sobre uma lagoa', 'weight': 20, 'value': 40, 'img': 'ponte.png'}
]

@app.route('/')
def index():
    """Renderiza a página inicial enviando a lista de itens disponíveis."""
    return render_template('index.html', items=ITEMS)

@app.route('/randomize', methods=['POST'])
def randomize_weights():
    """Sorteia novos pesos baseados no tipo do quadro."""
    for item in ITEMS:
        if item['id'] in ['pearl', 'scream', 'sunflower']:
            # quadros menores ou mais leves: 2kg a 8kg
            item['weight'] = random.randint(2, 8)
        elif item['id'] == 'monalisa':
            # quadro pequeno e pesado: 8kg a 15kg
            item['weight'] = random.randint(8, 15)
        else:
            # quadros grandes: 15kg a 30kg
            item['weight'] = random.randint(15, 30)
            
    return jsonify(ITEMS)

# algoritmo da mochila
def solve_knapsack(capacity, items):
    n = len(items)
    # dp[i][w] = valor máximo com i itens e capacidade w
    dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]

    # tabela 
    for i in range(1, n + 1):
        item = items[i-1]
        w_item = int(item['weight'])
        v_item = int(item['value'])
        
        for w in range(1, capacity + 1):
            if w_item <= w:
                # max entre: pegar o item + valor do que sobra OU não pegar o item
                dp[i][w] = max(v_item + dp[i-1][w - w_item], dp[i-1][w])
            else:
                # item não cabe, mantém o valor anterior
                dp[i][w] = dp[i-1][w]

    # Backtracking para encontrar itens escolhidos
    selected_items = []
    w = capacity
    for i in range(n, 0, -1):
        # valor diferente do acima: item foi incluído
        if dp[i][w] != dp[i-1][w]:
            item = items[i-1]
            selected_items.append(item)
            w -= int(item['weight']) # Subtrai o peso do item escolhido

    max_value = dp[n][capacity]
    return max_value, selected_items

@app.route('/solve', methods=['POST'])
def solve_route():
    """Recebe a capacidade da mochila e retorna a solução ótima."""
    try:
        data = request.json
        if not data or 'capacity' not in data:
            return jsonify({'error': 'Capacidade não informada'}), 400
            
        capacity = int(data.get('capacity'))
        
        max_value, chosen_items = solve_knapsack(capacity, ITEMS)
        
        # Calcula o peso total usado
        total_weight = sum(item['weight'] for item in chosen_items)
        
        return jsonify({
            'max_value': max_value,
            'capacity_used': total_weight,
            'items': chosen_items
        })
    except ValueError:
        return jsonify({'error': 'Valor de capacidade inválido'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)