import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs';
import path from 'path';

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const sslPath = path.resolve(__dirname, 'SSL');

  const httpsOptions = {
    key: fs.readFileSync(path.join(sslPath, 'www.enlace-crm.com_key.key')), // usa la clave renombrada
    cert: fs.readFileSync(path.join(sslPath, 'www.enlace-crm.com.crt')),
    ca: fs.readFileSync(path.join(sslPath, 'www.enlace-crm.com.ca-bundle')),
  };

  return {
    plugins: [vue()],
    server: {
      https: httpsOptions,
      host: 'www.enlace-crm.com', // si estás apuntando ese dominio a localhost (via hosts)
      port: 443
    },
    build: {
      rollupOptions: {
        input: {
          main: './index.html',
        }
      }
    }
  };
});
