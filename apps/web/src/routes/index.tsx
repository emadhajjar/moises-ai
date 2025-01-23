import { createFileRoute, redirect } from '@tanstack/react-router';

import { Routes } from '../constants/routes';

export const Route = createFileRoute(Routes.INDEX)({
  loader: () => {
    throw redirect({
      to: Routes.LIST_SONGS,
    });
  },
});
