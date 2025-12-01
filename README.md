# Programação Dinâmica - Uma Noite No Museu

## Alunos
| Matrícula | Nome |  
|:----------:|:---------------------------:|  
| 20/2046229 | Kallyne Macêdo Passos |  
| 20/0022199 | Leonardo Sobrinho de Aguiar | 

Dupla: 28 

## Sobre
O projeto **Uma Noite no Museu** consiste em uma aplicação web que utiliza o algoritmo **Knapsack (Problema da Mochila)** para resolver um cenário de simulação. O objetivo é ajudar um personagem a selecionar quais obras de arte famosas (como a Mona Lisa, O Grito, etc.) ele deve levar do museu, considerando o valor inestimável de cada peça e o peso que elas ocupam. O usuário define a capacidade máxima da mochila (em kg) e o algoritmo determina a combinação ótima de quadros que maximiza o valor total sem exceder o limite de peso.

A aplicação permite também a randomização dos pesos dos quadros para simular diferentes cenários de dificuldade.

## Guia de instalação

Linguagem: Python, HTML, CSS e JavaScript<br>
Framework: Flask<br>
Pré-requisitos: Navegador instalado, Python, Flask e Pillow presentes no computador; clonar o repositório localmente.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/projeto-de-algoritmos-2025/Programacao_Dinamica_Museu.git
    ```

2.  **Instale as Dependências:**
    ```bash
    pip install Flask Pillow
    ```

3.  **Inicie o Servidor:**
    Digite no mesmo terminal:
    ```bash
    python app.py
    ```

4.  **Acesse a Aplicação:**
    Abra seu navegador web e acesse o seguinte endereço: `http://127.0.0.1:5000`


## Uso
Após iniciar o servidor e acessar a aplicação no navegador:

1. Na tela inicial, você verá as obras de arte disponíveis com seus respectivos pesos e valores.
2. Escolha o tamanho da mochila no menu de seleção (ex: Média 20kg).
3. Clique em "Pegar Itens" para rodar o algoritmo da mochila. O sistema mostrará quais itens foram escolhidos para maximizar o lucro e o peso total utilizado.
4. Se desejar variar o cenário, clique em "Atualizar Pesos". Isso irá sortear novos pesos para os quadros dentro de faixas pré-definidas (ex: quadros pequenos ficam mais leves ou pesados aleatoriamente).


# Capturas de Tela

<div align="center">Página inicial
<img width="1753" height="927" alt="image" src="https://github.com/user-attachments/assets/bf1b252f-9bd9-46a8-892d-e9d3e1bc2672" /> </div>

<br>

<div align="center">Preenchimento - Mochila média
<img width="1737" height="933" alt="image" src="https://github.com/user-attachments/assets/616fa299-87c9-4ea2-9cb4-a4b26a3e41ce" /> </div>

<br>

<div align="center">Pesos atualizados - Mochila grande
<img width="1605" height="927" alt="image" src="https://github.com/user-attachments/assets/e2577894-5d89-42f0-b5f6-002d1b9a6c22" /></div>

# Gravação
[Link da gravação](https://youtu.be/sGqVQ1m-Dfk)
