require('dotenv').config();

const css = `
    html {
      margin: 0;
      padding: 0;
    }
    body {
      font-family: sans-serif;
      text-align: center;
      padding-top: 50px;
    }
  `;

const htmlApp = `
    <!DOCTYPE html>
    <html lang='en'>
    <head>
      <meta charset='UTF-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1'>
      <title>R2D2: DevOps Helper</title>
      <style>
        ${css}
      </style>
    </head>
    <body>
      <div>
        <h1>Try <code>/check-version</code> to see the version of the app</h1>
      </div>
    </body>
    </html>
  `;

module.exports = htmlApp;