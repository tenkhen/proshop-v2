# FRONTEND GUIDE

## Proxy for Vite

### Add proxy to vite.config.js

#### Whenever fetch request hits /api, it recognizes the url should be a localhost:5000
```js
export default defineConfig({
  plugins: [react(), eslint()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
      },
    },
  },
});
```

---

## Proxy for CRA

### Add proxy to package.json (frontend) 

#### Whenever fetch request hits /api, it recognizes the url should be a localhost:5000
```js
"proxy": "http://localhost:5000"
```
---