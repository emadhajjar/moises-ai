import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';

import { Song } from '../../components/Song';
import { QueryKeys } from '../../constants/queryKeys';
import { Routes } from '../../constants/routes';
import { getSong } from '../../utils/api';

const setupQueryOptions = (id: string) =>
  queryOptions({
    queryFn: () => getSong(id),
    queryKey: [QueryKeys.GET_SONG, id],
    staleTime: Infinity,
  });

const RouteComponent = () => {
  return (
    <Suspense fallback='Loading...'>
      <MainComponent />
    </Suspense>
  );
};

export const Route = createFileRoute(Routes.SONG)({
  component: RouteComponent,
  loader: ({ context, params }) => {
    context.queryClient.prefetchQuery(setupQueryOptions(params.id));
  },
});

const MainComponent = () => {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(setupQueryOptions(id));

  return <Song song={data} />;
};
