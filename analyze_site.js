import * as cheerio from 'cheerio';

async function analyze() {
  try {
    const response = await fetch('https://suhairconcept.com.br/megahair/');
    const html = await response.text();
    const $ = cheerio.load(html);

    const findings = {
      title: $('title').text(),
      headings: [],
      ctas: [],
      paragraphs: [],
      images: [],
      trust_elements: [],
      faq: [],
      colors: [],
      typography: []
    };

    $('h1, h2, h3, h4').each((i, el) => {
      findings.headings.push({ tag: el.tagName, text: $(el).text().trim().replace(/\s+/g, ' ') });
    });

    $('a, button').each((i, el) => {
      const text = $(el).text().trim().replace(/\s+/g, ' ');
      if (text.length > 0) {
        findings.ctas.push({ text, href: $(el).attr('href'), class: $(el).attr('class') });
      }
    });

    $('p').each((i, el) => {
      const text = $(el).text().trim().replace(/\s+/g, ' ');
      if (text.length > 20) {
        findings.paragraphs.push(text);
      }
    });

    $('img').each((i, el) => {
      findings.images.push({ src: $(el).attr('src'), alt: $(el).attr('alt') });
    });

    // Look for styles
    const styles = $('style').text();
    const hexMatch = styles.match(/#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}/g);
    if (hexMatch) findings.colors = [...new Set(hexMatch)];

    const fontsMatch = styles.match(/font-family:[^;]+/g);
    if (fontsMatch) findings.typography = [...new Set(fontsMatch)];

    console.log(JSON.stringify(findings, null, 2));
  } catch (error) {
    console.error('Error fetching or parsing:', error.message);
  }
}

analyze();
