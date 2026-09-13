import { spawn } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const webDir = join(root, 'web');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const npmArgs = ['run', 'dev:desktop'];
const command = process.platform === 'win32' ? 'cmd.exe' : npmCommand;
const args = process.platform === 'win32' ? ['/d', '/c', npmCommand, ...npmArgs] : npmArgs;

const child = spawn(command, args, {
  cwd: webDir,
  stdio: 'inherit',
  shell: false,
  windowsHide: false,
});

function stop(signal) {
  if (!child.killed) child.kill(signal);
}

child.once('error', (error) => {
  console.error(`开发环境启动失败：${error.message}`);
  process.exitCode = 1;
});

child.once('exit', (code, signal) => {
  process.exitCode = code ?? (signal ? 1 : 0);
});

process.once('SIGINT', () => stop('SIGINT'));
process.once('SIGTERM', () => stop('SIGTERM'));
