import { useState } from "react";

const theme = {
  white: "#FAFCFF", iceBlue: "#E8F4FC", sky: "#C5E4F5",
  deepSea: "#1A5C8A", ocean: "#2277B3", midnight: "#0D2E45",
  textSub: "#5A849E",
};

const S = {
  screen: { width: 375, minHeight: 812, background: theme.white, borderRadius: 48, overflow: "hidden", boxShadow: "0 24px 80px rgba(13,46,69,0.22)", display: "flex", flexDirection: "column", fontFamily: "'Tajawal', sans-serif", direction: "rtl", margin: "0 auto" },
  btn: (extra = {}) => ({ cursor: "pointer", userSelect: "none", ...extra }),
};

const products = [
  { id: 1, name: "سلسال الزجاجية الفاخرة", size: "750 مل · 12 حبة", price: 45, icon: "🫙", sodium: "0 mg", ph: "7.5", source: "طبيعية", desc: "تُستخرج مياه سلسال من ينابيع طبيعية عميقة في قلب الجبال، تعبر طبقات صخرية تنقيها بشكل طبيعي لتصل إليك بنقاء استثنائي وطعم منعش لا مثيل له.", rating: 4.9, reviews: 237 },
  { id: 2, name: "سلسال نقية", size: "500 مل · 24 حبة", price: 38, icon: "💦", sodium: "2 mg", ph: "7.2", source: "معالجة", desc: "مياه سلسال نقية المنقاة بتقنية التناضح العكسي المتطور، مثالية للاستخدام اليومي مع نكهة محايدة وخفيفة.", rating: 4.7, reviews: 184 },
  { id: 3, name: "سلسال جليدية", size: "1.5 لتر · 6 حبة", price: 29, icon: "🧊", sodium: "1 mg", ph: "7.0", source: "معدنية", desc: "مياه سلسال الجليدية للاستخدام المنزلي اليومي، بحجم مثالي للعائلة وسعر مناسب دون المساس بالجودة.", rating: 4.6, reviews: 312 },
  { id: 4, name: "سلسال معدنية", size: "330 مل · 24 حبة", price: 52, icon: "⛰️", sodium: "5 mg", ph: "7.8", source: "معدنية", desc: "مياه معدنية طبيعية غنية بالمعادن الأساسية كالكالسيوم والمغنيسيوم، تمنحك الطاقة والحيوية على مدار اليوم.", rating: 4.8, reviews: 156 },
];

const categories = [
  { label: "مياه زجاجية", icon: "🫙" },
  { label: "خالية صوديوم", icon: "💧" },
  { label: "مياه معدنية", icon: "⛰️" },
  { label: "استخدام يومي", icon: "🏠" },
];

/* ─── SPLASH ─── */
function Splash({ onDone }) {
  return (
    <div style={{ ...S.screen, background: "linear-gradient(160deg,#FAFCFF 0%,#E0F2FB 60%,#C9E8F7 100%)", alignItems: "center", justifyContent: "center", gap: 0, position: "relative" }}>
      <style>{`@keyframes dropFall{0%,100%{transform:translateY(-12px)}50%{transform:translateY(4px)}} @keyframes ripOut{0%{opacity:.7;transform:translate(-50%,-50%) scale(.3)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.2)}}`}</style>
      {[600,400,220].map((s,i) => (
        <div key={i} style={{ position:"absolute", width:s, height:s, borderRadius:"50%", top:"50%", left:"50%", background:"radial-gradient(circle,rgba(34,119,179,0.08) 0%,transparent 70%)", animation:`ripOut 3s ease-out ${i*0.6}s infinite` }} />
      ))}
      <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", gap:24 }}>
        <svg style={{ animation:"dropFall 2s cubic-bezier(.4,0,.2,1) infinite", filter:"drop-shadow(0 8px 24px rgba(34,119,179,0.3))" }} width="60" height="80" viewBox="0 0 60 80" fill="none">
          <defs><linearGradient id="dg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#C9E8F7"/><stop offset="100%" stopColor="#1A5C8A"/></linearGradient></defs>
          <path d="M30 4 C30 4 6 36 6 52 C6 66 17 76 30 76 C43 76 54 66 54 52 C54 36 30 4 30 4Z" fill="url(#dg)" opacity=".9"/>
          <ellipse cx="22" cy="38" rx="5" ry="9" fill="white" opacity=".3" transform="rotate(-20 22 38)"/>
        </svg>
        <div style={{ fontFamily:"serif", fontSize:58, fontWeight:700, color:theme.midnight, textShadow:"0 2px 12px rgba(34,119,179,0.15)" }}>سلسال</div>
        <div style={{ fontSize:15, color:theme.textSub, fontWeight:300, letterSpacing:"0.12em" }}>نقاء من ينابيع الطبيعة</div>
      </div>
      <div style={{ position:"relative", zIndex:2, marginTop:60 }}>
        <div onClick={onDone} style={{ ...S.btn(), background:`linear-gradient(135deg,${theme.deepSea},${theme.ocean})`, color:"white", padding:"14px 48px", borderRadius:20, fontSize:16, fontWeight:700, boxShadow:"0 8px 24px rgba(26,92,138,0.35)" }}>
          ابدأ الآن
        </div>
      </div>
    </div>
  );
}

