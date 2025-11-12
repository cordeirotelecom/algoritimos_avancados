# 💪 EXERCÍCIOS PRÁTICOS DE GRAFOS

## Nível 1: Iniciante

### Exercício 1.1: Identificar Vértices e Arestas

**Problema:** Dado este grafo, responda:

```
  A --- B
  |     |
  C --- D
```

**Perguntas:**
1. Quantos vértices tem? **Resposta: 4** (A, B, C, D)
2. Quantas arestas tem? **Resposta: 4** (A-B, A-C, B-D, C-D)
3. Qual é o grau de cada vértice?
   - **A: 2** (conecta B, C)
   - **B: 2** (conecta A, D)
   - **C: 2** (conecta A, D)
   - **D: 2** (conecta B, C)

---

### Exercício 1.2: Classificar Grafo

**Problema:** Que tipo de grafo é este?

```
  A → B
  ↓   ↓
  C → D
```

**Resposta:** Grafo **Direcionado** (tem setas indicando direção)

**Perguntas extras:**
- É cíclico ou acíclico? **Acíclico** (DAG - sem voltas)
- Tem ciclos? **Não**

---

### Exercício 1.3: Matriz de Adjacência

**Problema:** Crie a matriz de adjacência para este grafo não-direcionado:

```
  0 --- 1
  |     |
  2 --- 3
```

**Resposta:**
```
    0  1  2  3
0 [[0, 1, 1, 0],
1  [1, 0, 0, 1],
2  [1, 0, 0, 1],
3  [0, 1, 1, 0]]
```

---

### Exercício 1.4: Lista de Adjacência

**Problema:** Represente este grafo como lista de adjacência:

```
  A → B → C
  ↓       ↑
  D ------+
```

**Resposta:**
```javascript
const graph = {
  A: ['B', 'D'],
  B: ['C'],
  C: [],
  D: ['C']
};
```

---

## Nível 2: Intermediário

### Exercício 2.1: Executar BFS Manualmente

**Problema:** Execute BFS começando em A e liste a ordem de visita:

```
      A
     / \
    B   C
   / \
  D   E
```

**Solução Passo a Passo:**
1. Visitou: A (nível 0)
2. Fila adiciona: B, C (nível 1)
3. Visitou B, adiciona: D, E (nível 2)
4. Visitou C
5. Visitou D
6. Visitou E

**Ordem Final: A → B → C → D → E**

---

### Exercício 2.2: Executar DFS Manualmente

**Problema:** Execute DFS começando em A:

```
      A
     / \
    B   C
   / \
  D   E
```

**Solução Passo a Passo:**
1. Visitou: A
2. Vai para primeiro vizinho: B
3. Vai para vizinho de B: D
4. D não tem vizinhos, volta
5. Próximo vizinho de B: E
6. E não tem vizinhos, volta
7. Volta para A, vai para C
8. C não tem vizinhos

**Ordem Final: A → B → D → E → C**

---

### Exercício 2.3: Detectar Ciclo

**Problema:** Este grafo tem ciclo?

```
  A → B
  ↓   ↓
  C → D → A
```

**Resposta:** **SIM**, tem ciclo: **A → B → D → A** (ou completo: A → B → D → A → C)

**Como detectar:** Usar DFS. Se encontrar uma aresta para um vértice já visitado no caminho atual, tem ciclo.

---

### Exercício 2.4: Componentes Conectadas

**Problema:** Quantas componentes conectadas tem este grafo?

```
  A --- B       C --- D
  |            
  E      F --- G
```

**Resposta:** **3 componentes**
1. {A, B, E}
2. {C, D}
3. {F, G}

---

## Nível 3: Avançado

### Exercício 3.1: Dijkstra - Caminho Mínimo

**Problema:** Use Dijkstra para encontrar o caminho mais curto de A para F:

```
      2
   A ---- B
   |5 \   |3
   |    1 |
   C ---- D --- F
    \    4    2/
     \-------E
        1
```

**Solução:**

| Vértice | Distância | Via |
|---------|-----------|-----|
| A | 0 | - |
| B | 2 | A → B |
| C | 5 | A → C |
| D | 3 | A → B → D |
| E | 1 | A → E |
| F | 3 | A → E → F |

**Caminho mais curto: A → E → F com distância 3**

---

### Exercício 3.2: Ordenação Topológica

**Problema:** Ordene topologicamente este DAG:

```
  A → B → D
  ↓   ↗ ↓
  C ←→ E
```

**Resposta (uma das possíveis):** **A → B → C → E → D** ou **A → C → B → E → D**

