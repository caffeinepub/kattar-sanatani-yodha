import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Member, Filter, IdCardRequest, LoginActivity } from '../backend';

export function useGetCallerMember() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Member | null>({
    queryKey: ['callerMember'],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getCallerMember();
      } catch {
        return null;
      }
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetAllMembers(filter?: Filter | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Member[]>({
    queryKey: ['allMembers', filter],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMembers(filter ?? null);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetAllIdCardRequests() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<IdCardRequest[]>({
    queryKey: ['allIdCardRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllIdCardRequests();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetAllLoginActivities() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<LoginActivity[]>({
    queryKey: ['allLoginActivities'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLoginActivities();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSubmitIdCardRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memberId: bigint) => {
      if (!actor) throw new Error('Actor not available');
      await actor.submitIdCardRequest(memberId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allIdCardRequests'] });
    },
  });
}

export function useRegisterMember() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (member: Member) => {
      if (!actor) throw new Error('Actor not available');
      return actor.registerMember(member);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allMembers'] });
    },
  });
}
