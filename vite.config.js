import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** 끝에 슬래시 포함. 미설정이면 루트(교실 PC·전자칠판 로컬 서버 등). GitHub Pages는 CI에서 BASE_PATH=/exam-dashboard 로 설정 */
function normalizeBase(raw) {
  if (raw == null || raw === '' || raw === '/') return '/'
  const withLeading = raw.startsWith('/') ? raw : `/${raw}`
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

export default defineConfig({
  plugins: [react()],
  base: normalizeBase(process.env.BASE_PATH),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
