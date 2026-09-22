import { useEffect, useState } from "react";

export type DemoRole = "admin" | "member" | "supporter" | "coach";

export interface DemoUser {
  id: number;
  openId: string;
  name: string;
  email: string;
  role: DemoRole;
  title: string;
  avatar: string;
  streak?: number;
  cohort?: string;
}

export const DEMO_PROFILES: Record<DemoRole, DemoUser> = {
  admin: {
    id: 1,
    openId: "demo-admin-alex",
    name: "Alex Rivera",
    email: "alex.admin@reforge.app",
    role: "admin",
    title: "Platform Administrator & Lead Steward",
    avatar: "AR",
    streak: 120,
    cohort: "Cohort 01",
  },
  member: {
    id: 2,
    openId: "demo-member-sam",
    name: "Sam Bennett",
    email: "sam.b@reforge.app",
    role: "member",
    title: "Recovery Practitioner · Day 48",
    avatar: "SB",
    streak: 48,
    cohort: "Cohort 14",
  },
  supporter: {
    id: 3,
    openId: "demo-supporter-sarah",
    name: "Sarah Miller",
    email: "sarah.m@reforge.app",
    role: "supporter",
    title: "Accountability Partner for Sam Bennett",
    avatar: "SM",
    streak: 48,
    cohort: "Partner Program",
  },
  coach: {
    id: 4,
    openId: "demo-coach-marcus",
    name: "Dr. Marcus Vance, LMFT",
    email: "m.vance@reforge.app",
    role: "coach",
    title: "Licensed Recovery Guide & Clinician",
    avatar: "MV",
    streak: 365,
    cohort: "Clinical Care Team",
  },
};

const DEMO_ROLE_KEY = "reforge_active_demo_role";
const DEMO_ROLE_CHANGE_EVENT = "reforge:demo-role-change";

export function getStoredDemoRole(): DemoRole {
  if (typeof window === "undefined") return "admin";
  const stored = localStorage.getItem(DEMO_ROLE_KEY) as DemoRole | null;
  if (stored && stored in DEMO_PROFILES) {
    return stored;
  }
  return "admin";
}

export function setStoredDemoRole(role: DemoRole) {
  if (typeof window === "undefined") return;
  localStorage.setItem(DEMO_ROLE_KEY, role);
  window.dispatchEvent(new CustomEvent(DEMO_ROLE_CHANGE_EVENT, { detail: role }));
}

export function useDemoSession() {
  const [role, setRoleState] = useState<DemoRole>(() => getStoredDemoRole());

  useEffect(() => {
    const handleRoleChange = (e: Event) => {
      const customEvent = e as CustomEvent<DemoRole>;
      if (customEvent.detail && customEvent.detail in DEMO_PROFILES) {
        setRoleState(customEvent.detail);
      } else {
        setRoleState(getStoredDemoRole());
      }
    };

    window.addEventListener(DEMO_ROLE_CHANGE_EVENT, handleRoleChange);
    window.addEventListener("storage", handleRoleChange);
    return () => {
      window.removeEventListener(DEMO_ROLE_CHANGE_EVENT, handleRoleChange);
      window.removeEventListener("storage", handleRoleChange);
    };
  }, []);

  const setRole = (newRole: DemoRole) => {
    setRoleState(newRole);
    setStoredDemoRole(newRole);
  };

  return {
    role,
    user: DEMO_PROFILES[role],
    setRole,
    profiles: DEMO_PROFILES,
  };
}

// ============================================================================
// Comprehensive In-Memory & LocalStorage Data Store for All Content & CRUD
// ============================================================================

export interface DimensionItem {
  id: number;
  name: string;
  category: "Body" | "Mind" | "Emotions" | "Community" | "Purpose" | "Environment" | "Soul";
  description: string;
  dailyPrompt: string;
  aspects: string[];
  order: number;
  isActive: boolean;
}

