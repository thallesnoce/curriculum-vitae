// Gera a apresentação "Montagem de Currículo Competitivo"
const pptxgen = require('pptxgenjs');
const path = require('path');

const OUT = process.argv[2] || path.join(__dirname, 'Palestra_Curriculo_Competitivo.pptx');

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE'; // 13.333 x 7.5
pres.title = 'Montagem de Currículo Competitivo';
pres.author = 'Thalles Noce';
pres.subject = 'Palestra para universitários — 20 a 30 minutos';

const W = 13.333;
const C = {
  ink: '14213D',
  ink2: '1D2E50',
  inkCard: '27395C',
  amber: 'FCA311',
  amberDark: '9A5B00',
  paper: 'FFFFFF',
  mist: 'EDF1F7',
  line: 'D7DFEC',
  grey: '515C70',
  greyL: '7D879B',
  ice: 'C3CFE4',
  red: 'B5121B',
  redSoft: 'FBEDEC',
  green: '1B7046',
  greenSoft: 'EAF4EE',
};
const F = { head: 'Cambria', body: 'Calibri' };

const sh = () => ({ type: 'outer', blur: 10, offset: 1, angle: 90, color: '8A93A6', opacity: 0.22 });

function card(s, x, y, w, h, opt) {
  opt = opt || {};
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.07,
    fill: { color: opt.fill || C.mist },
    line: { color: opt.line || opt.fill || C.mist, width: 1 },
    shadow: opt.shadow === false ? undefined : sh(),
  });
}

function badge(s, n, x, y, d, fill, col) {
  d = d || 0.46;
  s.addShape(pres.ShapeType.ellipse, { x, y, w: d, h: d, fill: { color: fill || C.amber } });
  s.addText(String(n), {
    x, y, w: d, h: d, align: 'center', valign: 'middle', margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: d > 0.5 ? 16 : 14, bold: true, color: col || C.ink,
  });
}

function pill(s, text, x, y, w, fill) {
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h: 0.32, rectRadius: 0.16, fill: { color: fill } });
  s.addText(text, {
    x, y, w, h: 0.32, align: 'center', valign: 'middle', margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 11, bold: true, charSpacing: 1.6, color: 'FFFFFF',
  });
}

function slideHead(s, kicker, title, dark) {
  if (kicker) {
    s.addText(kicker, {
      x: 0.6, y: 0.42, w: 12.1, h: 0.3, margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 11, bold: true, charSpacing: 2.4,
      color: dark ? C.amber : C.amberDark,
    });
  }
  s.addText(title, {
    x: 0.6, y: 0.72, w: 12.1, h: 0.8, margin: 0, isTextBox: true,
    fontFace: F.head, fontSize: 33, bold: true, color: dark ? 'FFFFFF' : C.ink,
  });
}

// anel decorativo (motivo visual recorrente nos slides escuros)
function ring(s, x, y, d, color, width) {
  s.addShape(pres.ShapeType.ellipse, {
    x, y, w: d, h: d, fill: { color: C.ink, transparency: 100 },
    line: { color: color || C.amber, width: width || 2 },
  });
}

function bodyList(s, items, x, y, w, h, opt) {
  opt = opt || {};
  s.addText(
    items.map((t, i) => ({
      text: t,
      options: { bullet: true, breakLine: i !== items.length - 1 },
    })),
    {
      x, y, w, h, margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: opt.fontSize || 14, color: opt.color || C.grey,
      lineSpacing: opt.lineSpacing || 19, paraSpaceAfter: opt.paraSpaceAfter || 8,
    }
  );
}

/* ---------------------------------------------------------------- 1. Capa */
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  ring(s, 10.1, 0.9, 3.9);
  ring(s, 11.3, 4.4, 2.3, C.ink2, 10);
  s.addShape(pres.ShapeType.ellipse, { x: 11.75, y: 2.5, w: 0.5, h: 0.5, fill: { color: C.amber } });

  s.addText('PALESTRA · 25 MINUTOS', {
    x: 0.8, y: 1.75, w: 8.6, h: 0.3, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 12, bold: true, charSpacing: 3, color: C.amber,
  });
  s.addText('Montagem de\nCurrículo Competitivo', {
    x: 0.78, y: 2.15, w: 9.2, h: 2.0, margin: 0, isTextBox: true,
    fontFace: F.head, fontSize: 44, bold: true, color: 'FFFFFF', lineSpacing: 52,
  });
  s.addText('Como passar pelo filtro da máquina e pelos primeiros segundos do recrutador — em uma página.', {
    x: 0.8, y: 4.35, w: 8.3, h: 0.8, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 17, color: C.ice, lineSpacing: 24,
  });
  s.addText([
    { text: 'Thalles Noce', options: { bold: true, color: 'FFFFFF' } },
    { text: '   ·   github.com/thallesnoce/curriculum-vitae', options: { color: C.amber } },
  ], {
    x: 0.8, y: 6.35, w: 10, h: 0.35, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 13,
  });
  s.addNotes(
    'Abertura (1 min). Pergunta para a sala: quem já enviou currículo e nunca recebeu resposta? ' +
    'Combine a promessa: em 25 minutos você sai com uma página revisada e um checklist. ' +
    'Diga que tudo está no repositório — eles não precisam copiar slide.'
  );
}

