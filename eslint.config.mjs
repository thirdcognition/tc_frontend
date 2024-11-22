import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
// import pluginNext from "@next/eslint-plugin-next";
import prettierConfigRecommended from "eslint-plugin-prettier/recommended";

/** @type {import('eslint').Linter.Config[]} */
export default [
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    // pluginReactHooks.configs.flat.recommended,
    prettierConfigRecommended,
    {
        settings: {
            react: {
                version: "detect"
            }
        },
        files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
        plugins: {
            "react-hooks": pluginReactHooks
        },
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            ...pluginReactHooks.configs.recommended.rules
            // ...pluginNext.configs.recommended.rules // needs work
        }
    },
    {
        ignores: [
            ".config/*",
            "node_modules/*",
            ".next/*",
            "lib_js/*",
            "tc_compute_api/*"
        ]
    }
];