---

### Exercício 3.3: Árvore Geradora Mínima (Kruskal)

**Problema:** Encontre a MST usando Kruskal:

```
Arestas (peso):
A-B (4)
A-C (2)
B-C (1)
B-D (5)
C-D (8)
C-E (10)
D-E (2)
```

**Solução - Ordenar por peso:**
1. B-C (1) ✓ Adiciona
2. A-C (2) ✓ Adiciona
3. D-E (2) ✓ Adiciona
4. A-B (4) ✗ Criaria ciclo
5. B-D (5) ✓ Adiciona (5ª aresta, completa)

**MST: {B-C, A-C, D-E, B-D}**
**Peso total: 1 + 2 + 2 + 5 = 10**

---

### Exercício 3.4: Problema de Roteamento

**Problema:** Você precisa delivery em 3 locais (B, D, E) começando de A. Qual é a rota otimizada?

```
Distâncias:
A-B: 10
A-D: 30
A-E: 25
B-D: 20
B-E: 15
D-E: 5
```

**Solução (TSP Simples):**
- Opção 1: A → B → E → D: 10 + 15 + 5 = 30
- Opção 2: A → B → D → E: 10 + 20 + 5 = 35
- Opção 3: A → E → D → B: 25 + 5 + 20 = 50

**Melhor rota: A → B → E → D = 30**

---

## Nível 4: Desafio

### Exercício 4.1: Rede Social - Graus de Separação

**Problema:** Na rede social abaixo, qual é a menor distância entre pessoa P e pessoa T?

```
P --- A --- Q
|     |     |
B --- C --- R
|     |     |
D --- E --- S
      |
      T
```

**Solução:** Use BFS para encontrar o caminho:
1. P → A → Q → R → S → E → T = 6 passos
2. P → A → C → E → T = 4 passos ✓ (mais curto)

**Resposta: 4 passos (A → C → E → T)**

---

### Exercício 4.2: Projeto de Planejamento

**Problema:** Dadas as dependências de tarefas, qual é a ordem de execução?

```
Dependências:
- Design depende de Requisitos
- Frontend depende de Design
- Backend depende de Design
- Testes depende de Frontend, Backend
- Deploy depende de Testes
```

**Grafo:**
```
Requisitos
    ↓
  Design
   /    \
  ↓      ↓
Frontend Backend
   \    /
    ↓  ↓
  Testes
    ↓
  Deploy
```

**Ordem Topológica:** Requisitos → Design → Frontend, Backend → Testes → Deploy

---

### Exercício 4.3: Detector de Ciclos em Projeto

**Problema:** Este sistema tem dependência circular? Como evitar?

```
Módulo A importa Módulo B
Módulo B importa Módulo C
Módulo C importa Módulo A  (CICLO!)
```

**Solução:** Usar DFS para detectar ciclo. Se encontrar, reorganizar para quebrar o ciclo.

---

## 🎯 GABARITO RESUMIDO

| Exercício | Resposta | Algoritmo |
|-----------|----------|-----------|
| 1.1 | 4 vértices, 4 arestas | - |
| 1.2 | Direcionado, Acíclico | - |
| 1.3 | Matriz simétrica | - |
| 1.4 | Lista com 4 entradas | - |
| 2.1 | A→B→C→D→E | BFS |
| 2.2 | A→B→D→E→C | DFS |
| 2.3 | SIM, ciclo existe | DFS |
| 2.4 | 3 componentes | BFS/DFS |
| 3.1 | Distância 3 | Dijkstra |
| 3.2 | A→B→C→E→D | Topológica |
| 3.3 | MST peso 10 | Kruskal |
| 3.4 | Rota 30 | Heurística |
| 4.1 | Distância 4 | BFS |
| 4.2 | Ordem deps | Topológica |
| 4.3 | Ciclo existe | DFS |

---

## 📈 Dificuldade Progressiva

```
Nível 1: Conceitos (Fácil)
├─ Identificar estrutura
├─ Classificar grafos
└─ Representações básicas

Nível 2: Algoritmos (Médio)
├─ BFS/DFS manual
├─ Detectar propriedades
└─ Componentes

Nível 3: Otimização (Difícil)
├─ Dijkstra aplicado
├─ MST
└─ Ordenação

Nível 4: Real-world (Muito Difícil)
├─ Problemas complexos
├─ Combinações de técnicas
└─ Pensamento crítico
```

---

**Dica:** Comece pelos exercícios do Nível 1 e avance gradualmente. Cada nível reforça conceitos do anterior!

