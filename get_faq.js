import * as cheerio from 'cheerio';

async function analyze() {
  const response = await fetch('https://suhairconcept.com.br/megahair/');
  const html = await response.text();
  const $ = cheerio.load(html);
  
  $('.elementor-accordion-item').each((i, el) => {
    console.log("Q:", $(el).find('.elementor-accordion-title').text().trim());
    console.log("A:", $(el).find('.elementor-accordion-content').text().trim());
    console.log("---");
  });
}
analyze();
