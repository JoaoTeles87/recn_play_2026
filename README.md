# 🚀 Panfleto Virtual Interativo | REC'n'Play 2026 (11 de Novembro)
### Guia Independente Mobile-First de Saúde, Gestão e Negócios no Bairro do Recife

> ⚠️ **AVISO DE TRANSPARÊNCIA INSTITUCIONAL:**  
> Este aplicativo é uma iniciativa independente e colaborativa desenvolvida para apoiar profissionais, tomadores de decisão, founders e visitantes das áreas de Saúde, Gestão e Negócios. **Não constitui canal oficial de comunicação da organização do festival REC'n'Play ou do Porto Digital.**

---

## 🗺️ Planejador de Rotas a Pé (Origem e Destino para Smartphone)

Inspirado na referência de experiência do usuário da **HospitalMed**, o aplicativo conta com o mapa oficial do evento e rotas a pé dinâmicas desenhadas sobre o arruamento histórico do Recife Antigo:

1. **Seleção de Origem e Destino com Experiência de Smartphone:**
   - **Campo Origem (De onde você sai):** Selecione qualquer prédio do festival (ex: *Prédio 18 - Edifício NERD*, *Prédio 07 - Ti.Saúde*, *Marco Zero*, *Posto Médico*, etc.).
   - **Campo Destino (Para onde você vai):** Escolha o polo ou auditório desejado.
   - **Botão Inverter (⇅):** Troque rapidamente o ponto de partida e chegada com um toque.
   - **Atalhos Rápidos de Rotas Frequentes do Dia 11:**
     - ⚡ *NERD (18) ➔ Moinho Recife (26)* (TDC Stage - IA no SUS)
     - ⚡ *Marco Zero ➔ Edifício NERD (18)*
     - ⚡ *NERD (18) ➔ Ti.Saúde (07)* (Saúde Mental no Trabalho)
     - ⚡ *NERD (18) ➔ CESAR School (14)* (Saúde e Longevidade 60+)
     - ⚡ *NERD (18) ➔ Posto Médico Sul (PS)*

2. **Cálculo de Deslocamento a Pé em Tempo Real:**
   - Tempo estimado de caminhada em minutos (ex: `🚶 4 min de caminhada`).
   - Distância aproximada em metros (ex: `📍 320 metros`).
   - Traçado dinâmico em linha pontilhada animada (ciano `#06b6d4`) desenhado diretamente sobre as esquinas reais das ruas do bairro.

3. **Posicionamento Real dos Polos no Mapa (1024 x 576 px):**
   - **Prédio 18 (Arena Pernambuco de Negócios – Edifício NERD):** Localizado no **canto inferior esquerdo** (`x: 27.2%`, `y: 64.8%`), próximo aos polos A15, A16 e Prédio 19. É o ponto de encontro principal das startups e healthtechs expositoras.
   - **Prédio 26 (Moinho Recife - TDC Stage):** Localizado no **canto inferior direito** (`x: 91.5%`, `y: 53.0%`), palco de debates essenciais como *IA no SUS (Absens / Beyond Co.)*.
   - **Prédio 28 (Accenture Innovation Center):** No rodapé centro-esquerdo (`x: 28.5%`, `y: 78.5%`), próximo aos armazéns.
   - **Prédio 07 (Ti.Saúde):** Na parte superior esquerda (`x: 32.2%`, `y: 35.0%`), polo de saúde mental no trabalho.
   - **Prédio 08 (ETE Porto Digital):** No topo centro-esquerda (`x: 36.5%`, `y: 31.0%`), deep techs e ciência.
   - **Prédio 14 e 15 (CESAR School):** No topo centro-direita e extrema direita (`x: 69.5%` e `83.8%`).
   - **Prédio 16 (Moeda 50):** No canto inferior esquerdo (`x: 22.3%`, `y: 63.5%`), longevidade e moradia 60+.
   - **Postos Médicos (PS):** Posto Médico Sul (`x: 21.0%`, `y: 69.0%`) e Posto Médico Norte (`x: 66.5%`, `y: 63.5%`).

4. **Balão Informativo Fiel à Referência:**
   - Pop-up com fundo escuro, crachá `PRÉDIOS` em destaque e código numérico do prédio, exatamente no padrão visual do app da referência, com botões diretos "Partir daqui (Origem)" e "Ir para cá (Destino)".

5. **Navegação Inferior Fixa:**
   - Botões com ergonomia de toque: `[ 🔍 BUSCAR / FILTRAR ]` e `[ ✕ LIMPAR ]`.

6. **Consulta Pública da Base de Dados (`/#docs` ou `/docs`):**
   - Transparência total com visualizador dos arquivos `.md` brutos e formatados.

---

## 🛠️ Tecnologias e Deploy

- **React 18 + Vite 6 + Tailwind CSS**
- **react-zoom-pan-pinch** para Arrastar e Zoom fluido
- **PWA Ready:** Web App Manifest e meta tags Open Graph
- **Vercel:** Arquivo `vercel.json` configurado para SPA rewrites.

```bash
npm install
npm run build
```
