# Fotografias

Coloque aqui as fotografias reais dos trabalhos. É a alteração que mais
diferença faz no site — fotografia real converte muito melhor do que
imagens de banco.

## O que fotografar

Seis trabalhos chegam para começar. Para cada um:

- **Antes** e **depois** do mesmo ângulo (encoste-se ao mesmo sítio nas duas fotos).
- Luz da manhã ou do fim da tarde. Sol a pico achata tudo.
- Horizontal (paisagem), não vertical.
- Sem pessoas identificáveis, matrículas ou o número da porta do cliente.
- Peça autorização ao proprietário antes de publicar. Um WhatsApp com
  "posso pôr uma foto do jardim no nosso site?" basta e evita problemas.

## Nomes e tamanhos

Guarde como `galeria-1.jpg` … `galeria-6.jpg`, na proporção 4:3,
com cerca de 1200 × 900 px e menos de 250 KB cada (comprima em
[squoosh.app](https://squoosh.app), é gratuito).

## Como pôr no site

No `index.html`, dentro da secção `<!-- ============ GALERIA ============ -->`,
troque o `<div class="ph ...">` de cada figura pela imagem:

```html
<!-- antes -->
<figure class="shot"><div class="ph ph-1" aria-hidden="true"></div><figcaption>…</figcaption></figure>

<!-- depois -->
<figure class="shot">
  <img src="images/galeria-1.jpg" alt="Relvado recuperado numa moradia na Foz do Arelho" loading="lazy" width="1200" height="900">
  <figcaption>…</figcaption>
</figure>
```

O `alt` deve descrever o que se vê, com a localidade — ajuda quem usa
leitor de ecrã e ajuda o Google.

## Fotografia do hero

Se quiser substituir o fundo verde ilustrado do topo por uma fotografia,
guarde-a como `hero.jpg` (cerca de 1920 × 1080 px) e em `css/styles.css`
acrescente ao bloco `.hero-bg`:

```css
.hero-bg { background: url("../images/hero.jpg") center/cover no-repeat; }
.hero-svg { display: none; }
```
