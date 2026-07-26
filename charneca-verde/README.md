# Charneca Verde — website

Site institucional da **Charneca Verde**, empresa de jardinagem e manutenção
de espaços verdes sediada nas Caldas da Rainha.

Trilingue (português, inglês e francês), sem dependências, sem build.
São ficheiros HTML, CSS e JavaScript — abre-se no browser e funciona.

---

## Ver o site

O site publicável vive todo dentro de `public/`. Tudo o que está fora
dessa pasta é documentação interna e nunca vai para a internet.

```bash
cd public && python3 -m http.server 8000
# depois abra http://localhost:8000
```

Para ver noutro idioma sem clicar no seletor: `?lang=en` ou `?lang=fr`.

---

## O que tem de configurar antes de pôr online

Cinco coisas. Nenhuma exige saber programar.

### 1. Contactos — `public/js/config.js`

É o único ficheiro que precisa de tocar para os contactos. Altere os
valores e o telefone, o WhatsApp e o email mudam em todo o site de uma vez.

```js
telefone: "+351912345678",        // formato internacional, sem espaços
telefoneVisivel: "+351 912 345 678",
whatsapp: "351912345678",         // só dígitos, sem o "+"
email: "geral@charnecaverde.pt",
```

### 2. Formulário de orçamento — `public/js/config.js`

O formulário tem três modos, escolhidos em `formularioModo`:

| Modo | O que acontece | Precisa de |
|---|---|---|
| `"whatsapp"` *(atual)* | Junta os campos numa mensagem e abre o WhatsApp com tudo já escrito | Só o número em `whatsapp` |
| `"email"` | O mesmo, mas abre o programa de email do visitante | Só o `email` |
| `"servidor"` | Envia em segundo plano, sem sair do site | Um endereço em `formularioUrl` |

O modo **WhatsApp** é o que está ativo porque funciona no Cloudflare
Pages sem qualquer serviço externo — o Cloudflare Pages, ao contrário do
Netlify, não trata formulários. A mensagem é composta na língua em que o
visitante está a ver o site.

