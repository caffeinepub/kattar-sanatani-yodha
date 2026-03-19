import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  Check,
  Copy,
  CreditCard,
  Download,
  FileEdit,
  Loader2,
  LogIn,
  LogOut,
  Save,
  Search,
  Shield,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import type { Filter } from "../backend";
import { Gender, SortBy } from "../backend";
import { useSiteContent } from "../context/SiteContentContext";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetAllIdCardRequests,
  useGetAllLoginActivities,
  useGetAllMembers,
} from "../hooks/useMemberQueries";
import { useGetIsCallerAdmin } from "../hooks/useQueries";

function formatDate(timestamp: bigint | number): string {
  const ms =
    typeof timestamp === "bigint" ? Number(timestamp) / 1_000_000 : timestamp;
  return new Date(ms).toLocaleString("hi-IN");
}

function formatFileSize(bytes: bigint): string {
  const n = Number(bytes);
  if (n === 0) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function genderLabel(g: Gender): string {
  if (g === Gender.male) return "पुरुष";
  if (g === Gender.female) return "महिला";
  return "अन्य";
}

// Content editor section definition
type ContentField = { key: string; label: string; multiline?: boolean };
type ContentSection = { id: string; title: string; fields: ContentField[] };

const CONTENT_SECTIONS: ContentSection[] = [
  {
    id: "hero",
    title: "हीरो सेक्शन (Hero)",
    fields: [
      { key: "hero.title", label: "शीर्षक (Title)" },
      { key: "hero.tagline", label: "टैगलाइन" },
      {
        key: "hero.description",
        label: "विवरण (Description)",
        multiline: true,
      },
      { key: "hero.cta_primary", label: "प्राथमिक बटन" },
      { key: "hero.cta_secondary", label: "द्वितीयक बटन" },
    ],
  },
  {
    id: "mission",
    title: "मिशन सेक्शन (Mission)",
    fields: [
      { key: "mission.title", label: "शीर्षक" },
      { key: "mission.description", label: "विवरण", multiline: true },
      { key: "mission.value1.title", label: "मूल्य 1 शीर्षक" },
      {
        key: "mission.value1.description",
        label: "मूल्य 1 विवरण",
        multiline: true,
      },
      { key: "mission.value2.title", label: "मूल्य 2 शीर्षक" },
      {
        key: "mission.value2.description",
        label: "मूल्य 2 विवरण",
        multiline: true,
      },
      { key: "mission.value3.title", label: "मूल्य 3 शीर्षक" },
      {
        key: "mission.value3.description",
        label: "मूल्य 3 विवरण",
        multiline: true,
      },
      { key: "mission.value4.title", label: "मूल्य 4 शीर्षक" },
      {
        key: "mission.value4.description",
        label: "मूल्य 4 विवरण",
        multiline: true,
      },
    ],
  },
  {
    id: "home",
    title: "होम पेज (Home)",
    fields: [
      { key: "home.whatwedo.title", label: "सेक्शन शीर्षक" },
      { key: "home.whatwedo.subtitle", label: "सेक्शन उपशीर्षक", multiline: true },
      { key: "home.highlight1.title", label: "कार्ड 1 शीर्षक" },
      {
        key: "home.highlight1.description",
        label: "कार्ड 1 विवरण",
        multiline: true,
      },
      { key: "home.highlight2.title", label: "कार्ड 2 शीर्षक" },
      {
        key: "home.highlight2.description",
        label: "कार्ड 2 विवरण",
        multiline: true,
      },
      { key: "home.highlight3.title", label: "कार्ड 3 शीर्षक" },
      {
        key: "home.highlight3.description",
        label: "कार्ड 3 विवरण",
        multiline: true,
      },
      { key: "home.highlight4.title", label: "कार्ड 4 शीर्षक" },
      {
        key: "home.highlight4.description",
        label: "कार्ड 4 विवरण",
        multiline: true,
      },
      { key: "home.cta.title", label: "CTA शीर्षक" },
      { key: "home.cta.description", label: "CTA विवरण", multiline: true },
    ],
  },
  {
    id: "about",
    title: "हमारे बारे में (About)",
    fields: [
      { key: "about.hero.title", label: "हीरो शीर्षक" },
      { key: "about.hero.subtitle", label: "हीरो उपशीर्षक", multiline: true },
      { key: "about.story.title", label: "कहानी शीर्षक" },
      { key: "about.story.para1", label: "अनुच्छेद 1", multiline: true },
      { key: "about.story.para2", label: "अनुच्छेद 2", multiline: true },
      { key: "about.principle1.title", label: "सिद्धांत 1 शीर्षक" },
      {
        key: "about.principle1.description",
        label: "सिद्धांत 1 विवरण",
        multiline: true,
      },
      { key: "about.principle2.title", label: "सिद्धांत 2 शीर्षक" },
      {
        key: "about.principle2.description",
        label: "सिद्धांत 2 विवरण",
        multiline: true,
      },
      { key: "about.principle3.title", label: "सिद्धांत 3 शीर्षक" },
      {
        key: "about.principle3.description",
        label: "सिद्धांत 3 विवरण",
        multiline: true,
      },
      { key: "about.principle4.title", label: "सिद्धांत 4 शीर्षक" },
      {
        key: "about.principle4.description",
        label: "सिद्धांत 4 विवरण",
        multiline: true,
      },
    ],
  },
  {
    id: "programs",
    title: "कार्यक्रम (Programs)",
    fields: [
      { key: "programs.title", label: "शीर्षक" },
      { key: "programs.subtitle", label: "उपशीर्षक", multiline: true },
      { key: "programs.card1.title", label: "कार्ड 1 शीर्षक" },
      {
        key: "programs.card1.description",
        label: "कार्ड 1 विवरण",
        multiline: true,
      },
      { key: "programs.card2.title", label: "कार्ड 2 शीर्षक" },
      {
        key: "programs.card2.description",
        label: "कार्ड 2 विवरण",
        multiline: true,
      },
      { key: "programs.card3.title", label: "कार्ड 3 शीर्षक" },
      {
        key: "programs.card3.description",
        label: "कार्ड 3 विवरण",
        multiline: true,
      },
    ],
  },
  {
    id: "contact",
    title: "संपर्क (Contact)",
    fields: [
      { key: "contact.title", label: "पेज शीर्षक" },
      { key: "contact.subtitle", label: "पेज उपशीर्षक", multiline: true },
      { key: "contact.email", label: "ईमेल" },
      { key: "contact.phone1", label: "फ़ोन 1" },
      { key: "contact.phone2", label: "फ़ोन 2" },
      { key: "contact.address", label: "पता" },
    ],
  },
  {
    id: "footer",
    title: "फूटर (Footer)",
    fields: [
      { key: "footer.tagline", label: "टैगलाइन" },
      { key: "footer.description", label: "विवरण", multiline: true },
    ],
  },
];

function ContentEditor() {
  const { contentMap, refresh } = useSiteContent();
  const { actor } = useActor();
  const [localValues, setLocalValues] = useState<Record<string, string>>({});
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [savingAll, setSavingAll] = useState(false);

  // Initialize local values from contentMap
  useEffect(() => {
    const init: Record<string, string> = {};
    for (const section of CONTENT_SECTIONS) {
      for (const field of section.fields) {
        init[field.key] = contentMap.get(field.key) ?? "";
      }
    }
    setLocalValues(init);
  }, [contentMap]);

  const handleChange = useCallback((key: string, value: string) => {
    setLocalValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const saveSection = async (section: ContentSection) => {
    if (!actor) return;
    setSavingSection(section.id);
    try {
      const entries: Array<[string, string]> = section.fields.map((f) => [
        f.key,
        localValues[f.key] ?? "",
      ]);
      await actor.setSiteContentBulk(entries);
      await refresh();
      toast.success(`${section.title} सहेजा गया!`);
    } catch (_e) {
      toast.error("सहेजने में त्रुटि हुई");
    } finally {
      setSavingSection(null);
    }
  };

  const saveAll = async () => {
    if (!actor) return;
    setSavingAll(true);
    try {
      const entries: Array<[string, string]> = Object.entries(localValues);
      await actor.setSiteContentBulk(entries);
      await refresh();
      toast.success("सभी सामग्री सहेजी गई!");
    } catch (_e) {
      toast.error("सहेजने में त्रुटि हुई");
    } finally {
      setSavingAll(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          साइट की सामग्री संपादित करें और सहेजें
        </p>
        <Button
          onClick={saveAll}
          disabled={savingAll}
          data-ocid="admin.content.save_button"
          className="flex items-center gap-2"
        >
          {savingAll ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          सभी सहेजें
        </Button>
      </div>

      {CONTENT_SECTIONS.map((section) => (
        <div
          key={section.id}
          className="bg-card border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold text-foreground">
              {section.title}
            </h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => saveSection(section)}
              disabled={savingSection === section.id}
              data-ocid={`admin.content.${section.id}.save_button`}
              className="flex items-center gap-1.5"
            >
              {savingSection === section.id ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              सहेजें
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {section.fields.map((field) => (
              <div key={field.key}>
                <label
                  htmlFor={field.key}
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  {field.label}
                  <span className="ml-2 text-xs text-muted-foreground font-mono">
                    ({field.key})
                  </span>
                </label>
                {field.multiline ? (
                  <Textarea
                    id={field.key}
                    value={localValues[field.key] ?? ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    rows={3}
                    className="text-sm"
                    data-ocid={`admin.content.${field.key.replace(/\./g, "_")}.textarea`}
                  />
                ) : (
                  <Input
                    id={field.key}
                    value={localValues[field.key] ?? ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="text-sm"
                    data-ocid={`admin.content.${field.key.replace(/\./g, "_")}.input`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const { identity, login, loginStatus, clear } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useGetIsCallerAdmin();

  const [memberSearch, setMemberSearch] = useState("");
  const [memberSort, setMemberSort] = useState<SortBy>(SortBy.timestampDesc);
  const [copied, setCopied] = useState(false);

  const memberFilter: Filter = {
    searchTerm: memberSearch || undefined,
    sortBy: memberSort,
  };

  const { data: members = [], isLoading: membersLoading } =
    useGetAllMembers(memberFilter);
  const { data: idCardRequests = [], isLoading: idCardLoading } =
    useGetAllIdCardRequests();
  const { data: loginActivities = [], isLoading: activitiesLoading } =
    useGetAllLoginActivities();

  const isAuthenticated = !!identity;

  const handleCopyPrincipal = () => {
    const principalId = identity?.getPrincipal().toString() ?? "";
    navigator.clipboard.writeText(principalId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-primary mb-3">
            प्रशासन पैनल
          </h1>
          <p className="text-foreground/60 mb-6">
            प्रशासन पैनल तक पहुंचने के लिए लॉगिन करें।
          </p>
          <Button
            onClick={login}
            disabled={loginStatus === "logging-in"}
            className="bg-primary text-primary-foreground"
            data-ocid="admin.login.button"
          >
            {loginStatus === "logging-in"
              ? "लॉगिन हो रहा है..."
              : "Internet Identity से लॉगिन करें"}
          </Button>
        </div>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3" />
          <p className="text-foreground/60">जांच हो रही है...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    const principalId = identity?.getPrincipal().toString() ?? "";
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-lg w-full">
          <Shield className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-destructive mb-2">
            पहुंच अस्वीकृत
          </h2>
          <p className="text-foreground/60 mb-4">
            आपके पास प्रशासन पैनल तक पहुंचने की अनुमति नहीं है।
          </p>

          {/* Principal ID display box */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-left">
            <p className="text-sm font-semibold text-amber-800 mb-2">
              आपका Principal ID:
            </p>
            <p className="text-xs text-amber-700 mb-3">
              इस ID को कॉपी करें और chat में भेजें ताकि admin आपको access दे सके।
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-white border border-amber-200 rounded-lg px-3 py-2 text-xs font-mono text-amber-900 break-all select-all">
                {principalId || "लोड हो रहा है..."}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyPrincipal}
                className="shrink-0 border-amber-300 text-amber-800 hover:bg-amber-100"
                data-ocid="admin.principal.secondary_button"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="ml-1.5">{copied ? "कॉपी!" : "कॉपी"}</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate({ to: "/" })}>
              होम पर जाएं
            </Button>
            <Button
              variant="destructive"
              onClick={clear}
              className="flex items-center gap-2"
              data-ocid="admin.logout.button"
            >
              <LogOut className="h-4 w-4" />
              दूसरे Account से Login करें
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const exportMembersCSV = () => {
    const headers = [
      "ID",
      "पहला नाम",
      "उपनाम",
      "पेशा",
      "ईमेल",
      "संपर्क",
      "व्हाट्सएप",
      "देश",
      "राज्य",
      "ज़िला",
      "तहसील",
      "थाना",
      "ग्राम पंचायत",
      "गांव",
      "लिंग",
      "फोटो",
      "आधार",
      "समय",
    ];
    const rows = members.map((m) => [
      m.id.toString(),
      m.firstName,
      m.lastName,
      m.occupation,
      m.email,
      m.contactNumber,
      m.whatsappNumber,
      m.country,
      m.state,
      m.district,
      m.tehsil,
      m.policeStation,
      m.gramPanchayat,
      m.village,
      genderLabel(m.gender),
      m.photo.fileName
        ? `${m.photo.fileName} (${formatFileSize(m.photo.fileSize)})`
        : "—",
      m.aadhaarCardPhoto.fileName
        ? `${m.aadhaarCardPhoto.fileName} (${formatFileSize(m.aadhaarCardPhoto.fileSize)})`
        : "—",
      formatDate(m.timestamp),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${c}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "members.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-primary">
                प्रशासन पैनल
              </h1>
              <p className="text-foreground/50 text-sm">सभी डेटा प्रबंधन</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              {members.length} सदस्य
            </Badge>
            <Badge variant="outline" className="text-xs">
              {idCardRequests.length} पहचान पत्र अनुरोध
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="members">
          <TabsList className="mb-6 flex flex-wrap gap-1 h-auto">
            <TabsTrigger
              value="members"
              className="flex items-center gap-1.5"
              data-ocid="admin.members.tab"
            >
              <Users className="h-4 w-4" />
              सदस्य ({members.length})
            </TabsTrigger>
            <TabsTrigger
              value="idcards"
              className="flex items-center gap-1.5"
              data-ocid="admin.idcards.tab"
            >
              <CreditCard className="h-4 w-4" />
              ID अनुरोध ({idCardRequests.length})
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="flex items-center gap-1.5"
              data-ocid="admin.activities.tab"
            >
              <Activity className="h-4 w-4" />
              लॉगिन गतिविधि ({loginActivities.length})
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="flex items-center gap-1.5"
              data-ocid="admin.content.tab"
            >
              <FileEdit className="h-4 w-4" />
              सामग्री संपादक
            </TabsTrigger>
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members">
            <div className="bg-card border border-border rounded-2xl shadow-warm overflow-hidden">
              <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="flex items-center gap-2 flex-1 max-w-sm">
                  <Search className="h-4 w-4 text-foreground/40" />
                  <Input
                    placeholder="नाम, ईमेल या पेशा खोजें..."
                    value={memberSearch}
                    onChange={(e) => setMemberSearch(e.target.value)}
                    className="h-8 text-sm"
                    data-ocid="admin.members.search_input"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={memberSort}
                    onChange={(e) => setMemberSort(e.target.value as SortBy)}
                    className="text-sm border border-border rounded-md px-2 py-1 bg-background text-foreground"
                    data-ocid="admin.members.select"
                  >
                    <option value={SortBy.timestampDesc}>नवीनतम पहले</option>
                    <option value={SortBy.timestampAsc}>पुराने पहले</option>
                    <option value={SortBy.lastNameAsc}>उपनाम A-Z</option>
                    <option value={SortBy.lastNameDesc}>उपनाम Z-A</option>
                  </select>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={exportMembersCSV}
                    className="flex items-center gap-1.5"
                    data-ocid="admin.members.secondary_button"
                  >
                    <Download className="h-3.5 w-3.5" />
                    CSV
                  </Button>
                </div>
              </div>

              {membersLoading ? (
                <div
                  className="p-8 text-center text-foreground/50"
                  data-ocid="admin.members.loading_state"
                >
                  लोड हो रहा है...
                </div>
              ) : members.length === 0 ? (
                <div
                  className="p-8 text-center text-foreground/50"
                  data-ocid="admin.members.empty_state"
                >
                  कोई सदस्य नहीं मिला।
                </div>
              ) : (
                <ScrollArea className="w-full">
                  <Table data-ocid="admin.members.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">ID</TableHead>
                        <TableHead className="text-xs">नाम</TableHead>
                        <TableHead className="text-xs">पेशा</TableHead>
                        <TableHead className="text-xs">ईमेल</TableHead>
                        <TableHead className="text-xs">संपर्क</TableHead>
                        <TableHead className="text-xs">व्हाट्सएप</TableHead>
                        <TableHead className="text-xs">देश/राज्य/ज़िला</TableHead>
                        <TableHead className="text-xs">तहसील/थाना</TableHead>
                        <TableHead className="text-xs">ग्राम/गांव</TableHead>
                        <TableHead className="text-xs">लिंग</TableHead>
                        <TableHead className="text-xs">फोटो</TableHead>
                        <TableHead className="text-xs">आधार</TableHead>
                        <TableHead className="text-xs">समय</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {members.map((m, idx) => (
                        <TableRow
                          key={m.id.toString()}
                          data-ocid={`admin.members.row.${idx + 1}`}
                        >
                          <TableCell className="text-xs font-mono">
                            {m.id.toString()}
                          </TableCell>
                          <TableCell className="text-xs font-medium whitespace-nowrap">
                            {m.firstName} {m.lastName}
                          </TableCell>
                          <TableCell className="text-xs">
                            {m.occupation || "—"}
                          </TableCell>
                          <TableCell className="text-xs">{m.email}</TableCell>
                          <TableCell className="text-xs">
                            {m.contactNumber ? (
                              <a
                                href={`tel:${m.contactNumber}`}
                                className="text-primary hover:underline"
                              >
                                {m.contactNumber}
                              </a>
                            ) : (
                              "—"
                            )}
                          </TableCell>
                          <TableCell className="text-xs">
                            {m.whatsappNumber ? (
                              <a
                                href={`https://wa.me/${m.whatsappNumber.replace(/\D/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:underline"
                              >
                                {m.whatsappNumber}
                              </a>
                            ) : (
                              "—"
                            )}
                          </TableCell>
                          <TableCell className="text-xs whitespace-nowrap">
                            {[m.country, m.state, m.district]
                              .filter(Boolean)
                              .join(" / ") || "—"}
                          </TableCell>
                          <TableCell className="text-xs whitespace-nowrap">
                            {[m.tehsil, m.policeStation]
                              .filter(Boolean)
                              .join(" / ") || "—"}
                          </TableCell>
                          <TableCell className="text-xs whitespace-nowrap">
                            {[m.gramPanchayat, m.village]
                              .filter(Boolean)
                              .join(" / ") || "—"}
                          </TableCell>
                          <TableCell className="text-xs">
                            {genderLabel(m.gender)}
                          </TableCell>
                          <TableCell className="text-xs">
                            {m.photo.fileName ? (
                              <span className="text-green-600">
                                {m.photo.fileName}
                                <br />
                                <span className="text-foreground/40">
                                  {formatFileSize(m.photo.fileSize)}
                                </span>
                              </span>
                            ) : (
                              "—"
                            )}
                          </TableCell>
                          <TableCell className="text-xs">
                            {m.aadhaarCardPhoto.fileName ? (
                              <span className="text-green-600">
                                {m.aadhaarCardPhoto.fileName}
                                <br />
                                <span className="text-foreground/40">
                                  {formatFileSize(m.aadhaarCardPhoto.fileSize)}
                                </span>
                              </span>
                            ) : (
                              "—"
                            )}
                          </TableCell>
                          <TableCell className="text-xs whitespace-nowrap">
                            {formatDate(m.timestamp)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              )}
            </div>
          </TabsContent>

          {/* ID Card Requests Tab */}
          <TabsContent value="idcards">
            <div className="bg-card border border-border rounded-2xl shadow-warm overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  ID Card अनुरोध
                </h3>
              </div>
              {idCardLoading ? (
                <div
                  className="p-8 text-center text-foreground/50"
                  data-ocid="admin.idcards.loading_state"
                >
                  लोड हो रहा है...
                </div>
              ) : idCardRequests.length === 0 ? (
                <div
                  className="p-8 text-center text-foreground/50"
                  data-ocid="admin.idcards.empty_state"
                >
                  कोई ID Card अनुरोध नहीं।
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>सदस्य ID</TableHead>
                      <TableHead>अनुरोधकर्ता</TableHead>
                      <TableHead>समय</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {idCardRequests.map((req, i) => (
                      <TableRow
                        key={`req-${req.memberId.toString()}-${i}`}
                        data-ocid={`admin.idcards.row.${i + 1}`}
                      >
                        <TableCell className="font-mono">
                          {req.memberId.toString()}
                        </TableCell>
                        <TableCell className="text-xs text-foreground/60 font-mono">
                          {req.requestedBy ? req.requestedBy.toString() : "—"}
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(req.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>

          {/* Login Activities Tab */}
          <TabsContent value="activities">
            <div className="bg-card border border-border rounded-2xl shadow-warm overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <LogIn className="h-4 w-4 text-primary" />
                  लॉगिन गतिविधि
                </h3>
              </div>
              {activitiesLoading ? (
                <div
                  className="p-8 text-center text-foreground/50"
                  data-ocid="admin.activities.loading_state"
                >
                  लोड हो रहा है...
                </div>
              ) : loginActivities.length === 0 ? (
                <div
                  className="p-8 text-center text-foreground/50"
                  data-ocid="admin.activities.empty_state"
                >
                  कोई लॉगिन गतिविधि नहीं।
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>सदस्य ID</TableHead>
                      <TableHead>स्थिति</TableHead>
                      <TableHead>समय</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loginActivities.map((act, i) => (
                      <TableRow
                        key={`act-${act.memberId.toString()}-${i}`}
                        data-ocid={`admin.activities.row.${i + 1}`}
                      >
                        <TableCell className="font-mono">
                          {act.memberId.toString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={act.successful ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {act.successful ? "सफल" : "विफल"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(act.timestamp)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </TabsContent>

          {/* Content Editor Tab */}
          <TabsContent value="content">
            <ContentEditor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