/* ─── HOME ─── */
function Home({ cart, onProduct, onGoCart }) {
  const [activeCat, setActiveCat] = useState(0);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ ...S.screen }}>
      {/* Header */}
      <div style={{ padding:"56px 24px 20px", background:"linear-gradient(180deg,#EEF7FD 0%,#FAFCFF 100%)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:44, height:44, borderRadius:"50%", background:`linear-gradient(135deg,${theme.sky},${theme.ocean})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, color:"white", fontWeight:700, boxShadow:"0 4px 12px rgba(34,119,179,0.3)" }}>خ</div>
          <div>
            <div style={{ fontSize:11, color:theme.textSub }}>صباح النقاء،</div>
            <div style={{ fontSize:15, color:theme.midnight, fontWeight:700 }}>خلود ✨</div>
          </div>
        </div>
        <div onClick={onGoCart} style={{ ...S.btn(), position:"relative", width:44, height:44, background:"white", borderRadius:14, border:`1.5px solid ${theme.iceBlue}`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 16px rgba(26,92,138,0.1)" }}>
          🛒
          {totalItems > 0 && <div style={{ position:"absolute", top:6, right:6, width:16, height:16, borderRadius:"50%", background:theme.ocean, border:"1.5px solid white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, color:"white", fontWeight:700 }}>{totalItems}</div>}
        </div>
      </div>

      {/* Search */}
      <div style={{ margin:"0 24px 20px", background:theme.iceBlue, borderRadius:16, padding:"13px 16px", display:"flex", alignItems:"center", gap:10, border:"1.5px solid transparent" }}>
        <span style={{ opacity:.5 }}>🔍</span>
        <span style={{ fontSize:13, color:theme.textSub }}>ابحث عن مياه زجاجية، خالية من الصوديوم...</span>
      </div>

      {/* Categories */}
      <div style={{ padding:"0 24px 8px", fontSize:16, fontWeight:700, color:theme.midnight }}>الأقسام</div>
      <div style={{ display:"flex", gap:12, padding:"0 24px 24px", overflowX:"auto", scrollbarWidth:"none" }}>
        {categories.map((c, i) => (
          <div key={i} onClick={() => setActiveCat(i)} style={{ ...S.btn(), flexShrink:0, width:110, height:85, borderRadius:20, background: i===activeCat ? `linear-gradient(135deg,${theme.deepSea},${theme.ocean})` : "white", border:`1.5px solid ${i===activeCat ? theme.ocean : theme.iceBlue}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:7, boxShadow:"0 4px 16px rgba(34,119,179,0.08)", transition:"all .2s" }}>
            <div style={{ fontSize:24 }}>{c.icon}</div>
            <div style={{ fontSize:11, fontWeight:500, color: i===activeCat ? "white" : theme.midnight, textAlign:"center" }}>{c.label}</div>
          </div>
        ))}
      </div>

      {/* Products */}
      <div style={{ padding:"0 24px 8px", fontSize:16, fontWeight:700, color:theme.midnight }}>اخترنا لارتوائك</div>
      <div style={{ display:"flex", gap:14, padding:"0 24px 24px", overflowX:"auto", scrollbarWidth:"none", flex:1 }}>
        {products.map(p => (
          <div key={p.id} onClick={() => onProduct(p)} style={{ ...S.btn(), flexShrink:0, width:158, background:"white", borderRadius:24, padding:16, boxShadow:"0 4px 24px rgba(13,46,69,0.08)", border:`1px solid rgba(197,228,245,0.5)` }}>
            <div style={{ width:"100%", height:130, background:`linear-gradient(160deg,${theme.iceBlue},${theme.sky})`, borderRadius:16, marginBottom:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:52 }}>{p.icon}</div>
            <div style={{ fontSize:13, fontWeight:700, color:theme.midnight, marginBottom:3 }}>{p.name}</div>
            <div style={{ fontSize:11, color:theme.textSub, marginBottom:10 }}>{p.size}</div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ fontSize:15, fontWeight:700, color:theme.deepSea }}>{p.price} ر.س</div>
              <div style={{ width:30, height:30, borderRadius:10, background:theme.deepSea, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, boxShadow:"0 4px 12px rgba(26,92,138,0.35)" }}>+</div>
            </div>
          </div>
        ))}
      </div>

      <NavBar active="home" onCart={onGoCart} cartCount={totalItems} />
    </div>
  );
}

/* ─── PRODUCT DETAIL ─── */
function Detail({ product, onBack, onAddToCart }) {
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    onAddToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div style={{ ...S.screen }}>
      {/* Hero */}
      <div style={{ height:300, background:`linear-gradient(160deg,${theme.iceBlue} 0%,${theme.sky} 100%)`, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", fontSize:100 }}>
        {product.icon}
        <div onClick={onBack} style={{ ...S.btn(), position:"absolute", top:20, right:20, width:38, height:38, background:"rgba(255,255,255,0.7)", backdropFilter:"blur(8px)", borderRadius:12, border:"1px solid rgba(255,255,255,0.8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>←</div>
        <div onClick={() => setFav(!fav)} style={{ ...S.btn(), position:"absolute", top:20, left:20, width:38, height:38, background:"rgba(255,255,255,0.7)", backdropFilter:"blur(8px)", borderRadius:12, border:"1px solid rgba(255,255,255,0.8)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{fav ? "❤️" : "🤍"}</div>
      </div>

      {/* Body */}
      <div style={{ padding:24, flex:1, overflowY:"auto" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
          <div style={{ fontFamily:"serif", fontSize:24, fontWeight:700, color:theme.midnight, maxWidth:210, lineHeight:1.3 }}>{product.name}</div>
          <div>
            <div style={{ fontSize:22, fontWeight:700, color:theme.deepSea }}>{product.price} ر.س</div>
            <div style={{ fontSize:11, color:theme.textSub, textAlign:"left" }}>/ للكرتون</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:20 }}>
          <span style={{ color:"#F5A623", fontSize:13 }}>{"★".repeat(Math.round(product.rating))}</span>
          <span style={{ fontSize:12, color:theme.textSub }}>{product.rating} ({product.reviews} تقييم)</span>
        </div>

        <div style={{ display:"flex", gap:10, marginBottom:20 }}>
          {[["⚗️", product.sodium, "صوديوم"], ["💧", `pH ${product.ph}`, "القلوية"], ["⛰️", product.source, "المصدر"]].map(([ic, v, l]) => (
            <div key={l} style={{ flex:1, background:theme.iceBlue, borderRadius:16, padding:"12px 8px", textAlign:"center", border:`1px solid ${theme.sky}` }}>
              <div style={{ fontSize:20 }}>{ic}</div>
              <div style={{ fontSize:13, fontWeight:700, color:theme.deepSea }}>{v}</div>
              <div style={{ fontSize:10, color:theme.textSub }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ fontSize:13, color:theme.textSub, lineHeight:1.8, marginBottom:16 }}>{product.desc}</div>
        <div style={{ fontSize:13, color:theme.textSub }}>المحتوى: {product.size}</div>
      </div>

      {/* Sticky bar */}
      <div style={{ padding:"16px 24px", background:"white", borderTop:`1px solid ${theme.iceBlue}`, display:"flex", gap:14, alignItems:"center" }}>
        <div style={{ display:"flex", alignItems:"center", border:`1.5px solid ${theme.iceBlue}`, borderRadius:14, overflow:"hidden", background:theme.iceBlue }}>
          <div onClick={() => setQty(q => Math.max(1,q-1))} style={{ ...S.btn(), width:38, height:44, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:theme.deepSea, background:"white", fontWeight:300 }}>−</div>
          <div style={{ width:38, textAlign:"center", fontWeight:700, color:theme.midnight, fontSize:16 }}>{qty}</div>
          <div onClick={() => setQty(q => q+1)} style={{ ...S.btn(), width:38, height:44, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, color:theme.deepSea, background:"white", fontWeight:300 }}>+</div>
        </div>
        <div onClick={handleAdd} style={{ ...S.btn(), flex:1, height:50, borderRadius:16, background: added ? "#27ae60" : `linear-gradient(135deg,${theme.deepSea},${theme.ocean})`, color:"white", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontSize:15, fontWeight:700, boxShadow:"0 6px 20px rgba(26,92,138,0.35)", transition:"background .3s" }}>
          <span>{added ? "✅" : "🛒"}</span>
          {added ? "تمت الإضافة!" : "أضف إلى السلة"}
        </div>
      </div>
    </div>
  );
}

/* ─── CART ─── */
function Cart({ cart, onBack, onUpdate, onCheckout }) {
  const [subscription, setSubscription] = useState(false);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const tax = +(subtotal * 0.15).toFixed(1);
  const total = +(subtotal + tax).toFixed(1);

  if (cart.length === 0) return (
    <div style={{ ...S.screen, alignItems:"center", justifyContent:"center", gap:16 }}>
      <div style={{ fontSize:64 }}>🛒</div>
      <div style={{ fontSize:18, fontWeight:700, color:theme.midnight }}>سلتك فارغة</div>
      <div style={{ fontSize:13, color:theme.textSub }}>أضف بعض المنتجات واستمتع بنقاء سلسال</div>
      <div onClick={onBack} style={{ ...S.btn(), marginTop:8, background:`linear-gradient(135deg,${theme.deepSea},${theme.ocean})`, color:"white", padding:"12px 36px", borderRadius:16, fontSize:15, fontWeight:700 }}>تسوق الآن</div>
    </div>
  );

  return (
    <div style={{ ...S.screen }}>
      <div style={{ padding:"56px 24px 20px", background:"white", display:"flex", alignItems:"center", gap:12, borderBottom:`1px solid ${theme.iceBlue}` }}>
        <div onClick={onBack} style={{ ...S.btn(), width:40, height:40, background:theme.iceBlue, borderRadius:13, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>←</div>
        <div style={{ fontFamily:"serif", fontSize:22, fontWeight:700, color:theme.midnight }}>سلة ارتوائك 🛒</div>
      </div>

      <div style={{ overflowY:"auto", flex:1, background:"#F5FAFD" }}>
        <div style={{ padding:"16px 24px", display:"flex", flexDirection:"column", gap:12 }}>
          {cart.map(item => (
            <div key={item.id} style={{ background:"white", borderRadius:20, padding:14, display:"flex", gap:12, alignItems:"center", boxShadow:"0 2px 12px rgba(13,46,69,0.06)" }}>
              <div style={{ width:64, height:64, borderRadius:14, background:`linear-gradient(135deg,${theme.iceBlue},${theme.sky})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:30, flexShrink:0 }}>{item.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:theme.midnight, marginBottom:3 }}>{item.name}</div>
                <div style={{ fontSize:11, color:theme.textSub }}>{item.size}</div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
                <div style={{ fontSize:15, fontWeight:700, color:theme.deepSea }}>{item.price * item.qty} ر.س</div>
                <div style={{ display:"flex", alignItems:"center", gap:8, background:theme.iceBlue, borderRadius:10, padding:"4px 10px" }}>
                  <span onClick={() => onUpdate(item.id, item.qty - 1)} style={{ ...S.btn(), fontSize:13, color:theme.textSub }}>−</span>
                  <strong style={{ fontSize:14, color:theme.midnight }}>{item.qty}</strong>
                  <span onClick={() => onUpdate(item.id, item.qty + 1)} style={{ ...S.btn(), fontSize:13, color:theme.textSub }}>+</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subscription toggle */}
        <div style={{ margin:"0 24px 16px", background:"linear-gradient(135deg,#EBF7FF,#D9F0FB)", borderRadius:20, padding:16, border:`1.5px solid rgba(34,119,179,0.2)`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:10, color:theme.ocean, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:3 }}>🔄 اشتراك أسبوعي</div>
            <div style={{ fontSize:13, color:theme.midnight, fontWeight:500 }}>هل تود استلام هذا الطلب كل أسبوعين؟</div>
          </div>
          <div onClick={() => setSubscription(s => !s)} style={{ ...S.btn(), width:48, height:26, background: subscription ? theme.ocean : "#ccc", borderRadius:13, position:"relative", transition:"background .3s", flexShrink:0 }}>
            <div style={{ position:"absolute", top:3, left: subscription ? 26 : 3, width:20, height:20, borderRadius:"50%", background:"white", boxShadow:"0 1px 4px rgba(0,0,0,0.2)", transition:"left .3s" }} />
          </div>
        </div>

        {/* Summary */}
        <div style={{ margin:"0 24px 16px", background:"white", borderRadius:20, padding:16, boxShadow:"0 2px 12px rgba(13,46,69,0.05)" }}>
          {[["السعر الفرعي", `${subtotal} ر.س`], ["ضريبة القيمة المضافة (١٥٪)", `${tax} ر.س`], ["رسوم التوصيل", "مجاناً 🎁"]].map(([l, v]) => (
            <div key={l} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", fontSize:13, color:theme.textSub, borderBottom:`1px solid ${theme.iceBlue}` }}>
              <span>{l}</span><span style={{ color: v.includes("مجاناً") ? theme.ocean : undefined }}>{v}</span>
            </div>
          ))}
          <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 0 0", fontSize:15, fontWeight:700, color:theme.midnight }}>
            <span>الإجمالي</span><span>{total} ر.س</span>
          </div>
        </div>

        <div style={{ margin:"0 24px 24px", fontSize:12, color:theme.textSub, textAlign:"center", padding:10, background:theme.iceBlue, borderRadius:12 }}>
          📦 وزن الطلب <strong style={{ color:theme.ocean }}>12 كجم</strong> — سيصلك إلى باب المنزل في غضون 24 ساعة
        </div>
      </div>

      <div style={{ padding:"16px 24px 32px", background:"white", borderTop:`1px solid ${theme.iceBlue}` }}>
        <div onClick={onCheckout} style={{ ...S.btn(), width:"100%", height:56, borderRadius:18, background:`linear-gradient(135deg,${theme.midnight},${theme.deepSea})`, color:"white", display:"flex", alignItems:"center", justifyContent:"center", gap:10, fontSize:16, fontWeight:700, boxShadow:"0 8px 24px rgba(13,46,69,0.35)" }}>
          <span>🍎</span> إتمام الطلب — {total} ر.س
        </div>
      </div>
    </div>
  );
}

/* ─── ORDER SUCCESS ─── */
function Success({ onDone }) {
  return (
    <div style={{ ...S.screen, alignItems:"center", justifyContent:"center", gap:20, padding:40 }}>
      <style>{`@keyframes pop{0%{transform:scale(0)}70%{transform:scale(1.2)}100%{transform:scale(1)}}`}</style>
      <div style={{ fontSize:80, animation:"pop 0.5s ease-out" }}>✅</div>
      <div style={{ fontFamily:"serif", fontSize:28, fontWeight:700, color:theme.midnight, textAlign:"center" }}>تم استلام طلبك!</div>
      <div style={{ fontSize:14, color:theme.textSub, textAlign:"center", lineHeight:1.8 }}>شكراً لاختيارك سلسال 💧<br/>سيصلك طلبك خلال 24 ساعة</div>
      <div style={{ background:theme.iceBlue, borderRadius:20, padding:20, width:"100%", textAlign:"center", border:`1px solid ${theme.sky}` }}>
        <div style={{ fontSize:12, color:theme.textSub, marginBottom:6 }}>رقم الطلب</div>
        <div style={{ fontFamily:"monospace", fontSize:20, fontWeight:700, color:theme.deepSea }}>#SLS-{Math.floor(Math.random()*90000+10000)}</div>
      </div>
      <div onClick={onDone} style={{ ...S.btn(), marginTop:8, background:`linear-gradient(135deg,${theme.deepSea},${theme.ocean})`, color:"white", padding:"14px 48px", borderRadius:18, fontSize:15, fontWeight:700, boxShadow:"0 6px 20px rgba(26,92,138,0.3)" }}>
        العودة للرئيسية
      </div>
    </div>
  );
}

/* ─── NAV BAR ─── */
function NavBar({ active, onCart, cartCount }) {
  const tabs = [{ icon:"🏠", label:"الرئيسية", id:"home" }, { icon:"🔍", label:"استكشاف", id:"explore" }, { icon:"🛒", label:"سلتي", id:"cart" }, { icon:"👤", label:"حسابي", id:"profile" }];
  return (
    <div style={{ display:"flex", justifyContent:"space-around", padding:"14px 0 24px", background:"white", borderTop:`1px solid ${theme.iceBlue}`, flexShrink:0 }}>
      {tabs.map(t => (
        <div key={t.id} onClick={t.id === "cart" ? onCart : undefined} style={{ ...S.btn(), display:"flex", flexDirection:"column", alignItems:"center", gap:4, fontSize:10, color: active===t.id ? theme.deepSea : theme.textSub }}>
          <div style={{ position:"relative", fontSize:22 }}>
            {t.icon}
            {t.id === "cart" && cartCount > 0 && <div style={{ position:"absolute", top:-4, right:-6, width:14, height:14, borderRadius:"50%", background:theme.ocean, border:"1.5px solid white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, color:"white", fontWeight:700 }}>{cartCount}</div>}
          </div>
          <span>{t.label}</span>
          {active===t.id && <div style={{ width:4, height:4, borderRadius:"50%", background:theme.ocean }} />}
        </div>
      ))}
    </div>
  );
}

/* ─── APP ROOT ─── */
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  function addToCart(product, qty) {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { ...product, qty }];
    });
  }

  function updateCart(id, qty) {
    if (qty <= 0) setCart(prev => prev.filter(i => i.id !== id));
    else setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }

  return (
    <div style={{ minHeight:"100vh", background:"#D8EEF8", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet" />
      {screen === "splash" && <Splash onDone={() => setScreen("home")} />}
      {screen === "home" && <Home cart={cart} onProduct={p => { setSelectedProduct(p); setScreen("detail"); }} onGoCart={() => setScreen("cart")} />}
      {screen === "detail" && <Detail product={selectedProduct} onBack={() => setScreen("home")} onAddToCart={(p, q) => { addToCart(p, q); }} />}
      {screen === "cart" && <Cart cart={cart} onBack={() => setScreen("home")} onUpdate={updateCart} onCheckout={() => setScreen("success")} />}
      {screen === "success" && <Success onDone={() => { setCart([]); setScreen("home"); }} />}
    </div>
  );
}

