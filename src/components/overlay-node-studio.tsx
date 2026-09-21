import { useMemo, useState, type CSSProperties } from "react";
import {
  BadgeDollarSign,
  Check,
  ChevronDown,
  Copy,
  Crown,
  Eye,
  Flame,
  Heart,
  Layers3,
  MessageSquareText,
  MonitorPlay,
  Palette,
  Radio,
  RotateCcw,
  Shield,
  Sparkles,
  Target,
  Trophy,
  UserPlus,
} from "lucide-react";

import tacticalArena from "@/assets/tactical-arena.jpg";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type View = "bundle" | "rank" | "chat" | "goal";
type PreviewBackground = "game" | "light" | "checker";
type PresetName = "Competitive Dark" | "Clean Light" | "Pastel";

type Theme = {
  accent: string;
  text: string;
  panel: string;
  opacity: number;
  font: string;
  radius: number;
  scale: number;
  motion: number;
};

const presets: Record<PresetName, Theme> = {
  "Competitive Dark": {
    accent: "#ff665a",
    text: "#f7f7f5",
    panel: "#111316",
    opacity: 88,
    font: "Sora",
    radius: 8,
    scale: 100,
    motion: 70,
  },
  "Clean Light": {
    accent: "#e34b44",
    text: "#15171a",
    panel: "#f7f7f3",
    opacity: 94,
    font: "Manrope",
    radius: 6,
    scale: 100,
    motion: 45,
  },
  Pastel: {
    accent: "#f08c95",
    text: "#30313a",
    panel: "#fff7f1",
    opacity: 90,
    font: "Outfit",
    radius: 12,
    scale: 100,
    motion: 55,
  },
};

const views: Array<{ id: View; label: string; icon: typeof Layers3 }> = [
  { id: "bundle", label: "Bundle Preview", icon: Layers3 },
  { id: "rank", label: "Rank Tracker", icon: Trophy },
  { id: "chat", label: "Chat Box", icon: MessageSquareText },
  { id: "goal", label: "Stream Goal", icon: Target },
];

const hexToRgb = (hex: string) => {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean, 16);
  return `${(value >> 16) & 255} ${(value >> 8) & 255} ${value & 255}`;
};

function WidgetMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <span />
      <span />
    </div>
  );
}

function RankWidget({ compact = false }: { compact?: boolean }) {
  return (
    <section className={cn("stream-widget rank-widget", compact && "widget-compact")} aria-label="Rank Tracker preview">
      <div className="widget-kicker">
        <span className="live-dot" /> Ranked session
        <span className="widget-mark"><WidgetMark /></span>
      </div>
      <div className="rank-main">
        <div className="rank-emblem" aria-hidden="true">
          <i />
          <b>3</b>
        </div>
        <div className="rank-copy">
          <p className="player-name">CONNORCAL <span>#NA1</span></p>
          <h2>ASCENDANT</h2>
          <div className="rr-row"><span>72 RR</span><span>100</span></div>
          <div className="rr-track"><span style={{ width: "72%" }} /></div>
        </div>
      </div>
      <div className="rank-stats">
        <span><strong>4</strong> WINS</span>
        <span><strong>2</strong> LOSSES</span>
        <span className="streak"><Flame /> <strong>3</strong> STREAK</span>
      </div>
    </section>
  );
}

function ChatWidget({ compact = false }: { compact?: boolean }) {
  return (
    <section className={cn("stream-widget chat-widget", compact && "widget-compact")} aria-label="Chat Box preview">
      <div className="chat-header">
        <span><MessageSquareText /> LIVE CHAT</span>
        <span className="viewer-count"><Eye /> 1.2K</span>
      </div>
      <div className="chat-feed">
        <div className="chat-line">
          <span className="avatar avatar-one">N</span>
          <p><b className="name-coral">nova</b><small className="role-badge"><Shield /> MOD</small><br />that flick was unreal</p>
        </div>
        <div className="alert-line follow-alert">
          <UserPlus /><p><b>pixelghost</b> joined the squad</p><span>FOLLOW</span>
        </div>
        <div className="chat-line">
          <span className="avatar avatar-two">K</span>
          <p><b>kira.exe</b><small className="role-badge vip"><Crown /> VIP</small><br />one more for rank up!</p>
        </div>
        <div className="alert-line sub-alert">
          <Sparkles /><p><b>ariafps</b> subscribed for 8 months</p><span>SUB</span>
        </div>
        {!compact && (
          <div className="alert-line tip-alert">
            <BadgeDollarSign /><p><b>westside</b> tipped <strong>$10</strong></p><span>TIP</span>
          </div>
        )}
      </div>
    </section>
  );
}

