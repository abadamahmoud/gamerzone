// next.config.mjs
import { config as dotenvConfig } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Resolve the directory name of the current file
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables from .env
dotenvConfig({ path: join(__dirname, '.env') });

// Export configuration object
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
