import { createApp } from './app';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`agent-api listening on port ${PORT}`);
});
