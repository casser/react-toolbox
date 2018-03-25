
const { convertCss } = require('css-to-typestyle');

convertCss('.redClass{ color: red }')
  .then((typestyleSource) => {
    // write out to file
    console.info(typestyleSource);
  });
