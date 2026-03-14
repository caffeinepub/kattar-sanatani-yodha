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
  CreditCard,
  Download,
  FileEdit,
  Loader2,
  LogIn,
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
  if (n === 0) return "\u2014";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

function genderLabel(g: Gender): string {
  if (g === Gender.male) return "\u092a\u0941\u0930\u0941\u0937";
  if (g === Gender.female) return "\u092e\u0939\u093f\u0932\u093e";
  return "\u0905\u0928\u094d\u092f";
}

// Content editor section definition
type ContentField = { key: string; label: string; multiline?: boolean };
type ContentSection = { id: string; title: string; fields: ContentField[] };

const CONTENT_SECTIONS: ContentSection[] = [
  {
    id: "hero",
    title:
      "\u0939\u0940\u0930\u094b \u0938\u0947\u0915\u094d\u0936\u0928 (Hero)",
    fields: [
      {
        key: "hero.title",
        label: "\u0936\u0940\u0930\u094d\u0937\u0915 (Title)",
      },
      {
        key: "hero.tagline",
        label: "\u091f\u0948\u0917\u0932\u093e\u0907\u0928",
      },
      {
        key: "hero.description",
        label: "\u0935\u093f\u0935\u0930\u0923 (Description)",
        multiline: true,
      },
      {
        key: "hero.cta_primary",
        label:
          "\u092a\u094d\u0930\u093e\u0925\u092e\u093f\u0915 \u092c\u091f\u0928",
      },
      {
        key: "hero.cta_secondary",
        label:
          "\u0926\u094d\u0935\u093f\u0924\u0940\u092f\u0915 \u092c\u091f\u0928",
      },
    ],
  },
  {
    id: "mission",
    title:
      "\u092e\u093f\u0936\u0928 \u0938\u0947\u0915\u094d\u0936\u0928 (Mission)",
    fields: [
      { key: "mission.title", label: "\u0936\u0940\u0930\u094d\u0937\u0915" },
      {
        key: "mission.description",
        label: "\u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
      {
        key: "mission.value1.title",
        label:
          "\u092e\u0942\u0932\u094d\u092f 1 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "mission.value1.description",
        label:
          "\u092e\u0942\u0932\u094d\u092f 1 \u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
      {
        key: "mission.value2.title",
        label:
          "\u092e\u0942\u0932\u094d\u092f 2 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "mission.value2.description",
        label:
          "\u092e\u0942\u0932\u094d\u092f 2 \u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
      {
        key: "mission.value3.title",
        label:
          "\u092e\u0942\u0932\u094d\u092f 3 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "mission.value3.description",
        label:
          "\u092e\u0942\u0932\u094d\u092f 3 \u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
      {
        key: "mission.value4.title",
        label:
          "\u092e\u0942\u0932\u094d\u092f 4 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "mission.value4.description",
        label:
          "\u092e\u0942\u0932\u094d\u092f 4 \u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
    ],
  },
  {
    id: "home",
    title: "\u0939\u094b\u092e \u092a\u0947\u091c (Home)",
    fields: [
      {
        key: "home.whatwedo.title",
        label:
          "\u0938\u0947\u0915\u094d\u0936\u0928 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "home.whatwedo.subtitle",
        label:
          "\u0938\u0947\u0915\u094d\u0936\u0928 \u0909\u092a\u0936\u0940\u0930\u094d\u0937\u0915",
        multiline: true,
      },
      {
        key: "home.highlight1.title",
        label:
          "\u0915\u093e\u0930\u094d\u0921 1 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "home.highlight1.description",
        label:
          "\u0915\u093e\u0930\u094d\u0921 1 \u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
      {
        key: "home.highlight2.title",
        label:
          "\u0915\u093e\u0930\u094d\u0921 2 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "home.highlight2.description",
        label:
          "\u0915\u093e\u0930\u094d\u0921 2 \u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
      {
        key: "home.highlight3.title",
        label:
          "\u0915\u093e\u0930\u094d\u0921 3 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "home.highlight3.description",
        label:
          "\u0915\u093e\u0930\u094d\u0921 3 \u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
      {
        key: "home.highlight4.title",
        label:
          "\u0915\u093e\u0930\u094d\u0921 4 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "home.highlight4.description",
        label:
          "\u0915\u093e\u0930\u094d\u0921 4 \u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
      {
        key: "home.cta.title",
        label: "CTA \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "home.cta.description",
        label: "CTA \u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
    ],
  },
  {
    id: "about",
    title:
      "\u0939\u092e\u093e\u0930\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902 (About)",
    fields: [
      {
        key: "about.hero.title",
        label: "\u0939\u0940\u0930\u094b \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "about.hero.subtitle",
        label:
          "\u0939\u0940\u0930\u094b \u0909\u092a\u0936\u0940\u0930\u094d\u0937\u0915",
        multiline: true,
      },
      {
        key: "about.story.title",
        label:
          "\u0915\u0939\u093e\u0928\u0940 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "about.story.para1",
        label: "\u0905\u0928\u0941\u091a\u094d\u091b\u0947\u0926 1",
        multiline: true,
      },
      {
        key: "about.story.para2",
        label: "\u0905\u0928\u0941\u091a\u094d\u091b\u0947\u0926 2",
        multiline: true,
      },
      {
        key: "about.principle1.title",
        label:
          "\u0938\u093f\u0926\u094d\u0927\u093e\u0902\u0924 1 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "about.principle1.description",
        label:
          "\u0938\u093f\u0926\u094d\u0927\u093e\u0902\u0924 1 \u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
      {
        key: "about.principle2.title",
        label:
          "\u0938\u093f\u0926\u094d\u0927\u093e\u0902\u0924 2 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "about.principle2.description",
        label:
          "\u0938\u093f\u0926\u094d\u0927\u093e\u0902\u0924 2 \u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
      {
        key: "about.principle3.title",
        label:
          "\u0938\u093f\u0926\u094d\u0927\u093e\u0902\u0924 3 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "about.principle3.description",
        label:
          "\u0938\u093f\u0926\u094d\u0927\u093e\u0902\u0924 3 \u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
      {
        key: "about.principle4.title",
        label:
          "\u0938\u093f\u0926\u094d\u0927\u093e\u0902\u0924 4 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "about.principle4.description",
        label:
          "\u0938\u093f\u0926\u094d\u0927\u093e\u0902\u0924 4 \u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
    ],
  },
  {
    id: "programs",
    title: "\u0915\u093e\u0930\u094d\u092f\u0915\u094d\u0930\u092e (Programs)",
    fields: [
      { key: "programs.title", label: "\u0936\u0940\u0930\u094d\u0937\u0915" },
      {
        key: "programs.subtitle",
        label: "\u0909\u092a\u0936\u0940\u0930\u094d\u0937\u0915",
        multiline: true,
      },
      {
        key: "programs.card1.title",
        label:
          "\u0915\u093e\u0930\u094d\u0921 1 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "programs.card1.description",
        label:
          "\u0915\u093e\u0930\u094d\u0921 1 \u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
      {
        key: "programs.card2.title",
        label:
          "\u0915\u093e\u0930\u094d\u0921 2 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "programs.card2.description",
        label:
          "\u0915\u093e\u0930\u094d\u0921 2 \u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
      {
        key: "programs.card3.title",
        label:
          "\u0915\u093e\u0930\u094d\u0921 3 \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "programs.card3.description",
        label:
          "\u0915\u093e\u0930\u094d\u0921 3 \u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
    ],
  },
  {
    id: "contact",
    title: "\u0938\u0902\u092a\u0930\u094d\u0915 (Contact)",
    fields: [
      {
        key: "contact.title",
        label: "\u092a\u0947\u091c \u0936\u0940\u0930\u094d\u0937\u0915",
      },
      {
        key: "contact.subtitle",
        label:
          "\u092a\u0947\u091c \u0909\u092a\u0936\u0940\u0930\u094d\u0937\u0915",
        multiline: true,
      },
      { key: "contact.email", label: "\u0908\u092e\u0947\u0932" },
      { key: "contact.phone1", label: "\u092b\u093c\u094b\u0928 1" },
      { key: "contact.phone2", label: "\u092b\u093c\u094b\u0928 2" },
      { key: "contact.address", label: "\u092a\u0924\u093e" },
    ],
  },
  {
    id: "footer",
    title: "\u092b\u0942\u091f\u0930 (Footer)",
    fields: [
      {
        key: "footer.tagline",
        label: "\u091f\u0948\u0917\u0932\u093e\u0907\u0928",
      },
      {
        key: "footer.description",
        label: "\u0935\u093f\u0935\u0930\u0923",
        multiline: true,
      },
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
      toast.success(
        `${section.title} \u0938\u0939\u0947\u091c\u093e \u0917\u092f\u093e!`,
      );
    } catch (_e) {
      toast.error(
        "\u0938\u0939\u0947\u091c\u0928\u0947 \u092e\u0947\u0902 \u0924\u094d\u0930\u0941\u091f\u093f \u0939\u0941\u0908",
      );
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
      toast.success(
        "\u0938\u092d\u0940 \u0938\u093e\u092e\u0917\u094d\u0930\u0940 \u0938\u0939\u0947\u091c\u0940 \u0917\u0908!",
      );
    } catch (_e) {
      toast.error(
        "\u0938\u0939\u0947\u091c\u0928\u0947 \u092e\u0947\u0902 \u0924\u094d\u0930\u0941\u091f\u093f \u0939\u0941\u0908",
      );
    } finally {
      setSavingAll(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          \u0938\u093e\u0907\u091f \u0915\u0940
          \u0938\u093e\u092e\u0917\u094d\u0930\u0940
          \u0938\u0902\u092a\u093e\u0926\u093f\u0924 \u0915\u0930\u0947\u0902
          \u0914\u0930 \u0938\u0939\u0947\u091c\u0947\u0902
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
          \u0938\u092d\u0940 \u0938\u0939\u0947\u091c\u0947\u0902
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
              \u0938\u0939\u0947\u091c\u0947\u0902
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
            \u092a\u094d\u0930\u0936\u093e\u0938\u0928 \u092a\u0948\u0928\u0932
          </h1>
          <p className="text-foreground/60 mb-6">
            \u092a\u094d\u0930\u0936\u093e\u0938\u0928 \u092a\u0948\u0928\u0932
            \u0924\u0915 \u092a\u0939\u0941\u0902\u091a\u0928\u0947 \u0915\u0947
            \u0932\u093f\u090f \u0932\u0949\u0917\u0907\u0928
            \u0915\u0930\u0947\u0902\u0964
          </p>
          <Button
            onClick={login}
            disabled={loginStatus === "logging-in"}
            className="bg-primary text-primary-foreground"
            data-ocid="admin.login.button"
          >
            {loginStatus === "logging-in"
              ? "\u0932\u0949\u0917\u0907\u0928 \u0939\u094b \u0930\u0939\u093e \u0939\u0948..."
              : "Internet Identity \u0938\u0947 \u0932\u0949\u0917\u0907\u0928 \u0915\u0930\u0947\u0902"}
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
          <p className="text-foreground/60">
            \u091c\u093e\u0902\u091a \u0939\u094b \u0930\u0939\u0940
            \u0939\u0948...
          </p>
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
            \u092a\u0939\u0941\u0902\u091a
            \u0905\u0938\u094d\u0935\u0940\u0915\u0943\u0924
          </h2>
          <p className="text-foreground/60 mb-4">
            \u0906\u092a\u0915\u0947 \u092a\u093e\u0938
            \u092a\u094d\u0930\u0936\u093e\u0938\u0928 \u092a\u0948\u0928\u0932
            \u0924\u0915 \u092a\u0939\u0941\u0902\u091a\u0928\u0947 \u0915\u0940
            \u0905\u0928\u0941\u092e\u0924\u093f \u0928\u0939\u0940\u0902
            \u0939\u0948\u0964
          </p>
          <Button variant="outline" onClick={() => navigate({ to: "/" })}>
            \u0939\u094b\u092e \u092a\u0930 \u091c\u093e\u090f\u0902
          </Button>
        </div>
      </div>
    );
  }

  const exportMembersCSV = () => {
    const headers = [
      "ID",
      "\u092a\u0939\u0932\u093e \u0928\u093e\u092e",
      "\u0909\u092a\u0928\u093e\u092e",
      "\u092a\u0947\u0936\u093e",
      "\u0908\u092e\u0947\u0932",
      "\u0938\u0902\u092a\u0930\u094d\u0915",
      "\u0935\u094d\u0939\u093e\u091f\u094d\u0938\u090f\u092a",
      "\u0926\u0947\u0936",
      "\u0930\u093e\u091c\u094d\u092f",
      "\u091c\u093c\u093f\u0932\u093e",
      "\u0924\u0939\u0938\u0940\u0932",
      "\u0925\u093e\u0928\u093e",
      "\u0917\u094d\u0930\u093e\u092e \u092a\u0902\u091a\u093e\u092f\u0924",
      "\u0917\u093e\u0902\u0935",
      "\u0932\u093f\u0902\u0917",
      "\u092b\u094b\u091f\u094b",
      "\u0906\u0927\u093e\u0930",
      "\u0938\u092e\u092f",
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
        : "\u2014",
      m.aadhaarCardPhoto.fileName
        ? `${m.aadhaarCardPhoto.fileName} (${formatFileSize(m.aadhaarCardPhoto.fileSize)})`
        : "\u2014",
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
                \u092a\u094d\u0930\u0936\u093e\u0938\u0928
                \u092a\u0948\u0928\u0932
              </h1>
              <p className="text-foreground/50 text-sm">
                \u0938\u092d\u0940 \u0921\u0947\u091f\u093e
                \u092a\u094d\u0930\u092c\u0902\u0927\u0928
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-xs">
              {members.length} \u0938\u0926\u0938\u094d\u092f
            </Badge>
            <Badge variant="outline" className="text-xs">
              {idCardRequests.length} ID \u0905\u0928\u0941\u0930\u094b\u0927
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
              \u0938\u0926\u0938\u094d\u092f ({members.length})
            </TabsTrigger>
            <TabsTrigger
              value="idcards"
              className="flex items-center gap-1.5"
              data-ocid="admin.idcards.tab"
            >
              <CreditCard className="h-4 w-4" />
              ID \u0905\u0928\u0941\u0930\u094b\u0927 ({idCardRequests.length})
            </TabsTrigger>
            <TabsTrigger
              value="activities"
              className="flex items-center gap-1.5"
              data-ocid="admin.activities.tab"
            >
              <Activity className="h-4 w-4" />
              \u0932\u0949\u0917\u0907\u0928
              \u0917\u0924\u093f\u0935\u093f\u0927\u093f (
              {loginActivities.length})
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="flex items-center gap-1.5"
              data-ocid="admin.content.tab"
            >
              <FileEdit className="h-4 w-4" />
              \u0938\u093e\u092e\u0917\u094d\u0930\u0940
              \u0938\u0902\u092a\u093e\u0926\u0915
            </TabsTrigger>
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members">
            <div className="bg-card border border-border rounded-2xl shadow-warm overflow-hidden">
              <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="flex items-center gap-2 flex-1 max-w-sm">
                  <Search className="h-4 w-4 text-foreground/40" />
                  <Input
                    placeholder="\u0928\u093e\u092e, \u0908\u092e\u0947\u0932 \u092f\u093e \u092a\u0947\u0936\u093e \u0916\u094b\u091c\u0947\u0902..."
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
                    <option value={SortBy.timestampDesc}>
                      \u0928\u0935\u0940\u0928\u0924\u092e
                      \u092a\u0939\u0932\u0947
                    </option>
                    <option value={SortBy.timestampAsc}>
                      \u092a\u0941\u0930\u093e\u0928\u0947
                      \u092a\u0939\u0932\u0947
                    </option>
                    <option value={SortBy.lastNameAsc}>
                      \u0909\u092a\u0928\u093e\u092e A-Z
                    </option>
                    <option value={SortBy.lastNameDesc}>
                      \u0909\u092a\u0928\u093e\u092e Z-A
                    </option>
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
                  \u0932\u094b\u0921 \u0939\u094b \u0930\u0939\u093e
                  \u0939\u0948...
                </div>
              ) : members.length === 0 ? (
                <div
                  className="p-8 text-center text-foreground/50"
                  data-ocid="admin.members.empty_state"
                >
                  \u0915\u094b\u0908 \u0938\u0926\u0938\u094d\u092f
                  \u0928\u0939\u0940\u0902 \u092e\u093f\u0932\u093e\u0964
                </div>
              ) : (
                <ScrollArea className="w-full">
                  <Table data-ocid="admin.members.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs">ID</TableHead>
                        <TableHead className="text-xs">
                          \u0928\u093e\u092e
                        </TableHead>
                        <TableHead className="text-xs">
                          \u092a\u0947\u0936\u093e
                        </TableHead>
                        <TableHead className="text-xs">
                          \u0908\u092e\u0947\u0932
                        </TableHead>
                        <TableHead className="text-xs">
                          \u0938\u0902\u092a\u0930\u094d\u0915
                        </TableHead>
                        <TableHead className="text-xs">
                          \u0935\u094d\u0939\u093e\u091f\u094d\u0938\u090f\u092a
                        </TableHead>
                        <TableHead className="text-xs">
                          \u0926\u0947\u0936/\u0930\u093e\u091c\u094d\u092f/\u091c\u093c\u093f\u0932\u093e
                        </TableHead>
                        <TableHead className="text-xs">
                          \u0924\u0939\u0938\u0940\u0932/\u0925\u093e\u0928\u093e
                        </TableHead>
                        <TableHead className="text-xs">
                          \u0917\u094d\u0930\u093e\u092e/\u0917\u093e\u0902\u0935
                        </TableHead>
                        <TableHead className="text-xs">
                          \u0932\u093f\u0902\u0917
                        </TableHead>
                        <TableHead className="text-xs">
                          \u092b\u094b\u091f\u094b
                        </TableHead>
                        <TableHead className="text-xs">
                          \u0906\u0927\u093e\u0930
                        </TableHead>
                        <TableHead className="text-xs">
                          \u0938\u092e\u092f
                        </TableHead>
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
                            {m.occupation || "\u2014"}
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
                              "\u2014"
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
                              "\u2014"
                            )}
                          </TableCell>
                          <TableCell className="text-xs whitespace-nowrap">
                            {[m.country, m.state, m.district]
                              .filter(Boolean)
                              .join(" / ") || "\u2014"}
                          </TableCell>
                          <TableCell className="text-xs whitespace-nowrap">
                            {[m.tehsil, m.policeStation]
                              .filter(Boolean)
                              .join(" / ") || "\u2014"}
                          </TableCell>
                          <TableCell className="text-xs whitespace-nowrap">
                            {[m.gramPanchayat, m.village]
                              .filter(Boolean)
                              .join(" / ") || "\u2014"}
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
                              "\u2014"
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
                              "\u2014"
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
                  ID Card \u0905\u0928\u0941\u0930\u094b\u0927
                </h3>
              </div>
              {idCardLoading ? (
                <div
                  className="p-8 text-center text-foreground/50"
                  data-ocid="admin.idcards.loading_state"
                >
                  \u0932\u094b\u0921 \u0939\u094b \u0930\u0939\u093e
                  \u0939\u0948...
                </div>
              ) : idCardRequests.length === 0 ? (
                <div
                  className="p-8 text-center text-foreground/50"
                  data-ocid="admin.idcards.empty_state"
                >
                  \u0915\u094b\u0908 ID Card
                  \u0905\u0928\u0941\u0930\u094b\u0927
                  \u0928\u0939\u0940\u0902\u0964
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>\u0938\u0926\u0938\u094d\u092f ID</TableHead>
                      <TableHead>
                        \u0905\u0928\u0941\u0930\u094b\u0927\u0915\u0930\u094d\u0924\u093e
                      </TableHead>
                      <TableHead>\u0938\u092e\u092f</TableHead>
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
                          {req.requestedBy
                            ? req.requestedBy.toString()
                            : "\u2014"}
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
                  \u0932\u0949\u0917\u0907\u0928
                  \u0917\u0924\u093f\u0935\u093f\u0927\u093f
                </h3>
              </div>
              {activitiesLoading ? (
                <div
                  className="p-8 text-center text-foreground/50"
                  data-ocid="admin.activities.loading_state"
                >
                  \u0932\u094b\u0921 \u0939\u094b \u0930\u0939\u093e
                  \u0939\u0948...
                </div>
              ) : loginActivities.length === 0 ? (
                <div
                  className="p-8 text-center text-foreground/50"
                  data-ocid="admin.activities.empty_state"
                >
                  \u0915\u094b\u0908 \u0932\u0949\u0917\u0907\u0928
                  \u0917\u0924\u093f\u0935\u093f\u0927\u093f
                  \u0928\u0939\u0940\u0902\u0964
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>\u0938\u0926\u0938\u094d\u092f ID</TableHead>
                      <TableHead>
                        \u0938\u094d\u0925\u093f\u0924\u093f
                      </TableHead>
                      <TableHead>\u0938\u092e\u092f</TableHead>
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
                            {act.successful
                              ? "\u0938\u092b\u0932"
                              : "\u0935\u093f\u092b\u0932"}
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
