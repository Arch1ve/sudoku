module.exports = {
	root: true,
	env: { browser: true, es2020: true, jest: true },
	settings: {
		"import/resolver": {
			typescript: {},
		},
		ignorePatterns: [
			".eslintrc.cjs",
			"vite.config.ts",
			"node_modules",
			"dist",
			"build",
			"public",
		],
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"plugin:react/recommended",
		"plugin:import/typescript",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
		project: ["./tsconfig.json", "./tsconfig.node.json"],
	},
	plugins: [
		"react",
		"react-refresh",
		"@typescript-eslint",
		"unicorn",
		"prettier",
		"import",
	],
	rules: {
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
		"react/react-in-jsx-scope": "off",
		"react/jsx-filename-extension": [
			1,
			{
				extensions: [".js", ".jsx", ".ts", ".tsx"],
			},
		],
		"prettier/prettier": 2
	},
};
