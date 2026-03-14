import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useActor } from "../hooks/useActor";

interface SiteContentContextValue {
  get: (key: string, fallback: string) => string;
  loading: boolean;
  refresh: () => Promise<void>;
  contentMap: Map<string, string>;
}

const SiteContentContext = createContext<SiteContentContextValue>({
  get: (_key, fallback) => fallback,
  loading: true,
  refresh: async () => {},
  contentMap: new Map(),
});

export function SiteContentProvider({
  children,
}: { children: React.ReactNode }) {
  const { actor, isFetching } = useActor();
  const [contentMap, setContentMap] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    if (!actor) return;
    try {
      const entries = await actor.getSiteContent();
      const map = new Map<string, string>();
      for (const [k, v] of entries) {
        map.set(k, v);
      }
      setContentMap(map);
    } catch (e) {
      console.error("Failed to load site content:", e);
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    if (actor && !isFetching) {
      fetchContent();
    }
  }, [actor, isFetching, fetchContent]);

  const get = useCallback(
    (key: string, fallback: string): string => {
      const v = contentMap.get(key);
      return v !== undefined && v !== "" ? v : fallback;
    },
    [contentMap],
  );

  const refresh = useCallback(async () => {
    await fetchContent();
  }, [fetchContent]);

  return (
    <SiteContentContext.Provider value={{ get, loading, refresh, contentMap }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
