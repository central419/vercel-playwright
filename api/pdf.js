const playwright = require("playwright-aws-lambda");

async function printPDF() {
  const browser = await playwright.launchChromium({ headless: true });
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto("https://cv.maltebaer.vercel.app", {
    waitUntil: "networkidle0",
  });
  await page.addStyleTag({ content: "#print-pdf { display: none } " });
  page.emulateMediaType("screen");

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: 30,
      botton: 30,
      right: 30,
      left: 30,
    },
    scale: 0.6,
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
