import { useQuery } from 'react-query';

import type { Treatment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  const fallback = [];
  const { data = fallback } = useQuery(
    queryKeys.treatments,
    getTreatments,
    // {
    // onError: (error) => {
    //   const title =
    //     error instanceof Error
    //       ? error.message
    //       : 'error connecting to the server';
    //   toast({ title, status: 'error' });
    // },
    // }
  );
  return data;
}
// 각각의 컴포넌트마다 error handling을 해주는게 아니라 react-query/queryClient(이것을 app.tsx에서 불러옴)에서 중앙집중식으로 해줄 수 있음
