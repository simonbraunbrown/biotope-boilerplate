module.exports = {
	project: 'VI Frontend Framework 5',
	global: {
		externalResources: {
			'vi-css-helper': ['helper.css', 'print.css'],
			'sanitize.css': 'sanitize.css',
			'handlebars': 'dist/handlebars.runtime.js',
			'@biotope/resource-loader': 'src/resourceLoader.js'
		},
		tsEntryPoints: [
			'resources/ts/**/*.ts',
			'components/**/*.ts'
		]
	}
};
