module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        parser: "babel-eslint",
        sourceType: 'module'
    },
    rules: {
        'vue/multi-word-component-names': "off"
    }
}
