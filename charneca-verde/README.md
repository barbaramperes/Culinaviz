# Charneca Verde — website

Site institucional da **Charneca Verde**, empresa de jardinagem e manutenção
de espaços verdes sediada nas Caldas da Rainha.

Trilingue (português, inglês e francês), sem dependências, sem build.
São ficheiros HTML, CSS e JavaScript — abre-se no browser e funciona.

---

## Ver o site

Basta abrir o `index.html`. Para ter os caminhos todos certinhos, prefira
servir a pasta:

```bash
python3 -m http.server 8000
# depois abra http://localhost:8000
```

Para ver noutro idioma sem clicar no seletor: `?lang=en` ou `?lang=fr`.

---

## O que tem de configurar antes de pôr online

Cinco coisas. Nenhuma exige saber programar.

### 1. Contactos — `js/config.js`

É o único ficheiro que precisa de tocar para os contactos. Altere os
valores e o telefone, o WhatsApp e o email mudam em todo o site de uma vez.

```js
telefone: "+351912345678",        // formato internacional, sem espaços
telefoneVisivel: "+351 912 345 678",
whatsapp: "351912345678",         // só dígitos, sem o "+"
email: "geral@charnecaverde.pt",
```

### 2. Formulário de orçamento — `index.html`

O formulário está pronto mas ainda não envia para lado nenhum. Crie uma
conta gratuita em [formspree.io](https://formspree.io) (50 mensagens por
mês no plano grátis), copie o endereço do seu formulário e substitua no
`index.html`:

```html
<form ... action="https://formspree.io/f/SEU_ID_AQUI" method="POST">
```

Enquanto não fizer isto, quem submeter vê uma mensagem de erro. O campo
escondido `_gotcha` já bloqueia grande parte do spam automático.

### 3. Números reais — `index.html`

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

### 4. Fotografias — `images/`

Neste momento a galeria mostra blocos de cor. Leia o
[`images/README.md`](images/README.md): explica o que fotografar, com que
tamanho e como substituir. É a alteração com maior impacto de todas.

### 5. Domínio — `index.html`, `robots.txt`, `sitemap.xml`

Substitua `www.charnecaverde.pt` pelo domínio real nos três ficheiros
(nas etiquetas `canonical`, `hreflang`, `og:*` e nos dados estruturados
`application/ld+json`, incluindo o telefone e as coordenadas).

---

## Publicar

### GitHub Pages (gratuito)

1. Repositório → **Settings** → **Pages**
2. *Source*: `Deploy from a branch`, branch `main`, pasta `/ (root)`
3. Fica em `https://<utilizador>.github.io/charneca-verde/`
4. Para usar domínio próprio: crie um ficheiro `CNAME` com
   `www.charnecaverde.pt` lá dentro e aponte o DNS para o GitHub.

### Netlify ou Cloudflare Pages

Arraste a pasta para [app.netlify.com/drop](https://app.netlify.com/drop).
Publica em segundos e dá HTTPS automático. Nenhum comando de build é
necessário — o campo *build command* fica vazio e o *publish directory* é
a raiz.

---

## Estrutura

```
.
├── index.html          página completa (português no HTML)
├── css/styles.css      estilos
├── js/
│   ├── config.js       ← contactos do negócio (editar aqui)
│   ├── i18n.js         ← traduções EN e FR
│   └── main.js         idiomas, menu, formulário, animações
├── assets/             logótipo, favicon, imagem de partilha
├── images/             fotografias dos trabalhos (a preencher)
├── robots.txt
└── sitemap.xml
```

### Como funcionam os idiomas

O português está escrito directamente no HTML — é o que o Google indexa e
é o que aparece mesmo se o JavaScript falhar. As traduções de inglês e
francês vivem no `js/i18n.js`, indexadas por chave:

```html
<h3 data-i18n="svc.lawn.t">Relvados</h3>
```

```js
en: { "svc.lawn.t": "Lawns" },
fr: { "svc.lawn.t": "Pelouses" }
```

Para **mudar um texto em português**, edite o `index.html`.
Para **mudar um texto em inglês ou francês**, edite o `js/i18n.js`.
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
