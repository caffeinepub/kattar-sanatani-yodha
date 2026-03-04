import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import { AlertCircle, CheckCircle, Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Gender } from "../backend";
import type { FileData, Member } from "../backend";
import { useRegisterMember } from "../hooks/useMemberQueries";
import { getCountries, getDistricts, getStates } from "../utils/locationData";

const PHOTO_MAX_BYTES = 10 * 1024 * 1024;
const AADHAAR_MAX_BYTES = 15 * 1024 * 1024;

async function fileToFileData(file: File): Promise<FileData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1] || "";
      resolve({
        base64Data: base64,
        fileName: file.name,
        fileSize: BigInt(file.size),
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function Membership() {
  const navigate = useNavigate();
  const registerMember = useRegisterMember();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    occupation: "",
    fullAddress: "",
    contactNumber: "",
    whatsappNumber: "",
    email: "",
    tehsil: "",
    policeStation: "",
    gramPanchayat: "",
    village: "",
    country: "",
    state: "",
    district: "",
    gender: "" as string,
    password: "",
    confirmPassword: "",
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [aadhaarError, setAadhaarError] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const photoRef = useRef<HTMLInputElement>(null);
  const aadhaarRef = useRef<HTMLInputElement>(null);

  const countries = getCountries();
  const states = form.country ? getStates(form.country) : [];
  const districts =
    form.country && form.state ? getDistricts(form.country, form.state) : [];

  const handleChange = (field: string, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "country") {
        updated.state = "";
        updated.district = "";
      }
      if (field === "state") {
        updated.district = "";
      }
      return updated;
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > PHOTO_MAX_BYTES) {
      setPhotoError("फोटो का आकार 10 MB से अधिक नहीं होना चाहिए।");
      setPhotoFile(null);
    } else {
      setPhotoError("");
      setPhotoFile(file);
    }
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > AADHAAR_MAX_BYTES) {
      setAadhaarError("आधार कार्ड फोटो का आकार 15 MB से अधिक नहीं होना चाहिए।");
      setAadhaarFile(null);
    } else {
      setAadhaarError("");
      setAadhaarFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (
      !form.firstName ||
      !form.lastName ||
      !form.contactNumber ||
      !form.email ||
      !form.password
    ) {
      setFormError("कृपया सभी आवश्यक फ़ील्ड भरें।");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setFormError("पासवर्ड मेल नहीं खाते।");
      return;
    }
    if (!photoFile) {
      setFormError("कृपया अपनी फोटो अपलोड करें।");
      return;
    }
    if (!aadhaarFile) {
      setFormError("कृपया आधार कार्ड की फोटो अपलोड करें।");
      return;
    }
    if (!form.gender) {
      setFormError("कृपया लिंग चुनें।");
      return;
    }

    try {
      const photoData = await fileToFileData(photoFile);
      const aadhaarData = await fileToFileData(aadhaarFile);

      const genderMap: Record<string, Gender> = {
        male: Gender.male,
        female: Gender.female,
        other: Gender.other,
      };

      const member: Member = {
        id: BigInt(0),
        firstName: form.firstName,
        lastName: form.lastName,
        occupation: form.occupation,
        fullAddress: form.fullAddress,
        contactNumber: form.contactNumber,
        whatsappNumber: form.whatsappNumber,
        email: form.email,
        tehsil: form.tehsil,
        policeStation: form.policeStation,
        gramPanchayat: form.gramPanchayat,
        village: form.village,
        country: form.country,
        state: form.state,
        district: form.district,
        gender: genderMap[form.gender] || Gender.other,
        photo: photoData,
        aadhaarCardPhoto: aadhaarData,
        timestamp: BigInt(0),
        hashedPassword: form.password,
        ownerPrincipal: undefined,
      };

      await registerMember.mutateAsync(member);
      setSuccess(true);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "पंजीकरण विफल। कृपया पुनः प्रयास करें।";
      setFormError(msg);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-primary mb-3">
            पंजीकरण सफल!
          </h2>
          <p className="text-foreground/70 mb-6">
            आपका सदस्यता पंजीकरण सफलतापूर्वक हो गया है। अब आप लॉगिन कर सकते हैं।
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => navigate({ to: "/login" })}
              className="bg-primary text-primary-foreground"
            >
              लॉगिन करें
            </Button>
            <Button variant="outline" onClick={() => navigate({ to: "/" })}>
              होम पर जाएं
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
            सदस्यता पंजीकरण
          </h1>
          <p className="text-foreground/70">
            कट्टर सनातनी योद्धा परिवार में शामिल हों
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-2xl shadow-warm p-6 md:p-8 space-y-6"
        >
          {/* Personal Info */}
          <div>
            <h2 className="font-display text-lg font-semibold text-primary mb-4 border-b border-border pb-2">
              व्यक्तिगत जानकारी
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="firstName"
                  className="text-foreground/80 font-medium"
                >
                  पहला नाम <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={form.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="पहला नाम"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="lastName"
                  className="text-foreground/80 font-medium"
                >
                  उपनाम <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={form.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="उपनाम"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="occupation"
                  className="text-foreground/80 font-medium"
                >
                  पेशा
                </Label>
                <Input
                  id="occupation"
                  value={form.occupation}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                  placeholder="पेशा"
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="gender"
                  className="text-foreground/80 font-medium"
                >
                  लिंग <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={form.gender}
                  onValueChange={(v) => handleChange("gender", v)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="लिंग चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">पुरुष (Male)</SelectItem>
                    <SelectItem value="female">महिला (Female)</SelectItem>
                    <SelectItem value="other">अन्य (Other)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="font-display text-lg font-semibold text-primary mb-4 border-b border-border pb-2">
              संपर्क जानकारी
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="contactNumber"
                  className="text-foreground/80 font-medium"
                >
                  संपर्क सूत्र <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="contactNumber"
                  value={form.contactNumber}
                  onChange={(e) =>
                    handleChange("contactNumber", e.target.value)
                  }
                  placeholder="मोबाइल नंबर"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="whatsappNumber"
                  className="text-foreground/80 font-medium"
                >
                  व्हाट्सएप नंबर
                </Label>
                <Input
                  id="whatsappNumber"
                  value={form.whatsappNumber}
                  onChange={(e) =>
                    handleChange("whatsappNumber", e.target.value)
                  }
                  placeholder="व्हाट्सएप नंबर"
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label
                  htmlFor="email"
                  className="text-foreground/80 font-medium"
                >
                  ईमेल <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="ईमेल पता"
                  className="mt-1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="font-display text-lg font-semibold text-primary mb-4 border-b border-border pb-2">
              पता
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label
                  htmlFor="fullAddress"
                  className="text-foreground/80 font-medium"
                >
                  पूरा पता
                </Label>
                <Textarea
                  id="fullAddress"
                  value={form.fullAddress}
                  onChange={(e) => handleChange("fullAddress", e.target.value)}
                  placeholder="पूरा पता लिखें"
                  className="mt-1"
                  rows={2}
                />
              </div>
              <div>
                <Label
                  htmlFor="country"
                  className="text-foreground/80 font-medium"
                >
                  देश
                </Label>
                <Select
                  value={form.country}
                  onValueChange={(v) => handleChange("country", v)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="देश चुनें" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {countries.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="state"
                  className="text-foreground/80 font-medium"
                >
                  राज्य
                </Label>
                <Select
                  value={form.state}
                  onValueChange={(v) => handleChange("state", v)}
                  disabled={!form.country}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="राज्य चुनें" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {states.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="district"
                  className="text-foreground/80 font-medium"
                >
                  ज़िला
                </Label>
                <Select
                  value={form.district}
                  onValueChange={(v) => handleChange("district", v)}
                  disabled={!form.state}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="ज़िला चुनें" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {districts.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="tehsil"
                  className="text-foreground/80 font-medium"
                >
                  तहसील
                </Label>
                <Input
                  id="tehsil"
                  value={form.tehsil}
                  onChange={(e) => handleChange("tehsil", e.target.value)}
                  placeholder="तहसील"
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="policeStation"
                  className="text-foreground/80 font-medium"
                >
                  थाना
                </Label>
                <Input
                  id="policeStation"
                  value={form.policeStation}
                  onChange={(e) =>
                    handleChange("policeStation", e.target.value)
                  }
                  placeholder="थाना"
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="gramPanchayat"
                  className="text-foreground/80 font-medium"
                >
                  ग्राम पंचायत
                </Label>
                <Input
                  id="gramPanchayat"
                  value={form.gramPanchayat}
                  onChange={(e) =>
                    handleChange("gramPanchayat", e.target.value)
                  }
                  placeholder="ग्राम पंचायत"
                  className="mt-1"
                />
              </div>
              <div>
                <Label
                  htmlFor="village"
                  className="text-foreground/80 font-medium"
                >
                  गांव
                </Label>
                <Input
                  id="village"
                  value={form.village}
                  onChange={(e) => handleChange("village", e.target.value)}
                  placeholder="गांव"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <h2 className="font-display text-lg font-semibold text-primary mb-4 border-b border-border pb-2">
              दस्तावेज़
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-foreground/80 font-medium">
                  स्वयं की फोटो <span className="text-destructive">*</span>
                </Label>
                <p className="text-xs text-foreground/50 mb-2">
                  अधिकतम 10 MB, सभी प्रारूप
                </p>
                <button
                  type="button"
                  className="w-full border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors bg-transparent"
                  onClick={() => photoRef.current?.click()}
                >
                  <Upload className="h-6 w-6 mx-auto mb-2 text-foreground/40" />
                  {photoFile ? (
                    <p className="text-sm text-green-600 font-medium">
                      {photoFile.name}
                    </p>
                  ) : (
                    <p className="text-sm text-foreground/50">फोटो चुनें</p>
                  )}
                </button>
                <input
                  ref={photoRef}
                  type="file"
                  accept="*/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                {photoError && (
                  <p className="text-destructive text-xs mt-1">{photoError}</p>
                )}
              </div>
              <div>
                <Label className="text-foreground/80 font-medium">
                  आधार कार्ड की फोटो <span className="text-destructive">*</span>
                </Label>
                <p className="text-xs text-foreground/50 mb-2">
                  अधिकतम 15 MB, सभी प्रारूप
                </p>
                <button
                  type="button"
                  className="w-full border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors bg-transparent"
                  onClick={() => aadhaarRef.current?.click()}
                >
                  <Upload className="h-6 w-6 mx-auto mb-2 text-foreground/40" />
                  {aadhaarFile ? (
                    <p className="text-sm text-green-600 font-medium">
                      {aadhaarFile.name}
                    </p>
                  ) : (
                    <p className="text-sm text-foreground/50">आधार कार्ड चुनें</p>
                  )}
                </button>
                <input
                  ref={aadhaarRef}
                  type="file"
                  accept="*/*"
                  className="hidden"
                  onChange={handleAadhaarChange}
                />
                {aadhaarError && (
                  <p className="text-destructive text-xs mt-1">
                    {aadhaarError}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <h2 className="font-display text-lg font-semibold text-primary mb-4 border-b border-border pb-2">
              पासवर्ड
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="पासवर्ड बनाएं"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="text-foreground/80 font-medium"
                >
                  पासवर्ड पुनः दर्ज करें <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  placeholder="पासवर्ड दोबारा लिखें"
                  className="mt-1"
                  required
                />
              </div>
            </div>
          </div>

          {formError && (
            <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/30 rounded-lg p-3">
              <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
              <p className="text-destructive text-sm">{formError}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={registerMember.isPending}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 text-base font-bold"
          >
            {registerMember.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                पंजीकरण हो रहा है...
              </>
            ) : (
              "सदस्यता के लिए आवेदन करें"
            )}
          </Button>

          <p className="text-center text-sm text-foreground/60">
            पहले से सदस्य हैं?{" "}
            <button
              type="button"
              onClick={() => navigate({ to: "/login" })}
              className="text-primary hover:underline font-medium"
            >
              लॉगिन करें
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
