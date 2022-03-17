import type { AddressInfo } from 'net';
import { AstroConfig, AstroRenderer } from '../@types/astro.js';
import { ViteDevServer, mergeConfig } from 'vite';

export async function runHookConfigSetup({ config, command }: { config: AstroConfig; command: 'dev' | 'build' }) {
	for (const integration of config.integrations) {
		if (integration.hooks['astro:config:setup']) {
			await integration.hooks['astro:config:setup']({
				config,
				command,
				addRenderer(renderer: AstroRenderer) {
					config._ctx.renderers.push(renderer);
				},
				injectElement: () => {
					throw new Error('TODO: Implement');
				},
				injectScript: (stage, content) => {
					config._ctx.scripts.push({ stage, content });
				},
				updateConfig: (newConfig) => {
					config.vite = mergeConfig(config.vite, newConfig.vite);
				},
			});
		}
	}
}

export async function runHookConfigDone({ config }: { config: AstroConfig }) {
	for (const integration of config.integrations) {
		if (integration.hooks['astro:config:done']) {
			await integration.hooks['astro:config:done']({
				config,
			});
		}
	}
}

export async function runHookServerSetup({ config, server }: { config: AstroConfig; server: ViteDevServer }) {
	for (const integration of config.integrations) {
		if (integration.hooks['astro:server:setup']) {
			await integration.hooks['astro:server:setup']({ server });
		}
	}
}

export async function runHookServerStart({ config, address }: { config: AstroConfig; address: AddressInfo }) {
	for (const integration of config.integrations) {
		if (integration.hooks['astro:server:start']) {
			await integration.hooks['astro:server:start']({ address });
		}
	}
}

export async function runHookServerDone({ config }: { config: AstroConfig }) {
	for (const integration of config.integrations) {
		if (integration.hooks['astro:server:done']) {
			await integration.hooks['astro:server:done']();
		}
	}
}

export async function runHookBuildStart({ config }: { config: AstroConfig }) {
	for (const integration of config.integrations) {
		if (integration.hooks['astro:build:start']) {
			await integration.hooks['astro:build:start']();
		}
	}
}

export async function runHookBuildDone({ config, pages }: { config: AstroConfig; pages: string[] }) {
	for (const integration of config.integrations) {
		if (integration.hooks['astro:build:done']) {
			await integration.hooks['astro:build:done']({ pages, dir: config.dist });
		}
	}
}
