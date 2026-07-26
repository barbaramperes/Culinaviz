/* =========================================================
   Charneca Verde — dados do negócio
   ---------------------------------------------------------
   ESTE É O ÚNICO FICHEIRO QUE PRECISA DE EDITAR PARA PÔR OS
   CONTACTOS REAIS. Altere os valores abaixo e todo o site
   (cabeçalho, contactos, rodapé e barra do telemóvel) é
   atualizado automaticamente.
   ========================================================= */

window.CV_CONFIG = {

  /* Telefone em formato internacional, sem espaços — usado no link "ligar". */
  telefone: "+351000000000",

  /* O mesmo telefone como quer que apareça escrito no site. */
  telefoneVisivel: "+351 000 000 000",

  /* Número de WhatsApp: só dígitos, com indicativo do país e sem "+". */
  whatsapp: "351000000000",

  /* Mensagem já preenchida quando alguém abre a conversa de WhatsApp. */
  whatsappMensagem: {
    pt: "Olá! Gostaria de pedir um orçamento para o meu jardim.",
    en: "Hello! I'd like to request a quote for my garden.",
    fr: "Bonjour ! Je souhaiterais un devis pour mon jardin."
  },

  email: "geral@charnecaverde.pt",

  /* Deixe vazio ("") para esconder a morada. */
  morada: "Caldas da Rainha, Leiria",

  /* -------------------------------------------------------
     Para onde vai o formulário de orçamento.

     "whatsapp" — abre o WhatsApp com o pedido já escrito.
                  Não precisa de conta nem de servidor. É o
                  modo atual e o que funciona no Cloudflare
                  Pages sem mais nada.

     "email"    — abre o programa de email do visitante com o
                  pedido já escrito. Alternativa se não usar
                  WhatsApp no negócio.

     "servidor" — envia em segundo plano para o endereço
                  indicado em formularioUrl (Formspree ou
                  equivalente). Só escolha isto depois de ter
                  esse endereço.
     ------------------------------------------------------- */
  formularioModo: "whatsapp",

  /* Usado apenas quando formularioModo é "servidor". */
  formularioUrl: ""
};
