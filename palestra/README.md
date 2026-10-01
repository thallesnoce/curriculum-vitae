# 🎤 Palestra — Montagem de Currículo Competitivo

Material completo de uma palestra de **20 a 30 minutos** para universitários em busca de estágio ou primeiro emprego em TI, construída sobre os guias deste repositório.

| Arquivo | O que é |
|---|---|
| [`Palestra_Curriculo_Competitivo.pptx`](./Palestra_Curriculo_Competitivo.pptx) | 18 slides, com roteiro resumido nas notas de cada slide |
| [`Roteiro_Palestrante.md`](./Roteiro_Palestrante.md) | Cronograma minuto a minuto, falas-chave, interações, perguntas frequentes e plano B de tempo |
| [`Handout_Checklist.md`](./Handout_Checklist.md) | Material de 2 páginas para distribuir à plateia |
| [`build_deck.js`](./build_deck.js) | Script que gera o `.pptx` (edite aqui e regenere, em vez de editar slide a slide) |

## Estrutura da palestra

1. **Quem lê o seu currículo** — o ATS e o recrutador, e por que os dois precisam dizer sim
2. **A anatomia de uma página** — ordem das seções, formatação e dados de contato
3. **Antes e depois** — os 7 erros, corrigidos em um currículo real de estudante
4. **A fórmula do bullet** — verbo de ação + o que você fez + o que mudou
5. **Checklist e entrega**

O estudo de caso usa os dois modelos da raiz do repositório: [`Nome_Sobrenome_Curriculo - Errado.docx`](../Nome_Sobrenome_Curriculo%20-%20Errado.docx) e [`Nome_Sobrenome_Curriculo.docx`](../Nome_Sobrenome_Curriculo.docx).

## Regerar os slides

```bash
npm install pptxgenjs
node build_deck.js Palestra_Curriculo_Competitivo.pptx
```
