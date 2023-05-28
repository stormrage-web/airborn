// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	overrides: [
		{
			files: ["**/*.spec.js", "**/*.spec.jsx"],
			env: {
				jest: true,
			},
		},
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": [
			"error",
			process.platform === "win32" ? "windows" : "unix",
		],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
};
