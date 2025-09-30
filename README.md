# 🚀 Algoritmos de Ordenação Gamificados

Uma aplicação web interativa e educativa que demonstra algoritmos de ordenação passo a passo, perfeita para aprender e visualizar como diferentes algoritmos funcionam. Desenvolvida com foco na experiência educativa e gamificação.

![Preview](https://img.shields.io/badge/Status-Ready-success) ![License](https://img.shields.io/badge/License-MIT-blue) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🚀 **Demo Online**
**🌐 [Acesse a Aplicação](https://algoritimos-avancados.vercel.app)**

**📂 [Repositório GitHub](https://github.com/cordeirotelecom/algoritimos_avancados)**

## ✨ **Melhorias Recentes (v2.0)**
- ✅ **Modo de Comparação Funcional** - Compare algoritmos lado a lado
- ✅ **Gráficos de Performance** - Visualização de estatísticas avançada  
- ✅ **Explicações Detalhadas** - Sistema educativo completo
- ✅ **Animações Aprimoradas** - Transições mais suaves e profissionais
- ✅ **Persistência Visual** - Elementos ordenados mantêm cor verde
- ✅ **Interface Responsiva** - Design otimizado para todos dispositivos

## ✨ Características

### 🎯 Algoritmos Implementados
- **Bubble Sort** - Algoritmo básico com visualização de "bolhas" subindo
- **Selection Sort** - Seleção do menor elemento passo a passo  
- **Insertion Sort** - Inserção ordenada elementos por elemento
- **Quick Sort** - Algoritmo de divisão e conquista com pivô
- **Merge Sort** - Divisão e mesclagem recursiva
- **Heap Sort** - Usa heap (montículo) para extrair o maior elemento
- **Radix Sort** - Ordenação por dígitos para números inteiros

### 🎮 Sistema de Gamificação
- **Sistema de Pontuação** - Ganhe pontos baseados na eficiência
- **Níveis de Progressão** - Suba de nível conforme aprende
- **Conquistas** - 12 conquistas diferentes para desbloquear
- **Estatísticas Detalhadas** - Acompanhe seu progresso e melhores tempos

### 🎨 Visualização Avançada
- **Animações Fluidas** - Cada passo é visualizado com animações suaves
- **Cores Intuitivas** - Sistema de cores para diferentes operações
- **Descrições Passo a Passo** - Explicações detalhadas de cada operação
- **Contadores em Tempo Real** - Comparações, trocas e tempo decorrido

### 📱 Design Responsivo
- **Interface Moderna** - Design dark com gradientes e efeitos visuais
- **Mobile-Friendly** - Funciona perfeitamente em dispositivos móveis
- **Acessibilidade** - Atalhos de teclado e navegação intuitiva

### 🔊 Sistema de Som
- **Efeitos Sonoros** - Sons diferentes para comparações, trocas e conclusões
- **Feedback Musical** - Sons baseados nos valores dos elementos
- **Fanfarras** - Músicas especiais para conquistas e níveis

### 🔄 Modo Comparação
- **Execução Paralela** - Compare dois algoritmos lado a lado
- **Estatísticas Comparativas** - Veja qual é mais eficiente
- **Visualização Dupla** - Duas animações simultâneas

### 💾 Export e Compartilhamento
- **Export de Estatísticas** - Baixe seus dados em JSON
- **Captura de Tela** - Salve visualizações como imagem
- **Relatórios HTML** - Gere relatórios completos de performance
- **Compartilhamento Social** - Compartilhe resultados nas redes sociais

## 🚀 Como Usar

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Python 3.x (para servidor local) ou qualquer servidor web

### Instalação e Execução

1. **Clone ou baixe o projeto**
   ```bash
   git clone <repository-url>
   cd algoritimos-avancados
   ```

2. **Inicie um servidor local**
   
   **Opção 1: Python**
   ```bash
   python -m http.server 8000
   ```
   
   **Opção 2: Node.js**
   ```bash
   npx serve .
   ```
   
   **Opção 3: VS Code Live Server**
   - Instale a extensão "Live Server"
   - Clique com botão direito em `index.html`
   - Selecione "Open with Live Server"

3. **Acesse no navegador**
   ```
   http://localhost:8000
   ```

### Como Jogar

1. **Escolha um Algoritmo** - Clique em um dos 5 cards de algoritmos
2. **Gere um Array** - Use o botão "Gerar Novo Array" ou crie um personalizado
3. **Inicie a Ordenação** - Clique em "Iniciar Ordenação" e observe a mágica
4. **Acompanhe o Progresso** - Veja comparações, trocas e descrições passo a passo
5. **Ganhe Pontos** - Complete algoritmos para ganhar pontos e desbloquear conquistas

## ⌨️ Atalhos de Teclado

| Tecla | Ação |
|-------|------|
| `Espaço` | Iniciar/Pausar ordenação |
| `R` | Reset da visualização |
| `G` | Gerar novo array |
| `Esc` | Voltar à seleção de algoritmos |
| `1-7` | Selecionar algoritmo diretamente |

## 🏆 Sistema de Conquistas

### Conquistas Básicas
- 🌟 **Primeira Ordenação** - Complete seu primeiro algoritmo
- 🫧 **Mestre do Bubble** - Complete o Bubble Sort
- 🎯 **Especialista em Seleção** - Complete o Selection Sort
- 📌 **Profissional da Inserção** - Complete o Insertion Sort

### Conquistas Avançadas
- 🥷 **Ninja do Quick Sort** - Complete o Quick Sort
- 🧙‍♂️ **Mago do Merge Sort** - Complete o Merge Sort
- 🏆 **Colecionador de Algoritmos** - Complete todos os 5 algoritmos
- ⚡ **Demônio da Velocidade** - Complete uma ordenação em menos de 5 segundos

### Conquistas de Maestria
- 🎯 **Especialista em Eficiência** - Complete com menos de 50 comparações
- 📚 **Aprendiz Persistente** - Complete 10 ordenações
- 🔍 **Minimalista de Comparações** - Acumule menos de 500 comparações totais
- 🏃‍♂️ **Maratona de Ordenação** - Passe 5 minutos ordenando arrays

## 🛠️ Estrutura do Projeto

```
algoritimos-avancados/
├── index.html              # Página principal
├── css/
│   ├── styles.css          # Estilos principais
│   └── animations.css      # Animações e efeitos
├── js/
│   ├── algorithms.js       # Implementação dos algoritmos
│   ├── visualization.js    # Controle da visualização
│   ├── gamification.js     # Sistema de gamificação
│   └── app.js             # Controlador principal
├── .github/
│   └── copilot-instructions.md
└── README.md
```

## 🎓 Valor Educacional

### Para Estudantes
- **Visualização Clara** - Veja exatamente como cada algoritmo funciona
- **Comparação de Performance** - Compare eficiência entre algoritmos
- **Aprendizado Interativo** - Aprenda fazendo, não apenas lendo

### Para Professores
- **Ferramenta de Ensino** - Use em sala de aula para demonstrações
- **Engajamento** - Sistema de gamificação mantém alunos interessados
- **Progresso Rastreável** - Sistema de conquistas mostra o progresso

## 📊 Complexidade dos Algoritmos

| Algoritmo | Melhor Caso | Caso Médio | Pior Caso | Espaço |
|-----------|-------------|------------|-----------|---------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) |
| Radix Sort | O(nk) | O(nk) | O(nk) | O(n+k) |

## 🔧 Personalização

### Modificar Velocidade das Animações
```javascript
// Em app.js, linha ~200 aproximadamente
this.visualizationController.setAnimationSpeed(3); // 1-5 (1=lento, 5=rápido)
```

### Adicionar Novos Arrays
```javascript
// Em visualization.js, adicione novos métodos
generateCustomPattern(size) {
    // Sua lógica aqui
}
```

### Criar Novas Conquistas
```javascript
// Em gamification.js, adicione ao initializeAchievements()
{
    id: 'nova_conquista',
    name: 'Nome da Conquista',
    description: 'Descrição da conquista',
    icon: '🆕',
    points: 100,
    unlocked: false
}
```

### Personalizar Sons
```javascript
// Em sound-effects.js, adicione novos tipos de som
playCustomSound(frequency, duration, type) {
    // Sua lógica de som personalizada
}
```

### Adicionar Novos Algoritmos
```javascript
// Em algorithms.js, adicione implementação
customSort(arr) {
    // Implementação do algoritmo
    // Use this.addStep() para adicionar visualização
}
```

## 🐛 Solução de Problemas

### Página não carrega
- Certifique-se de estar executando um servidor local
- Verifique se todas as pastas e arquivos estão presentes
- Abra o console do navegador (F12) para ver erros

### Animações lentas no móvel
- A velocidade é automaticamente ajustada para dispositivos móveis
- Use o modo desktop no navegador móvel para velocidade total

### Progresso não salva
- Verifique se o navegador permite localStorage
- Limpe o cache do navegador se necessário

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ para tornar o aprendizado de algoritmos mais divertido e interativo.

---

**Divirta-se aprendendo algoritmos de ordenação! 🎉**