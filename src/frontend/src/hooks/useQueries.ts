import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

// This file is reserved for React Query hooks that interact with the backend.
// Currently, the backend only has a submitContactForm method which is handled
// directly in useContactForm.ts as it's a mutation, not a query.

// Example query hook structure (for future use):
// export function useGetData() {
//   const { actor, isFetching } = useActor();
//   return useQuery({
//     queryKey: ['data'],
//     queryFn: async () => {
//       if (!actor) return [];
//       return actor.getData();
//     },
//     enabled: !!actor && !isFetching,
//   });
// }
