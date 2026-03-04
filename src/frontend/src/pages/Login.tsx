import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, Loader2, LogIn } from "lucide-react";
import { useState } from "react";
import { useMemberAuth } from "../hooks/useMemberAuth";

export default function Login() {
  const navigate = useNavigate();
  const { memberLogin, isLoggingIn, loginError } = useMemberAuth();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!emailOrPhone || !password) {
      setLocalError("कृपया नंबर/ईमेल और पासवर्ड दर्ज करें।");
      return;
    }

    const success = await memberLogin(emailOrPhone, password);
    if (success) {
      navigate({ to: "/dashboard" });
    }
  };

  const errorMsg = localError || loginError;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold text-primary mb-2">
            सदस्य लॉगिन
          </h1>
          <p className="text-foreground/60">अपने खाते में प्रवेश करें</p>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-warm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label
                htmlFor="emailOrPhone"
                className="text-foreground/80 font-medium"
              >
                नंबर/ईमेल <span className="text-destructive">*</span>
              </Label>
              <Input
                id="emailOrPhone"
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="मोबाइल नंबर या ईमेल"
                className="mt-1"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="text-foreground/80 font-medium"
              >
                पासवर्ड <span className="text-destructive">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="पासवर्ड दर्ज करें"
                className="mt-1"
                required
                autoComplete="current-password"
              />
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-lg p-3">
                <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                <p className="text-destructive text-sm">{errorMsg}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base font-bold"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  लॉगिन हो रहा है...
                </>
              ) : (
                "लॉगिन करें"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-foreground/60">
              सदस्य नहीं हैं?{" "}
              <button
                type="button"
                onClick={() => navigate({ to: "/membership" })}
                className="text-primary hover:underline font-medium"
              >
                सदस्यता लें
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
