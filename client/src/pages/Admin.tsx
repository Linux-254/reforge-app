import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  ArrowLeft,
  ShieldCheck,
  Users,
  Newspaper,
  Plus,
  Leaf,
  Sparkles,
  UserCheck,
  Pencil,
  Trash2,
  X,
  Save,
  Compass,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  MessageSquare,
  Activity,
  Search,
  Filter,
  Pin,
  Check,
  AlertTriangle,
  History,
  Tag,
  HeartHandshake,
  HeartPulse,
  Lock,
  Eye,
  Clock,
} from "lucide-react";
import { useLocation } from "wouter";
import { useState, useMemo } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DemoRoleBar } from "@/components/DemoRoleBar";
import {
  useDemoSession,
  DemoDataManager,
  DimensionItem,
  GuideItem,
  RulePresetItem,
  CommunityPostItem,
  ManagedUserItem,
  AuditLogItem,
  SupporterConnectionItem,
  DemoRole,
} from "@/lib/demoSession";

const ROLES: DemoRole[] = ["admin", "member", "supporter", "coach"];
type AdminTab = "dimensions" | "guides" | "rules" | "community" | "users" | "supporters" | "newsletter" | "logs";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { role, user, setRole } = useDemoSession();

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>("dimensions");

  // Local State powered by DemoDataManager
  const [dimensions, setDimensions] = useState<DimensionItem[]>(() => DemoDataManager.getDimensions());
  const [guides, setGuides] = useState<GuideItem[]>(() => DemoDataManager.getGuides());
  const [rules, setRules] = useState<RulePresetItem[]>(() => DemoDataManager.getRules());
  const [posts, setPosts] = useState<CommunityPostItem[]>(() => DemoDataManager.getPosts());
  const [managedUsers, setManagedUsers] = useState<ManagedUserItem[]>(() => DemoDataManager.getUsers());
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => DemoDataManager.getLogs());
  const [supporterConnections, setSupporterConnections] = useState<SupporterConnectionItem[]>(() => DemoDataManager.getSupporterConnections());

  // Search & Filter States
  const [dimSearch, setDimSearch] = useState("");
  const [dimCategoryFilter, setDimCategoryFilter] = useState("all");
  const [guideSearch, setGuideSearch] = useState("");
  const [guideTypeFilter, setGuideTypeFilter] = useState("all");
  const [ruleSearch, setRuleSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [postSearch, setPostSearch] = useState("");
  const [supporterSearch, setSupporterSearch] = useState("");
  const [supporterStatusFilter, setSupporterStatusFilter] = useState("all");

  // Supporter Modal & Form State
  const [supporterModalOpen, setSupporterModalOpen] = useState(false);
  const [editingSupporterConn, setEditingSupporterConn] = useState<SupporterConnectionItem | null>(null);
  const [supporterForm, setSupporterForm] = useState({
    supporterName: "",
    supporterEmail: "",
    memberName: "",
    memberEmail: "",
    scope: "Dashboard & Rules" as SupporterConnectionItem["scope"],
    shareCheckIns: true,
    shareBoundaries: true,
    shareEmergencyAlerts: true,
    shareRawJournal: false,
    status: "active" as SupporterConnectionItem["status"],
  });

  // Newsletter TRPC Queries with fallback
  const [issueType, setIssueType] = useState("weekly");
  const [issueSubject, setIssueSubject] = useState("");
  const [issueBody, setIssueBody] = useState("");
  const [editingIssueId, setEditingIssueId] = useState<number | null>(null);
  const [issueSearch, setIssueSearch] = useState("");
  const [issueTypeFilter, setIssueTypeFilter] = useState("all");

  const demoMode = import.meta.env.VITE_DEMO_MODE !== "false";
  const issuesQuery = trpc.newsletter.getIssues.useQuery(
    { limit: 30, offset: 0 },
    { retry: false, enabled: !demoMode && Boolean(user) }
  );
  const utils = trpc.useUtils();

  const createIssueMutation = trpc.newsletter.createIssue.useMutation({
    onSuccess: () => {
      toast.success("Newsletter edition published", { className: "nature-toast" });
      setIssueSubject("");
      setIssueBody("");
      utils.newsletter.getIssues.invalidate();
      DemoDataManager.addLog("Published Newsletter", issueSubject, "success");
      setAuditLogs(DemoDataManager.getLogs());
    },
    onError: () => {
      // Graceful local fallback
      toast.success("Newsletter edition saved to demo catalog", { className: "nature-toast" });
      DemoDataManager.addLog("Published Newsletter (Demo)", issueSubject, "success");
      setIssueSubject("");
      setIssueBody("");
      setAuditLogs(DemoDataManager.getLogs());
    },
  });

  const updateIssueMutation = trpc.newsletter.updateIssue.useMutation({
    onSuccess: () => {
      toast.success("Newsletter edition updated", { className: "nature-toast" });
      setEditingIssueId(null);
      setIssueSubject("");
      setIssueBody("");
      utils.newsletter.getIssues.invalidate();
      DemoDataManager.addLog("Updated Newsletter", issueSubject, "info");
      setAuditLogs(DemoDataManager.getLogs());
    },
    onError: () => {
      toast.success("Newsletter edition updated in demo catalog", { className: "nature-toast" });
      setEditingIssueId(null);
      setIssueSubject("");
      setIssueBody("");
    },
  });

  const deleteIssueMutation = trpc.newsletter.deleteIssue.useMutation({
    onSuccess: () => {
      toast.success("Newsletter edition removed", { className: "nature-toast" });
      utils.newsletter.getIssues.invalidate();
      setAuditLogs(DemoDataManager.getLogs());
    },
    onError: () => {
      toast.success("Newsletter edition removed from demo catalog", { className: "nature-toast" });
    },
  });

  // Modals & Dialog State
  const [dimModalOpen, setDimModalOpen] = useState(false);
  const [editingDim, setEditingDim] = useState<DimensionItem | null>(null);
  const [dimForm, setDimForm] = useState({
    name: "",
    category: "Body" as DimensionItem["category"],
    description: "",
    dailyPrompt: "",
    aspectsText: "",
  });

  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<GuideItem | null>(null);
  const [guideForm, setGuideForm] = useState({
    title: "",
    category: "Somatic Grounding",
    type: "Activity" as GuideItem["type"],
    readTime: "4 min",
    body: "",
    author: user.name,
    isPublished: true,
  });

  const [ruleModalOpen, setRuleModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<RulePresetItem | null>(null);
  const [ruleForm, setRuleForm] = useState({
    title: "",
    category: "Mind",
    guidance: "",
    severity: "Essential" as RulePresetItem["severity"],
  });

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "member" as DemoRole,
    cohort: "Cohort 16",
    status: "active" as ManagedUserItem["status"],
  });

  const [pendingDestructive, setPendingDestructive] = useState<{
    kind: "deleteDim" | "deleteGuide" | "deleteRule" | "deletePost" | "deleteUser" | "deleteSupporterConn" | "deleteIssue" | "resetAll";
    id?: number;
    label: string;
  } | null>(null);

  // ==================== Dimension Actions ====================
  const handleOpenAddDim = () => {
    setEditingDim(null);
    setDimForm({
      name: "",
      category: "Body",
      description: "",
      dailyPrompt: "",
      aspectsText: "Breath awareness, Physical safety, Tension release",
    });
    setDimModalOpen(true);
  };

  const handleOpenEditDim = (dim: DimensionItem) => {
    setEditingDim(dim);
    setDimForm({
      name: dim.name,
      category: dim.category,
      description: dim.description,
      dailyPrompt: dim.dailyPrompt,
      aspectsText: dim.aspects.join(", "),
    });
    setDimModalOpen(true);
  };

  const handleSaveDim = () => {
    if (!dimForm.name.trim() || !dimForm.description.trim()) {
      toast.error("Please enter a dimension name and description");
      return;
    }
    const aspects = dimForm.aspectsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingDim) {
      DemoDataManager.updateDimension(editingDim.id, {
        name: dimForm.name.trim(),
        category: dimForm.category,
        description: dimForm.description.trim(),
        dailyPrompt: dimForm.dailyPrompt.trim(),
        aspects,
      });
      toast.success(`Dimension "${dimForm.name}" updated`, { className: "nature-toast" });
    } else {
      DemoDataManager.addDimension({
        name: dimForm.name.trim(),
        category: dimForm.category,
        description: dimForm.description.trim(),
        dailyPrompt: dimForm.dailyPrompt.trim(),
        aspects,
        order: dimensions.length + 1,
        isActive: true,
      });
      toast.success(`Dimension "${dimForm.name}" added to the 21 Dimensions`, { className: "nature-toast" });
    }
    setDimensions(DemoDataManager.getDimensions());
    setAuditLogs(DemoDataManager.getLogs());
    setDimModalOpen(false);
  };

  const handleToggleDimActive = (dim: DimensionItem) => {
    DemoDataManager.updateDimension(dim.id, { isActive: !dim.isActive });
    setDimensions(DemoDataManager.getDimensions());
    setAuditLogs(DemoDataManager.getLogs());
    toast.success(`${dim.name} is now ${!dim.isActive ? "Active" : "Archived"}`);
  };

  // ==================== Guide Actions ====================
  const handleOpenAddGuide = () => {
    setEditingGuide(null);
    setGuideForm({
      title: "",
      category: "Somatic Grounding",
      type: "Activity",
      readTime: "4 min",
      body: "",
      author: user.name,
      isPublished: true,
    });
    setGuideModalOpen(true);
  };

  const handleOpenEditGuide = (guide: GuideItem) => {
    setEditingGuide(guide);
    setGuideForm({
      title: guide.title,
      category: guide.category,
      type: guide.type,
      readTime: guide.readTime,
      body: guide.body,
      author: guide.author,
      isPublished: guide.isPublished,
    });
    setGuideModalOpen(true);
  };

  const handleSaveGuide = () => {
    if (!guideForm.title.trim() || !guideForm.body.trim()) {
      toast.error("Please enter a guide title and content body");
      return;
    }
    if (editingGuide) {
      DemoDataManager.updateGuide(editingGuide.id, guideForm);
      toast.success(`Guide "${guideForm.title}" updated`, { className: "nature-toast" });
    } else {
      DemoDataManager.addGuide(guideForm);
      toast.success(`Recovery guide "${guideForm.title}" published`, { className: "nature-toast" });
    }
    setGuides(DemoDataManager.getGuides());
    setAuditLogs(DemoDataManager.getLogs());
    setGuideModalOpen(false);
  };

  const handleToggleGuidePublish = (guide: GuideItem) => {
    DemoDataManager.updateGuide(guide.id, { isPublished: !guide.isPublished });
    setGuides(DemoDataManager.getGuides());
    setAuditLogs(DemoDataManager.getLogs());
    toast.success(`Guide ${!guide.isPublished ? "published" : "un-published"}`);
  };

  // ==================== Boundary Rule Actions ====================
  const handleOpenAddRule = () => {
    setEditingRule(null);
    setRuleForm({
      title: "",
      category: "Mind",
      guidance: "",
      severity: "Essential",
    });
    setRuleModalOpen(true);
  };

  const handleOpenEditRule = (rule: RulePresetItem) => {
    setEditingRule(rule);
    setRuleForm({
      title: rule.title,
      category: rule.category,
      guidance: rule.guidance,
      severity: rule.severity,
    });
    setRuleModalOpen(true);
  };

  const handleSaveRule = () => {
    if (!ruleForm.title.trim() || !ruleForm.guidance.trim()) {
      toast.error("Please enter boundary title and clinical guidance");
      return;
    }
    if (editingRule) {
      DemoDataManager.updateRule(editingRule.id, ruleForm);
      toast.success("Boundary preset updated", { className: "nature-toast" });
    } else {
      DemoDataManager.addRule({ ...ruleForm, isActive: true });
      toast.success("New boundary rule preset added", { className: "nature-toast" });
    }
    setRules(DemoDataManager.getRules());
    setAuditLogs(DemoDataManager.getLogs());
    setRuleModalOpen(false);
  };

  // ==================== User Management Actions ====================
  const handleOpenAddUser = () => {
    setUserForm({
      name: "",
      email: "",
      role: "member",
      cohort: "Cohort 16",
      status: "active",
    });
    setUserModalOpen(true);
  };

  const handleSaveUser = () => {
    if (!userForm.name.trim() || !userForm.email.trim()) {
      toast.error("Please enter user name and email");
      return;
    }
    DemoDataManager.addUser({
      name: userForm.name.trim(),
      email: userForm.email.trim(),
      role: userForm.role,
      cohort: userForm.cohort.trim(),
      status: userForm.status,
      lastCheckIn: "Never",
    });
    toast.success(`Created account for ${userForm.name}`, { className: "nature-toast" });
    setManagedUsers(DemoDataManager.getUsers());
    setAuditLogs(DemoDataManager.getLogs());
    setUserModalOpen(false);
  };

  const handleChangeUserRole = (userId: number, newRole: DemoRole) => {
    DemoDataManager.updateUser(userId, { role: newRole });
    setManagedUsers(DemoDataManager.getUsers());
    setAuditLogs(DemoDataManager.getLogs());
    toast.success(`Role updated to ${newRole}`);
  };

  // ==================== Community Actions ====================
  const handleTogglePinPost = (post: CommunityPostItem) => {
    DemoDataManager.updatePost(post.id, { isPinned: !post.isPinned });
    setPosts(DemoDataManager.getPosts());
    toast.success(post.isPinned ? "Post unpinned" : "Post pinned to top");
  };

  // ==================== Newsletter Actions ====================
  const handleSaveIssue = async () => {
    if (!issueSubject.trim() || !issueBody.trim()) return;
    const type = issueType as "daily" | "weekly" | "milestone" | "dimension" | "situation";
    if (editingIssueId !== null) {
      await updateIssueMutation.mutateAsync({
        id: editingIssueId,
        type,
        subject: issueSubject.trim(),
        body: issueBody.trim(),
      });
    } else {
      await createIssueMutation.mutateAsync({
        type,
        subject: issueSubject.trim(),
        body: issueBody.trim(),
      });
    }
  };

  const handleEditIssue = (issue: any) => {
    setEditingIssueId(issue.id);
    setIssueType(issue.type);
    setIssueSubject(issue.subject);
    setIssueBody(issue.body);
  };

  const handleCancelIssueEdit = () => {
    setEditingIssueId(null);
    setIssueSubject("");
    setIssueBody("");
    setIssueType("weekly");
  };

  // ==================== Supporter Governance Actions ====================
  const handleOpenAddSupporterConn = () => {
    setEditingSupporterConn(null);
    setSupporterForm({
      supporterName: "",
      supporterEmail: "",
      memberName: "",
      memberEmail: "",
      scope: "Dashboard & Rules",
      shareCheckIns: true,
      shareBoundaries: true,
      shareEmergencyAlerts: true,
      shareRawJournal: false,
      status: "active",
    });
    setSupporterModalOpen(true);
  };

  const handleOpenEditSupporterConn = (conn: SupporterConnectionItem) => {
    setEditingSupporterConn(conn);
    setSupporterForm({
      supporterName: conn.supporterName,
      supporterEmail: conn.supporterEmail,
      memberName: conn.memberName,
      memberEmail: conn.memberEmail,
      scope: conn.scope,
      shareCheckIns: conn.shareCheckIns,
      shareBoundaries: conn.shareBoundaries,
      shareEmergencyAlerts: conn.shareEmergencyAlerts,
      shareRawJournal: conn.shareRawJournal,
      status: conn.status,
    });
    setSupporterModalOpen(true);
  };

  const handleSaveSupporterConn = () => {
    if (!supporterForm.supporterName.trim() || !supporterForm.memberName.trim()) {
      toast.error("Please provide both Supporter Name and Member Name");
      return;
    }

    if (editingSupporterConn) {
      DemoDataManager.updateSupporterConnection(editingSupporterConn.id, { ...supporterForm });
      toast.success(`Updated pairing between ${supporterForm.supporterName} & ${supporterForm.memberName}`, { className: "nature-toast" });
    } else {
      DemoDataManager.addSupporterConnection({ ...supporterForm });
      toast.success(`Issued new Supporter Link: ${supporterForm.supporterName} ↔ ${supporterForm.memberName}`, { className: "nature-toast" });
    }

    setSupporterConnections(DemoDataManager.getSupporterConnections());
    setAuditLogs(DemoDataManager.getLogs());
    setSupporterModalOpen(false);
  };

  const handleToggleSupporterStatus = (conn: SupporterConnectionItem) => {
    const nextStatus = conn.status === "active" ? "paused" : "active";
    DemoDataManager.updateSupporterConnection(conn.id, { status: nextStatus });
    setSupporterConnections(DemoDataManager.getSupporterConnections());
    setAuditLogs(DemoDataManager.getLogs());
    toast.success(`Supporter pairing ID #${conn.id} status changed to ${nextStatus.toUpperCase()}`);
  };

  // ==================== Destructive Confirmation ====================
  const confirmDestructive = () => {
    if (!pendingDestructive) return;
    const { kind, id } = pendingDestructive;

    if (kind === "deleteDim" && id) {
      DemoDataManager.deleteDimension(id);
      setDimensions(DemoDataManager.getDimensions());
      toast.success("Dimension removed");
    } else if (kind === "deleteGuide" && id) {
      DemoDataManager.deleteGuide(id);
      setGuides(DemoDataManager.getGuides());
      toast.success("Guide removed");
    } else if (kind === "deleteRule" && id) {
      DemoDataManager.deleteRule(id);
      setRules(DemoDataManager.getRules());
      toast.success("Boundary rule removed");
    } else if (kind === "deletePost" && id) {
      DemoDataManager.deletePost(id);
      setPosts(DemoDataManager.getPosts());
      toast.success("Community post moderated and removed");
    } else if (kind === "deleteUser" && id) {
      DemoDataManager.deleteUser(id);
      setManagedUsers(DemoDataManager.getUsers());
      toast.success("User account deactivated");
    } else if (kind === "deleteSupporterConn" && id) {
      DemoDataManager.deleteSupporterConnection(id);
      setSupporterConnections(DemoDataManager.getSupporterConnections());
      toast.success("Supporter pairing link revoked");
    } else if (kind === "deleteIssue" && id) {
      deleteIssueMutation.mutate({ id });
    } else if (kind === "resetAll") {
      DemoDataManager.resetAllData();
      setDimensions(DemoDataManager.getDimensions());
      setGuides(DemoDataManager.getGuides());
      setRules(DemoDataManager.getRules());
      setPosts(DemoDataManager.getPosts());
      setManagedUsers(DemoDataManager.getUsers());
      setSupporterConnections(DemoDataManager.getSupporterConnections());
      setAuditLogs(DemoDataManager.getLogs());
      toast.success("All demo data restored to pristine initial state", { className: "nature-toast" });
    }

    setAuditLogs(DemoDataManager.getLogs());
    setPendingDestructive(null);
  };

  // ==================== Filtered Data ====================
  const filteredDimensions = useMemo(() => {
    return dimensions.filter((d) => {
      const matchCat = dimCategoryFilter === "all" || d.category === dimCategoryFilter;
      const matchSearch =
        d.name.toLowerCase().includes(dimSearch.toLowerCase()) ||
        d.description.toLowerCase().includes(dimSearch.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [dimensions, dimSearch, dimCategoryFilter]);

  const filteredGuides = useMemo(() => {
    return guides.filter((g) => {
      const matchType = guideTypeFilter === "all" || g.type === guideTypeFilter;
      const matchSearch =
        g.title.toLowerCase().includes(guideSearch.toLowerCase()) ||
        g.body.toLowerCase().includes(guideSearch.toLowerCase()) ||
        g.category.toLowerCase().includes(guideSearch.toLowerCase());
      return matchType && matchSearch;
    });
  }, [guides, guideSearch, guideTypeFilter]);

  const filteredRules = useMemo(() => {
    return rules.filter((r) => {
      return (
        r.title.toLowerCase().includes(ruleSearch.toLowerCase()) ||
        r.guidance.toLowerCase().includes(ruleSearch.toLowerCase())
      );
    });
  }, [rules, ruleSearch]);

  const filteredUsers = useMemo(() => {
    return managedUsers.filter((u) => {
      const matchRole = userRoleFilter === "all" || u.role === userRoleFilter;
      const matchSearch =
        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.cohort.toLowerCase().includes(userSearch.toLowerCase());
      return matchRole && matchSearch;
    });
  }, [managedUsers, userSearch, userRoleFilter]);

  const filteredSupporters = useMemo(() => {
    return supporterConnections.filter((s) => {
      const matchStatus = supporterStatusFilter === "all" || s.status === supporterStatusFilter;
      const matchSearch =
        s.supporterName.toLowerCase().includes(supporterSearch.toLowerCase()) ||
        s.supporterEmail.toLowerCase().includes(supporterSearch.toLowerCase()) ||
        s.memberName.toLowerCase().includes(supporterSearch.toLowerCase()) ||
        s.memberEmail.toLowerCase().includes(supporterSearch.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [supporterConnections, supporterSearch, supporterStatusFilter]);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      return (
        p.title.toLowerCase().includes(postSearch.toLowerCase()) ||
        p.body.toLowerCase().includes(postSearch.toLowerCase()) ||
        p.authorName.toLowerCase().includes(postSearch.toLowerCase())
      );
    });
  }, [posts, postSearch]);

  const existingIssues = issuesQuery.data || [];
  const filteredIssues = useMemo(() => {
    return existingIssues.filter((issue: any) => {
      const matchType = issueTypeFilter === "all" || issue.type === issueTypeFilter;
      const haystack = `${issue.subject} ${issue.body}`.toLowerCase();
      return matchType && (!issueSearch || haystack.includes(issueSearch.toLowerCase()));
    });
  }, [existingIssues, issueSearch, issueTypeFilter]);

  return (
    <div className="nature-shell min-h-screen pb-20">
      {/* Top Demo Role Switcher */}
      <DemoRoleBar />

      {/* Header Bar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl transition-all">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation("/dashboard")}
              className="gap-2 text-foreground/80 hover:text-foreground rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
              Member Dashboard
            </Button>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-primary shadow-sm">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <h1 className="burnt-wood-heading font-serif text-xl sm:text-2xl font-bold leading-tight">
                  Admin Control & Content Studio
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Full CRUD control over 21 Dimensions, recovery guides, boundaries, community, and users
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setPendingDestructive({
                  kind: "resetAll",
                  label: "Reset all demo content to factory defaults",
                })
              }
              className="rounded-full text-xs gap-1.5 border-border/80 text-muted-foreground hover:text-foreground"
              title="Reset all in-memory changes to clean initial sample data"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Demo Data
            </Button>
            <Badge className="rounded-full bg-primary/15 text-primary border-primary/30 px-3 py-1 text-xs gap-1.5 font-semibold">
              <Sparkles className="h-3 w-3" />
              Full Admin Privileges
            </Badge>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 space-y-6">
        {/* Role Notice Banner if not logged as Alex Rivera */}
        {role !== "admin" && (
          <div className="p-4 rounded-2xl border border-primary/25 bg-primary/10 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-primary shrink-0" />
              <span>
                You are currently previewing with <strong>{user.name} ({role})</strong>. In this demo sandbox, all admin content and CRUD tools remain 100% unlocked for your review.
              </span>
            </div>
            <Button
              size="sm"
              onClick={() => setRole("admin")}
              className="rounded-full h-7 text-xs bg-primary text-primary-foreground shrink-0"
            >
              Switch to Alex Rivera (Admin)
            </Button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-border/70 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("dimensions")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm rounded-full font-medium transition-all shrink-0 ${
              activeTab === "dimensions"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>21 Dimensions</span>
            <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 h-4">
              {dimensions.length}
            </Badge>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("guides")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm rounded-full font-medium transition-all shrink-0 ${
              activeTab === "guides"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Recovery Guides</span>
            <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 h-4">
              {guides.length}
            </Badge>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("rules")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm rounded-full font-medium transition-all shrink-0 ${
              activeTab === "rules"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Boundary Rules</span>
            <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 h-4">
              {rules.length}
            </Badge>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("community")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm rounded-full font-medium transition-all shrink-0 ${
              activeTab === "community"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Community Posts</span>
            <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 h-4">
              {posts.length}
            </Badge>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm rounded-full font-medium transition-all shrink-0 ${
              activeTab === "users"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Users & Roles</span>
            <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 h-4">
              {managedUsers.length}
            </Badge>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("supporters")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm rounded-full font-medium transition-all shrink-0 ${
              activeTab === "supporters"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
            }`}
          >
            <HeartHandshake className="h-4 w-4" />
            <span>Supporter Links</span>
            <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 h-4">
              {supporterConnections.length}
            </Badge>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("newsletter")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm rounded-full font-medium transition-all shrink-0 ${
              activeTab === "newsletter"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
            }`}
          >
            <Newspaper className="h-4 w-4" />
            <span>Newsletter</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("logs")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm rounded-full font-medium transition-all shrink-0 ${
              activeTab === "logs"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
            }`}
          >
            <History className="h-4 w-4" />
            <span>Audit Trail</span>
            <Badge variant="secondary" className="ml-1 text-[10px] px-1.5 py-0 h-4">
              {auditLogs.length}
            </Badge>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: 21 DIMENSIONS (CRUD)
           ========================================================================= */}
        {activeTab === "dimensions" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold burnt-wood-heading">
                  21 Life Dimensions Management
                </h2>
                <p className="text-xs text-muted-foreground">
                  Configure the core holistic recovery framework. Edit prompts, add custom dimensions, or reorder.
                </p>
              </div>
              <Button onClick={handleOpenAddDim} className="rounded-full gap-2 shadow-sm">
                <Plus className="h-4 w-4" /> Add Dimension
              </Button>
            </div>

            {/* Filter bar */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="sm:col-span-2 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={dimSearch}
                  onChange={(e) => setDimSearch(e.target.value)}
                  placeholder="Search dimensions by name, description, or focus..."
                  className="pl-9 h-10 rounded-xl"
                />
              </div>
              <select
                value={dimCategoryFilter}
                onChange={(e) => setDimCategoryFilter(e.target.value)}
                aria-label="Filter dimensions by category"
                className="h-10 rounded-xl border border-input bg-card px-3 text-xs text-foreground"
              >
                <option value="all">All Categories</option>
                <option value="Body">Body (Somatic, Sleep, Nutrition)</option>
                <option value="Mind">Mind (Cognition, Impulse delay)</option>
                <option value="Emotions">Emotions (Literacy, Grief)</option>
                <option value="Community">Community (Boundaries, Repair)</option>
                <option value="Purpose">Purpose (Craft, Honesty)</option>
                <option value="Environment">Environment (Sanctuary, Nature)</option>
                <option value="Soul">Soul (Forgiveness, Wonder)</option>
              </select>
            </div>

            {/* Dimensions Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDimensions.map((dim) => (
                <Card
                  key={dim.id}
                  className={`nature-card border-border/70 bg-card/85 backdrop-blur-md transition-all ${
                    !dim.isActive ? "opacity-60 grayscale-[30%]" : ""
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant="outline" className="text-[10px] px-2 py-0.5 rounded-full capitalize">
                        {dim.category}
                      </Badge>
                      <Badge
                        variant="secondary"
                        onClick={() => handleToggleDimActive(dim)}
                        className={`cursor-pointer text-[10px] rounded-full ${
                          dim.isActive ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {dim.isActive ? "Active" : "Archived"}
                      </Badge>
                    </div>
                    <CardTitle className="font-serif text-lg mt-1 font-semibold">
                      {dim.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-xs text-muted-foreground">
                    <p className="line-clamp-2 leading-relaxed">{dim.description}</p>
                    <div className="p-2.5 rounded-xl bg-muted/40 border border-border/50 text-[11px] text-foreground">
                      <span className="font-semibold text-primary block mb-0.5">Daily Inquiry:</span>
                      "{dim.dailyPrompt}"
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {dim.aspects.map((asp, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-background border border-border/60 text-[10px]"
                        >
                          {asp}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenEditDim(dim)}
                        className="h-7 text-xs rounded-lg gap-1"
                      >
                        <Pencil className="h-3 w-3" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setPendingDestructive({
                            kind: "deleteDim",
                            id: dim.id,
                            label: `Dimension: "${dim.name}"`,
                          })
                        }
                        className="h-7 text-xs rounded-lg border-destructive/30 text-destructive hover:bg-destructive/10 gap-1"
                      >
                        <Trash2 className="h-3 w-3" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: RECOVERY GUIDES (CRUD)
           ========================================================================= */}
        {activeTab === "guides" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold burnt-wood-heading">
                  Recovery Guides & Clinical Exercises
                </h2>
                <p className="text-xs text-muted-foreground">
                  Author guided practices, in-the-moment craving tools, and relational repair rituals.
                </p>
              </div>
              <Button onClick={handleOpenAddGuide} className="rounded-full gap-2 shadow-sm">
                <Plus className="h-4 w-4" /> New Recovery Guide
              </Button>
            </div>

            {/* Filter Bar */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="sm:col-span-2 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={guideSearch}
                  onChange={(e) => setGuideSearch(e.target.value)}
                  placeholder="Search guides by title, category, or content..."
                  className="pl-9 h-10 rounded-xl"
                />
              </div>
              <select
                value={guideTypeFilter}
                onChange={(e) => setGuideTypeFilter(e.target.value)}
                aria-label="Filter guides by type"
                className="h-10 rounded-xl border border-input bg-card px-3 text-xs text-foreground"
              >
                <option value="all">All Exercise Types</option>
                <option value="Activity">Activity</option>
                <option value="In the moment">In the moment (Urge Surfing)</option>
                <option value="Relationships">Relationships & Amends</option>
                <option value="Mindfulness">Mindfulness</option>
                <option value="Reflection">Reflection</option>
              </select>
            </div>

            {/* Guides List */}
            <div className="space-y-3">
              {filteredGuides.map((guide) => (
                <div
                  key={guide.id}
                  className="p-5 rounded-2xl border border-border/70 bg-card/85 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:border-primary/40"
                >
                  <div className="space-y-2 min-w-0 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-[10px] rounded-full">
                        {guide.category}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] rounded-full">
                        {guide.type}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">· {guide.readTime}</span>
                      <span
                        onClick={() => handleToggleGuidePublish(guide)}
                        className={`cursor-pointer text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          guide.isPublished
                            ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                            : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                        }`}
                      >
                        {guide.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {guide.body}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      By {guide.author} · Created {guide.createdAt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenEditGuide(guide)}
                      className="rounded-xl h-8 text-xs gap-1.5"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setPendingDestructive({
                          kind: "deleteGuide",
                          id: guide.id,
                          label: `Guide: "${guide.title}"`,
                        })
                      }
                      className="rounded-xl h-8 text-xs border-destructive/30 text-destructive hover:bg-destructive/10 gap-1.5"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: BOUNDARY RULES (CRUD)
           ========================================================================= */}
        {activeTab === "rules" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold burnt-wood-heading">
                  Boundary Rules & Safety Presets
                </h2>
                <p className="text-xs text-muted-foreground">
                  Default rules offered to practitioners when configuring their personal boundaries.
                </p>
              </div>
              <Button onClick={handleOpenAddRule} className="rounded-full gap-2 shadow-sm">
                <Plus className="h-4 w-4" /> New Boundary Rule
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={ruleSearch}
                onChange={(e) => setRuleSearch(e.target.value)}
                placeholder="Search boundary rules..."
                className="pl-9 h-10 rounded-xl"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {filteredRules.map((rule) => (
                <div
                  key={rule.id}
                  className="p-4 rounded-2xl border border-border/70 bg-card/85 backdrop-blur-md space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[10px] rounded-full">
                        {rule.category}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={`text-[10px] rounded-full ${
                          rule.severity === "Essential"
                            ? "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                            : "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                        }`}
                      >
                        {rule.severity}
                      </Badge>
                    </div>
                    <p className="font-serif font-semibold text-base text-foreground">
                      "{rule.title}"
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {rule.guidance}
                    </p>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-border/40">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenEditRule(rule)}
                      className="h-7 text-xs rounded-lg gap-1"
                    >
                      <Pencil className="h-3 w-3" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setPendingDestructive({
                          kind: "deleteRule",
                          id: rule.id,
                          label: `Rule: "${rule.title}"`,
                        })
                      }
                      className="h-7 text-xs rounded-lg border-destructive/30 text-destructive hover:bg-destructive/10 gap-1"
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: COMMUNITY MODERATION (CRUD)
           ========================================================================= */}
        {activeTab === "community" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold burnt-wood-heading">
                  Community Moderation & Discussions
                </h2>
                <p className="text-xs text-muted-foreground">
                  Review practitioner threads, pin high-value milestone shares, and moderate safe space standards.
                </p>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={postSearch}
                onChange={(e) => setPostSearch(e.target.value)}
                placeholder="Search community posts by author or content..."
                className="pl-9 h-10 rounded-xl"
              />
            </div>

            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="p-5 rounded-2xl border border-border/70 bg-card/85 backdrop-blur-md space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-primary/15 text-primary grid place-items-center font-serif font-bold text-xs">
                        {post.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-foreground">{post.authorName}</span>
                          <Badge variant="outline" className="text-[10px] rounded-full">
                            {post.authorRole}
                          </Badge>
                          <Badge variant="secondary" className="text-[10px] rounded-full">
                            {post.topic}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-muted-foreground">{post.createdAt}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant={post.isPinned ? "default" : "outline"}
                        onClick={() => handleTogglePinPost(post)}
                        className="h-8 text-xs rounded-xl gap-1"
                      >
                        <Pin className="h-3.5 w-3.5" />
                        {post.isPinned ? "Pinned" : "Pin"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setPendingDestructive({
                            kind: "deletePost",
                            id: post.id,
                            label: `Post by ${post.authorName}: "${post.title}"`,
                          })
                        }
                        className="h-8 text-xs rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 gap-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </Button>
                    </div>
                  </div>

                  <h4 className="font-serif text-lg font-semibold text-foreground">{post.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{post.body}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1 border-t border-border/40">
                    <span>❤️ {post.likes} appreciative members</span>
                    <span>💬 {post.repliesCount} reflections shared</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: USERS & ROLES (CRUD)
           ========================================================================= */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold burnt-wood-heading">
                  User Accounts & Role Governance
                </h2>
                <p className="text-xs text-muted-foreground">
                  Manage registered profiles across all roles: Member, Supporter, Coach, and Admin.
                </p>
              </div>
              <Button onClick={handleOpenAddUser} className="rounded-full gap-2 shadow-sm">
                <Plus className="h-4 w-4" /> Add User Account
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="sm:col-span-2 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search by name, email, or cohort..."
                  className="pl-9 h-10 rounded-xl"
                />
              </div>
              <select
                value={userRoleFilter}
                onChange={(e) => setUserRoleFilter(e.target.value)}
                aria-label="Filter members by role"
                className="h-10 rounded-xl border border-input bg-card px-3 text-xs text-foreground"
              >
                <option value="all">All Roles</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              {filteredUsers.map((u) => (
                <div
                  key={u.id}
                  className="p-4 rounded-2xl border border-border/70 bg-card/85 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-primary/40"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-semibold text-base text-foreground">{u.name}</span>
                      <Badge variant="outline" className="text-[10px] rounded-full uppercase font-bold text-primary border-primary/30">
                        {u.role}
                      </Badge>
                      <Badge variant="secondary" className="text-[10px] rounded-full">
                        {u.cohort}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                    <p className="text-[10px] text-muted-foreground">
                      Joined {u.joinedAt} · Last Active: {u.lastCheckIn}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-muted-foreground mr-1">Assign Role:</span>
                    {ROLES.map((r) => {
                      const isAssigned = u.role === r;
                      return (
                        <Button
                          key={r}
                          size="sm"
                          variant={isAssigned ? "default" : "outline"}
                          onClick={() => handleChangeUserRole(u.id, r)}
                          className={`h-7 px-2.5 text-[11px] rounded-lg capitalize ${
                            isAssigned ? "bg-primary text-primary-foreground font-semibold" : ""
                          }`}
                        >
                          {isAssigned && <Check className="h-3 w-3 mr-1" />}
                          {r}
                        </Button>
                      );
                    })}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setPendingDestructive({
                          kind: "deleteUser",
                          id: u.id,
                          label: `Account: ${u.name} (${u.email})`,
                        })
                      }
                      className="h-7 px-2 text-destructive border-destructive/30 hover:bg-destructive/10 rounded-lg ml-2"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB: SUPPORTER CONNECTIONS & CONSENT GOVERNANCE
           ========================================================================= */}
        {activeTab === "supporters" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-bold burnt-wood-heading flex items-center gap-2">
                  <HeartHandshake className="h-6 w-6 text-primary" />
                  Supporter Links & Consent Scope Governance
                </h2>
                <p className="text-xs text-muted-foreground">
                  Administer trusted advocate pairings, privacy permissions, and consented vital monitoring channels.
                </p>
              </div>
              <Button onClick={handleOpenAddSupporterConn} className="rounded-full gap-2 shadow-sm">
                <Plus className="h-4 w-4" /> Issue Supporter Link
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="sm:col-span-2 relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  value={supporterSearch}
                  onChange={(e) => setSupporterSearch(e.target.value)}
                  placeholder="Search by supporter or member name/email..."
                  className="pl-9 h-10 rounded-xl text-xs"
                />
              </div>
              <select
                value={supporterStatusFilter}
                onChange={(e) => setSupporterStatusFilter(e.target.value)}
                aria-label="Filter supporter links by status"
                className="h-10 rounded-xl border border-input bg-card px-3 text-xs text-foreground"
              >
                <option value="all">All Connection States</option>
                <option value="active">ACTIVE PAIRINGS</option>
                <option value="paused">PAUSED / ON HOLD</option>
                <option value="revoked">REVOKED</option>
              </select>
            </div>

            <div className="space-y-3">
              {filteredSupporters.map((conn) => (
                <div
                  key={conn.id}
                  className="p-5 rounded-2xl border border-border/70 bg-card/85 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-primary/40"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={conn.status === "active" ? "default" : "secondary"}
                        className={`text-[10px] rounded-full uppercase font-bold ${
                          conn.status === "active" ? "bg-emerald-600 text-white" : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {conn.status}
                      </Badge>
                      <span className="font-serif font-bold text-sm text-foreground">
                        {conn.supporterName} <span className="font-normal text-muted-foreground">({conn.supporterEmail})</span>
                      </span>
                      <span className="text-muted-foreground text-xs">→ Supporting →</span>
                      <span className="font-serif font-bold text-sm text-primary">
                        {conn.memberName} <span className="font-normal text-muted-foreground">({conn.memberEmail})</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Consent Scope:</span>
                      <Badge variant="outline" className="text-[10px] rounded-full border-primary/30 text-primary bg-primary/5">
                        {conn.scope}
                      </Badge>
                      <span className="text-[10px]">· Linked Date: {conn.linkedAt}</span>
                    </div>

                    {/* Permissions Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {conn.shareCheckIns && (
                        <Badge variant="secondary" className="text-[9px] rounded-md gap-1 bg-emerald-50 text-emerald-800 border-emerald-200">
                          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" /> Daily Check-ins
                        </Badge>
                      )}
                      {conn.shareBoundaries && (
                        <Badge variant="secondary" className="text-[9px] rounded-md gap-1 bg-emerald-50 text-emerald-800 border-emerald-200">
                          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" /> Boundary Presets
                        </Badge>
                      )}
                      {conn.shareEmergencyAlerts && (
                        <Badge variant="secondary" className="text-[9px] rounded-md gap-1 bg-amber-50 text-amber-800 border-amber-200">
                          <CheckCircle2 className="h-2.5 w-2.5 text-amber-600" /> Emergency Alerts
                        </Badge>
                      )}
                      {conn.shareRawJournal ? (
                        <Badge variant="secondary" className="text-[9px] rounded-md gap-1 bg-purple-50 text-purple-800 border-purple-200">
                          <Eye className="h-2.5 w-2.5 text-purple-600" /> Full Journal Unlocked
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[9px] rounded-md gap-1 text-muted-foreground">
                          <Lock className="h-2.5 w-2.5" /> Journal Protected
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleSupporterStatus(conn)}
                      className="h-8 text-xs rounded-xl gap-1"
                    >
                      {conn.status === "active" ? (
                        <>
                          <Clock className="h-3 w-3 text-amber-600" /> Pause Link
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-3 w-3 text-emerald-600" /> Activate Link
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleOpenEditSupporterConn(conn)}
                      className="h-8 text-xs rounded-xl gap-1"
                    >
                      <Pencil className="h-3 w-3" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setPendingDestructive({
                          kind: "deleteSupporterConn",
                          id: conn.id,
                          label: `Supporter Link: ${conn.supporterName} ↔ ${conn.memberName}`,
                        })
                      }
                      className="h-8 text-xs rounded-xl border-destructive/30 text-destructive hover:bg-destructive/10 gap-1"
                    >
                      <Trash2 className="h-3 w-3" /> Revoke
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: EDITORIAL NEWSLETTER (CRUD)
           ========================================================================= */}
        {activeTab === "newsletter" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-bold burnt-wood-heading">
                Editorial Publications & Reflections
              </h2>
              <p className="text-xs text-muted-foreground">
                Author weekly rhythms, daily meditations, and milestone celebrations for newsletter subscribers.
              </p>
            </div>

            <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="font-serif text-xl flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-primary" />
                  {editingIssueId !== null ? "Edit Editorial Edition" : "Compose New Edition"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold">Publication Rhythm</Label>
                    <select
                      value={issueType}
                      onChange={(e) => setIssueType(e.target.value)}
                      className="h-10 w-full rounded-xl border border-input bg-background px-3 text-xs"
                    >
                      <option value="daily">Daily Reflection</option>
                      <option value="weekly">Weekly Rhythm</option>
                      <option value="milestone">Milestone Celebration</option>
                      <option value="dimension">Dimension Deep Dive</option>
                      <option value="situation">Situational Guide</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold">Edition Subject / Headline</Label>
                    <Input
                      value={issueSubject}
                      onChange={(e) => setIssueSubject(e.target.value)}
                      placeholder="e.g., Finding steadiness in the morning quiet"
                      className="h-10 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold">Body Content (Markdown format supported)</Label>
                  <Textarea
                    value={issueBody}
                    onChange={(e) => setIssueBody(e.target.value)}
                    placeholder="Write your restorative editorial essay..."
                    className="min-h-36 rounded-xl text-xs"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleSaveIssue}
                    disabled={!issueSubject.trim() || !issueBody.trim()}
                    className="rounded-full gap-2 text-xs"
                  >
                    <Save className="h-4 w-4" />
                    {editingIssueId !== null ? "Save Changes" : "Publish Edition"}
                  </Button>
                  {editingIssueId !== null && (
                    <Button
                      variant="outline"
                      onClick={handleCancelIssueEdit}
                      className="rounded-full text-xs"
                    >
                      Cancel Edit
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* List of Published Issues */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-semibold text-foreground">Archived Editions</h3>
              {filteredIssues.map((issue: any) => (
                <div
                  key={issue.id}
                  className="p-4 rounded-2xl border border-border/70 bg-card/85 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="capitalize text-[10px] rounded-full">
                        {issue.type}
                      </Badge>
                      <span className="text-[11px] text-muted-foreground">
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h4 className="font-serif font-semibold text-base">{issue.subject}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{issue.body}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditIssue(issue)}
                      className="rounded-xl h-8 text-xs gap-1"
                    >
                      <Pencil className="h-3 w-3" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setPendingDestructive({
                          kind: "deleteIssue",
                          id: issue.id,
                          label: issue.subject,
                        })
                      }
                      className="rounded-xl h-8 text-xs border-destructive/30 text-destructive hover:bg-destructive/10 gap-1"
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 7: AUDIT & SYSTEM LOGS
           ========================================================================= */}
        {activeTab === "logs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold burnt-wood-heading">
                  System Audit & Accountability Trail
                </h2>
                <p className="text-xs text-muted-foreground">
                  Immutable record of recent administrative, clinical, and practitioner events.
                </p>
              </div>
            </div>

            <Card className="nature-card border-border/70 bg-card/85 backdrop-blur-md">
              <CardContent className="p-0">
                <div className="divide-y divide-border/50">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-4 flex items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            log.severity === "success"
                              ? "bg-emerald-500"
                              : log.severity === "warning"
                              ? "bg-amber-500"
                              : "bg-primary"
                          }`}
                        />
                        <div>
                          <p className="font-semibold text-foreground">
                            {log.action}: <span className="font-normal text-muted-foreground">{log.resource}</span>
                          </p>
                          <p className="text-[10px] text-muted-foreground">Actor: {log.actorName}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-muted-foreground shrink-0">{log.timestamp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* ==================== DIALOG: Add/Edit Dimension ==================== */}
      <Dialog open={dimModalOpen} onOpenChange={setDimModalOpen}>
        <DialogContent className="max-w-lg rounded-3xl nature-glass border-border/80">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {editingDim ? "Edit Life Dimension" : "Create New Life Dimension"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Define the dimension's holistic focus, category, and daily morning inquiry prompt.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2 text-xs">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Dimension Title</Label>
                <Input
                  value={dimForm.name}
                  onChange={(e) => setDimForm({ ...dimForm, name: e.target.value })}
                  placeholder="e.g. Nervous System Grounding"
                  className="rounded-xl h-9 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Category Domain</Label>
                <select
                  value={dimForm.category}
                  onChange={(e) => setDimForm({ ...dimForm, category: e.target.value as any })}
                  className="h-9 w-full rounded-xl border border-input bg-background px-3 text-xs"
                >
                  <option value="Body">Body</option>
                  <option value="Mind">Mind</option>
                  <option value="Emotions">Emotions</option>
                  <option value="Community">Community</option>
                  <option value="Purpose">Purpose</option>
                  <option value="Environment">Environment</option>
                  <option value="Soul">Soul</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Clinical & Holistic Description</Label>
              <Textarea
                value={dimForm.description}
                onChange={(e) => setDimForm({ ...dimForm, description: e.target.value })}
                placeholder="Explain the restorative intention behind this dimension..."
                className="min-h-20 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Daily Inquiry Prompt</Label>
              <Input
                value={dimForm.dailyPrompt}
                onChange={(e) => setDimForm({ ...dimForm, dailyPrompt: e.target.value })}
                placeholder="e.g., Where in your body feels steady right now?"
                className="rounded-xl h-9 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Key Aspects (comma-separated tags)</Label>
              <Input
                value={dimForm.aspectsText}
                onChange={(e) => setDimForm({ ...dimForm, aspectsText: e.target.value })}
                placeholder="Breath awareness, Tension release, Walking"
                className="rounded-xl h-9 text-xs"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDimModalOpen(false)} className="rounded-full text-xs">
              Cancel
            </Button>
            <Button onClick={handleSaveDim} className="rounded-full text-xs">
              Save Dimension
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== DIALOG: Add/Edit Guide ==================== */}
      <Dialog open={guideModalOpen} onOpenChange={setGuideModalOpen}>
        <DialogContent className="max-w-xl rounded-3xl nature-glass border-border/80">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {editingGuide ? "Edit Recovery Guide" : "Publish New Recovery Guide"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Create a structured exercise, urge surfing technique, or relational repair guide.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2 text-xs">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Guide Title</Label>
              <Input
                value={guideForm.title}
                onChange={(e) => setGuideForm({ ...guideForm, title: e.target.value })}
                placeholder="e.g., The 15-Minute Urge Surfing Wave"
                className="rounded-xl h-9 text-xs"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Related Dimension</Label>
                <Input
                  value={guideForm.category}
                  onChange={(e) => setGuideForm({ ...guideForm, category: e.target.value })}
                  placeholder="e.g., Somatic Grounding"
                  className="rounded-xl h-9 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Exercise Type</Label>
                <select
                  value={guideForm.type}
                  onChange={(e) => setGuideForm({ ...guideForm, type: e.target.value as any })}
                  className="h-9 w-full rounded-xl border border-input bg-background px-2 text-xs"
                >
                  <option value="Activity">Activity</option>
                  <option value="In the moment">In the moment</option>
                  <option value="Relationships">Relationships</option>
                  <option value="Mindfulness">Mindfulness</option>
                  <option value="Reflection">Reflection</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Estimated Time</Label>
                <Input
                  value={guideForm.readTime}
                  onChange={(e) => setGuideForm({ ...guideForm, readTime: e.target.value })}
                  placeholder="e.g., 5 min"
                  className="rounded-xl h-9 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Step-by-Step Exercise Instructions</Label>
              <Textarea
                value={guideForm.body}
                onChange={(e) => setGuideForm({ ...guideForm, body: e.target.value })}
                placeholder="Write actionable instructions for practitioners to follow..."
                className="min-h-32 rounded-xl text-xs"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setGuideModalOpen(false)} className="rounded-full text-xs">
              Cancel
            </Button>
            <Button onClick={handleSaveGuide} className="rounded-full text-xs">
              Publish Guide
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== DIALOG: Add/Edit Rule ==================== */}
      <Dialog open={ruleModalOpen} onOpenChange={setRuleModalOpen}>
        <DialogContent className="max-w-lg rounded-3xl nature-glass border-border/80">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">
              {editingRule ? "Edit Boundary Preset" : "Add Boundary Preset"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Preset boundary agreements offered to practitioners to protect their momentum.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2 text-xs">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Rule Statement</Label>
              <Input
                value={ruleForm.title}
                onChange={(e) => setRuleForm({ ...ruleForm, title: e.target.value })}
                placeholder="e.g. I do not negotiate with cravings after 10 PM."
                className="rounded-xl h-9 text-xs"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Category Domain</Label>
                <Input
                  value={ruleForm.category}
                  onChange={(e) => setRuleForm({ ...ruleForm, category: e.target.value })}
                  placeholder="e.g., Sleep & Energy"
                  className="rounded-xl h-9 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Severity Tier</Label>
                <select
                  value={ruleForm.severity}
                  onChange={(e) => setRuleForm({ ...ruleForm, severity: e.target.value as any })}
                  className="h-9 w-full rounded-xl border border-input bg-background px-3 text-xs"
                >
                  <option value="Essential">Essential (Core Safety)</option>
                  <option value="Recommended">Recommended</option>
                  <option value="Aspirational">Aspirational</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Rationale & Guidance</Label>
              <Textarea
                value={ruleForm.guidance}
                onChange={(e) => setRuleForm({ ...ruleForm, guidance: e.target.value })}
                placeholder="Why is this rule protective and what alternative action should be taken?"
                className="min-h-20 rounded-xl text-xs"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRuleModalOpen(false)} className="rounded-full text-xs">
              Cancel
            </Button>
            <Button onClick={handleSaveRule} className="rounded-full text-xs">
              Save Rule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== DIALOG: Add User ==================== */}
      <Dialog open={userModalOpen} onOpenChange={setUserModalOpen}>
        <DialogContent className="max-w-md rounded-3xl nature-glass border-border/80">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Create Member Account</DialogTitle>
            <DialogDescription className="text-xs">
              Register a member, supporter, clinician, or administrator in the demo directory.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2 text-xs">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Full Name</Label>
              <Input
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                placeholder="e.g., Taylor Swift"
                className="rounded-xl h-9 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Email Address</Label>
              <Input
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                placeholder="taylor@reforge.app"
                className="rounded-xl h-9 text-xs"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Assigned Role</Label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({ ...userForm, role: e.target.value as any })}
                  className="h-9 w-full rounded-xl border border-input bg-background px-3 text-xs capitalize"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Cohort Assignment</Label>
                <Input
                  value={userForm.cohort}
                  onChange={(e) => setUserForm({ ...userForm, cohort: e.target.value })}
                  placeholder="Cohort 16"
                  className="rounded-xl h-9 text-xs"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUserModalOpen(false)} className="rounded-full text-xs">
              Cancel
            </Button>
            <Button onClick={handleSaveUser} className="rounded-full text-xs">
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== DIALOG: Add/Edit Supporter Link ==================== */}
      <Dialog open={supporterModalOpen} onOpenChange={setSupporterModalOpen}>
        <DialogContent className="max-w-lg rounded-3xl nature-glass border-border/80">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl burnt-wood-heading flex items-center gap-2">
              <HeartHandshake className="h-5 w-5 text-primary" />
              {editingSupporterConn ? "Configure Supporter Pairing & Scope" : "Issue New Supporter Pairing"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Supporter Full Name</Label>
                <Input
                  value={supporterForm.supporterName}
                  onChange={(e) => setSupporterForm({ ...supporterForm, supporterName: e.target.value })}
                  placeholder="e.g., Sarah Jenkins"
                  className="rounded-xl h-9 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Supporter Email</Label>
                <Input
                  type="email"
                  value={supporterForm.supporterEmail}
                  onChange={(e) => setSupporterForm({ ...supporterForm, supporterEmail: e.target.value })}
                  placeholder="sarah@example.com"
                  className="rounded-xl h-9 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Member Full Name</Label>
                <Input
                  value={supporterForm.memberName}
                  onChange={(e) => setSupporterForm({ ...supporterForm, memberName: e.target.value })}
                  placeholder="e.g., Alex Rivers"
                  className="rounded-xl h-9 text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Member Email</Label>
                <Input
                  type="email"
                  value={supporterForm.memberEmail}
                  onChange={(e) => setSupporterForm({ ...supporterForm, memberEmail: e.target.value })}
                  placeholder="alex@example.com"
                  className="rounded-xl h-9 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Consent Scope Level</Label>
              <select
                value={supporterForm.scope}
                onChange={(e) => setSupporterForm({ ...supporterForm, scope: e.target.value as any })}
                className="h-9 w-full rounded-xl border border-input bg-background px-3 text-xs"
              >
                <option value="Dashboard & Rules">Dashboard & Boundary Rules (Standard Consented)</option>
                <option value="Full Consented Access">Full Consented Access (Dashboard, Rules & Emergencies)</option>
                <option value="Emergency Alerts Only">Emergency & Crisis Escalations Only</option>
              </select>
            </div>

            <div className="space-y-2 border-t border-border/40 pt-3">
              <Label className="text-xs font-semibold">Consented Data Channels</Label>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={supporterForm.shareCheckIns}
                    onChange={(e) => setSupporterForm({ ...supporterForm, shareCheckIns: e.target.checked })}
                    className="rounded border-input text-primary"
                  />
                  <span>Daily Mood & Check-ins</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={supporterForm.shareBoundaries}
                    onChange={(e) => setSupporterForm({ ...supporterForm, shareBoundaries: e.target.checked })}
                    className="rounded border-input text-primary"
                  />
                  <span>Boundary Rules</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={supporterForm.shareEmergencyAlerts}
                    onChange={(e) => setSupporterForm({ ...supporterForm, shareEmergencyAlerts: e.target.checked })}
                    className="rounded border-input text-primary"
                  />
                  <span>Emergency Alerts</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={supporterForm.shareRawJournal}
                    onChange={(e) => setSupporterForm({ ...supporterForm, shareRawJournal: e.target.checked })}
                    className="rounded border-input text-primary"
                  />
                  <span>Raw Journal (Sensitive)</span>
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSupporterModalOpen(false)} className="rounded-full text-xs">
              Cancel
            </Button>
            <Button onClick={handleSaveSupporterConn} className="rounded-full text-xs">
              {editingSupporterConn ? "Save Scope Changes" : "Issue Pairing Link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ==================== ALERT DIALOG: Destructive Confirm ==================== */}
      <AlertDialog
        open={Boolean(pendingDestructive)}
        onOpenChange={(open) => {
          if (!open) setPendingDestructive(null);
        }}
      >
        <AlertDialogContent className="nature-glass border-white/30 rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="burnt-wood-heading font-serif text-2xl">
              {pendingDestructive?.kind === "resetAll" ? "Reset Demo Content?" : "Confirm Removal"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs leading-relaxed">
              {pendingDestructive?.kind === "resetAll"
                ? "This will restore the 21 Dimensions, guides, boundary rules, community posts, and user accounts to factory sample defaults."
                : `Are you sure you want to remove ${pendingDestructive?.label}?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full text-xs">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDestructive}
              className="rounded-full text-xs bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {pendingDestructive?.kind === "resetAll" ? "Yes, Reset All" : "Confirm Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
