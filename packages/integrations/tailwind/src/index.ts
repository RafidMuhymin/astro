import type { AstroIntegration } from 'astro';
import tailwindPlugin from 'tailwindcss';
import autoprefixerPlugin from 'autoprefixer';

function getDefaultTailwindConfig(srcUrl: URL) {
	return {
		theme: {
			extend: {},
		},
		plugins: [],
		content: [`${srcUrl.pathname}/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}`],
	};
}

export default function (): AstroIntegration {
	return {
		name: '@astrojs/tailwind',
		hooks: {
			'astro:config:setup': ({ config, injectScript }) => {
				// Inject the Tailwind postcss plugin
				config.styleOptions.postcss.plugins.push(tailwindPlugin(getDefaultTailwindConfig(config.src)));
				config.styleOptions.postcss.plugins.push(autoprefixerPlugin);

				// Inject the Tailwind base import
				injectScript('page', `import '@astrojs/tailwind/base.css';`);
			},
		},
	};
}
