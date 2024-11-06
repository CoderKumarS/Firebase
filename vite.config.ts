import { defineConfig } from 'vite'
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react'

// Load environment variables from the `.env` file
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
