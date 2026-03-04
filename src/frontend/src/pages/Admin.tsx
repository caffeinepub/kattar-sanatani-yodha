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
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  CreditCard,
  Download,
  LogIn,
  Search,
  Shield,
  Users,
} from "lucide-react";
import { useState } from "react";
import type { Filter } from "../backend";
import { Gender, SortBy } from "../backend";
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

export default function Admin() {
  const navigate = useNavigate();
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useGetIsCallerAdmin();

  const [memberSearch, setMemberSearch] = useState("");
  const [memberSort, setMemberSort] = useState<SortBy>(SortBy.timestampDesc);

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
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <Shield className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-destructive mb-2">
            पहुंच अस्वीकृत
          </h2>
          <p className="text-foreground/60 mb-4">
            आपके पास प्रशासन पैनल तक पहुंचने की अनुमति नहीं है।
          </p>
          <Button variant="outline" onClick={() => navigate({ to: "/" })}>
            होम पर जाएं
          </Button>
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
              {idCardRequests.length} ID अनुरोध
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="members">
          <TabsList className="mb-6 flex flex-wrap gap-1 h-auto">
            <TabsTrigger value="members" className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              सदस्य ({members.length})
            </TabsTrigger>
            <TabsTrigger value="idcards" className="flex items-center gap-1.5">
              <CreditCard className="h-4 w-4" />
              ID अनुरोध ({idCardRequests.length})
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="flex items-center gap-1.5"
            >
              <Activity className="h-4 w-4" />
              लॉगिन गतिविधि ({loginActivities.length})
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
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={memberSort}
                    onChange={(e) => setMemberSort(e.target.value as SortBy)}
                    className="text-sm border border-border rounded-md px-2 py-1 bg-background text-foreground"
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
                  >
                    <Download className="h-3.5 w-3.5" />
                    CSV
                  </Button>
                </div>
              </div>

              {membersLoading ? (
                <div className="p-8 text-center text-foreground/50">
                  लोड हो रहा है...
                </div>
              ) : members.length === 0 ? (
                <div className="p-8 text-center text-foreground/50">
                  कोई सदस्य नहीं मिला।
                </div>
              ) : (
                <ScrollArea className="w-full">
                  <Table>
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
                      {members.map((m) => (
                        <TableRow key={m.id.toString()}>
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
                <div className="p-8 text-center text-foreground/50">
                  लोड हो रहा है...
                </div>
              ) : idCardRequests.length === 0 ? (
                <div className="p-8 text-center text-foreground/50">
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
                      <TableRow key={`req-${req.memberId.toString()}-${i}`}>
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
                <div className="p-8 text-center text-foreground/50">
                  लोड हो रहा है...
                </div>
              ) : loginActivities.length === 0 ? (
                <div className="p-8 text-center text-foreground/50">
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
                      <TableRow key={`act-${act.memberId.toString()}-${i}`}>
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
        </Tabs>
      </div>
    </div>
  );
}
