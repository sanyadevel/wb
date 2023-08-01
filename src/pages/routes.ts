import * as z from 'zod';
import login from './login';
import nsPage from './root';

export const routes = [
  {
    name: 'login',
    path: '/login',
    title: 'Вход',
    Component: login,
  },
  { name: 'root', path: '/', title: 'Каталог услуг', Component: nsPage, paramsSchema: z.object({}) },
] as const;