/* ------------------------------------------------- 2. Números/regras base */
{
  const s = pres.addSlide();
  slideHead(s, 'POR QUE ISSO IMPORTA', 'Quatro números para começar');

  const stats = [
    ['≈7s', 'é o tempo da primeira\ntriagem do recrutador'],
    ['1', 'página, no máximo —\nsempre'],
    ['1', 'telefone de contato\n(WhatsApp serve)'],
    ['0', 'fotos no currículo'],
  ];
  stats.forEach((st, i) => {
    const x = 0.53 + i * 3.15;
    card(s, x, 2.15, 2.8, 3.05, { fill: i === 0 ? C.ink : C.mist });
    s.addText(st[0], {
      x, y: 2.6, w: 2.8, h: 1.2, align: 'center', valign: 'middle', margin: 0, isTextBox: true,
      fontFace: F.head, fontSize: 52, bold: true, color: i === 0 ? C.amber : C.ink,
    });
    s.addText(st[1], {
      x: x + 0.22, y: 3.95, w: 2.36, h: 1.0, align: 'center', margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 13.5, color: i === 0 ? C.ice : C.grey, lineSpacing: 18,
    });
  });

  s.addText('O resto da palestra é só consequência desses quatro: clareza antes de criatividade.', {
    x: 0.6, y: 5.6, w: 12.1, h: 0.4, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 16, italic: true, color: C.ink2,
  });
  s.addText('≈7s: estudo de eye-tracking com recrutadores (The Ladders). Trate como ordem de grandeza, não como lei.', {
    x: 0.6, y: 6.5, w: 12.1, h: 0.3, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 10, color: C.greyL,
  });
  s.addNotes(
    'Tempo: 2 min. Os números servem de âncora — volte a eles no checklist do final. ' +
    'Sobre o ≈7s: é um estudo de eye-tracking, apresente como ordem de grandeza ("segundos, não minutos"). ' +
    'O ponto do "0 fotos": no Brasil a foto abre espaço para viés e não agrega nada técnico.'
  );
}

/* ----------------------------------------------------------- 3. Roteiro */
{
  const s = pres.addSlide();
  slideHead(s, 'AGENDA', 'O caminho de hoje');

  const rows = [
    ['Quem lê o seu currículo', 'Dois leitores muito diferentes: o sistema (ATS) e a pessoa com pressa.'],
    ['A anatomia de uma página', 'A ordem das seções, a formatação e os dados de contato que importam.'],
    ['Antes e depois, de verdade', 'Um currículo real de estudante, corrigido erro por erro.'],
  ];
  rows.forEach((r, i) => {
    const y = 2.0 + i * 1.42;
    badge(s, i + 1, 0.62, y + 0.06, 0.56);
    s.addText(r[0], {
      x: 1.42, y, w: 7.0, h: 0.4, margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 20, bold: true, color: C.ink,
    });
    s.addText(r[1], {
      x: 1.42, y: y + 0.42, w: 7.0, h: 0.6, margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 14, color: C.grey, lineSpacing: 19,
    });
  });

  card(s, 8.95, 1.95, 3.78, 4.3, { fill: C.ink });
  s.addText('O que você leva daqui', {
    x: 9.3, y: 2.3, w: 3.1, h: 0.35, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 15, bold: true, color: C.amber,
  });
  bodyList(s, [
    'Um checklist de 16 itens para rodar antes de enviar',
    'A fórmula de bullet que troca adjetivo por evidência',
    'O repositório com os dois modelos: o errado e o certo',
  ], 9.3, 2.8, 3.1, 2.9, { fontSize: 13.5, color: 'FFFFFF', lineSpacing: 18, paraSpaceAfter: 12 });
  s.addNotes(
    'Tempo: 1 min. Não leia a agenda item por item — aponte os três blocos e vá embora. ' +
    'Reforce o quadro da direita: é o compromisso da palestra.'
  );
}

/* ------------------------------------------------------- 4. Dois leitores */
{
  const s = pres.addSlide();
  slideHead(s, 'BLOCO 1', 'Seu currículo tem dois leitores');

  card(s, 0.6, 1.9, 5.85, 3.95, { fill: C.mist });
  badge(s, '1º', 0.95, 2.2, 0.62);
  s.addText('A máquina (ATS)', {
    x: 1.75, y: 2.28, w: 4.4, h: 0.4, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 21, bold: true, color: C.ink,
  });
  bodyList(s, [
    'Lê texto, não design: tabelas, colunas e caixas viram sopa de letras.',
    'Procura as palavras-chave da vaga. O que não está escrito, não existe.',
    'Gosta de seção com nome óbvio, uma coluna e arquivo simples.',
  ], 1.05, 3.05, 5.05, 2.6);

  card(s, 6.88, 1.9, 5.85, 3.95, { fill: C.mist });
  badge(s, '2º', 7.23, 2.2, 0.62);
  s.addText('O humano (recrutador)', {
    x: 8.03, y: 2.28, w: 4.4, h: 0.4, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 21, bold: true, color: C.ink,
  });
  bodyList(s, [
    'Bate o olho no topo: nome, objetivo, formação, última experiência.',
    'Procura motivo para eliminar — foto, três páginas, erro de português.',
    'Quer evidência: o que você fez e o que mudou por causa disso.',
  ], 7.33, 3.05, 5.05, 2.6);

  card(s, 0.6, 6.1, 12.13, 0.78, { fill: C.ink });
  s.addText('Os dois precisam dizer "sim". Um currículo bonito que o ATS não lê é um currículo que ninguém leu.', {
    x: 0.9, y: 6.1, w: 11.5, h: 0.78, valign: 'middle', margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 15, color: 'FFFFFF',
  });
  s.addNotes(
    'Tempo: 2 min. Conte que muitas empresas usam ATS e que o currículo é lido como texto puro. ' +
    'Exemplo prático: pedir para alguém da sala descrever o que ela olha primeiro em um currículo. ' +
    'Conclusão: design serve à leitura, não o contrário.'
  );
}

