# 🧪 Guia de Testes - Módulo de Grafos

## 🎯 Objetivo

Este guia ajuda a testar todas as funcionalidades do novo módulo de Grafos e verificar se está funcionando corretamente.

---

## ✅ Checklist de Testes

### 1. Navegação e Carregamento

- [ ] Abra o projeto no navegador (http://localhost:8000)
- [ ] Clique no módulo "🕸️ Grafos" no menu lateral
- [ ] Verifique se o conteúdo do módulo carrega corretamente
- [ ] Confirme que não há erros no console (F12)

**Resultado Esperado:**
- Módulo carrega com título "🕸️ Teoria dos Grafos"
- Canvas de visualização aparece
- Todas as seções estão visíveis

---

### 2. Visualizador Interativo

#### 2.1 Adicionar Vértices
- [ ] Selecione a ferramenta "➕ Adicionar Vértice"
- [ ] Clique em 5 pontos diferentes no canvas
- [ ] Verifique se vértices aparecem com labels A, B, C, D, E
- [ ] Confirme que o contador "Vértices" aumenta

**Resultado Esperado:**
- Vértices circulares roxos aparecem
- Labels centralizados (A, B, C, D, E)
- Contador atualiza: "Vértices: 5"

#### 2.2 Adicionar Arestas
- [ ] Selecione a ferramenta "🔗 Adicionar Aresta"
- [ ] Clique no vértice A
- [ ] Clique no vértice B
- [ ] Repita para criar: A→C, B→D, C→E
- [ ] Verifique setas direcionais

**Resultado Esperado:**
- Linhas conectam os vértices
- Setas indicam direção
- Contador "Arestas" aumenta
- Se ponderado ativo, solicita peso

#### 2.3 Remover Elementos
- [ ] Selecione a ferramenta "❌ Remover"
- [ ] Clique em uma aresta para removê-la
- [ ] Clique em um vértice para removê-lo
- [ ] Verifique que contadores atualizam

**Resultado Esperado:**
- Aresta desaparece ao clicar
- Vértice e suas arestas desaparecem
- Contadores diminuem

#### 2.4 Mover Vértices
- [ ] Selecione a ferramenta "👆 Selecionar"
- [ ] Clique e arraste um vértice
- [ ] Verifique que arestas seguem o vértice
- [ ] Solte em nova posição

**Resultado Esperado:**
- Vértice se move suavemente
- Arestas conectadas se ajustam
- Posição atualiza ao soltar

#### 2.5 Configurações
- [ ] Desmarque "Grafo Direcionado"
- [ ] Observe que setas desaparecem
- [ ] Marque "Arestas Ponderadas"
- [ ] Adicione nova aresta e insira peso
- [ ] Verifique que peso aparece no meio da aresta

**Resultado Esperado:**
- Setas aparecem/desaparecem conforme configuração
- Peso exibido em caixa branca no meio da aresta
- Tipo de grafo atualiza no painel

---

### 3. Exemplos Pré-configurados

#### 3.1 Grafo Simples
- [ ] Clique em "Grafo Simples"
- [ ] Verifique 5 vértices em layout específico
- [ ] Confirme 5 arestas conectando-os

#### 3.2 Grafo Completo
- [ ] Clique em "Grafo Completo"
- [ ] Verifique 5 vértices em círculo
- [ ] Confirme 20 arestas (todos conectados)

#### 3.3 Rede Social
- [ ] Clique em "Rede Social"
- [ ] Verifique 6 vértices (A-F)
- [ ] Confirme que é não-direcionado
- [ ] Observe padrão de conexões

#### 3.4 Grafo Ponderado
- [ ] Clique em "Grafo Ponderado"
- [ ] Verifique que pesos aparecem nas arestas
- [ ] Confirme checkbox "Ponderado" ativo

**Resultado Esperado:**
- Cada exemplo carrega imediatamente
- Layout é visualmente agradável
- Configurações corretas são aplicadas

---

### 4. Sistema de Representações

- [ ] Crie um grafo com 4 vértices e 4 arestas
- [ ] Role até "Conversor de Representações"
- [ ] Verifique as 3 representações:

#### 4.1 Matriz de Adjacência
```
    A B C D
A [[0, 1, 0, 0],
B  [0, 0, 1, 0],
C  [0, 0, 0, 1],
D  [0, 0, 0, 0]]
```
- [ ] Confirme que matriz está correta
- [ ] Verifique 1's nas posições de arestas

#### 4.2 Lista de Adjacência
```
A: [B]
B: [C]
C: [D]
D: []
```
- [ ] Confirme que listas estão corretas
- [ ] Verifique vizinhos de cada vértice

#### 4.3 Lista de Arestas
```
[
  {A → B},
  {B → C},
  {C → D}
]
```
- [ ] Confirme todas as arestas listadas
- [ ] Se ponderado, verifique pesos

**Resultado Esperado:**
- Representações atualizam automaticamente
- Formato claro e legível
- Informações corretas

---

### 5. Algoritmo de Busca - BFS

- [ ] Role até "Visualizador de Busca"
- [ ] Selecione "BFS - Busca em Largura"
- [ ] Ajuste velocidade para "Normal"
- [ ] Clique em "▶️ Iniciar Busca"

**Observações durante execução:**
- [ ] Vértice inicial fica amarelo
- [ ] Vértices explorados ficam verdes
- [ ] Fila é exibida em tempo real
- [ ] Passos aparecem na lista

**Resultado Esperado:**
- Animação mostra exploração por níveis
- Estado da fila é exibido
- Todos os vértices são visitados
- Mensagem "BFS concluído!" aparece

---

### 6. Algoritmo de Busca - DFS

- [ ] Clique em "🔄 Resetar"
- [ ] Selecione "DFS - Busca em Profundidade"
- [ ] Ajuste velocidade para "Rápido"
- [ ] Clique em "▶️ Iniciar Busca"

**Observações durante execução:**
- [ ] Vértice atual fica amarelo
- [ ] Visitados ficam verdes
- [ ] Profundidade é mostrada
- [ ] Backtracking é visível

**Resultado Esperado:**
- Animação mostra exploração em profundidade
- Informação de profundidade aparece
- Backtracking é visualizado
- Mensagem "DFS concluído!" aparece

---

### 7. Controles de Velocidade

Teste todos os níveis:
- [ ] Muito Lento (1000ms) - Passos bem espaçados
- [ ] Lento (750ms) - Boa para aprendizado
- [ ] Normal (500ms) - Velocidade padrão
- [ ] Rápido (250ms) - Demonstração rápida
- [ ] Muito Rápido (100ms) - Quase instantâneo

**Resultado Esperado:**
- Velocidade muda visivelmente
- Label atualiza corretamente
- Animação permanece suave

---

### 8. Algoritmo de Dijkstra

#### 8.1 Preparação
- [ ] Crie ou carregue "Grafo Ponderado"
- [ ] Role até "Visualizador de Caminho Mínimo"
- [ ] Selecione algoritmo "Dijkstra"

#### 8.2 Execução
- [ ] Selecione "Vértice Inicial: A"
- [ ] Selecione "Vértice Final: E"
- [ ] Clique em "🔍 Encontrar Caminho"

**Resultado Esperado:**
- Caminho destacado em vermelho no canvas
- "Caminho: A → B → E" (ou similar)
- "Distância Total: [número]"
- Vértices do caminho ficam vermelhos

#### 8.3 Teste com Caminho Impossível
- [ ] Remova todas as arestas entre dois vértices
- [ ] Tente encontrar caminho entre eles
- [ ] Verifique mensagem de erro

**Resultado Esperado:**
- "Distância Total: Sem caminho"

---

### 9. Algoritmo de Bellman-Ford

- [ ] Selecione algoritmo "Bellman-Ford"
- [ ] Escolha vértices inicial e final
- [ ] Clique em "🔍 Encontrar Caminho"
- [ ] Compare resultado com Dijkstra

**Resultado Esperado:**
- Mesmo caminho que Dijkstra (em grafos sem pesos negativos)
- Funciona corretamente
- Informação de algoritmo exibida

---

### 10. Painel de Informações

Verifique que atualiza em tempo real:
- [ ] **Vértices**: Conta correta ao adicionar/remover
- [ ] **Arestas**: Conta correta ao adicionar/remover
- [ ] **Tipo**: Muda entre Direcionado/Não-Direcionado
- [ ] **Densidade**: Calcula percentual correto

**Cálculo de Densidade:**
```
Direcionado: E / (V × (V-1)) × 100
Não-Direcionado: E / (V × (V-1) / 2) × 100
```

---

### 11. Funcionalidades Adicionais

#### 11.1 Limpar Grafo
- [ ] Crie um grafo complexo
- [ ] Clique em "🗑️ Limpar"
- [ ] Confirme na mensagem
- [ ] Verifique que tudo é removido

**Resultado Esperado:**
- Canvas fica vazio
- Contadores zerados
- Representações mostram placeholder

#### 11.2 Exportar Grafo
- [ ] Crie um grafo
- [ ] Clique em "💾 Exportar"
- [ ] Verifique arquivo JSON baixado
- [ ] Abra arquivo e confirme estrutura

**Estrutura Esperada:**
```json
{
  "vertices": [...],
  "edges": [...],
  "directed": true/false,
  "weighted": true/false
}
```

---

### 12. Responsividade

#### 12.1 Desktop (1920×1080)
- [ ] Todos os elementos visíveis
- [ ] Grid layouts funcionam
- [ ] Canvas centralizado

#### 12.2 Laptop (1366×768)
- [ ] Layout se adapta
- [ ] Barras de rolagem aparecem se necessário
- [ ] Funcionalidade mantida

#### 12.3 Tablet (iPad)
- [ ] Layout em colunas únicas
- [ ] Canvas redimensiona
- [ ] Controles acessíveis

#### 12.4 Mobile (smartphone)
- [ ] Stack vertical
- [ ] Canvas responsivo
- [ ] Funcionalidade básica mantida

---

### 13. Testes de Robustez

#### 13.1 Stress Test
- [ ] Adicione 50+ vértices
- [ ] Adicione 100+ arestas
- [ ] Execute BFS/DFS
- [ ] Verifique performance

**Resultado Esperado:**
- Sistema não trava
- Animações podem ficar lentas mas funcionam
- Sem erros no console

#### 13.2 Edge Cases
- [ ] Tente adicionar vértice fora do canvas
- [ ] Tente conectar vértice consigo mesmo
- [ ] Execute busca em grafo vazio
- [ ] Encontre caminho sem arestas

**Resultado Esperado:**
- Sistema lida graciosamente com casos extremos
- Mensagens de erro apropriadas
- Não quebra funcionalidade

---

### 14. Conteúdo Educacional

- [ ] Leia seção "O que são Grafos?"
- [ ] Verifique explicação de cada tipo de grafo
- [ ] Confirme exemplos de aplicação
- [ ] Revise códigos de algoritmos

**Qualidade Esperada:**
- Texto claro e didático
- Exemplos relevantes
- Código bem formatado
- Complexidade explicada

---

### 15. Integração com Sistema

#### 15.1 Navegação entre Módulos
- [ ] Vá para "Árvores Balanceadas"
- [ ] Volte para "Grafos"
- [ ] Verifique que estado é preservado
- [ ] Teste navegação para "Ordenação"

**Resultado Esperado:**
- Navegação suave
- Módulos carregam corretamente
- Sem perda de funcionalidade

#### 15.2 Botões de Navegação
- [ ] Clique em "← Árvores Balanceadas" no final do módulo
- [ ] Verifique que volta para árvores
- [ ] Use "Algoritmos de Ordenação →"
- [ ] Confirme navegação

---

## 🐛 Problemas Comuns e Soluções

### Canvas não aparece
**Solução:** Verifique console por erros, recarregue página

### Animação não inicia
**Solução:** Clique em Resetar, verifique se há grafo no canvas

### Representações não atualizam
**Solução:** Adicione pelo menos 1 vértice e 1 aresta

### Caminho mínimo não encontra
**Solução:** Verifique se há caminho conectando os vértices

---

## ✅ Checklist Final

### Funcionalidade
- [ ] Todas as ferramentas funcionam
- [ ] Todos os algoritmos executam
- [ ] Todos os exemplos carregam
- [ ] Export/Import funciona

### Visual
- [ ] Design profissional
- [ ] Cores consistentes
- [ ] Animações suaves
- [ ] Responsivo

### Performance
- [ ] Sem lag com grafos pequenos (<20 vértices)
- [ ] Aceitável com grafos médios (20-50 vértices)
- [ ] Funciona (pode ficar lento) com grafos grandes (50-100 vértices)

### Educacional
- [ ] Conteúdo claro
- [ ] Exemplos úteis
- [ ] Código compreensível
- [ ] Complexidade explicada

---

## 📊 Relatório de Teste

### Template de Relatório:

```
Data: ___/___/2024
Testador: __________
Navegador: __________
Resolução: __________

RESULTADOS:
✅ Funcionalidade Completa: [ ] Sim [ ] Não
✅ Sem Erros Críticos: [ ] Sim [ ] Não
✅ Performance Aceitável: [ ] Sim [ ] Não
✅ Conteúdo Correto: [ ] Sim [ ] Não

BUGS ENCONTRADOS:
1. _______________
2. _______________
3. _______________

SUGESTÕES DE MELHORIA:
1. _______________
2. _______________
3. _______________

APROVAÇÃO:
[ ] APROVADO - Pronto para produção
[ ] APROVADO COM RESSALVAS - Pequenos ajustes necessários
[ ] REPROVADO - Correções críticas necessárias
```

---

## 🎓 Conclusão

Se todos os testes passaram, o módulo de Grafos está:
✅ Completamente funcional
✅ Visualmente profissional
✅ Educacionalmente efetivo
✅ Tecnicamente robusto

**Próximo passo:** Deploy para produção ou início do desenvolvimento de MST (Kruskal e Prim).

---

**Desenvolvido por:** Prof. Eng. Computação Vagner Cordeiro  
**Versão:** 1.0  
**Data:** 2024
