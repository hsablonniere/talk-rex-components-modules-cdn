import { markup } from './js/utils.mjs';

export function transformSlides (pseudoMarkdown) {

  const lines = pseudoMarkdown
    .trim()
    .split('\n');

  let frontmatter = false;
  const frontmatterData = [];
  let title = '';

  let comment = false;

  let currentSlide;
  const allSlides = [];

  lines
    .forEach((line, lineIndex) => {
      if (lineIndex === 0 && line === '---') {
        frontmatter = true;
        return;
      }
      if (frontmatter && line === '---') {
        frontmatter = false;
        return;
      }
      if (frontmatter) {
        const [rawName, rawValue] = line.split(':');
        frontmatterData.push([rawName.trim(), rawValue.trim()]);
        return;
      }
      if (line.startsWith('<!--')) {
        comment = true;
      }
      if (comment && line.endsWith('-->')) {
        comment = false;
        return;
      }
      if (comment) {
        return;
      }
      if (line.startsWith('# ') && title === '') {
        title = line.replace(/^# /, '').trim();
        return;
      }
      if (line.startsWith('## ')) {
        currentSlide = {};
        allSlides.push(currentSlide);
        const [_, type = '', attrs = null] = /^## ([^ ]+)( .*)?$/.exec(line);
        currentSlide.slideLineIndex = lineIndex + 1;
        currentSlide.type = type.trim();
        currentSlide.attrs = (attrs != null) ? attrs.trim() : null;
        currentSlide.contentLines = [];
        currentSlide.notesLines = [];
        return;
      }
      if (currentSlide != null) {
        if (line.startsWith('> ')) {
          if (currentSlide.notesLineIndex == null) {
            currentSlide.notesLineIndex = lineIndex + 1;
          }
          const [_, note = ''] = /^> (.*)?$/.exec(line);
          currentSlide.notesLines.push(note);
        }
        else {
          currentSlide.contentLines.push(line);
        }
        return;
      }
    });

  const slideTypes = unique(allSlides.map((slide) => slide.type)).sort();
  const slideTypesScripts = slideTypes.map((slideType) => `<script src="src/js/slide-types/slide-${slideType}.js" type="module"></script>`);

  const htmlLines = allSlides
    .map((slide) => getSlideLines(slide))
    .flat();

  return [
    `<!DOCTYPE html>`,
    `<html lang="en">`,
    `<head>`,
    `<meta charset="UTF-8">`,
    ``,
    ...frontmatterData.map(([name, content]) => `<meta name="${name}" content="${content}">`),
    ``,
    `<title>${title}</title>`,
    ``,
    `<link rel="stylesheet" href="src/css/main.css">`,
    ``,
    `<script src="src/js/slide-deck.js" type="module"></script>`,
    ...slideTypesScripts,
    `</head>`,
    `<body>`,
    ``,
    ...htmlLines,
    `</body>`,
    `</html>`,
  ].join('\n');
}

function getSlideLines (slide) {

  const contentLines = slide.contentLines
    .join('\n')
    .trim()
    .split('\n');

  const notesLines = slide.notesLines
    .map((line) => line.trim())
    .filter((line) => line !== '')
    .map((line) => markup(line))
    .map((line) => `${line}<br>`);

  const hasNotes = (notesLines.length > 0);

  const openTag = [
    `slide-${slide.type}`,
    slide.attrs,
    `data-line-index="${slide.slideLineIndex}"`,
  ].filter((a) => a != null).join(' ');

  return [
    `<${openTag}>`,
    ...contentLines,
    `</slide-${slide.type}>`,
    ...(hasNotes ? [
      `<div class="notes" data-line-index="${slide.notesLineIndex}">`,
      ...notesLines,
      `</div>`,
    ] : []),
    ``,
  ].filter((line) => line != null);
}

function unique (arr) {
  return Array.from(new Set(arr));
}