/* ---------------------------------------------------- 5. A pergunta-chave */
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  ring(s, 11.9, -0.8, 2.9);
  slideHead(s, 'O CRITÉRIO', 'Seu currículo responde uma pergunta só:', true);
  s.addText('“Por que você, para ESTA vaga?”', {
    x: 0.6, y: 1.62, w: 12.1, h: 0.75, margin: 0, isTextBox: true,
    fontFace: F.head, fontSize: 31, bold: true, italic: true, color: C.amber,
  });

  const cols = [
    ['FIT', 'Você é para esta vaga?', 'O objetivo ao lado do nome responde isso no primeiro segundo. Um currículo genérico não serve para vaga nenhuma.'],
    ['CLAREZA', 'Dá para ler em segundos?', 'Uma página, uma coluna, seções com nomes óbvios e ordem previsível. Nada de caça ao tesouro.'],
    ['EVIDÊNCIA', 'Dá para acreditar?', 'Cada linha mostra ação e resultado. "Proativo" é adjetivo; "reduzi retrabalho" é evidência.'],
  ];
  cols.forEach((c, i) => {
    const x = 0.6 + i * 4.12;
    card(s, x, 2.75, 3.85, 3.5, { fill: C.inkCard, line: '3A4D74' });
    s.addText(c[0], {
      x: x + 0.32, y: 3.05, w: 3.2, h: 0.3, margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 12, bold: true, charSpacing: 2.4, color: C.amber,
    });
    s.addText(c[1], {
      x: x + 0.32, y: 3.45, w: 3.2, h: 0.75, margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 19, bold: true, color: 'FFFFFF', lineSpacing: 24,
    });
    s.addText(c[2], {
      x: x + 0.32, y: 4.35, w: 3.2, h: 1.7, margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 13.5, color: C.ice, lineSpacing: 19,
    });
  });
  s.addNotes(
    'Tempo: 2 min. Este é o slide-conceito da palestra: tudo depois disso é execução. ' +
    'Frase para repetir: "currículo não é autobiografia, é candidatura". ' +
    'Peça que cada um pense na vaga que quer — vão usar isso no resto da palestra.'
  );
}

/* --------------------------------------------------- 6. Anatomia da página */
{
  const s = pres.addSlide();
  slideHead(s, 'BLOCO 2', 'A anatomia de uma página');

  const items = [
    ['Nome + Objetivo', 'o cargo ao lado do nome'],
    ['Dados de contato', '1 telefone, 1 email, LinkedIn'],
    ['Resumo profissional', '3 ou 4 linhas, sem clichê'],
    ['Palavras-chave', 'é aqui que o ATS te acha'],
    ['Formação acadêmica', 'vem ANTES da experiência'],
    ['Experiência profissional', 'do mais recente para o mais antigo'],
    ['Certificações e cursos', 'com carga horária, quando houver'],
    ['Interesses e atividades', 'o que te diferencia dos iguais'],
  ];
  items.forEach((it, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i % 4;
    const x = 0.6 + col * 6.28;
    const y = 1.95 + row * 1.08;
    card(s, x, y, 5.85, 0.9, { fill: C.mist, shadow: false });
    badge(s, i + 1, x + 0.22, y + 0.22, 0.46);
    s.addText(it[0], {
      x: x + 0.86, y: y + 0.13, w: 4.8, h: 0.33, margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 16, bold: true, color: C.ink,
    });
    s.addText(it[1], {
      x: x + 0.86, y: y + 0.47, w: 4.8, h: 0.3, margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 12.5, color: C.grey,
    });
  });
  s.addText('Formação antes de experiência é a escolha certa para quem ainda estuda: é o seu ativo mais forte.', {
    x: 0.6, y: 6.5, w: 12.1, h: 0.35, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 14, italic: true, color: C.ink2,
  });
  s.addNotes(
    'Tempo: 2 min. Percorra a ordem rapidamente e pare em dois pontos: (4) palavras-chave e (5) formação antes de experiência. ' +
    'Diga que a ordem é previsível de propósito: o recrutador sabe onde olhar sem procurar.'
  );
}

/* ----------------------------------------------------- 7. Formatação base */
{
  const s = pres.addSlide();
  slideHead(s, 'FORMATAÇÃO', 'O que não se negocia');

  const g = [
    ['Fonte', 'Arial, 10 ou 12pt. Uma só, em todo o documento.'],
    ['Uniformidade', 'Mesmo tamanho do início ao fim. Título não precisa ser gigante.'],
    ['Espaçamento', 'Sem buracos entre seções. Use indentação para separar.'],
    ['Alinhamento', 'Um padrão só, do começo ao fim — sem alternar no meio.'],
    ['Extensão', '1 página. Mesmo com muita experiência: o resto vive no LinkedIn.'],
    ['Foto', 'Não inclua. Nem no cabeçalho, nem no canto.'],
  ];
  g.forEach((it, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.6 + col * 4.12;
    const y = 2.0 + row * 2.28;
    const last = i === 5;
    card(s, x, y, 3.85, 2.0, { fill: last ? C.ink : C.mist });
    s.addText(it[0], {
      x: x + 0.3, y: y + 0.28, w: 3.25, h: 0.4, margin: 0, isTextBox: true,
      fontFace: F.head, fontSize: 21, bold: true, color: last ? C.amber : C.ink,
    });
    s.addText(it[1], {
      x: x + 0.3, y: y + 0.82, w: 3.25, h: 1.0, margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 14, color: last ? 'FFFFFF' : C.grey, lineSpacing: 19,
    });
  });
  s.addNotes(
    'Tempo: 2 min. Slide rápido — é regra, não debate. Observação: o guia do repositório recomenda alinhamento à direita; ' +
    'o essencial para a plateia é consistência, então explique em voz alta a sua preferência e por quê. ' +
    'Sobre "1 página": antecipe a objeção de quem tem experiência — a resposta é curadoria, não fonte 8.'
  );
}

