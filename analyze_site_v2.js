import * as cheerio from 'cheerio';

async function analyze() {
  try {
    const response = await fetch('https://suhairconcept.com.br/megahair/');
    const html = await response.text();
    const $ = cheerio.load(html);

    const findings = {
      sections: [],
      faq: [],
      cta_text: [],
      colors: [],
      typography: [],
      marketing_copy: []
    };

    // Extract Sections based on Elementor classes
    $('.elementor-section').each((i, el) => {
      const title = $(el).find('h1, h2, h3').first().text().trim();
      if (title) findings.sections.push(title);
    });

    // Extract FAQ
    $('.elementor-accordion-item').each((i, el) => {
      const question = $(el).find('.elementor-accordion-title').text().trim();
      const answer = $(el).find('.elementor-accordion-content').text().trim();
      if (question) findings.faq.push({ question, answer });
    });

    // Extract CTA
    $('.elementor-button-text').each((i, el) => {
      findings.cta_text.push($(el).text().trim());
    });

    // Extract copy
    $('.elementor-text-editor').each((i, el) => {
      const text = $(el).text().trim().replace(/\s+/g, ' ');
      if (text.length > 50) findings.marketing_copy.push(text);
    });

    // Colors and Typography
    const scripts = $('link[rel="stylesheet"]').map((i, el) => $(el).attr('href')).get();
    findings.stylesheets = scripts;

    const googleFonts = $('link[href*="fonts.googleapis.com"]').attr('href');
    findings.typography.push(googleFonts);

    // Look for background colors in inline styles
    $('[style*="background-color"]').each((i, el) => {
      const style = $(el).attr('style');
      const match = style.match(/background-color:\s*(#[0-9A-Fa-f]{6}|#[0-9A-Fa-f]{3}|rgb\([^)]+\))/);
      if (match) findings.colors.push(match[1]);
    });

    console.log(JSON.stringify(findings, null, 2));
  } catch (error) {
    console.error('Error fetching or parsing:', error.message);
  }
}

analyze();
