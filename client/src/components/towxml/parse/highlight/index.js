const config = require('../../config'),
    hljs = require('./highlight');
// config.highlight.forEach(item => {
//     hljs.registerLanguage(item, require(`./languages/${item}`).default);
// });
hljs.registerLanguage('c-like', require('./languages/c-like').default);hljs.registerLanguage('c', require('./languages/c').default);hljs.registerLanguage('bash', require('./languages/bash').default);hljs.registerLanguage('css', require('./languages/css').default);hljs.registerLanguage('dart', require('./languages/dart').default);hljs.registerLanguage('go', require('./languages/go').default);hljs.registerLanguage('java', require('./languages/java').default);hljs.registerLanguage('javascript', require('./languages/javascript').default);hljs.registerLanguage('json', require('./languages/json').default);hljs.registerLanguage('less', require('./languages/less').default);hljs.registerLanguage('scss', require('./languages/scss').default);hljs.registerLanguage('shell', require('./languages/shell').default);hljs.registerLanguage('xml', require('./languages/xml').default);hljs.registerLanguage('htmlbars', require('./languages/htmlbars').default);hljs.registerLanguage('nginx', require('./languages/nginx').default);hljs.registerLanguage('php', require('./languages/php').default);hljs.registerLanguage('python', require('./languages/python').default);hljs.registerLanguage('python-repl', require('./languages/python-repl').default);hljs.registerLanguage('typescript', require('./languages/typescript').default);hljs.registerLanguage('yaml', require('./languages/yaml').default);hljs.registerLanguage('ruby', require('./languages/ruby').default);hljs.registerLanguage('lua', require('./languages/lua').default);hljs.registerLanguage('stylus', require('./languages/stylus').default);hljs.registerLanguage('cpp', require('./languages/cpp').default);hljs.registerLanguage('cmake', require('./languages/cmake').default);hljs.registerLanguage('gradle', require('./languages/gradle').default);hljs.registerLanguage('groovy', require('./languages/groovy').default);hljs.registerLanguage('matlab', require('./languages/matlab').default);hljs.registerLanguage('pgsql', require('./languages/pgsql').default);hljs.registerLanguage('rust', require('./languages/rust').default);hljs.registerLanguage('scheme', require('./languages/scheme').default);hljs.registerLanguage('sql', require('./languages/sql').default);hljs.registerLanguage('vim', require('./languages/vim').default);

module.exports = hljs;