/* ------------------------------------------------------------ 8. Contato */
{
  const s = pres.addSlide();
  slideHead(s, 'DADOS DE CONTATO', 'Menos informação, mais resposta');

  card(s, 0.6, 1.85, 5.85, 2.95, { fill: C.greenSoft, line: 'CFE3D7' });
  pill(s, 'INCLUA', 0.92, 2.12, 1.5, C.green);
  bodyList(s, [
    'Um telefone só (WhatsApp serve)',
    'Email profissional com o seu nome',
    'LinkedIn escrito por extenso',
    'Cidade e estado, se ajudar na vaga',
  ], 0.95, 2.72, 5.15, 1.9, { color: '1C3B2A' });

  card(s, 6.88, 1.85, 5.85, 2.95, { fill: C.redSoft, line: 'F0D5D3' });
  pill(s, 'DEIXE DE FORA', 7.2, 2.12, 2.2, C.red);
  bodyList(s, [
    'Endereço completo e CEP',
    'Estado civil e documentos',
    'Foto',
    'O segundo e o terceiro telefone',
  ], 7.23, 2.72, 5.15, 1.9, { color: '4A1A1A' });

  card(s, 0.6, 5.05, 12.13, 1.6, { fill: C.ink });
  s.addText('linkedin.com/in/seu-nome', {
    x: 0.95, y: 5.3, w: 5.2, h: 0.45, margin: 0, isTextBox: true,
    fontFace: F.head, fontSize: 22, bold: true, color: C.amber,
  });
  s.addText('Por extenso, não como link clicável.', {
    x: 0.95, y: 5.82, w: 5.2, h: 0.35, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 14, color: 'FFFFFF',
  });
  bodyList(s, [
    'Sobrevive à impressão em papel',
    'Você customiza a URL e ela fica profissional',
    'Qualquer pessoa consegue digitar e chegar',
  ], 6.5, 5.28, 5.9, 1.2, { fontSize: 13, color: C.ice, lineSpacing: 17, paraSpaceAfter: 2 });
  s.addNotes(
    'Tempo: 2 min. Pergunta para a sala: quantos têm a URL do LinkedIn personalizada? Normalmente poucos — ' +
    'mostre que leva 30 segundos (Perfil > Editar URL pública). ' +
    'Sobre email: evite apelido, número de nascimento e provedor abandonado.'
  );
}

/* ------------------------------------------------- 9. Divisor estudo de caso */
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  ring(s, 9.9, 1.1, 4.2);
  ring(s, 11.4, 4.9, 2.0, C.ink2, 10);

  s.addText('BLOCO 3 · ESTUDO DE CASO', {
    x: 0.8, y: 2.1, w: 8.6, h: 0.3, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 12, bold: true, charSpacing: 3, color: C.amber,
  });
  s.addText('O mesmo candidato,\ndois currículos', {
    x: 0.78, y: 2.5, w: 8.8, h: 1.8, margin: 0, isTextBox: true,
    fontFace: F.head, fontSize: 40, bold: true, color: 'FFFFFF', lineSpacing: 48,
  });
  s.addText('José Maria, 18 anos, estudante de Análise e Desenvolvimento de Sistemas. Experiência: auxiliar administrativo, pizzaiolo e atendente. Mesmos fatos, duas leituras completamente diferentes.', {
    x: 0.8, y: 4.5, w: 8.5, h: 1.2, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 16, color: C.ice, lineSpacing: 23,
  });
  s.addNotes(
    'Tempo: 30 s. Transição. Diga que os dois arquivos estão no repositório e que vocês vão comparar pedaço por pedaço. ' +
    'Se houver projetor bom, vale abrir os dois .docx lado a lado em vez de só mostrar os slides.'
  );
}

/* ------------------------------------------- 10. Erro 1 e 2: o cabeçalho */
{
  const s = pres.addSlide();
  slideHead(s, 'ERRO 1 E 2', 'O cabeçalho entrega (ou esconde) a vaga');

  // ANTES
  card(s, 0.6, 1.85, 5.85, 4.4, { fill: C.mist });
  pill(s, 'ANTES', 0.92, 2.12, 1.4, C.red);
  card(s, 0.92, 2.6, 5.2, 1.85, { fill: C.paper, line: C.line });
  s.addText('José Maria Da Silva Santos\nTelefone: (31) 9 9xxx\nEmail: xxxx@gmail.com - LinkedIn\nNacionalidade: Brasileira - Idade: 18 anos', {
    x: 1.1, y: 2.78, w: 4.85, h: 1.5, margin: 0, isTextBox: true,
    fontFace: 'Arial', fontSize: 11.5, color: '333333', lineSpacing: 17,
  });
  bodyList(s, [
    'Nome sozinho: nada diz a que vaga ele concorre',
    '"LinkedIn" sem URL — não dá para chegar ao perfil',
    'Contato e dados pessoais amontoados na mesma linha',
  ], 0.95, 4.6, 5.15, 1.5, { fontSize: 13, color: C.red, lineSpacing: 17, paraSpaceAfter: 5 });

  // DEPOIS
  card(s, 6.88, 1.85, 5.85, 4.4, { fill: C.mist });
  pill(s, 'DEPOIS', 7.2, 2.12, 1.5, C.green);
  card(s, 7.2, 2.6, 5.2, 1.85, { fill: C.paper, line: C.line });
  s.addText('José Maria Da Silva Santos  —  Estágio em Análise e Desenvolvimento de Sistemas\nTelefone: (31) 9 9xxx (WhatsApp)\nEmail: xxxx@gmail.com\nLinkedIn: linkedin.com/in/xxxx', {
    x: 7.38, y: 2.78, w: 4.85, h: 1.5, margin: 0, isTextBox: true,
    fontFace: 'Arial', fontSize: 11.5, color: '333333', lineSpacing: 17,
  });
  bodyList(s, [
    'Objetivo ao lado do nome: a vaga aparece em 1 segundo',
    'URL completa, digitável e que sobrevive à impressão',
    'Um telefone, um email, uma linha para cada coisa',
  ], 7.23, 4.6, 5.15, 1.5, { fontSize: 13, color: C.green, lineSpacing: 17, paraSpaceAfter: 5 });
  s.addNotes(
    'Tempo: 2 min. Mostre o contraste do topo: é o pedaço que todo recrutador lê. ' +
    'Pergunta retórica: se cinco currículos chegam juntos, qual deles o recrutador consegue classificar sem abrir?'
  );
}

