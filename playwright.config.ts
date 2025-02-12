
🌼   daisyUI 4.12.23
├─ ✔︎ 1 theme added		https://daisyui.com/docs/themes
╰─ ❤︎ Support daisyUI project:	https://opencollective.com/daisyui

import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 3000
	},

	testDir: 'e2e'
});
