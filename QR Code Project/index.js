import inquirer from 'inquirer'; //import the npm
import qr from "qr-image";
import fs from "fs";

/*2 use the qr-image npm package to turn the user URL into a QR code image*/
//var qr = require('qr-image');

/*1 THE Inquirer npm package to get user input*/
inquirer
.prompt([
    /* Pass questions */
    {
    message: "Type in your URL",
    name:"URL",
    },
  ])
  .then((answers) => {
    // feedback 
    const url = answers.URL;

    // Generate QR code
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));

    // Save URL to file
    fs.writeFile('URL.txt', url, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      }); 
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.error('Prompt could not be rendered in this environment.');
    } else {
      // Something else went wrong
      console.error('Something else went wrong:', error);
    }
  });
