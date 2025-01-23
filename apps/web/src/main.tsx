import { QueryClient } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routerWithQueryClient } from '@tanstack/react-router-with-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { routeTree } from './routeTree.gen';
import './index.css';

const queryClient = new QueryClient();

const router = routerWithQueryClient(
  createRouter({
    context: { queryClient },
    defaultPreload: 'intent',
    routeTree,
  }),
  queryClient,
);

const container = document.querySelector('#app');
if (container != undefined) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
