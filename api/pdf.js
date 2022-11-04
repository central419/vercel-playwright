const playwright = require("playwright-aws-lambda");

async function printPDF() {
  const browser = await playwright.launchChromium({ headless: true });
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto("https://dune-app.vercel.app/api/render/347403419692040270", {
    waitUntil: "networkidle0",
  });

  const pdf = await page.pdf({
    
  });

  await browser.close();
  return pdf;
}

module.exports = async (req, res) => {
  printPDF().then((pdf) => {
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });
    res.send(pdf);
  });
};
