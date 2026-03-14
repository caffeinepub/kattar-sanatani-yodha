import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import {
  CheckCircle,
  CreditCard,
  Loader2,
  LogOut,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useMemberAuth } from "../hooks/useMemberAuth";
import { useSubmitIdCardRequest } from "../hooks/useMemberQueries";

export default function MemberDashboard() {
  const navigate = useNavigate();
  const { isLoggedIn, loggedInMemberId, loggedInMember, memberLogout } =
    useMemberAuth();
  const submitIdCard = useSubmitIdCardRequest();
  const [idCardSuccess, setIdCardSuccess] = useState(false);
  const [idCardError, setIdCardError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: "/login" });
    }
  }, [isLoggedIn, navigate]);

  const handleIdCardRequest = async () => {
    if (!loggedInMemberId) return;
    setIdCardError("");
    try {
      await submitIdCard.mutateAsync(loggedInMemberId);
      setIdCardSuccess(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "अनुरोध विफल। कृपया पुनः प्रयास करें।";
      setIdCardError(msg);
    }
  };

  const handleLogout = () => {
    memberLogout();
    navigate({ to: "/" });
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-primary">
              नमस्ते,{" "}
              {loggedInMember
                ? `${loggedInMember.firstName} ${loggedInMember.lastName}`
                : "सदस्य"}
              !
            </h1>
            <p className="text-foreground/60 text-sm mt-1">
              आपके सदस्यता डैशबोर्ड में आपका स्वागत है
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">लॉगआउट</span>
          </Button>
        </div>

        {/* Profile Card */}
        {loggedInMember ? (
          <div className="bg-card border border-border rounded-2xl shadow-warm p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-display text-lg font-semibold text-primary">
                प्रोफ़ाइल जानकारी
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <InfoRow label="पहला नाम" value={loggedInMember.firstName} />
              <InfoRow label="उपनाम" value={loggedInMember.lastName} />
              <InfoRow label="पेशा" value={loggedInMember.occupation} />
              <InfoRow label="ईमेल" value={loggedInMember.email} />
              <InfoRow label="संपर्क सूत्र" value={loggedInMember.contactNumber} />
              <InfoRow
                label="व्हाट्सएप नंबर"
                value={loggedInMember.whatsappNumber}
              />
              <InfoRow label="देश" value={loggedInMember.country} />
              <InfoRow label="राज्य" value={loggedInMember.state} />
              <InfoRow label="ज़िला" value={loggedInMember.district} />
              <InfoRow label="तहसील" value={loggedInMember.tehsil} />
              <InfoRow label="थाना" value={loggedInMember.policeStation} />
              <InfoRow
                label="ग्राम पंचायत"
                value={loggedInMember.gramPanchayat}
              />
              <InfoRow label="गांव" value={loggedInMember.village} />
              {loggedInMember.fullAddress && (
                <div className="sm:col-span-2">
                  <InfoRow label="पूरा पता" value={loggedInMember.fullAddress} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl shadow-warm p-6 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
              <p className="text-foreground/60">जानकारी लोड हो रही है...</p>
            </div>
          </div>
        )}

        {/* ID Card Request */}
        <div className="bg-card border border-border rounded-2xl shadow-warm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-display text-lg font-semibold text-primary">
              पहचान पत्र (ID Card)
            </h2>
          </div>

          {idCardSuccess ? (
            <div className="flex items-start gap-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-700 dark:text-green-400">
                  अनुरोध सफलतापूर्वक भेजा गया!
                </p>
                <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                  आपका ID Card अनुरोध प्रशासन को भेज दिया गया है।
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Payment instruction */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                <p className="text-foreground/80 leading-relaxed text-sm md:text-base font-medium">
                  कार्ड के लिए{" "}
                  <span className="text-primary font-bold">
                    101 राशी अनुदान करे
                  </span>{" "}
                  जो अपनी पार्टी का फंड जमा होगा।
                </p>
                <p className="text-foreground/70 leading-relaxed text-sm md:text-base mt-2">
                  भुगतान करने के लिए संपर्क सूत्र जो है उसे कॉल करें या संदेश भेजें या फिर नंबर{" "}
                  <a
                    href="https://wa.me/917008981360"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 font-bold hover:underline"
                  >
                    7008981360
                  </a>{" "}
                  पर व्हाट्सएप पर संदेश भेजें
                </p>
              </div>

              {/* Quick action buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/917008981360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp करें
                </a>
                <a
                  href="tel:+917008981360"
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors border border-primary/20"
                >
                  <Phone className="h-4 w-4" />
                  कॉल करें
                </a>
              </div>

              {idCardError && (
                <p className="text-destructive text-sm">{idCardError}</p>
              )}

              <Button
                onClick={handleIdCardRequest}
                disabled={submitIdCard.isPending}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
              >
                {submitIdCard.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    अनुरोध भेजा जा रहा है...
                  </>
                ) : (
                  "ID Card के लिए अनुरोध करें"
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs text-foreground/50 font-medium uppercase tracking-wide">
        {label}
      </p>
      <p className="text-foreground/80 mt-0.5">{value}</p>
    </div>
  );
}
