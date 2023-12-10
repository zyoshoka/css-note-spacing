module.exports = {
	'root': true,
	'env': {
		'browser': true,
		'es2021': true,
	},
	'plugins': [
		'@typescript-eslint',
		'import',
	],
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:astro/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:react/recommended',
	],
	'overrides': [
		{
			'env': {
				'node': true,
			},
			'files': [
				'.eslintrc.{js,cjs}',
			],
			'parserOptions': {
				'sourceType': 'script',
			},
		},
		{
			'env': {
				'node': true,
			},
			'files': [
				'env.d.ts',
			],
			'rules': {
				'@typescript-eslint/triple-slash-reference': 'off',
			},
		},
		{
			'env': {
				'astro/astro': true,
				'es2021': true,
				'node': true,
			},
			'files': [
				'*.astro',
			],
			'plugins': [
				'astro',
			],
			'parser': 'astro-eslint-parser',
			'parserOptions': {
				'parser': '@typescript-eslint/parser',
				'extraFileExtensions': [
					'.astro',
				],
				'souseType': 'module',
			},
		},
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module',
		'project': './tsconfig.json',
	},
	'rules': {
		'array-bracket-spacing': ['error', 'never'],
		'arrow-spacing': ['error', {
			'before': true,
			'after': true,
		}],
		'brace-style': ['error', '1tbs', {
			'allowSingleLine': true,
		}],
		'comma-dangle': ['warn', 'always-multiline'],
		'comma-spacing': ['error', { 'before': false, 'after': true }],
		'eol-last': ['error', 'always'],
		'indent': ['warn', 'tab', {
			'ArrayExpression': 'first',
			'MemberExpression': 1,
			'ObjectExpression': 'first',
			'SwitchCase': 1,
			'flatTernaryExpressions': true,
		}],
		'key-spacing': ['error', {
			'beforeColon': false,
			'afterColon': true,
		}],
		'keyword-spacing': ['error', {
			'before': true,
			'after': true,
		}],
		'no-constant-condition': 'warn',
		'no-multi-spaces': 'error',
		'no-var': 'error',
		'object-curly-spacing': ['error', 'always'],
		'padded-blocks': ['error', 'never'],
		'padding-line-between-statements': [
			'error',
			{ 'blankLine': 'always', 'prev': 'function', 'next': '*' },
			{ 'blankLine': 'always', 'prev': '*', 'next': 'function' },
		],
		'prefer-arrow-callback': 'error',
		'quotes': ['warn', 'single'],
		'semi': ['error', 'always'],
		'semi-spacing': ['error', { 'before': false, 'after': true }],
		'space-before-blocks': ['error', 'always'],
		'import/no-default-export': 'warn',
		'import/no-unresolved': 'off',
		'import/order': ['warn', {
			'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
		}],
	},
};