export interface GuideItem {
  id: number;
  title: string;
  category: string;
  type: "Activity" | "In the moment" | "Relationships" | "Mindfulness" | "Reflection";
  readTime: string;
  body: string;
  author: string;
  isPublished: boolean;
  createdAt: string;
}

export interface RulePresetItem {
  id: number;
  title: string;
  category: string;
  guidance: string;
  severity: "Essential" | "Recommended" | "Aspirational";
  isActive: boolean;
}

export interface CommunityPostItem {
  id: number;
  authorName: string;
  authorRole: string;
  avatar: string;
  topic: string;
  title: string;
  body: string;
  likes: number;
  repliesCount: number;
  isPinned: boolean;
  isFlagged: boolean;
  createdAt: string;
}

export interface ManagedUserItem {
  id: number;
  name: string;
  email: string;
  role: DemoRole;
  cohort: string;
  joinedAt: string;
  status: "active" | "resting" | "alumni";
  lastCheckIn: string;
}

export interface AuditLogItem {
  id: number;
  timestamp: string;
  actorName: string;
  action: string;
  resource: string;
  severity: "info" | "warning" | "success";
}

export interface SupporterConnectionItem {
  id: number;
  supporterName: string;
  supporterEmail: string;
  memberName: string;
  memberEmail: string;
  scope: "Dashboard Pulse" | "Dashboard & Rules" | "Full Consented Access";
  shareCheckIns: boolean;
  shareBoundaries: boolean;
  shareEmergencyAlerts: boolean;
  shareRawJournal: boolean;
  status: "active" | "paused" | "revoked";
  linkedAt: string;
  notesSentCount: number;
}

