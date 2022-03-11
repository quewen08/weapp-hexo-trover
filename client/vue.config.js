module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `
                    $env: ${process.env.NODE_ENV};
                    @import "src/styles/variable.scss";
                    @import "src/styles/reset.scss";
                `,
            },
        },
    },
}