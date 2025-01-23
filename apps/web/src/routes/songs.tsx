import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense, useMemo } from 'react';

import { Container } from '../components/Container';
import { ListSongs } from '../components/ListSongs';
import { PageTitle } from '../components/PageTitle';
import { QueryKeys } from '../constants/queryKeys';
import { Routes } from '../constants/routes';
import { getList } from '../utils/api';

const setupQueryOptions = () =>
  queryOptions({
    queryFn: getList,
    queryKey: [QueryKeys.LIST_SONGS],
    staleTime: Infinity,
  });

const RouteComponent = () => {
  return (
    <Suspense fallback='Loading...'>
      <MainComponent />
    </Suspense>
  );
};

export const Route = createFileRoute(Routes.LIST_SONGS)({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(setupQueryOptions());
  },
});

const MainComponent = () => {
  const { data } = useSuspenseQuery(setupQueryOptions());

  const subtitle = useMemo(() => `You have ${data.length} songs in your library`, [data]);

  return (
    <Container className='my-14 flex flex-col gap-10'>
      <PageTitle primary subtitle={subtitle} title='Your Library' />
      <ListSongs songs={data} />
    </Container>
  );
};