/* ----------------------------------------- 11. Erro 3: palavras-chave */
{
  const s = pres.addSlide();
  slideHead(s, 'ERRO 3', 'Sem palavras-chave, o ATS não te encontra');

  card(s, 0.6, 1.85, 5.85, 2.75, { fill: C.mist });
  pill(s, 'ANTES', 0.92, 2.12, 1.4, C.red);
  card(s, 0.92, 2.6, 5.2, 0.95, { fill: C.paper, line: C.line });
  s.addText('(a seção não existe)', {
    x: 1.1, y: 2.6, w: 4.85, h: 0.95, valign: 'middle', margin: 0, isTextBox: true,
    fontFace: 'Arial', fontSize: 12, italic: true, color: '8A8A8A',
  });
  s.addText('Nenhuma tecnologia escrita em lugar nenhum. Para a busca do recrutador, esse candidato não programa.', {
    x: 0.95, y: 3.72, w: 5.15, h: 0.7, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 13, color: C.red, lineSpacing: 17,
  });

  card(s, 6.88, 1.85, 5.85, 2.75, { fill: C.mist });
  pill(s, 'DEPOIS', 7.2, 2.12, 1.5, C.green);
  card(s, 7.2, 2.6, 5.2, 0.95, { fill: C.paper, line: C.line });
  s.addText('Palavras-chave:\nLinguagens de Programação: C#, C, Python', {
    x: 7.38, y: 2.72, w: 4.85, h: 0.75, margin: 0, isTextBox: true,
    fontFace: 'Arial', fontSize: 11.5, color: '333333', lineSpacing: 17,
  });
  s.addText('Duas linhas resolvem. Agora ele aparece na busca por "C#", por "Python" e por "estágio desenvolvimento".', {
    x: 7.23, y: 3.72, w: 5.15, h: 0.7, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 13, color: C.green, lineSpacing: 17,
  });

  card(s, 0.6, 4.85, 12.13, 1.7, { fill: C.ink });
  s.addText('Onde achar as palavras-chave? No anúncio da vaga.', {
    x: 0.95, y: 5.08, w: 11.5, h: 0.4, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 18, bold: true, color: C.amber,
  });
  s.addText('Leia a descrição, liste os termos técnicos que você realmente domina e use as mesmas palavras que a empresa usou. "Banco de dados relacional" e "SQL" não são a mesma busca. Nunca escreva o que não sabe: isso aparece na entrevista.', {
    x: 0.95, y: 5.55, w: 11.4, h: 0.85, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 14, color: 'FFFFFF', lineSpacing: 19,
  });
  s.addNotes(
    'Tempo: 2.5 min. Faça ao vivo: abra uma vaga de estágio no LinkedIn e marque os termos. ' +
    'Reforce a honestidade: palavra-chave inflada volta como pergunta técnica na entrevista. ' +
    'Dica: nível de domínio ajuda (básico/intermediário/avançado) quando é honesto.'
  );
}

/* --------------------------------------------- 12. Erro 4: cronologia */
{
  const s = pres.addSlide();
  slideHead(s, 'ERRO 4', 'A ordem errada enterra o que importa');

  const antes = [['Fev 2018 – Dez 2019', 'Pizzaiolo'], ['Mar – Ago 2019', 'Atendente (freelancer)'], ['Mai 2022 – Set 2023', 'Auxiliar Administrativo']];
  const depois = [['Mai 2022 – Set 2023', 'Auxiliar Administrativo'], ['Mar – Ago 2019', 'Atendente (freelancer)'], ['Fev 2018 – Dez 2019', 'Pizzaiolo']];

  function timeline(x, title, data, color, pillColor) {
    card(s, x, 1.85, 5.85, 3.6, { fill: C.mist });
    pill(s, title, x + 0.32, 2.12, title === 'ANTES' ? 1.4 : 1.5, pillColor);
    data.forEach((d, i) => {
      const y = 2.62 + i * 0.85;
      card(s, x + 0.32, y, 5.2, 0.72, { fill: C.paper, line: C.line, shadow: false });
      s.addText(d[0], {
        x: x + 0.5, y: y + 0.08, w: 2.1, h: 0.56, valign: 'middle', margin: 0, isTextBox: true,
        fontFace: F.body, fontSize: 12, bold: true, color: color,
      });
      s.addText(d[1], {
        x: x + 2.6, y: y + 0.08, w: 2.8, h: 0.56, valign: 'middle', margin: 0, isTextBox: true,
        fontFace: F.body, fontSize: 13, color: C.ink,
      });
    });
  }
  timeline(0.6, 'ANTES', antes, C.red, C.red);
  timeline(6.88, 'DEPOIS', depois, C.green, C.green);

  s.addText('Ordem crescente: o recrutador vê primeiro o emprego menos relevante.', {
    x: 0.92, y: 5.6, w: 5.3, h: 0.4, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 13.5, color: C.red, lineSpacing: 18,
  });
  s.addText('Ordem decrescente: a experiência mais recente — e mais próxima da vaga — primeiro.', {
    x: 7.2, y: 5.6, w: 5.3, h: 0.5, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 13.5, color: C.green, lineSpacing: 18,
  });
  s.addText('Vale para formação também. E se houver um intervalo longo sem nada: contextualize em uma linha — o recrutador vai notar de qualquer forma.', {
    x: 0.6, y: 6.45, w: 12.1, h: 0.4, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 13.5, italic: true, color: C.ink2,
  });
  s.addNotes(
    'Tempo: 1.5 min. Mostre que ninguém lê currículo até o fim — então o topo precisa ser o melhor. ' +
    'Sobre gaps: não invente, contextualize ("dedicação integral aos estudos", "cuidado familiar", "transição de carreira").'
  );
}

