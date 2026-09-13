import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const webDir = join(root, 'web');

if (!existsSync(webDir)) {
  console.error('ERROR: web/ 子模块不存在。请先执行 git submodule update --init --recursive');
  process.exit(1);
}

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const npmArgs = ['run', 'build:portable'];
const command = process.platform === 'win32' ? 'cmd.exe' : npmCommand;
const args = process.platform === 'win32' ? ['/d', '/c', npmCommand, ...npmArgs] : npmArgs;
const result = spawnSync(command, args, {
  cwd: webDir,
  stdio: 'inherit',
  shell: false,
  windowsHide: false,
});

if (result.error) {
  console.error(`便携包脚本启动失败：${result.error.message}`);
  process.exit(1);
}

process.exit(result.status ?? 1);
