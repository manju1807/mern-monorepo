import compression from 'compression';

export const compressionMiddleware = compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => !req.headers['x-no-compression'],
});
