import { useState } from "react";

const CONCEPTS = [
  { id: 1, term: "אינטראקציה", def: "פעולה הדדית בין שני גופים — כל גוף מפעיל כוח על השני." },
  { id: 2, term: "כוח (F)", def: "דחיפה או משיכה שמשנה או מנסה לשנות את מצב תנועת גוף. יחידה: ניוטון [N]." },
  { id: 3, term: "מסה (m)", def: "כמות החומר בגוף. מודדת עמידות לשינוי תנועה. יחידה: קילוגרם [kg]." },
  { id: 4, term: "תאוצה (a)", def: "שיעור שינוי המהירות ביחידת זמן. יחידה: [m/s^2]." },
  { id: 5, term: "כוח שקול (SF)", def: "חיבור כל הכוחות הפועלים על גוף, תוך התחשבות בכיוון של כל כוח." },
  { id: 6, term: "שיווי משקל", def: "מצב שבו הכוח השקול על גוף הוא אפס — הגוף נח או נע במהירות קבועה." },
  { id: 7, term: "חוק ניוטון הראשון", def: "גוף ישמור על מצב תנועתו כל עוד הכוח השקול עליו אפס (עיקרון האינרציה)." },
  { id: 8, term: "אינרציה", def: "נטייתו של גוף לשמור על מצב תנועתו — מנוחה או תנועה ישרה קבועה." },
  { id: 9, term: "חוק ניוטון השני", def: "הכוח השקול שווה למכפלת המסה בתאוצה: SF = m*a" },
  { id: 10, term: "חוק ניוטון השלישי", def: "לכל כוח פועל יש כוח תגובה שווה בגודלו והפוך בכיוונו, הפועל על הגוף השני." },
  { id: 11, term: "זוג פעולה-תגובה", def: "שני כוחות מחוק ניוטון השלישי — שווים, מנוגדים, ופועלים על שני גופים שונים." },
  { id: 12, term: "כוח נורמלי (N)", def: "כוח הניצב למשטח שמפעיל המשטח על הגוף הנח עליו." },
];

const CARDS = [
  {
    id: 1, cat: "הגדרה", color: "#00c896", pts: 5,
    q: "מהי אינטראקציה בין גופים? תן דוגמה מהחיים.",
    a: "פעולה הדדית — כל גוף מפעיל כוח על השני. דוגמה: שני מגנטים שנמשכים זה לזה.",
  },
  {
    id: 2, cat: "הגדרה", color: "#00c896", pts: 5,
    q: "מהו הכוח השקול? מה קורה כשהוא אפס?",
    a: "חיבור כל הכוחות על גוף תוך התחשבות בכיוון. כשאפס — הגוף בשיווי משקל: נח או נע במהירות קבועה.",
  },
  {
    id: 3, cat: "הגדרה", color: "#00c896", pts: 5,
    q: "נסח את החוק הראשון של ניוטון.",
    a: "גוף ישמור על מצב תנועתו (מנוחה או תנועה ישרה קבועה) כל עוד הכוח השקול עליו הוא אפס.",
  },
  {
    id: 4, cat: "הגדרה", color: "#00c896", pts: 5,
    q: "נסח את החוק השני של ניוטון וכתוב את הנוסחה.",
    a: "כוח שקול על גוף גורם לו תאוצה ביחס ישר לכוח וביחס הפוך למסה. נוסחה: SF = m*a",
  },
  {
    id: 5, cat: "הגדרה", color: "#00c896", pts: 5,
    q: "נסח את החוק השלישי של ניוטון.",
    a: "לכל כוח פועל יש כוח תגובה שווה בגודלו והפוך בכיוונו, הפועל על הגוף השני.",
  },
  {
    id: 6, cat: "חישוב", color: "#f5c842", pts: 10,
    q: "כוח שקול של 20 N פועל על גוף במסה 4 kg. מה תאוצת הגוף?",
    a: "a = F/m = 20/4 = 5 m/s^2",
  },
  {
    id: 7, cat: "חישוב", color: "#f5c842", pts: 10,
    q: "גוף מואץ ב-6 m/s^2. מסתו 5 kg. מה הכוח השקול?",
    a: "F = m*a = 5*6 = 30 N",
  },
  {
    id: 8, cat: "חישוב", color: "#f5c842", pts: 10,
    q: "כוח של 25 N ימינה וכוח של 10 N שמאלה פועלים על גוף. מה הכוח השקול?",
    a: "SF = 25 - 10 = 15 N בכיוון ימינה",
  },
  {
    id: 9, cat: "חישוב", color: "#f5c842", pts: 10,
    q: "גוף במסה 3 kg נח על שולחן (g=10). מה הכוח הנורמלי?",
    a: "הגוף בשיווי משקל: N = mg = 3*10 = 30 N",
  },
  {
    id: 10, cat: "הסבר", color: "#ff7c3a", pts: 15,
    q: "נוסע ברכב שנעצר פתאום ממשיך לנוע קדימה. לאיזה חוק זה קשור? הסבר.",
    a: "חוק ניוטון הראשון — האינרציה. הגוף נוטה לשמור על מצב תנועתו. כשהרכב נעצר, הנוסע ממשיך בתנועתו.",
  },
  {
    id: 11, cat: "הסבר", color: "#ff7c3a", pts: 15,
    q: "אדם דוחף קיר בכוח 50 N. הקיר דוחף אותו חזרה. לאיזה חוק זה קשור? מה גודל כוח התגובה?",
    a: "חוק ניוטון השלישי. הקיר מפעיל כוח תגובה של 50 N בכיוון הפוך על האדם.",
  },
  {
    id: 12, cat: "הסבר", color: "#ff7c3a", pts: 15,
    q: "שני כוחות שווים ומנוגדים פועלים על גוף. מה תנועת הגוף? לאיזה חוק זה קשור?",
    a: "הכוח השקול אפס, לכן הגוף נח או נע במהירות קבועה — חוק ניוטון הראשון.",
  },
  {
    id: 13, cat: "אתגר", color: "#e63946", pts: 20,
    q: "אתגר-הסבר: רקטה בחלל ירתה גז לאחור. כיצד היא מתקדמת קדימה? ציין את החוק ואת זוג הכוחות.",
    a: "חוק ניוטון השלישי: הרקטה דוחפת גז לאחור, הגז דוחף את הרקטה קדימה. זהו זוג פעולה-תגובה.",
  },
];