// Initial 21 Dimensions seed
const INITIAL_DIMENSIONS: DimensionItem[] = [
  { id: 1, name: "Somatic Grounding", category: "Body", description: "Reconnecting safely to physical sensations, movement, and nervous system ease.", dailyPrompt: "Where in your body feels steady right now?", aspects: ["Breath awareness", "Tension release", "Gentle movement"], order: 1, isActive: true },
  { id: 2, name: "Sleep & Circadian Rhythm", category: "Body", description: "Honoring regular restorative rest without chemical crutches.", dailyPrompt: "What boundary tonight will protect your sleep?", aspects: ["Evening wind-down", "Screen boundaries", "Morning light"], order: 2, isActive: true },
  { id: 3, name: "Nourishment & Hydration", category: "Body", description: "Fueling the recovering brain and gut with steady, gentle nourishment.", dailyPrompt: "Have you drank water and eaten warm, real food today?", aspects: ["Hydration rhythm", "Blood sugar balance", "Mindful meals"], order: 3, isActive: true },
  { id: 4, name: "Emotional Literacy", category: "Emotions", description: "Naming what is actually here without numbing or dramatizing.", dailyPrompt: "Can you name 2 feelings present under the surface?", aspects: ["Emotion identification", "Sitting with discomfort", "Self-compassion"], order: 4, isActive: true },
  { id: 5, name: "Urge Surfing & Impulse Delay", category: "Mind", description: "Riding out cravings as waves rather than commands.", dailyPrompt: "When an urge comes, can you give it 10 calm minutes?", aspects: ["Wave metaphor", "Physical relocation", "Calling support"], order: 5, isActive: true },
  { id: 6, name: "Cognitive Reframing", category: "Mind", description: "Recognizing automatic all-or-nothing thinking before it becomes relapse.", dailyPrompt: "What catastrophic thought can you soften with nuance?", aspects: ["Black-and-white check", "Gentle self-talk", "Fact vs story"], order: 6, isActive: true },
  { id: 7, name: "Relational Safety", category: "Community", description: "Identifying safe allies and communicating needs without apology.", dailyPrompt: "Who is one safe person you can be honest with today?", aspects: ["Vulnerability bounds", "Safe contact list", "Asking for presence"], order: 7, isActive: true },
  { id: 8, name: "Clean Boundaries", category: "Community", description: "Saying clear yeses and clean nos to protect energy and sobriety.", dailyPrompt: "What is one thing you will gently say no to today?", aspects: ["Protecting evening time", "Saying no kindly", "People pleasing detox"], order: 8, isActive: true },
  { id: 9, name: "Repair & Amends", category: "Community", description: "Living amends through daily reliability rather than grand apologies.", dailyPrompt: "How can you show quiet consistency to someone you care about?", aspects: ["Reliable actions", "Listening without defense", "Living amends"], order: 9, isActive: true },
  { id: 10, name: "Purpose & Craft", category: "Purpose", description: "Engaging in work, craft, or contribution that centers dignity.", dailyPrompt: "What small effort felt honest and good today?", aspects: ["Deep focus", "Dignity in effort", "Craftsmanship"], order: 10, isActive: true },
  { id: 11, name: "Financial Honesty", category: "Purpose", description: "Unmasking numbers, facing debts calmly, and spending intentionally.", dailyPrompt: "Did you look at your balance with clarity and kindness?", aspects: ["Transparent tracking", "Impulse buy pause", "Small regular savings"], order: 11, isActive: true },
  { id: 12, name: "Sanctuary Environment", category: "Environment", description: "Creating spaces that soothe the senses and remove triggers.", dailyPrompt: "What is one corner of your room you can clear today?", aspects: ["Trigger removal", "Visual calm", "Safe refuge spaces"], order: 12, isActive: true },
  { id: 13, name: "Nature Connection", category: "Environment", description: "Regulating the nervous system through earth, sky, and trees.", dailyPrompt: "Did you step outside and look at the trees or sky today?", aspects: ["Daily fresh air", "Sensory grounding", "Seasonal pace"], order: 13, isActive: true },
  { id: 14, name: "Creative Play", category: "Soul", description: "Recovering joy, art, and play without performance or pressure.", dailyPrompt: "What can you make or enjoy just for the delight of it?", aspects: ["Doodling/Writing", "Music listening", "Non-competitive hobbies"], order: 14, isActive: true },
  { id: 15, name: "Grief & Acceptance", category: "Emotions", description: "Allowing the sorrow of lost time and lost relationships to move.", dailyPrompt: "Can you offer sorrow a soft place to sit for five minutes?", aspects: ["Allowing tears", "Honoring lost years", "Radical acceptance"], order: 15, isActive: true },
  { id: 16, name: "Spiritual Grounding", category: "Soul", description: "Connecting to wonder, stillness, or sacred reality beyond the ego.", dailyPrompt: "Where did you encounter awe, silence, or gratitude today?", aspects: ["Quiet contemplation", "Reverence", "Ethical anchor"], order: 16, isActive: true },
  { id: 17, name: "Patience with Slowness", category: "Mind", description: "Unlearning the dopamine-rush expectation of instant fixes.", dailyPrompt: "Can you trust that healing is happening under the soil?", aspects: ["Tolerating boredom", "Micro-consistency", "Long horizon"], order: 17, isActive: true },
  { id: 18, name: "Physical Health Checkups", category: "Body", description: "Caring for the body through dental, medical, and preventative care.", dailyPrompt: "Is there an overdue health appointment you can schedule?", aspects: ["Doctor visits", "Dental checkup", "Medication compliance"], order: 18, isActive: true },
  { id: 19, name: "Digital Boundaries", category: "Mind", description: "Guarding dopamine from relentless scrolling, outrage, and triggers.", dailyPrompt: "Did you put your phone in another room during rest?", aspects: ["Notification silence", "Doomscroll prevention", "Screen-free meals"], order: 19, isActive: true },
  { id: 20, name: "Generosity & Service", category: "Community", description: "Supporting another human quietly without needing recognition.", dailyPrompt: "How can you be a quiet blessing to a stranger or friend today?", aspects: ["Active listening", "Anonymous kindness", "Sharing recovery hope"], order: 20, isActive: true },
  { id: 21, name: "Self-Forgiveness", category: "Soul", description: "Releasing the trial inside your mind. The debt of yesterday is closed.", dailyPrompt: "What can you forgive yourself for right now?", aspects: ["Dropping inner judge", "New beginning daily", "Compassionate witness"], order: 21, isActive: true },
];

