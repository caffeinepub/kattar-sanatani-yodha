import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Info,
  KeyRound,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useActor } from "../hooks/useActor";

function unwrapOptionalString(result: string | string[] | null): string | null {
  if (Array.isArray(result)) return result[0] ?? null;
  return result as string | null;
}

type Step = "email" | "otp" | "newPassword" | "success";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { actor } = useActor();

  const [step, setStep] = useState<Step>("email");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1 — Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!emailOrPhone.trim()) {
      setError("कृपया ईमेल या मोबाइल नंबर दर्ज करें।");
      return;
    }
    if (!actor) {
      setError("नेटवर्क से जुड़ रहा है, कृपया थोड़ी देर बाद पुनः प्रयास करें।");
      return;
    }
    setLoading(true);
    try {
      const raw = await actor.generatePasswordResetOtp(emailOrPhone.trim());
      const result = unwrapOptionalString(raw);
      if (result === null) {
        setError("यह ईमेल/नंबर पंजीकृत नहीं है।");
      } else {
        setGeneratedOtp(result);
        setStep("otp");
      }
    } catch {
      setError("OTP भेजने में त्रुटि हुई। पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — Verify OTP (client-side comparison)
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!otp.trim()) {
      setError("कृपया OTP दर्ज करें।");
      return;
    }
    if (otp.trim() === generatedOtp) {
      setStep("newPassword");
    } else {
      setError("गलत OTP। पुनः प्रयास करें।");
    }
  };

  // Step 3 — Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!newPassword || !confirmPassword) {
      setError("कृपया दोनों पासवर्ड फ़ील्ड भरें।");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("पासवर्ड मेल नहीं खाते। पुनः जांचें।");
      return;
    }
    if (newPassword.length < 6) {
      setError("पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।");
      return;
    }
    if (!actor || !generatedOtp) {
      setError("सत्र समाप्त हो गया। पृष्ठ पुनः लोड करें।");
      return;
    }
    setLoading(true);
    try {
      const success = await actor.resetMemberPassword(
        emailOrPhone.trim(),
        generatedOtp,
        newPassword,
      );
      if (success) {
        setStep("success");
      } else {
        setError("OTP अमान्य या समाप्त हो गया। पुनः प्रयास करें।");
      }
    } catch {
      setError("पासवर्ड रीसेट करने में त्रुटि हुई। पुनः प्रयास करें।");
    } finally {
      setLoading(false);
    }
  };

  const stepNumber =
    step === "email" ? 1 : step === "otp" ? 2 : step === "newPassword" ? 3 : 4;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back link */}
        <button
          type="button"
          onClick={() => navigate({ to: "/login" })}
          className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary mb-6 transition-colors"
          data-ocid="forgot.back_link"
        >
          <ArrowLeft className="h-4 w-4" />
          वापस लॉगिन पर जाएं
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <KeyRound className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-3xl font-bold text-primary mb-2">
            पासवर्ड रीसेट करें
          </h1>

          {/* Step indicators */}
          {step !== "success" && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                      s === stepNumber
                        ? "bg-primary text-primary-foreground"
                        : s < stepNumber
                          ? "bg-primary/60 text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s < stepNumber ? "✓" : s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`w-8 h-0.5 ${s < stepNumber ? "bg-primary/60" : "bg-muted"}`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-lg p-6 md:p-8">
          {/* ─── Step 1: Email / Phone ─── */}
          {step === "email" && (
            <form
              onSubmit={handleSendOtp}
              className="space-y-5"
              data-ocid="forgot.email_step.panel"
            >
              <p className="text-sm text-foreground/60 text-center">
                अपना पंजीकृत ईमेल या मोबाइल नंबर दर्ज करें।
              </p>
              <div>
                <Label
                  htmlFor="emailOrPhone"
                  className="text-foreground/80 font-medium"
                >
                  ईमेल या मोबाइल नंबर <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="emailOrPhone"
                  type="text"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="ईमेल या मोबाइल नंबर"
                  className="mt-1"
                  required
                  autoComplete="username"
                  data-ocid="forgot.email_input"
                />
              </div>

              {error && (
                <div
                  className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-lg p-3"
                  data-ocid="forgot.email_error_state"
                >
                  <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base font-bold"
                data-ocid="forgot.send_otp_button"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    OTP भेजा जा रहा है...
                  </>
                ) : (
                  "OTP भेजें"
                )}
              </Button>
            </form>
          )}

          {/* ─── Step 2: OTP Verification ─── */}
          {step === "otp" && (
            <form
              onSubmit={handleVerifyOtp}
              className="space-y-5"
              data-ocid="forgot.otp_step.panel"
            >
              <p className="text-sm text-foreground/60 text-center">
                OTP आपके पंजीकृत ईमेल/मोबाइल पर भेजा गया है।
              </p>

              {/* Display OTP on screen since real SMS/email not available */}
              {generatedOtp && (
                <div
                  className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-3"
                  data-ocid="forgot.otp_info"
                >
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-800 text-sm">
                    आपका OTP है:{" "}
                    <strong className="text-blue-900 text-lg tracking-widest font-mono">
                      {generatedOtp}
                    </strong>
                    <br />
                    <span className="text-xs text-blue-600">
                      (10 मिनट में उपयोग करें)
                    </span>
                  </p>
                </div>
              )}

              <div>
                <Label htmlFor="otp" className="text-foreground/80 font-medium">
                  OTP कोड <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="6 अंकों का OTP"
                  className="mt-1 text-center text-xl tracking-widest font-mono"
                  maxLength={6}
                  required
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  data-ocid="forgot.otp_input"
                />
              </div>

              {error && (
                <div
                  className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-lg p-3"
                  data-ocid="forgot.otp_error_state"
                >
                  <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base font-bold"
                data-ocid="forgot.verify_otp_button"
              >
                OTP सत्यापित करें
              </Button>

              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setError("");
                  setOtp("");
                }}
                className="w-full text-sm text-foreground/60 hover:text-primary text-center hover:underline"
              >
                OTP दोबारा भेजें
              </button>
            </form>
          )}

          {/* ─── Step 3: New Password ─── */}
          {step === "newPassword" && (
            <form
              onSubmit={handleResetPassword}
              className="space-y-5"
              data-ocid="forgot.password_step.panel"
            >
              <p className="text-sm text-foreground/60 text-center">
                अपना नया पासवर्ड सेट करें।
              </p>

              <div>
                <Label
                  htmlFor="newPassword"
                  className="text-foreground/80 font-medium"
                >
                  नया पासवर्ड <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="नया पासवर्ड दर्ज करें"
                  className="mt-1"
                  required
                  autoComplete="new-password"
                  data-ocid="forgot.new_password_input"
                />
              </div>

              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="text-foreground/80 font-medium"
                >
                  पासवर्ड की पुष्टि करें <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="पासवर्ड दोबारा दर्ज करें"
                  className="mt-1"
                  required
                  autoComplete="new-password"
                  data-ocid="forgot.confirm_password_input"
                />
              </div>

              {error && (
                <div
                  className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-lg p-3"
                  data-ocid="forgot.password_error_state"
                >
                  <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
                  <p className="text-destructive text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base font-bold"
                data-ocid="forgot.reset_password_button"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    रीसेट हो रहा है...
                  </>
                ) : (
                  "पासवर्ड रीसेट करें"
                )}
              </Button>
            </form>
          )}

          {/* ─── Step 4: Success ─── */}
          {step === "success" && (
            <div
              className="text-center space-y-5"
              data-ocid="forgot.success_state"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  पासवर्ड सफलतापूर्वक रीसेट हो गया!
                </h2>
                <p className="text-sm text-foreground/60">
                  आप अब अपने नए पासवर्ड से लॉगिन कर सकते हैं।
                </p>
              </div>
              <Button
                onClick={() => navigate({ to: "/login" })}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base font-bold"
                data-ocid="forgot.go_to_login_button"
              >
                लॉगिन करें
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
