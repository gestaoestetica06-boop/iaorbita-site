# ÓRBITA · site

Site da ÓRBITA, publicado em https://www.iaorbita.com.br pelo GitHub Pages.

- `index.html` é a página inteira (HTML, CSS e JS num arquivo só).
- `assets/` guarda os filmes do planetário, as imagens e a fonte Mona Sans.
- O filme do topo está em duas partes (`assets/media/hero.mp4.parte1` e `.parte2`) por causa do limite de envio pelo navegador.
  A publicação (`.github/workflows/publicar.yml`) junta as partes, confere a soma SHA-256 e publica a pasta montada.

Cada alteração enviada para a branch `main` publica o site de novo em cerca de um minuto.