// Initial Recovery Guides
const INITIAL_GUIDES: GuideItem[] = [
  {
    id: 1,
    title: "A Ten-Minute Nervous System Reset",
    category: "Somatic Grounding",
    type: "Activity",
    readTime: "4 min",
    body: "When adrenaline spikes or cravings tighten in your chest, reason alone rarely calms the amygdala. Put both feet firmly onto the earth. Inhale through your nose for 4 counts, hold for 2, and exhale through pursed lips for 6 counts. Repeat five times. Look around and name five blue objects in your room. Your nervous system is returning to safety.",
    author: "Dr. Marcus Vance",
    isPublished: true,
    createdAt: "2026-03-01",
  },
  {
    id: 2,
    title: "When the Urge Arrives: The 15-Minute Rule",
    category: "Urge Surfing & Impulse Delay",
    type: "In the moment",
    readTime: "3 min",
    body: "An urge is a neurochemical wave that crests and breaks within 12 to 20 minutes if not fed by ruminative thinking. Set a timer for 15 minutes. During this window, drink a tall glass of cold water, change your physical environment (step outside or walk into another room), and send a short message to your accountability partner. You don't have to quit forever—just ride this single wave.",
    author: "Alex Rivera",
    isPublished: true,
    createdAt: "2026-03-05",
  },
  {
    id: 3,
    title: "Repair Without Performance",
    category: "Repair & Amends",
    type: "Relationships",
    readTime: "5 min",
    body: "People harmed by our old patterns do not need grandiose declarations or frantic promises. They need predictable, quiet reliability over weeks and months. Say what happened plainly: 'I was wrong, I see how it affected you, and I am learning steadiness.' Then let your daily actions rebuild the bridge one brick at a time.",
    author: "Elena Rostova, Peer Mentor",
    isPublished: true,
    createdAt: "2026-03-08",
  },
  {
    id: 4,
    title: "The Evening Wind-Down Ritual",
    category: "Sleep & Circadian Rhythm",
    type: "Activity",
    readTime: "4 min",
    body: "Many relapses take root in late-night exhaustion combined with mindless screen consumption. Establish a sacred transition: dim warm lights 60 minutes before bed, turn off notifications, brew non-caffeinated herbal tea, and write 3 things you leave in today's care.",
    author: "Dr. Marcus Vance",
    isPublished: true,
    createdAt: "2026-03-12",
  },
];

// Initial Boundary Rules
const INITIAL_RULES: RulePresetItem[] = [
  { id: 1, title: "I do not make life-altering decisions while overwhelmed.", category: "Mind", guidance: "Pause for at least 24 hours, sleep on it, and discuss with a mentor before acting.", severity: "Essential", isActive: true },
  { id: 2, title: "I do not negotiate with cravings past 10:00 PM.", category: "Body", guidance: "Late-night thinking is compromised by fatigue. Go to sleep; reassess in morning light.", severity: "Essential", isActive: true },
  { id: 3, title: "I do not hide in secrecy when struggling.", category: "Community", guidance: "Secrecy is where relapse breathes. Text at least one safe person within 30 minutes of a trigger.", severity: "Essential", isActive: true },
  { id: 4, title: "I keep my sanctuary space free of all substances and paraphernalia.", category: "Environment", guidance: "Physical environment must remain 100% sacred and trigger-free.", severity: "Essential", isActive: true },
  { id: 5, title: "I do not attend gatherings where substance use is the primary activity.", category: "Community", guidance: "Protect your early momentum without feeling the need to test your willpower.", severity: "Recommended", isActive: true },
];

