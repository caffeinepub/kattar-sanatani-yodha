import { useMutation } from "@tanstack/react-query";
import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { MemberPublic } from "../backend";
import { useActor } from "./useActor";

interface MemberAuthContextType {
  loggedInMemberId: bigint | null;
  loggedInMember: MemberPublic | null;
  isLoggedIn: boolean;
  memberLogin: (emailOrPhone: string, password: string) => Promise<boolean>;
  memberLogout: () => void;
  isLoggingIn: boolean;
  loginError: string | null;
}

const MemberAuthContext = createContext<MemberAuthContextType | null>(null);

// Unwrap Candid optional ?Nat -> bigint | null
function unwrapOptionalNat(result: unknown): bigint | null {
  if (Array.isArray(result)) {
    return result.length > 0 ? (result[0] as bigint) : null;
  }
  if (result === null || result === undefined) return null;
  return result as bigint;
}

export function MemberAuthProvider({
  children,
}: { children: React.ReactNode }) {
  const { actor } = useActor();
  const [loggedInMemberId, setLoggedInMemberId] = useState<bigint | null>(
    () => {
      const stored = localStorage.getItem("memberLoggedInId");
      return stored ? BigInt(stored) : null;
    },
  );
  const [loggedInMember, setLoggedInMember] = useState<MemberPublic | null>(
    null,
  );
  const [loginError, setLoginError] = useState<string | null>(null);

  // Restore member data on page load if we have a stored member ID
  useEffect(() => {
    if (!actor || !loggedInMemberId) return;
    actor
      .getMemberById(loggedInMemberId)
      .then((m) => {
        if (m) setLoggedInMember(m);
      })
      .catch(() => {});
  }, [actor, loggedInMemberId]);

  const loginMutation = useMutation({
    mutationFn: async ({
      emailOrPhone,
      password,
    }: { emailOrPhone: string; password: string }) => {
      if (!actor) throw new Error("Actor not available");
      const raw = await actor.loginMember(emailOrPhone, password);
      return unwrapOptionalNat(raw);
    },
    onSuccess: async (memberId) => {
      if (memberId !== null) {
        setLoggedInMemberId(memberId);
        localStorage.setItem("memberLoggedInId", memberId.toString());
        setLoginError(null);
        // Fetch and cache member data
        if (actor) {
          try {
            const member = await actor.getMemberById(memberId);
            if (member) setLoggedInMember(member);
          } catch {}
        }
      } else {
        setLoginError("लॉगिन विफल। कृपया अपनी जानकारी जांचें।");
      }
    },
    onError: () => {
      setLoginError("लॉगिन विफल। कृपया अपनी जानकारी जांचें।");
    },
  });

  const memberLogin = useCallback(
    async (emailOrPhone: string, password: string): Promise<boolean> => {
      setLoginError(null);
      const result = await loginMutation.mutateAsync({
        emailOrPhone,
        password,
      });
      return result !== null;
    },
    [loginMutation],
  );

  const memberLogout = useCallback(() => {
    setLoggedInMemberId(null);
    setLoggedInMember(null);
    localStorage.removeItem("memberLoggedInId");
    setLoginError(null);
  }, []);

  return (
    <MemberAuthContext.Provider
      value={{
        loggedInMemberId,
        loggedInMember,
        isLoggedIn: loggedInMemberId !== null,
        memberLogin,
        memberLogout,
        isLoggingIn: loginMutation.isPending,
        loginError,
      }}
    >
      {children}
    </MemberAuthContext.Provider>
  );
}

export function useMemberAuth(): MemberAuthContextType {
  const ctx = useContext(MemberAuthContext);
  if (!ctx)
    throw new Error("useMemberAuth must be used within MemberAuthProvider");
  return ctx;
}
