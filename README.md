# Projetos de front-end | Portfólio

Este README reúne três projetos de interface: uma landing page para academia, um portfólio de arquitetura e uma vitrine imobiliária. As descrições abaixo foram feitas a partir dos arquivos dos projetos e apresentam o objetivo, as tecnologias, a direção visual e as principais interações de cada um.

| Projeto | Proposta | Tecnologias principais |
| --- | --- | --- |
| [FORJA — Academia & Performance](#forja--academia--performance) | Landing page com narrativa em capítulos e rolagem horizontal | HTML5, CSS3 e JavaScript puro |
| [Artur Arquiteto](#artur-arquiteto) | Portfólio de arquitetura contemporânea | HTML5, Tailwind CSS via CDN, CSS próprio, JavaScript e GSAP |
| [CasaViva](#casaviva) | Catálogo interativo de imóveis | HTML5, CSS3 e JavaScript puro |

> Os códigos originais estão em pastas separadas em `C:\Users\PC\Documents`; este repositório contém este resumo para o portfólio. As três interfaces são demonstrações de front-end. Não há API, banco de dados ou autenticação próprios nos arquivos analisados.

## FORJA — Academia & Performance

**Objetivo.** Apresentar uma academia fictícia por meio de uma experiência visual que acompanha o visitante da primeira impressão até o contato. A página tem sete capítulos: início, academia, programas, método, resultados, planos e contato.

### Tecnologias e estrutura

- **Linguagens:** HTML5 semântico, CSS3 e JavaScript sem framework.
- **Estilos:** `css/horizontal.css` é a folha carregada por `index.html`. Há também `css/style.css` e `css/gym.css` na pasta, mas elas não são carregadas pela página atual.
- **Tipografia:** Barlow Condensed para títulos de impacto e Space Grotesk para textos e interface, carregadas pelo Google Fonts.
- **Arquivos centrais:** `index.html` organiza o conteúdo, `js/main.js` controla navegação e animações, e `assets/` reúne imagens e favicon.
- **Execução:** página estática, sem pacote npm e sem etapa de build. Abra `index.html` no navegador.

### Design e experiência

A direção de arte combina fundo quase preto, verde fluorescente (`#baff42`), títulos grandes e condensados, fotografia de academia e elementos que lembram um painel de treino. Um personagem atleta acompanha os capítulos e muda de posição conforme a rolagem. O contraste e a hierarquia tipográfica guiam a leitura e destacam as chamadas para ação.

O JavaScript transforma a rolagem vertical em deslocamento horizontal, aplica inércia ao movimento e sincroniza o capítulo ativo, o indicador de progresso e a apresentação do conteúdo. A navegação também funciona por menu, pontos, links internos e teclado. Em telas menores, o layout se reorganiza e os cartões de planos formam um carrossel horizontal. Há opção para pausar o movimento, suporte à preferência por movimento reduzido e uma leitura vertical quando o JavaScript está desativado.

### Funcionalidades

- Apresentação de programas, método, resultados e três planos.
- Transições entre capítulos e animações do personagem.
- Formulário com nome, e-mail, objetivo e plano escolhido. Após a validação, ele abre uma mensagem pronta no WhatsApp para o visitante revisar e enviar.
- Navegação responsiva, link para pular ao conteúdo e estados de foco visíveis.

**Ponto de atenção para publicação:** textos, depoimentos, preços, endereço e número de WhatsApp são demonstrativos e precisam ser substituídos pelos dados reais de uma academia.

**Pasta analisada:** `C:\Users\PC\Documents\academia-landing`

## Artur Arquiteto

**Objetivo.** Exibir a identidade de um escritório de arquitetura contemporânea, seus projetos e formas de contato em uma página de portfólio. A navegação é dividida em início, sobre, projetos, parceiros e contato.

### Tecnologias e estrutura

- **Linguagens:** HTML5, CSS3 e JavaScript puro.
- **Estilos:** Tailwind CSS carregado pela CDN para composição e responsividade, complementado por regras e componentes próprios em `css/style.css`.
- **Animação:** GSAP 3 e ScrollTrigger via CDN para entradas na rolagem, menu e modal; `js/main.js` também usa APIs nativas do navegador.
- **Tipografia:** Plus Jakarta Sans pelo Google Fonts.
- **Arquivos centrais:** `index.html`, `css/style.css`, `js/main.js` e imagens locais em `img/`.
- **Execução:** abra `index.html` no navegador. O projeto também inclui `server.js` e `iniciar.bat` para servi-lo localmente; com Node.js instalado, `node server.js` usa a porta `8080` por padrão.

### Design e experiência

O visual segue uma linguagem editorial e minimalista, adequada ao tema arquitetônico: preto e grafite (`#0d0d0d`, `#121212`), branco, cinzas, bastante espaço entre elementos e fotografias de edifícios e interiores. A marca usa traços geométricos; os cartões, botões arredondados e sobreposições discretas dão profundidade sem competir com as imagens. A composição se adapta do desktop ao celular, com menu móvel em tela cheia.

### Funcionalidades

- Galeria com quatro projetos exibidos em cartões, separados por filtros de categoria.
- Modal de projeto com imagens, dados e descrição de cada trabalho.
- Animações de entrada durante a rolagem, contadores animados e destaque da seção ativa no menu.
- Formulário que valida os campos e abre uma mensagem no WhatsApp; também há chamadas diretas para contato.
- Respeito à preferência por movimento reduzido, com apresentação do conteúdo sem depender das animações.

**Ponto de atenção para publicação:** parte dos textos informa explicitamente que é ilustrativa, incluindo biografia, números profissionais e descrições de projetos. Os contatos usam números de exemplo. A página também carrega bibliotecas, fontes e algumas imagens externas, portanto esses recursos dependem de conexão com a internet.

**Pasta analisada:** `C:\Users\PC\Documents\artur-arquiteto (2)\artur-arquiteto`

## CasaViva

**Objetivo.** Simular uma plataforma de descoberta de imóveis para compra e aluguel, com página inicial, listagem filtrável e página de detalhes. O projeto apresenta um fluxo completo de navegação entre busca, comparação e contato com o corretor.

### Tecnologias e estrutura

- **Linguagens:** HTML5, CSS3 e JavaScript puro, incluindo scripts nas próprias páginas HTML.
- **Estilos:** `styles.css` concentra tokens de cor, tipografia, componentes, layout responsivo e animações. A folha possui estilos iniciais claros e uma personalização posterior que define o visual final escuro com neon.
- **Tipografia:** Inter pelo Google Fonts.
- **Dados:** `data.js` contém um catálogo local de 12 imóveis e funções de busca, filtragem, formatação e imagens substitutas. Não há banco de dados nem consulta a uma API de imóveis.
- **Animação:** `animations.js` controla transições e efeitos de entrada; `house-animation.js` desenha e anima uma casa em SVG com JavaScript nativo. O comentário do arquivo cita Anime.js como inspiração, mas a biblioteca não é importada.
- **Páginas:** `index.html` (início e simulador), `listings.html` (busca e filtros) e `property.html` (detalhes do imóvel).
- **Execução:** página estática, sem pacote npm ou build. Abra `index.html` no navegador e navegue pelos links internos.

### Design e experiência

A identidade final usa fundo azul quase preto (`#0b0d14`), ciano (`#22d3ee`), acentos roxos, gradientes e brilhos sutis. Cartões com fotos, indicadores de preço e informação em camadas ajudam a comparar imóveis. A casa animada na abertura reforça o tema imobiliário; a grade, os filtros e o menu se ajustam para telas menores. O CSS e o JavaScript incluem tratamento para usuários que preferem menos movimento.

### Funcionalidades

- Busca por localização e filtros de status, cidade, tipo, faixa de preço, quartos, banheiros e área.
- Ordenação de resultados por preço, metragem e ano de construção.
- Favoritos salvos no `localStorage` do navegador e visualização apenas dos itens salvos.
- Página de detalhes com galeria de fotos, características, histórico de preços, informações do corretor e contato por telefone ou WhatsApp.
- Simulador de financiamento na página inicial e nos detalhes de imóveis à venda; para aluguel, exibição de custos mensais estimados.
- Imagens substitutas geradas em SVG caso alguma foto externa falhe; animação de abertura controlada por `sessionStorage`.

**Ponto de atenção para publicação:** os imóveis e corretores são dados de demonstração. Parte das fotos vem de serviços externos, e alguns links de conta e rodapé apontam para o site Zillow; eles devem ser trocados antes de apresentar a CasaViva como produto real. O simulador fornece apenas uma estimativa calculada no navegador.

**Pasta analisada:** `C:\Users\PC\Documents\CasaViva-2`

## Competências demonstradas pelo conjunto

- Criação de interfaces responsivas com HTML semântico, CSS customizado e JavaScript no navegador.
- Construção de identidades visuais distintas para segmentos de academia, arquitetura e mercado imobiliário.
- Desenvolvimento de navegação, filtros, modais, formulários, favoritos e cálculos interativos.
- Uso de animação para orientar a experiência, com cuidados de acessibilidade como foco visível e suporte a movimento reduzido.
- Organização de projetos estáticos que podem ser abertos e avaliados sem infraestrutura de back-end.