Se mais tarde preferir receber os pedidos por email sem o visitante ter
de os enviar, crie uma conta gratuita em [formspree.io](https://formspree.io)
(50 mensagens/mês), copie o endereço do formulário e ponha:

```js
formularioModo: "servidor",
formularioUrl: "https://formspree.io/f/xxxxxxxx"
```

O campo escondido `_gotcha` bloqueia grande parte do spam automático.

### 3. Números reais — `public/index.html`

Na secção `<!-- ============ STATS ============ -->` estão valores de
exemplo (12 anos, 300+ jardins, 4,9/5). **Troque pelos verdadeiros ou
apague a secção.** Números inventados são o género de coisa que destrói a
confiança quando um cliente descobre — e é exatamente o oposto do que
este site tenta fazer.

O mesmo vale para:

- **Testemunhos** (secção `#testemunhos`) — os três textos são exemplos.
  Substitua por avaliações reais. Peça-as por WhatsApp aos clientes de
  quem tem melhor relação; a taxa de resposta é alta.
- **NIF** no rodapé.
- **Área servida** na secção `#zonas` — confirme se atua mesmo em todas as
  localidades listadas.
- **Promessas** da secção `#confianca`: seguro de responsabilidade civil,
  credencial de aplicador de fitofarmacêuticos, garantia de um ano nas
  plantações. São argumentos fortes precisamente porque os concorrentes
  não os põem por escrito — mas só os pode manter no site se forem verdade.

### 4. Fotografias — `public/images/`

Neste momento a galeria mostra blocos de cor. Leia o
[`public/images/README.md`](public/images/README.md): explica o que fotografar, com que
tamanho e como substituir. É a alteração com maior impacto de todas.

### 5. Endereço — `public/index.html`, `public/robots.txt`, `public/sitemap.xml`

Os ficheiros apontam para `https://charneca-verde.pages.dev`, o endereço
gratuito do Cloudflare Pages, partindo do princípio de que o projeto lá se
chama `charneca-verde`. Se lhe der outro nome, ou quando comprar um
domínio próprio, substitua esse endereço nos três ficheiros — nas
etiquetas `canonical`, `hreflang`, `og:*` e nos dados estruturados
`application/ld+json`, onde também estão o telefone e as coordenadas.

---

## Publicar

### Cloudflare Pages, por upload direto (sem terminal e sem Git)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages**
   → **Create** → separador **Pages** → **Upload assets**
2. Nome do projeto: `charneca-verde` (define o endereço `.pages.dev`)
3. Arraste um ZIP com o **conteúdo de `public/`** — o `index.html` tem de
   ficar na raiz do ZIP, não dentro de outra pasta
4. **Deploy site**

Cada alteração exige um novo upload em **Create deployment**.

### Cloudflare Pages, ligado ao GitHub (republica sozinho)

**Workers & Pages → Create → Pages → Connect to Git**, escolha o
repositório e configure:

| Campo | Valor |
|---|---|
| Framework preset | None |
| Build command | *(vazio)* |
| Build output directory | `public` |

O `public` é o que garante que o `README.md` e a
`PESQUISA-CONCORRENCIA.md` ficam no repositório mas **não** são
publicados — a análise da concorrência não é para ser pública.

### Alternativas

- **GitHub Pages** — só serve a raiz ou `/docs`, por isso obrigaria a
  mover os ficheiros para fora de `public/`.
- **Netlify** — *publish directory* `public`. É o único destes que trata
  formulários sem serviços externos.

---

## Estrutura

```
.
├── public/                     ← tudo o que vai para a internet
│   ├── index.html              página completa (português no HTML)
│   ├── css/styles.css          estilos
│   ├── js/
│   │   ├── config.js           ← contactos do negócio (editar aqui)
│   │   ├── i18n.js             ← traduções EN e FR
│   │   └── main.js             idiomas, menu, formulário, animações
│   ├── assets/                 logótipo, favicon, imagem de partilha
│   ├── images/                 fotografias dos trabalhos (a preencher)
│   ├── robots.txt
│   └── sitemap.xml
├── README.md                   este ficheiro (não publicado)
└── PESQUISA-CONCORRENCIA.md    análise de mercado (não publicada)
```

### Como funcionam os idiomas

O português está escrito directamente no HTML — é o que o Google indexa e
é o que aparece mesmo se o JavaScript falhar. As traduções de inglês e
francês vivem no `public/js/i18n.js`, indexadas por chave:

```html
<h3 data-i18n="svc.lawn.t">Relvados</h3>
```

```js
en: { "svc.lawn.t": "Lawns" },
fr: { "svc.lawn.t": "Pelouses" }
```

Para **mudar um texto em português**, edite o `public/index.html`.
Para **mudar um texto em inglês ou francês**, edite o `public/js/i18n.js`.
Para **acrescentar texto novo**, ponha-o no HTML com um `data-i18n` novo e
acrescente a mesma chave aos dois dicionários.

O idioma escolhido fica guardado no browser e é detetado automaticamente
na primeira visita a partir das definições do visitante.

---

## Decisões por trás do desenho

O site foi construído a partir do que os concorrentes da região fazem — e
sobretudo do que não fazem. A análise está em
[`PESQUISA-CONCORRENCIA.md`](PESQUISA-CONCORRENCIA.md). Em resumo:

- **Preço e processo explicados antes de o cliente ligar.** Quase nenhum
  site local diz como se chega a um preço. A secção "Como trabalhamos" e a
  pergunta "quanto custa?" no FAQ tiram essa fricção.
- **Confiança em vez de adjetivos.** Em vez de "profissionalismo e
  qualidade", promessas verificáveis: seguro, credencial de aplicador,
  preço fechado por escrito, equipa própria, garantia nas plantações.
- **Trilingue a sério.** Os resorts do Óbidos/Peniche (Praia d'El Rey, Bom
  Sucesso, Royal Óbidos) estão cheios de proprietários britânicos, irlandeses,
  holandeses e franceses que passam cá parte do ano. É o segmento que
  compra manutenção mensal e o que menos concorrentes servem bem.
- **Chamada à ação sempre à mão.** Botão fixo no fundo do ecrã em
  telemóvel, CTA no cabeçalho, e o FAQ imediatamente antes do formulário —
  responder às dúvidas antes de pedir o contacto aumenta os envios.
- **Rápido.** Sem framework, sem imagens pesadas, sem cookies nem
  rastreadores. Carrega em segundos numa rede móvel fraca, que é como
  metade dos clientes vai ver o site.

---

## Depois de publicar

Por ordem de retorno:

1. **Perfil de Empresa no Google** ([business.google.com](https://business.google.com))
   — grátis, e para um negócio local vale mais do que o site. Ponha as
   mesmas fotografias, a mesma área servida e o link para o site.
2. **Peça avaliações.** Cinco avaliações reais no Google mudam mais o
   telefone a tocar do que qualquer redesenho.
3. **Ligue o site ao perfil** e verifique a propriedade no
   [Google Search Console](https://search.google.com/search-console);
   submeta o `sitemap.xml`.
4. **Registe-se no Zaask, Fixando e habitissimo** — é onde muita gente da
   região pede orçamentos, e os concorrentes já lá estão.
5. **Fotografe cada trabalho.** Duas fotos por obra, sempre. Ao fim de um
   ano tem uma galeria que nenhum concorrente da zona consegue igualar.

---

## Licença

Código deste site: uso livre pela Charneca Verde.
As fontes Fraunces e Inter são distribuídas sob SIL Open Font License.