const COLORS = ["6c63ff", "ff6584", "43b89c", "f5a623"];
const ICONS = ["🚀", "⚡", "🔭", "🧲"];
const WIN = 50;

export default function NewtonGame() {
  const [screen, setScreen] = useState("title");
  const [count, setCount] = useState(2);
  const [names, setNames] = useState(["שחקן 1", "שחקן 2", "שחקן 3", "שחקן 4"]);
  const [players, setPlayers] = useState([]);
  const [cur, setCur] = useState(0);
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState(null);
  const [showAns, setShowAns] = useState(false);
  const [over, setOver] = useState(false);
  const [log, setLog] = useState([]);

  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

  function start() {
    setPlayers(Array.from({ length: count }, (_, i) => ({ name: names[i] || `שחקן ${i + 1}`, score: 0 })));
    setCur(0); setOver(false); setCard(null); setShowAns(false); setLog([]);
    setDeck(shuffle(CARDS)); setScreen("game");
  }

  function draw() {
    const d = deck.length > 0 ? deck : shuffle(CARDS);
    setCard(d[0]); setDeck(d.slice(1)); setShowAns(false);
  }

  function award(pts) {
    const up = players.map((p, i) => i === cur ? { ...p, score: p.score + pts } : p);
    setPlayers(up);
    addLog(players[cur].name, pts);
    if (up[cur].score >= WIN) { setOver(true); return; }
    next(up);
  }

  function skip() { addLog(players[cur].name, 0); next(players); }

  function addLog(name, pts) {
    setLog(l => [{ name, pts, q: card.q.slice(0, 36) + "…" }, ...l.slice(0, 9)]);
  }

  function next(ps) { setCard(null); setShowAns(false); setCur(c => (c + 1) % ps.length); }

  const ci = { "הגדרה": "📖", "חישוב": "🔢", "הסבר": "💬", "אתגר": "🔥" };

  if (screen === "title") return (
    <div style={R.root}>
      <div style={R.g1} /><div style={R.g2} />
      <div style={R.tw}>
        <div style={R.badge}>פיזיקה עמ&quot;ט · כיתה ח&apos;</div>
        <h1 style={R.title}>⚛️ מאבק הכוחות</h1>
        <p style={R.sub}>משחק קלפים — חוקי ניוטון ואינטראקציות</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button style={B("#6c63ff")} onClick={() => setScreen("concepts")}>📚 מושגים</button>
          <button style={B("#1d6fa4")} onClick={() => setScreen("instr")}>📋 הוראות</button>
          <button style={B("#e63946")} onClick={() => setScreen("setup")}>🎮 שחק!</button>
          <button style={B("#2a7a5a")} onClick={() => setScreen("key")}>🗝️ מחוון</button>
        </div>
        <div style={{ color: "#333", fontSize: 12, marginTop: 36 }}>קובי ונדב · כיתה ח&apos; · הגשה: 20.3.26</div>
      </div>
    </div>
  );

  if (screen === "concepts") return (
    <div style={R.root}>
      <div style={R.panel}>
        <button style={R.back} onClick={() => setScreen("title")}>← חזרה</button>
        <h2 style={R.ptitle}>📚 רשימת מושגים ורעיונות</h2>
        <p style={{ color: "#888", marginBottom: 20, textAlign: "right" }}>נושא: אינטראקציות, כוחות וחוקי ניוטון — 12 מושגים</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
          {CONCEPTS.map(c => (
            <div key={c.id} style={{ ...R.ccard, position: "relative", paddingTop: 30 }}>
              <div style={R.cnum}>{c.id}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#a8edea", marginBottom: 6 }}>{c.term}</div>
              <div style={{ fontSize: 12, color: "#bbb", lineHeight: 1.6 }}>{c.def}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (screen === "instr") return (
    <div style={R.root}>
      <div style={R.panel}>
        <button style={R.back} onClick={() => setScreen("title")}>← חזרה</button>
        <h2 style={R.ptitle}>📋 הוראות המשחק</h2>
        <div style={{ background: "rgba(0,0,0,.3)", borderRadius: 16, padding: 28 }}>
          <h3 style={R.ih}>🎯 מטרת המשחק</h3>
          <p style={R.ib}>הגע ראשון ל-50 נקודות! אם נגמרת החפיסה — מנצח מי שצבר הכי הרבה.</p>
          <h3 style={R.ih}>👥 מספר שחקנים</h3>
          <p style={R.ib}>2 עד 4 שחקנים.</p>
          <h3 style={R.ih}>🃏 קטגוריות הקלפים</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10, margin: "10px 0" }}>
            {[["#00c896", "📖 הגדרה", "5 נקודות", "הגדר מושג"],
            ["#f5c842", "🔢 חישוב", "10 נקודות", "תרגיל מספרי"],
            ["#ff7c3a", "💬 הסבר", "15 נקודות", "הסבר תופעה"],
            ["#e63946", "🔥 אתגר", "20 נקודות", "גרף / ניסוי / מורכב"],
            ].map(([clr, nm, pts, desc]) => (
              <div key={nm} style={{ border: `2px solid ${clr}`, borderRadius: 10, padding: 12, background: "rgba(0,0,0,.2)" }}>
                <div style={{ color: clr, fontWeight: 700 }}>{nm}</div>
                <div style={{ color: "#fff", fontSize: 20, fontWeight: 800 }}>{pts}</div>
                <div style={{ color: "#aaa", fontSize: 12 }}>{desc}</div>
              </div>
            ))}
          </div>
          <h3 style={R.ih}>🔄 מהלך הסיבוב</h3>
          <ol style={{ color: "#ccc", lineHeight: 2, paddingRight: 22 }}>
            {["שלוף קלף מהחפיסה.",
              "קרא את השאלה בקול לכל השחקנים.",
              "ענה בעל-פה תוך 60 שניות.",
              "שחקן אחר חושף את התשובה מהמחוון ובודק.",
              "נכון = קבל נקודות. שגוי = 0.",
              "הסיבוב עובר לשחקן הבא.",
            ].map((s, i) => <li key={i}>{s}</li>)}
          </ol>
          <h3 style={R.ih}>🏆 ניצחון</h3>
          <p style={R.ib}>הראשון שהגיע ל-50 נקודות מנצח!</p>
          <h3 style={R.ih}>⚠️ כלל</h3>
          <p style={{ color: "#e63946", fontWeight: 600 }}>אסור לעיין במחוון תוך כדי משחק!</p>
        </div>
      </div>
    </div>
  );

  if (screen === "setup") return (
    <div style={R.root}>
      <div style={{ ...R.panel, maxWidth: 480 }}>
        <button style={R.back} onClick={() => setScreen("title")}>← חזרה</button>
        <h2 style={R.ptitle}>⚙️ הגדרות משחק</h2>
        <label style={R.lbl}>מספר שחקנים</label>
        <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
          {[2, 3, 4].map(n => (
            <button key={n} onClick={() => setCount(n)}
              style={{
                width: 56, height: 56, borderRadius: 12, border: `2px solid ${count === n ? "#6c63ff" : "#333"}`,
                background: count === n ? "rgba(108,99,255,.2)" : "transparent",
                color: count === n ? "#fff" : "#aaa", fontSize: 22, fontWeight: 700, cursor: "pointer"
              }}>
              {n}
            </button>
          ))}
        </div>
        <label style={R.lbl}>שמות השחקנים</label>
        {Array.from({ length: count }).map((_, i) => (
          <input key={i} style={R.inp} value={names[i]} placeholder={`שחקן ${i + 1}`}
            onChange={e => { const t = [...names]; t[i] = e.target.value; setNames(t); }} />
        ))}
        <button style={{ ...B("#e63946"), marginTop: 24, width: "100%", padding: "16px 0", fontSize: 18 }} onClick={start}>
          🚀 התחל משחק
        </button>
      </div>
    </div>
  );

  if (screen === "game") return (
    <div style={R.root}>
      <div style={R.gg}>
        <div style={R.side}>
          <div style={R.stitle}>🏆 ניקוד</div>
          {players.map((p, i) => (
            <div key={i} style={{ marginBottom: 12, opacity: i === cur && !over ? 1 : 0.4, transition: "opacity .3s" }}>
              <span style={{ fontSize: 13 }}>{ICONS[i]} {p.name}</span>
              <div style={{ height: 5, background: "#1e2a3a", borderRadius: 3, overflow: "hidden", margin: "4px 0" }}>
                <div style={{
                  height: "100%", width: `${Math.min(p.score / WIN * 100, 100)}%`,
                  background: `#${COLORS[i]}`, borderRadius: 3, transition: "width .5s"
                }} />
              </div>
              <span style={{ color: `#${COLORS[i]}`, fontWeight: 700, fontSize: 14 }}>{p.score}</span>
            </div>
          ))}
          <div style={{ color: "#444", fontSize: 11, marginTop: 8 }}>יעד: {WIN} נקודות</div>
        </div>

        <div style={R.main}>
          {over ? (
            <div style={{ textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 60 }}>🎉</div>
              <h2 style={{ color: "#f5c842", fontSize: 28 }}>
                {[...players].sort((a, b) => b.score - a.score)[0].name} ניצח!
              </h2>
              <p style={{ color: "#aaa" }}>עם {Math.max(...players.map(p => p.score))} נקודות</p>
              <button style={{ ...B("#6c63ff"), marginTop: 20 }} onClick={() => setScreen("title")}>🏠 תפריט</button>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 22 }}>
                {ICONS[cur]} תור של{" "}
                <span style={{ color: `#${COLORS[cur]}` }}>{players[cur]?.name}</span>
              </div>
              {!card ? (
                <button style={{ ...B("#6c63ff"), padding: "20px 52px", fontSize: 20 }} onClick={draw}>
                  🃏 שלוף קלף
                </button>
              ) : (
                <div style={{
                  width: "100%", maxWidth: 510, background: "rgba(0,0,0,.4)",
                  border: `2px solid ${card.color}`, borderRadius: 20, padding: 26
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <span style={{
                      background: card.color, color: "#000", fontWeight: 700, fontSize: 13,
                      padding: "4px 12px", borderRadius: 20
                    }}>{ci[card.cat]} {card.cat}</span>
                    <span style={{ color: card.color, fontWeight: 800, fontSize: 22 }}>+{card.pts}</span>
                  </div>
                  <p style={{ fontSize: 17, lineHeight: 1.7, color: "#eee", margin: "0 0 20px" }}>{card.q}</p>
                  {!showAns ? (
                    <button style={{ ...B("#2a3a4a"), fontSize: 14 }} onClick={() => setShowAns(true)}>
                      👁️ הצג תשובה
                    </button>
                  ) : (
                    <div style={{ background: "rgba(0,200,150,.08)", borderRadius: 12, padding: 16 }}>
                      <div style={{ color: "#00c896", fontWeight: 700, marginBottom: 8 }}>תשובה:</div>
                      <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.7, margin: "0 0 16px" }}>{card.a}</p>
                      <div style={{ display: "flex", gap: 12 }}>
                        <button style={{ ...B("#1a6e4a"), fontSize: 14 }} onClick={() => award(card.pts)}>
                          נכון! +{card.pts}
                        </button>
                        <button style={{ ...B("#6e1a1a"), fontSize: 14 }} onClick={skip}>
                          שגוי / דלג
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <div style={R.side}>
          <div style={R.stitle}>📜 היסטוריה</div>
          {log.length === 0 && <div style={{ color: "#444", fontSize: 12 }}>עדיין אין מהלכים…</div>}
          {log.map((l, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between",
              borderBottom: "1px solid #1a2232", padding: "5px 0", fontSize: 12
            }}>
              <span style={{ color: "#bbb" }}>{l.name}</span>
              <span style={{ color: l.pts > 0 ? "#00c896" : "#e63946", fontWeight: 700 }}>
                {l.pts > 0 ? `+${l.pts}` : "0"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (screen === "key") return (
    <div style={R.root}>
      <div style={R.panel}>
        <button style={R.back} onClick={() => setScreen("title")}>← חזרה</button>
        <h2 style={R.ptitle}>🗝️ מחוון תשובות</h2>
        <p style={{ color: "#e63946", fontWeight: 600, textAlign: "right", marginBottom: 20 }}>
          אין לפתוח במהלך המשחק!
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(350px,1fr))", gap: 16 }}>
          {CARDS.map(c => (
            <div key={c.id} style={{
              border: `2px solid ${c.color}`, borderRadius: 14,
              padding: 20, background: "rgba(0,0,0,.35)"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{
                  background: c.color, color: "#000", fontWeight: 700, fontSize: 12,
                  padding: "3px 10px", borderRadius: 20
                }}>{ci[c.cat]} {c.cat} +{c.pts}</span>
                <span style={{ color: "#555", fontSize: 12 }}>#{c.id}</span>
              </div>
              <p style={{ color: "#ddd", fontSize: 13, margin: "0 0 8px", lineHeight: 1.5 }}>
                <strong style={{ color: "#aaa" }}>שאלה: </strong>{c.q}
              </p>
              <p style={{ color: "#00c896", fontSize: 13, lineHeight: 1.5 }}>
                <strong>תשובה: </strong>{c.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const B = bg => ({
  background: bg, color: "#fff", border: "none", borderRadius: 12,
  padding: "13px 22px", fontSize: 15, fontWeight: 700, cursor: "pointer",
});

const R = {
  root: {
    minHeight: "100vh", background: "#090d1a", color: "#e8e8e8",
    fontFamily: "'Segoe UI',Tahoma,sans-serif", direction: "rtl",
    padding: 16, display: "flex", justifyContent: "center",
    position: "relative", overflow: "hidden"
  },
  g1: {
    position: "fixed", top: "-20%", right: "-10%", width: 500, height: 500,
    borderRadius: "50%", background: "rgba(108,99,255,.12)", filter: "blur(80px)", pointerEvents: "none"
  },
  g2: {
    position: "fixed", bottom: "-20%", left: "-10%", width: 400, height: 400,
    borderRadius: "50%", background: "rgba(230,57,70,.1)", filter: "blur(80px)", pointerEvents: "none"
  },
  tw: {
    position: "relative", zIndex: 1, textAlign: "center",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "90vh"
  },
  badge: {
    background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.14)",
    borderRadius: 20, padding: "6px 18px", fontSize: 13, color: "#aaa", marginBottom: 16
  },
  title: {
    fontSize: "clamp(34px,6vw,70px)", fontWeight: 900, margin: "0 0 12px", letterSpacing: -2,
    background: "linear-gradient(135deg,#a8edea,#fed6e3,#f5c842)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
  },
  sub: { color: "#777", fontSize: 17, margin: "0 0 36px" },
  panel: {
    position: "relative", zIndex: 1, width: "100%", maxWidth: 920,
    background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 20, padding: 32
  },
  ptitle: { fontSize: 24, fontWeight: 800, color: "#f5c842", marginBottom: 20, textAlign: "right" },
  back: {
    background: "none", border: "1px solid #2a2a2a", color: "#888",
    padding: "7px 14px", borderRadius: 8, cursor: "pointer", marginBottom: 20, fontSize: 13
  },
  ccard: {
    background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.09)",
    borderRadius: 12, padding: 14
  },
  cnum: {
    position: "absolute", top: 8, right: 10, background: "#6c63ff", color: "#fff",
    width: 20, height: 20, borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700
  },
  ih: { color: "#f5c842", fontSize: 17, margin: "18px 0 8px" },
  ib: { color: "#ccc", lineHeight: 1.7 },
  lbl: { display: "block", color: "#aaa", fontSize: 13, marginBottom: 8, marginTop: 16 },
  inp: {
    width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid #333",
    borderRadius: 10, padding: "12px 14px", color: "#eee", fontSize: 14,
    marginBottom: 8, boxSizing: "border-box", textAlign: "right"
  },
  gg: {
    position: "relative", zIndex: 1, width: "100%", maxWidth: 1100,
    display: "grid", gridTemplateColumns: "200px 1fr 170px", gap: 14, alignItems: "start"
  },
  side: {
    background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)",
    borderRadius: 16, padding: 18
  },
  stitle: { fontWeight: 700, color: "#f5c842", fontSize: 14, marginBottom: 14 },
  main: {
    background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)",
    borderRadius: 16, padding: 28, minHeight: 380,
    display: "flex", flexDirection: "column", alignItems: "center"
  },
};