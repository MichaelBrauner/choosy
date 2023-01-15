// import nested from "postcss-nested";
// import postcss_import from "postcss-import";
// import cssnano from "cssnano";
// import * as path from "path";

module.exports = {
    plugins: [
        require('postcss-nested'),
        require('postcss-import'),
        // require('cssnano')
    ],
    // from: './src/style/choosy.css',
    // to: path.resolve('dist/choosy.min.css')
}