/* -------------------------------- 13. Erros 5 e 6: detalhes que custam */
{
  const s = pres.addSlide();
  slideHead(s, 'ERRO 5 E 6', 'Dois detalhes que custam a entrevista');

  // Caso A
  card(s, 0.6, 1.85, 5.85, 4.4, { fill: C.mist });
  badge(s, 5, 0.92, 2.12, 0.5);
  s.addText('Empresa e cargo embolados', {
    x: 1.56, y: 2.14, w: 4.6, h: 0.4, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 18, bold: true, color: C.ink,
  });
  card(s, 0.92, 2.78, 5.2, 0.8, { fill: C.paper, line: C.line });
  s.addText('Hospital São JoãoPizzaiolo | Fevereiro 2018 – Dezembro 2019', {
    x: 1.1, y: 2.78, w: 4.85, h: 0.8, valign: 'middle', margin: 0, isTextBox: true,
    fontFace: 'Arial', fontSize: 11.5, color: '333333', lineSpacing: 16,
  });
  s.addText('Quem lê entende que você foi pizzaiolo no hospital.', {
    x: 0.95, y: 3.72, w: 5.15, h: 0.4, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 13, bold: true, color: C.red,
  });
  s.addText('Empresa em uma linha, cargo e período na linha de baixo, com indentação. Quando houver dois cargos na mesma empresa, agrupe os dois sob ela — isso mostra progressão, não confusão.', {
    x: 0.95, y: 4.25, w: 5.15, h: 1.5, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 13.5, color: C.grey, lineSpacing: 19,
  });

  // Caso B
  card(s, 6.88, 1.85, 5.85, 4.4, { fill: C.mist });
  badge(s, 6, 7.2, 2.12, 0.5);
  s.addText('Curso sem previsão de término', {
    x: 7.84, y: 2.14, w: 4.6, h: 0.4, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 18, bold: true, color: C.ink,
  });
  card(s, 7.2, 2.78, 5.2, 0.8, { fill: C.paper, line: C.line });
  s.addText('...com formação em Análise e Desenvolvimento de Sistemas (conclusão prevista para 06/2027)', {
    x: 7.38, y: 2.78, w: 4.85, h: 0.8, valign: 'middle', margin: 0, isTextBox: true,
    fontFace: 'Arial', fontSize: 11.5, color: '333333', lineSpacing: 16,
  });
  s.addText('Para estágio, a data de formatura é critério de corte.', {
    x: 7.23, y: 3.72, w: 5.15, h: 0.4, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 13, bold: true, color: C.green,
  });
  s.addText('Toda formação leva início e fim. Curso em andamento leva a previsão de conclusão — no resumo e na seção de formação. Curso livre com carga horária: informe as horas.', {
    x: 7.23, y: 4.25, w: 5.15, h: 1.5, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 13.5, color: C.grey, lineSpacing: 19,
  });
  s.addNotes(
    'Tempo: 2 min. O caso do "pizzaiolo no hospital" é real e arranca risada — use isso, mas feche com o aprendizado: ' +
    'o leitor não vai adivinhar, ele vai descartar. Peça para cada um reler o próprio currículo procurando ambiguidade.'
  );
}

/* ----------------------------------- 14. Erro 7: do vago ao concreto */
{
  const s = pres.addSlide();
  slideHead(s, 'ERRO 7', 'Do vago ao concreto: a fórmula do bullet');

  const chips = ['VERBO DE AÇÃO', 'O QUE VOCÊ FEZ', 'O QUE MUDOU'];
  chips.forEach((t, i) => {
    const x = 0.6 + i * 4.3;
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.8, w: 3.85, h: 0.62, rectRadius: 0.1, fill: { color: C.ink } });
    s.addText(t, {
      x, y: 1.8, w: 3.85, h: 0.62, align: 'center', valign: 'middle', margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 15, bold: true, charSpacing: 1.2, color: 'FFFFFF',
    });
    if (i < 2) {
      s.addText('+', {
        x: x + 3.85, y: 1.8, w: 0.45, h: 0.62, align: 'center', valign: 'middle', margin: 0, isTextBox: true,
        fontFace: F.head, fontSize: 24, bold: true, color: C.amberDark,
      });
    }
  });

  card(s, 0.6, 2.72, 5.85, 2.3, { fill: C.mist });
  pill(s, 'ANTES', 0.92, 2.98, 1.4, C.red);
  s.addText('"Contribui para a organização dos processos operacionais, o que reforçou a eficiência e a padronização dos serviços prestados."', {
    x: 0.95, y: 3.48, w: 5.15, h: 1.3, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 14, italic: true, color: C.grey, lineSpacing: 20,
  });

  card(s, 6.88, 2.72, 5.85, 2.3, { fill: C.mist });
  pill(s, 'DEPOIS', 7.2, 2.98, 1.5, C.green);
  s.addText('"Padronizei o atendimento em um checklist de 3 etapas e treinei 4 colegas — caiu o retrabalho e o tempo de espera no horário de pico."', {
    x: 7.23, y: 3.48, w: 5.15, h: 1.3, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 14, italic: true, color: C.ink, lineSpacing: 20,
  });

  card(s, 0.6, 5.25, 5.85, 1.45, { fill: C.ink });
  s.addText('Não tem número?', {
    x: 0.92, y: 5.42, w: 5.2, h: 0.32, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 15, bold: true, color: C.amber,
  });
  s.addText('Diga o que mudou: "antes era assim, depois ficou assim". Mudança vale mais que estimativa inventada.', {
    x: 0.92, y: 5.78, w: 5.2, h: 0.75, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 13, color: 'FFFFFF', lineSpacing: 18,
  });

  card(s, 6.88, 5.25, 5.85, 1.45, { fill: C.mist });
  s.addText('Tempo verbal consistente', {
    x: 7.2, y: 5.42, w: 5.2, h: 0.32, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 15, bold: true, color: C.ink,
  });
  s.addText('Experiência que acabou vai no passado ("padronizei"). Competência atual fica no infinitivo ("desenvolver em C#").', {
    x: 7.2, y: 5.78, w: 5.2, h: 0.75, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 13, color: C.grey, lineSpacing: 18,
  });
  s.addNotes(
    'Tempo: 3 min — este é o slide mais importante do bloco, não corra. ' +
    'Exercício de 60 s: cada um reescreve UM bullet do próprio currículo usando a fórmula; peça dois voluntários para ler. ' +
    'Soft skill também precisa de evidência: "trabalho em equipe" sozinho não diz nada.'
  );
}

