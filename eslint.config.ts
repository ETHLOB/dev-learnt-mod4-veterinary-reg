import globals from "globals";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import pluginVue from "eslint-plugin-vue";
import vueParser, { parse } from "vue-eslint-parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
    // Some typical configurations for my files
    {
        ignores: [
            "node_modules/**",
            "dist/**",
            "public/**",
            "build/**",
            "material/**",
        ],
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            ...prettierConfig.rules,
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" },
            ],
            "no-console": "warn",
        },
    },

    // Typical configurations for TypeScript coming from the tseslint plugin
    ...tseslint.configs.recommended,

    // Specific configurations for Vue files
    ...pluginVue.configs["flat/essential"],
    {
        files: ["**/*.vue"],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tseslint.parser,
                ecmaVersion: 2023,
                sourceType: "module",
            },
        },
        rules: {
            ...prettierConfig.rules,
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" },
            ],
            "no-console": "warn",
        },
    },
])