// Initial Community Posts
const INITIAL_POSTS: CommunityPostItem[] = [
  {
    id: 1,
    authorName: "Sam Bennett",
    authorRole: "Member",
    avatar: "SB",
    topic: "Daily Practices",
    title: "Day 48: The morning quiet is finally feeling peaceful",
    body: "For the first three weeks, silence felt terrifying—my mind would race with old guilt. Doing the 5-minute somatic breathing before checking my phone has completely transformed my mornings. Grateful for this community.",
    likes: 24,
    repliesCount: 6,
    isPinned: true,
    isFlagged: false,
    createdAt: "2 hours ago",
  },
  {
    id: 2,
    authorName: "Maya Lin",
    authorRole: "Member",
    avatar: "ML",
    topic: "Boundaries",
    title: "How I handled a work dinner with heavy drinking",
    body: "I drove my own car so I wasn't trapped, ordered sparkling water with lime before anyone else ordered drinks, and stayed for exactly 45 minutes to congratulate the team before leaving smoothly. No excuses, no drama.",
    likes: 38,
    repliesCount: 9,
    isPinned: false,
    isFlagged: false,
    createdAt: "Yesterday",
  },
  {
    id: 3,
    authorName: "David K.",
    authorRole: "Member",
    avatar: "DK",
    topic: "Hope",
    title: "One year clean today. What I wish I knew at Day 7",
    body: "You don't have to carry the whole year all at once. You just have to make it to bedtime tonight without giving up your peace. It really does get lighter.",
    likes: 89,
    repliesCount: 15,
    isPinned: true,
    isFlagged: false,
    createdAt: "3 days ago",
  },
];

// Initial Managed Users
const INITIAL_USERS: ManagedUserItem[] = [
  { id: 1, name: "Alex Rivera", email: "alex.admin@reforge.app", role: "admin", cohort: "Cohort 01", joinedAt: "2025-08-12", status: "active", lastCheckIn: "Today, 8:15 AM" },
  { id: 2, name: "Sam Bennett", email: "sam.b@reforge.app", role: "member", cohort: "Cohort 14", joinedAt: "2026-01-20", status: "active", lastCheckIn: "Today, 7:30 AM" },
  { id: 3, name: "Sarah Miller", email: "sarah.m@reforge.app", role: "supporter", cohort: "Partner Program", joinedAt: "2026-01-22", status: "active", lastCheckIn: "Yesterday" },
  { id: 4, name: "Dr. Marcus Vance", email: "m.vance@reforge.app", role: "coach", cohort: "Clinical Team", joinedAt: "2025-06-01", status: "active", lastCheckIn: "Today, 9:00 AM" },
  { id: 5, name: "Jordan Lee", email: "jordan.l@reforge.app", role: "member", cohort: "Cohort 15", joinedAt: "2026-02-10", status: "active", lastCheckIn: "Yesterday, 8:45 PM" },
  { id: 6, name: "Elena Rostova", email: "elena.r@reforge.app", role: "member", cohort: "Cohort 12", joinedAt: "2025-11-04", status: "active", lastCheckIn: "Today, 6:40 AM" },
  { id: 7, name: "Marcus Brody", email: "m.brody@reforge.app", role: "supporter", cohort: "Partner Program", joinedAt: "2026-02-01", status: "resting", lastCheckIn: "4 days ago" },
];