/* --------------------------------- 15. "Não tenho experiência" */
{
  const s = pres.addSlide();
  slideHead(s, 'A OBJEÇÃO MAIS COMUM', '"Mas eu não tenho experiência"');

  const items = [
    ['Projetos da faculdade', 'Trabalho de disciplina conta: diga o problema, a stack e o resultado.'],
    ['GitHub e portfólio', 'Dois repositórios com README decente valem mais que dez abandonados.'],
    ['Freelance e bicos', 'Site do vizinho, planilha da igreja, bot do grupo — é entrega real.'],
    ['Trabalho fora de TI', 'Pizzaiolo, atendente, caixa: processo, qualidade, prazo e pressão.'],
    ['Voluntariado e comunidade', 'Sonoplastia, organização de evento, monitoria: responsabilidade e equipe.'],
    ['Cursos e certificações', 'Com carga horária. Trilha coerente conta mais que certificado solto.'],
  ];
  items.forEach((it, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.6 + col * 4.12;
    const y = 1.9 + row * 2.1;
    card(s, x, y, 3.85, 1.85, { fill: C.mist });
    s.addText(it[0], {
      x: x + 0.28, y: y + 0.24, w: 3.3, h: 0.62, margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 16, bold: true, color: C.ink, lineSpacing: 20,
    });
    s.addText(it[1], {
      x: x + 0.28, y: y + 0.88, w: 3.3, h: 0.85, margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 13, color: C.grey, lineSpacing: 18,
    });
  });
  s.addText('Traduza, não omita: o que você fez fora de TI vira competência em TI quando você escreve o processo, e não o cargo.', {
    x: 0.6, y: 6.3, w: 12.1, h: 0.5, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 15, italic: true, color: C.ink2,
  });
  s.addNotes(
    'Tempo: 2.5 min. Volte ao José Maria: ele não tem experiência em TI nenhuma e ainda assim tem um currículo defensável. ' +
    'Diga que esconder o emprego "sem relação" cria gap — e gap pesa mais que pizzaiolo. ' +
    'Se der tempo, cite o Guia de Carreira em TI do repositório para o que estudar em cada fase.'
  );
}

/* ------------------------------------------- 16. Adaptar e entregar */
{
  const s = pres.addSlide();
  slideHead(s, 'ENTREGA', 'Antes de anexar o arquivo');

  const rows = [
    ['Adapte por vaga', 'Espelhe o vocabulário do anúncio. Currículo único para tudo é currículo para nada.'],
    ['Nome do arquivo', 'Nome_Sobrenome_Curriculo.pdf — nunca "curriculo final v3 (1).pdf".'],
    ['Teste de impressão', 'Imprima em preto e branco: URL, telefone e email precisam ficar legíveis.'],
    ['Revisão de terceiro', 'Alguém de confiança lê gramática, datas e coerência. Você não vê seu próprio erro.'],
  ];
  rows.forEach((r, i) => {
    const y = 1.9 + i * 1.12;
    card(s, 0.6, y, 8.35, 0.95, { fill: C.mist, shadow: false });
    badge(s, i + 1, 0.85, y + 0.24, 0.48);
    s.addText(r[0], {
      x: 1.52, y: y + 0.13, w: 7.2, h: 0.32, margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 16, bold: true, color: C.ink,
    });
    s.addText(r[1], {
      x: 1.52, y: y + 0.47, w: 7.2, h: 0.32, margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 13, color: C.grey,
    });
  });

  card(s, 9.3, 1.9, 3.43, 4.37, { fill: C.ink });
  s.addText('PDF ou DOCX?', {
    x: 9.6, y: 2.18, w: 2.85, h: 0.35, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 16, bold: true, color: C.amber,
  });
  s.addText('PDF preserva o layout e é o padrão. Envie DOCX quando a vaga ou a agência pedir — algumas usam o arquivo editável no processo.', {
    x: 9.6, y: 2.62, w: 2.85, h: 1.5, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 13, color: 'FFFFFF', lineSpacing: 18,
  });
  s.addText('Candidate-se cedo', {
    x: 9.6, y: 4.3, w: 2.85, h: 0.35, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 16, bold: true, color: C.amber,
  });
  s.addText('Vaga nova recebe dezenas de candidaturas nas primeiras horas. Ter o currículo pronto é o que permite ser rápido.', {
    x: 9.6, y: 4.74, w: 2.85, h: 1.3, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 13, color: C.ice, lineSpacing: 18,
  });
  s.addNotes(
    'Tempo: 2 min. O nome do arquivo é o detalhe que mais gera reação — cite o "curriculo final v3 (1).pdf" com humor. ' +
    'Teste de impressão: lembre que muita triagem ainda acontece em papel, em feira de carreira e processo interno.'
  );
}

