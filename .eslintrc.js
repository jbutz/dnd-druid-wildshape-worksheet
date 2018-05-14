module.exports = {
    env: {
        browser: false,
        node: true,
    },
    root: true,
    parserOptions: {
        sourceType: 'script',
        ecmaVersion: '2017',
    },
    extends: [
        'eslint:recommended',
    ],
    rules: {
        indent: [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ]
    }
};