// Initial Audit Logs
const INITIAL_LOGS: AuditLogItem[] = [
  { id: 1, timestamp: "Today, 09:14 AM", actorName: "Alex Rivera (Admin)", action: "Published Guide", resource: "A Ten-Minute Nervous System Reset", severity: "success" },
  { id: 2, timestamp: "Today, 08:30 AM", actorName: "Dr. Marcus Vance (Coach)", action: "Logged Clinical Note", resource: "Client: Sam Bennett (Cohort 14)", severity: "info" },
  { id: 3, timestamp: "Today, 07:32 AM", actorName: "Sam Bennett (Member)", action: "Daily Check-In", resource: "Morning Assessment (Mood: 4/5)", severity: "info" },
  { id: 4, timestamp: "Yesterday, 06:15 PM", actorName: "Sarah Miller (Supporter)", action: "Sent Encouragement", resource: "Nudge to Sam Bennett", severity: "success" },
  { id: 5, timestamp: "Yesterday, 02:20 PM", actorName: "Alex Rivera (Admin)", action: "Updated Dimension", resource: "Dimension 04: Emotional Literacy", severity: "info" },
];

// Initial Supporter Connections
const INITIAL_SUPPORTER_CONNECTIONS: SupporterConnectionItem[] = [
  {
    id: 1,
    supporterName: "Sarah Miller",
    supporterEmail: "sarah.m@reforge.app",
    memberName: "Sam Bennett",
    memberEmail: "sam.b@reforge.app",
    scope: "Dashboard & Rules",
    shareCheckIns: true,
    shareBoundaries: true,
    shareEmergencyAlerts: true,
    shareRawJournal: false,
    status: "active",
    linkedAt: "2026-01-22",
    notesSentCount: 14,
  },
  {
    id: 2,
    supporterName: "Marcus Brody",
    supporterEmail: "m.brody@reforge.app",
    memberName: "Jordan Lee",
    memberEmail: "jordan.l@reforge.app",
    scope: "Dashboard Pulse",
    shareCheckIns: true,
    shareBoundaries: false,
    shareEmergencyAlerts: true,
    shareRawJournal: false,
    status: "active",
    linkedAt: "2026-02-01",
    notesSentCount: 5,
  },
  {
    id: 3,
    supporterName: "David K.",
    supporterEmail: "david.k@reforge.app",
    memberName: "Elena Rostova",
    memberEmail: "elena.r@reforge.app",
    scope: "Full Consented Access",
    shareCheckIns: true,
    shareBoundaries: true,
    shareEmergencyAlerts: true,
    shareRawJournal: false,
    status: "paused",
    linkedAt: "2025-12-10",
    notesSentCount: 22,
  },
];