function GoalWidget({ compact = false, complete = false }: { compact?: boolean; complete?: boolean }) {
  const current = complete ? 1000 : 728;
  return (
    <section className={cn("stream-widget goal-widget", compact && "widget-compact", complete && "goal-complete")} aria-label="Stream Goal preview">
      <div className="goal-top">
        <div>
          <span className="goal-label"><Heart /> FOLLOWER GOAL</span>
          <h2>{complete ? "SQUAD COMPLETE" : "ROAD TO 1K"}</h2>
        </div>
        <p><strong>{current.toLocaleString()}</strong><span>/ 1,000</span></p>
      </div>
      <div className="goal-track"><span style={{ width: `${current / 10}%` }} /></div>
      <div className="goal-meta"><span>{complete ? "Goal reached" : "272 to go"}</span><b>{current / 10}%</b></div>
      {complete && <div className="goal-burst" aria-hidden="true"><Sparkles /></div>}
    </section>
  );
}

function ControlLabel({ children, value }: { children: string; value?: string }) {
  return <div className="control-label"><span>{children}</span>{value && <b>{value}</b>}</div>;
}

export function OverlayNodeStudio() {
  const [view, setView] = useState<View>("bundle");
  const [preset, setPreset] = useState<PresetName>("Competitive Dark");
  const [theme, setTheme] = useState<Theme>(presets["Competitive Dark"]);
  const [background, setBackground] = useState<PreviewBackground>("game");
  const [override, setOverride] = useState(false);
  const [overrideAccent, setOverrideAccent] = useState("#6ee7d0");
  const [goalComplete, setGoalComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeAccent = view !== "bundle" && override ? overrideAccent : theme.accent;
  const previewStyle = useMemo(() => ({
    "--stream-accent": activeAccent,
    "--stream-accent-rgb": hexToRgb(activeAccent),
    "--stream-text": theme.text,
    "--stream-panel-rgb": hexToRgb(theme.panel),
    "--stream-opacity": theme.opacity / 100,
    "--stream-radius": `${theme.radius}px`,
    "--stream-scale": theme.scale / 100,
    "--stream-motion": `${Math.max(0.12, theme.motion / 100)}s`,
    "--stream-font": theme.font,
  }) as CSSProperties;

  const updateTheme = <K extends keyof Theme>(key: K, value: Theme[K]) => {
    setTheme((current) => ({ ...current, [key]: value }));
  };

  const applyPreset = (name: PresetName) => {
    setPreset(name);
    setTheme(presets[name]);
  };

  const copyOverlay = async () => {
    const overlayUrl = `${window.location.origin}/?overlay=${view === "bundle" ? "all" : view}&transparent=1`;
    await navigator.clipboard?.writeText(overlayUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="studio-shell">
      <header className="studio-header">
        <div className="studio-brand">
          <WidgetMark />
          <div><strong>OverlayNode</strong><span>STREAM SYSTEMS</span></div>
        </div>
        <div className="project-title">
          <span>VALORANT STREAM BUNDLE</span>
          <i>UNOFFICIAL CREATOR TOOL</i>
        </div>
        <div className="header-actions">
          <span className="saved-state"><Check /> Saved</span>
          <Button variant="outline" size="sm" onClick={copyOverlay}>
            {copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy OBS link"}
          </Button>
        </div>
      </header>

      <div className="studio-grid">
        <aside className="studio-nav">
          <p className="nav-caption">WIDGETS</p>
          <nav aria-label="Widget views">
            {views.map((item) => {
              const Icon = item.icon;
              return (
                <Button key={item.id} variant="ghost" className={cn("nav-button", view === item.id && "nav-active")} onClick={() => setView(item.id)}>
                  <Icon /><span>{item.label}</span>{view === item.id && <i />}
                </Button>
              );
            })}
          </nav>
          <div className="nav-status">
            <div><Radio /><span><b>Preview online</b><small>1920 × 1080 canvas</small></span></div>
            <p>OverlayNode creates original stream graphics and is not affiliated with Riot Games.</p>
          </div>
        </aside>

        <main className="studio-main">
          <div className="workspace-head">
            <div>
              <p className="eyebrow">LIVE COMPOSITOR</p>
              <h1>{views.find((item) => item.id === view)?.label}</h1>
            </div>
            <div className="background-switcher" aria-label="Preview background">
              <Button size="icon" variant="ghost" title="Gameplay background" aria-label="Gameplay background" className={background === "game" ? "selected" : ""} onClick={() => setBackground("game")}><MonitorPlay /></Button>
              <Button size="icon" variant="ghost" title="Light background" aria-label="Light background" className={background === "light" ? "selected preview-light-button" : "preview-light-button"} onClick={() => setBackground("light")}><span /></Button>
              <Button size="icon" variant="ghost" title="Checkerboard background" aria-label="Checkerboard background" className={background === "checker" ? "selected checker-button" : "checker-button"} onClick={() => setBackground("checker")}><span /></Button>
            </div>
          </div>

          <div className={cn("preview-stage", `preview-${background}`, view !== "bundle" && "single-preview")} style={previewStyle}>
            {background === "game" && <img src={tacticalArena} width={1600} height={912} alt="Original futuristic tactical arena" />}
            <div className="preview-shade" />
            <div className={cn("preview-canvas", `canvas-${view}`)}>
              {view === "bundle" ? (
                <>
                  <div className="slot-rank"><RankWidget compact /></div>
                  <div className="slot-chat"><ChatWidget compact /></div>
                  <div className="slot-goal"><GoalWidget compact /></div>
                  <div className="scene-hud"><span>OVERLAY PREVIEW</span><b>LIVE</b></div>
                </>
              ) : (
                <div className="single-widget-wrap">
                  {view === "rank" && <RankWidget />}
                  {view === "chat" && <ChatWidget />}
                  {view === "goal" && <GoalWidget complete={goalComplete} />}
                </div>
              )}
            </div>
          </div>

          <div className="preview-footer">
            <div><span className="status-dot" /><span>Changes appear instantly</span></div>
            <div className="transparent-key"><i /> Transparent in OBS</div>
          </div>

          {view !== "bundle" && (
            <section className="widget-actions">
              <div><h2>{views.find((item) => item.id === view)?.label} overlay</h2><p>Ready for a browser source with a transparent background.</p></div>
              <div>
                {view === "goal" && <Button variant="outline" onClick={() => setGoalComplete((value) => !value)}><Sparkles />{goalComplete ? "Reset goal" : "Preview completion"}</Button>}
                <Button onClick={copyOverlay}>{copied ? <Check /> : <Copy />}{copied ? "Link copied" : "Copy overlay link"}</Button>
              </div>
            </section>
          )}
        </main>

        <aside className="control-panel">
          <div className="control-head"><div><Palette /><span><b>Theme controls</b><small>Updates all widgets</small></span></div><Button size="icon" variant="ghost" title="Reset theme" aria-label="Reset theme" onClick={() => applyPreset("Competitive Dark")}><RotateCcw /></Button></div>

          <section className="control-section preset-section">
            <ControlLabel>PRESET</ControlLabel>
            <Select value={preset} onValueChange={(value) => applyPreset(value as PresetName)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.keys(presets).map((name) => <SelectItem key={name} value={name}>{name}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="preset-swatches">
              {(Object.keys(presets) as PresetName[]).map((name) => <Button key={name} variant="ghost" title={name} aria-label={name} className={cn(preset === name && "active")} onClick={() => applyPreset(name)}><span style={{ backgroundColor: presets[name].accent }} /><span style={{ backgroundColor: presets[name].panel }} /></Button>)}
            </div>
          </section>

          <section className="control-section color-section">
            <div className="color-control">
              <ControlLabel>ACCENT</ControlLabel>
              <label><input type="color" value={theme.accent} onChange={(event) => updateTheme("accent", event.target.value)} aria-label="Accent color" /><span style={{ backgroundColor: theme.accent }} /><b>{theme.accent.toUpperCase()}</b></label>
            </div>
            <div className="color-control">
              <ControlLabel>TEXT</ControlLabel>
              <label><input type="color" value={theme.text} onChange={(event) => updateTheme("text", event.target.value)} aria-label="Text color" /><span style={{ backgroundColor: theme.text }} /><b>{theme.text.toUpperCase()}</b></label>
            </div>
          </section>

          <section className="control-section">
            <ControlLabel value={`${theme.opacity}%`}>PANEL OPACITY</ControlLabel>
            <Slider value={[theme.opacity]} min={30} max={100} step={1} onValueChange={([value]) => updateTheme("opacity", value)} />
          </section>

          <section className="control-section">
            <ControlLabel>TYPEFACE</ControlLabel>
            <Select value={theme.font} onValueChange={(value) => updateTheme("font", value)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="Sora">Sora</SelectItem><SelectItem value="Manrope">Manrope</SelectItem><SelectItem value="Outfit">Outfit</SelectItem></SelectContent>
            </Select>
          </section>

          <section className="control-section dual-sliders">
            <div><ControlLabel value={`${theme.radius}px`}>CORNERS</ControlLabel><Slider value={[theme.radius]} min={0} max={20} step={1} onValueChange={([value]) => updateTheme("radius", value)} /></div>
            <div><ControlLabel value={`${theme.scale}%`}>SCALE</ControlLabel><Slider value={[theme.scale]} min={75} max={120} step={1} onValueChange={([value]) => updateTheme("scale", value)} /></div>
          </section>

          <section className="control-section">
            <ControlLabel value={theme.motion === 0 ? "Off" : `${theme.motion}%`}>ANIMATION</ControlLabel>
            <Slider value={[theme.motion]} min={0} max={100} step={5} onValueChange={([value]) => updateTheme("motion", value)} />
            <div className="motion-scale"><span>Reduced</span><span>Expressive</span></div>
          </section>

          {view !== "bundle" && (
            <section className="control-section override-section">
              <div className="override-head"><span><b>Widget override</b><small>Only affects {views.find((item) => item.id === view)?.label}</small></span><Switch checked={override} onCheckedChange={setOverride} /></div>
              {override && <label className="override-color"><span style={{ backgroundColor: overrideAccent }} /><input type="color" value={overrideAccent} onChange={(event) => setOverrideAccent(event.target.value)} /><b>{overrideAccent.toUpperCase()}</b><ChevronDown /></label>}
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}