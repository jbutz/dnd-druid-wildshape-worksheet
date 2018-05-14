module.exports = {
    env: {
        browser: true,
        node: false
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/essential',
    ],
    parserOptions: {
        ecmaVersion: '2018',
        sourceType: 'module'
    },
};