import * as cheerio from 'cheerio';

async function analyze() {
  try {
    const response = await fetch('https://suhairconcept.com.br/megahair/');
    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove script and style tags
    $('script, style, link, meta').remove();

    const bodyText = $('body').text().replace(/\s+/g, ' ').trim();
    
    // Split by common landing page section markers or just look for keywords
    const keywords = ['Mega Hair', 'Técnicas', 'Avaliação', 'Dúvidas', 'Perguntas', 'Depoimentos', 'Studio'];
    
    console.log("--- FULL BODY TEXT (CLEANED) ---");
    console.log(bodyText.substring(0, 5000)); // First 5000 chars should cover most of it
    
  } catch (error) {
    console.error('Error fetching or parsing:', error.message);
  }
}

analyze();