// LocalStorage helpers
function loadStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export class DemoDataManager {
  private static DIMS_KEY = "reforge_crud_dimensions";
  private static GUIDES_KEY = "reforge_crud_guides";
  private static RULES_KEY = "reforge_crud_rules";
  private static POSTS_KEY = "reforge_crud_posts";
  private static USERS_KEY = "reforge_crud_users";
  private static LOGS_KEY = "reforge_crud_logs";
  private static SUPPORTERS_KEY = "reforge_crud_supporters";

  // Dimensions
  static getDimensions(): DimensionItem[] {
    return loadStorage<DimensionItem[]>(this.DIMS_KEY, INITIAL_DIMENSIONS);
  }
  static saveDimensions(dims: DimensionItem[]) {
    saveStorage(this.DIMS_KEY, dims);
  }
  static addDimension(dim: Omit<DimensionItem, "id">): DimensionItem {
    const all = this.getDimensions();
    const newItem: DimensionItem = { ...dim, id: Date.now() };
    this.saveDimensions([newItem, ...all]);
    this.addLog("Created Dimension", newItem.name, "success");
    return newItem;
  }
  static updateDimension(id: number, updates: Partial<DimensionItem>) {
    const all = this.getDimensions().map(d => (d.id === id ? { ...d, ...updates } : d));
    this.saveDimensions(all);
    this.addLog("Updated Dimension", updates.name || `ID #${id}`, "info");
  }
  static deleteDimension(id: number) {
    const all = this.getDimensions().filter(d => d.id !== id);
    this.saveDimensions(all);
    this.addLog("Deleted Dimension", `ID #${id}`, "warning");
  }

  // Guides
  static getGuides(): GuideItem[] {
    return loadStorage<GuideItem[]>(this.GUIDES_KEY, INITIAL_GUIDES);
  }
  static saveGuides(guides: GuideItem[]) {
    saveStorage(this.GUIDES_KEY, guides);
  }
  static addGuide(guide: Omit<GuideItem, "id" | "createdAt">): GuideItem {
    const all = this.getGuides();
    const newItem: GuideItem = {
      ...guide,
      id: Date.now(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    this.saveGuides([newItem, ...all]);
    this.addLog("Created Recovery Guide", newItem.title, "success");
    return newItem;
  }
  static updateGuide(id: number, updates: Partial<GuideItem>) {
    const all = this.getGuides().map(g => (g.id === id ? { ...g, ...updates } : g));
    this.saveGuides(all);
    this.addLog("Updated Guide", updates.title || `ID #${id}`, "info");
  }
  static deleteGuide(id: number) {
    const all = this.getGuides().filter(g => g.id !== id);
    this.saveGuides(all);
    this.addLog("Deleted Guide", `ID #${id}`, "warning");
  }

  // Rules Presets
  static getRules(): RulePresetItem[] {
    return loadStorage<RulePresetItem[]>(this.RULES_KEY, INITIAL_RULES);
  }
  static saveRules(rules: RulePresetItem[]) {
    saveStorage(this.RULES_KEY, rules);
  }
  static addRule(rule: Omit<RulePresetItem, "id">): RulePresetItem {
    const all = this.getRules();
    const newItem: RulePresetItem = { ...rule, id: Date.now() };
    this.saveRules([newItem, ...all]);
    this.addLog("Created Boundary Rule", newItem.title, "success");
    return newItem;
  }
  static updateRule(id: number, updates: Partial<RulePresetItem>) {
    const all = this.getRules().map(r => (r.id === id ? { ...r, ...updates } : r));
    this.saveRules(all);
    this.addLog("Updated Boundary Rule", updates.title || `ID #${id}`, "info");
  }
  static deleteRule(id: number) {
    const all = this.getRules().filter(r => r.id !== id);
    this.saveRules(all);
    this.addLog("Deleted Boundary Rule", `ID #${id}`, "warning");
  }

  // Community Posts
  static getPosts(): CommunityPostItem[] {
    return loadStorage<CommunityPostItem[]>(this.POSTS_KEY, INITIAL_POSTS);
  }
  static savePosts(posts: CommunityPostItem[]) {
    saveStorage(this.POSTS_KEY, posts);
  }
  static addPost(post: Omit<CommunityPostItem, "id" | "createdAt" | "likes" | "repliesCount">): CommunityPostItem {
    const all = this.getPosts();
    const newItem: CommunityPostItem = {
      ...post,
      id: Date.now(),
      likes: 0,
      repliesCount: 0,
      createdAt: "Just now",
    };
    this.savePosts([newItem, ...all]);
    this.addLog("Published Community Discussion", newItem.title, "info");
    return newItem;
  }
  static updatePost(id: number, updates: Partial<CommunityPostItem>) {
    const all = this.getPosts().map(p => (p.id === id ? { ...p, ...updates } : p));
    this.savePosts(all);
  }
  static deletePost(id: number) {
    const all = this.getPosts().filter(p => p.id !== id);
    this.savePosts(all);
    this.addLog("Moderated Post", `Removed Post ID #${id}`, "warning");
  }

  // Users
  static getUsers(): ManagedUserItem[] {
    return loadStorage<ManagedUserItem[]>(this.USERS_KEY, INITIAL_USERS);
  }
  static saveUsers(users: ManagedUserItem[]) {
    saveStorage(this.USERS_KEY, users);
  }
  static addUser(user: Omit<ManagedUserItem, "id" | "joinedAt">): ManagedUserItem {
    const all = this.getUsers();
    const newItem: ManagedUserItem = {
      ...user,
      id: Date.now(),
      joinedAt: new Date().toISOString().split("T")[0],
    };
    this.saveUsers([newItem, ...all]);
    this.addLog("Created User Account", `${newItem.name} (${newItem.role})`, "success");
    return newItem;
  }
  static updateUser(id: number, updates: Partial<ManagedUserItem>) {
    const all = this.getUsers().map(u => (u.id === id ? { ...u, ...updates } : u));
    this.saveUsers(all);
    this.addLog("Updated User Profile", updates.name || `User ID #${id}`, "info");
  }
  static deleteUser(id: number) {
    const all = this.getUsers().filter(u => u.id !== id);
    this.saveUsers(all);
    this.addLog("Deactivated User Account", `User ID #${id}`, "warning");
  }

  // Audit Logs
  static getLogs(): AuditLogItem[] {
    return loadStorage<AuditLogItem[]>(this.LOGS_KEY, INITIAL_LOGS);
  }
  static addLog(action: string, resource: string, severity: "info" | "warning" | "success" = "info") {
    const currentRole = getStoredDemoRole();
    const actor = DEMO_PROFILES[currentRole]?.name || "Demo User";
    const all = this.getLogs();
    const newLog: AuditLogItem = {
      id: Date.now(),
      timestamp: "Just now",
      actorName: `${actor} (${currentRole.toUpperCase()})`,
      action,
      resource,
      severity,
    };
    saveStorage(this.LOGS_KEY, [newLog, ...all].slice(0, 50));
  }

  // Supporter Connections
  static getSupporterConnections(): SupporterConnectionItem[] {
    return loadStorage<SupporterConnectionItem[]>(this.SUPPORTERS_KEY, INITIAL_SUPPORTER_CONNECTIONS);
  }
  static saveSupporterConnections(conns: SupporterConnectionItem[]) {
    saveStorage(this.SUPPORTERS_KEY, conns);
  }
  static addSupporterConnection(conn: Omit<SupporterConnectionItem, "id" | "linkedAt" | "notesSentCount">): SupporterConnectionItem {
    const all = this.getSupporterConnections();
    const newItem: SupporterConnectionItem = {
      ...conn,
      id: Date.now(),
      linkedAt: new Date().toISOString().split("T")[0],
      notesSentCount: 0,
    };
    this.saveSupporterConnections([newItem, ...all]);
    this.addLog("Created Supporter Link", `${newItem.supporterName} ↔ ${newItem.memberName}`, "success");
    return newItem;
  }
  static updateSupporterConnection(id: number, updates: Partial<SupporterConnectionItem>) {
    const all = this.getSupporterConnections().map(c => (c.id === id ? { ...c, ...updates } : c));
    this.saveSupporterConnections(all);
    this.addLog("Updated Supporter Consent Scope", `Pairing ID #${id}`, "info");
  }
  static deleteSupporterConnection(id: number) {
    const all = this.getSupporterConnections().filter(c => c.id !== id);
    this.saveSupporterConnections(all);
    this.addLog("Revoked Supporter Connection", `Pairing ID #${id}`, "warning");
  }

  // Reset all to fresh defaults
  static resetAllData() {
    saveStorage(this.DIMS_KEY, INITIAL_DIMENSIONS);
    saveStorage(this.GUIDES_KEY, INITIAL_GUIDES);
    saveStorage(this.RULES_KEY, INITIAL_RULES);
    saveStorage(this.POSTS_KEY, INITIAL_POSTS);
    saveStorage(this.USERS_KEY, INITIAL_USERS);
    saveStorage(this.LOGS_KEY, INITIAL_LOGS);
    saveStorage(this.SUPPORTERS_KEY, INITIAL_SUPPORTER_CONNECTIONS);
  }
}