/* ---------------------------------------------------- 17. Checklist */
{
  const s = pres.addSlide();
  slideHead(s, 'LEVE ISSO COM VOCÊ', 'Checklist antes de clicar em enviar');

  const left = [
    'Formatação uniforme: uma fonte, um tamanho',
    'Uma página, sem foto',
    'Um telefone, email profissional',
    'LinkedIn por extenso, sem link clicável',
    'Sem endereço completo, CEP ou estado civil',
    'Objetivo ao lado do nome',
    'Seção de palavras-chave preenchida',
    'Formação com início e fim',
  ];
  const right = [
    'Previsão de conclusão nos cursos em andamento',
    'Formação e experiência em ordem decrescente',
    'Empresa e cargo claramente separados',
    'Bullets com ação e resultado, não adjetivo',
    'Tempo verbal consistente',
    'Soft skills com exemplo concreto',
    'Sem intervalos sem contexto',
    'Revisado por outra pessoa e testado na impressão',
  ];
  function column(items, x) {
    items.forEach((t, i) => {
      const y = 1.95 + i * 0.55;
      s.addShape(pres.ShapeType.roundRect, {
        x, y: y + 0.05, w: 0.22, h: 0.22, rectRadius: 0.04,
        fill: { color: C.paper }, line: { color: C.ink2, width: 1.25 },
      });
      s.addText(t, {
        x: x + 0.4, y, w: 5.5, h: 0.4, margin: 0, isTextBox: true,
        fontFace: F.body, fontSize: 13.5, color: C.ink, lineSpacing: 17,
      });
    });
  }
  column(left, 0.65);
  column(right, 6.9);

  s.addText('Os 16 itens, a fórmula do bullet e os dois modelos de currículo estão no repositório — e no handout desta palestra.', {
    x: 0.6, y: 6.55, w: 12.1, h: 0.35, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 13, color: C.greyL,
  });
  s.addNotes(
    'Tempo: 1.5 min. Não leia os 16 itens. Diga que é o material de referência, aponte três que você considera os mais ' +
    'violados na prática (uma página, palavras-chave, bullet com resultado) e siga. O handout tem a lista completa.'
  );
}

/* --------------------------------------------------- 18. Encerramento */
{
  const s = pres.addSlide();
  s.background = { color: C.ink };
  ring(s, 5.1, 5.45, 2.45);
  ring(s, 3.05, 6.75, 1.5, C.ink2, 10);

  s.addText('PRÓXIMO PASSO', {
    x: 0.8, y: 1.5, w: 8.6, h: 0.3, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 12, bold: true, charSpacing: 3, color: C.amber,
  });
  s.addText('Hoje à noite: uma\npágina, revisada.', {
    x: 0.78, y: 1.9, w: 8.4, h: 1.7, margin: 0, isTextBox: true,
    fontFace: F.head, fontSize: 38, bold: true, color: 'FFFFFF', lineSpacing: 46,
  });
  s.addText('Abra o seu currículo, rode o checklist e peça para uma pessoa ler. Currículo competitivo não é talento: é revisão.', {
    x: 0.8, y: 3.75, w: 7.6, h: 0.9, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 16, color: C.ice, lineSpacing: 23,
  });
  s.addText('Perguntas?', {
    x: 0.8, y: 5.55, w: 4.0, h: 0.6, margin: 0, isTextBox: true,
    fontFace: F.head, fontSize: 30, bold: true, color: C.amber,
  });

  card(s, 7.9, 1.85, 4.83, 4.4, { fill: C.inkCard, line: '3A4D74' });
  s.addText('Material', {
    x: 8.2, y: 2.12, w: 4.2, h: 0.35, margin: 0, isTextBox: true,
    fontFace: F.body, fontSize: 15, bold: true, charSpacing: 1.5, color: C.amber,
  });
  const links = [
    ['Guia de currículo e checklist', 'github.com/thallesnoce/curriculum-vitae'],
    ['Monta meu currículo', 'montameucurriculo.com'],
    ['Vídeo complementar', 'youtu.be/npQSYTmuXTE'],
    ['No mesmo repositório', 'Guia de Busca de Emprego · Guia de Carreira em TI'],
  ];
  links.forEach((l, i) => {
    const y = 2.62 + i * 0.92;
    s.addText(l[0], {
      x: 8.2, y, w: 4.2, h: 0.3, margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 13, bold: true, color: 'FFFFFF',
    });
    s.addText(l[1], {
      x: 8.2, y: y + 0.3, w: 4.2, h: 0.5, margin: 0, isTextBox: true,
      fontFace: F.body, fontSize: 12.5, color: C.ice, lineSpacing: 16,
    });
  });
  s.addNotes(
    'Tempo: 1 min + perguntas. Feche com o pedido de ação concreta (uma página revisada hoje). ' +
    'Deixe este slide no projetor durante as perguntas, para a plateia anotar os links. ' +
    'Se houver tempo, ofereça revisar currículo de voluntários ao vivo — é o melhor encerramento possível.'
  );
}

pres.writeFile({ fileName: OUT }).then(() => console.log('OK ->', OUT));
