import { useState, useEffect, createContext, useContext, useCallback } from "react";

// ═══════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════
const API = "";
const P = "#F5A800", PD = "#D48C00", PL = "#FFF8E7";

// ═══════════════════════════════════════
// LANGUAGE CONTEXT (EN/AR)
// ═══════════════════════════════════════
const LangCtx = createContext(null);
function useLang() { return useContext(LangCtx); }

const T = {
  ar: {
    home: "الرئيسية", services: "الخدمات", about: "عن المنصة", contact: "اتصل بنا", login: "تسجيل دخول",
    register: "إنشاء حساب", logout: "خروج", myAccount: "حسابي", profile: "الملف الشخصي",
    myBookings: "حجوزاتي", bugReport: "بلاغ عن مشكلة", darkMode: "الوضع الليلي",
    heroTitle: "أكبر منصة لحجز خدمات الأفراح في سوهاج", heroSub: "احجز خدمة أحلامك بكل سهولة وأفضل الأسعار",
    search: "ابدأ البحث", chooseArea: "اختر المنطقة", allAreas: "كل المناطق", eventDate: "تاريخ المناسبة",
    budget: "ميزانية الحفل", chooseBudget: "اختر الميزانية", lessThan: "أقل من", moreThan: "أكثر من",
    topRated: "أفضل الخدمات المقيمة", viewAll: "عرض الكل", browseByType: "تصفح حسب النوع",
    ctaTitle: "هل تقدم خدمات أفراح في سوهاج؟", ctaSub: "انضم لمنصتنا وزِد من مبيعاتك وحجوزاتك",
    registerNow: "سجل الآن", contactSupport: "تواصل مع الدعم",
    servicesPage: "خدمات مناسبات سوهاج", found: "تم العثور على", available: "خدمة متاحة",
    sortBy: "ترتيب حسب", topRating: "الأعلى تقييماً", lowestPrice: "الأقل سعراً", highestPrice: "الأعلى سعراً",
    newest: "الأحدث", filterResults: "تصفية النتائج", clearAll: "مسح الكل", area: "المنطقة", all: "الكل",
    price: "السعر", egp: "ج.م", features: "المميزات", applyFilter: "تطبيق الفلاتر",
    viewDetails: "عرض التفاصيل", perNight: "/ ليلة", upTo: "حتى", person: "فرد", review: "تقييم",
    serviceDetails: "تفاصيل الخدمة", specs: "مواصفات الخدمة", maxCapacity: "السعة القصوى",
    locationIn: "الموقع في سوهاج", openMaps: "فتح الخرائط", reviews: "آراء العائلات", moreReviews: "عرض المزيد",
    selectDate: "اختر تاريخ الحجز", bookNow: "📅 حجز الخدمة الآن", serviceFee: "رسوم الخدمة", total: "الإجمالي",
    paymentMethod: "طريقة الدفع", cash: "نقدي (عند الحضور)", vodafoneCash: "فودافون كاش", card: "كارت بنكي",
    walletPhone: "رقم محفظة فودافون كاش", paymentPending: "الدفع قيد الانتظار", paymentPaid: "تم الدفع",
    whatsapp: "تواصل معنا واتساب", whatsappSub: "للاستفسارات الخاصة",
    welcomeBack: "أهلاً بك من جديد", loginSub: "سجل دخولك لإدارة حجوزاتك", email: "البريد الإلكتروني",
    password: "كلمة المرور", forgotPass: "نسيت كلمة المرور؟", rememberMe: "تذكرني", loginBtn: "تسجيل الدخول",
    orLoginWith: "أو سجل عبر", noAccount: "ليس لديك حساب؟", createAccount: "إنشاء حساب جديد",
    joinTitle: "انضم إلى فرحي", joinSub: "ابدأ رحلتك مع أفضل خدمات الأفراح", iAmCustomer: "أنا عميل",
    iAmProvider: "أنا مقدم خدمة", fullName: "الاسم الكامل", phone: "رقم الهاتف", agreeTerms: "أوافق على",
    terms: "شروط الاستخدام", privacy: "سياسة الخصوصية", haveAccount: "لديك حساب بالفعل؟", loginNow: "سجل دخولك",
    dashboard: "لوحة التحكم", totalEarnings: "إجمالي الأرباح", upcomingBookings: "الحجوزات القادمة",
    avgRating: "متوسط التقييم", myServices: "خدماتي", addService: "إضافة خدمة جديدة", serviceName: "اسم الخدمة",
    servicePhone: "رقم هاتف الخدمة", center: "المركز", capacity: "السعة", priceLabel: "السعر",
    uploadImages: "اضغط لرفع الصور", addBtn: "إضافة الخدمة", verified: "مؤكد", pending: "قيد الانتظار",
    cancelled: "ملغى", completed: "مكتمل", cancelBooking: "إلغاء الحجز", addReview: "⭐ إضافة تقييم",
    viewService: "عرض الخدمة", noBookings: "لا توجد حجوزات بعد", startBooking: "ابدأ بحجز خدمة أحلامك!",
    browseServices: "تصفح الخدمات", trackBookings: "متابعة جميع حجوزاتك ومناسباتك",
    notFound404: "الصفحة اللي بتدور عليها مش موجودة", backHome: "العودة للرئيسية",
    aboutTitle: "عن منصة فرحي", aboutDesc: "فرحي هي المنصة الأولى والوحيدة المتخصصة في حجز خدمات الأفراح والمناسبات في محافظة سوهاج. نوفر لك مكان واحد تقدر تبحث فيه عن القاعات والمصورين وخدمات التجميل وتقارن الأسعار وتحجز بسهولة.",
    aboutMission: "مهمتنا", aboutMissionDesc: "تسهيل تجربة حجز خدمات الأفراح وتحويلها من عملية مرهقة إلى تجربة ممتعة وسلسة.",
    aboutVision: "رؤيتنا", aboutVisionDesc: "أن نكون المنصة الرائدة لخدمات الأفراح في صعيد مصر.",
    contactInfo: "بيانات التواصل", providerName: "اسم المقدم", noContact: "لا توجد بيانات تواصل",
    bugTitle: "عنوان البلاغ", bugDesc: "وصف المشكلة", submitBug: "إرسال البلاغ", bugSent: "تم إرسال البلاغ بنجاح",
    verifyEmail: "تحقق من بريدك", verifyCode: "أدخل كود التحقق", verify: "تحقق",
    featured: "مميزة", underReview: "قيد المراجعة", since: "منذ",
    siteName: "فرحي", siteNameFull: "فرحي — خدمات الأفراح",
    contactPageTitle: "تواصل معنا", contactPageDesc: "لديك سؤال أو استفسار؟ تواصل معنا وسنرد عليك في أقرب وقت.",
    contactAddress: "العنوان", contactAddressVal: "سوهاج، مصر", contactEmail: "البريد", contactPhone: "الهاتف",
    sendMessage: "إرسال الرسالة", yourName: "اسمك", yourEmail: "بريدك الإلكتروني", yourMessage: "رسالتك", messageSent: "تم إرسال رسالتك بنجاح!",
    selectCategory: "نوع الخدمة", verifyListing: "تفعيل الخدمة", enterCode: "أدخل كود التحقق المرسل لإيميلك", verifyBtn: "تفعيل",
    listingCreated: "تم إنشاء الخدمة! أدخل كود التحقق لتفعيلها.",
    quickLinks: "روابط سريعة", forProviders: "لأصحاب الخدمات", contactUs: "تواصل معنا",
    registered: "خدمة مسجلة", monthlyUsers: "مستخدم شهري", confirmedBooking: "حجز مؤكد", serviceRating: "تقييم الخدمة",
    closedHalls: "قاعات مغلقة", openAir: "أوبن آير", nileView: "إطلالة نيلية", hotelHalls: "قاعات فنادق",
    profilePage: "الملف الشخصي", memberSince: "عضو منذ", emailVerified: "البريد مفعل", emailNotVerified: "البريد غير مفعل",
  },
  en: {
    home: "Home", services: "Services", about: "About", contact: "Contact", login: "Login",
    register: "Register", logout: "Logout", myAccount: "My Account", profile: "Profile",
    myBookings: "My Bookings", bugReport: "Report a Bug", darkMode: "Dark Mode",
    heroTitle: "The Largest Wedding Services Platform in Sohag", heroSub: "Book your dream service easily at the best prices",
    search: "Search Now", chooseArea: "Choose Area", allAreas: "All Areas", eventDate: "Event Date",
    budget: "Budget", chooseBudget: "Choose Budget", lessThan: "Less than", moreThan: "More than",
    topRated: "Top Rated Services", viewAll: "View All", browseByType: "Browse by Type",
    ctaTitle: "Do you provide wedding services in Sohag?", ctaSub: "Join our platform and grow your bookings",
    registerNow: "Register Now", contactSupport: "Contact Support",
    servicesPage: "Sohag Event Services", found: "Found", available: "services available",
    sortBy: "Sort by", topRating: "Top Rated", lowestPrice: "Lowest Price", highestPrice: "Highest Price",
    newest: "Newest", filterResults: "Filter Results", clearAll: "Clear All", area: "Area", all: "All",
    price: "Price", egp: "EGP", features: "Features", applyFilter: "Apply Filters",
    viewDetails: "View Details", perNight: "/ night", upTo: "Up to", person: "person", review: "review",
    serviceDetails: "Service Details", specs: "Service Specs", maxCapacity: "Max Capacity",
    locationIn: "Location in Sohag", openMaps: "Open Maps", reviews: "Family Reviews", moreReviews: "Load More",
    selectDate: "Select booking date", bookNow: "📅 Book Now", serviceFee: "Service fee", total: "Total",
    paymentMethod: "Payment Method", cash: "Cash (on arrival)", vodafoneCash: "Vodafone Cash", card: "Credit/Debit Card",
    walletPhone: "Vodafone Cash wallet number", paymentPending: "Payment pending", paymentPaid: "Paid",
    whatsapp: "Contact us on WhatsApp", whatsappSub: "For special requests",
    welcomeBack: "Welcome Back", loginSub: "Login to manage your bookings", email: "Email",
    password: "Password", forgotPass: "Forgot password?", rememberMe: "Remember me", loginBtn: "Login",
    orLoginWith: "Or login with", noAccount: "Don't have an account?", createAccount: "Create Account",
    joinTitle: "Join Farahi", joinSub: "Start your journey with the best wedding services", iAmCustomer: "I'm a Customer",
    iAmProvider: "I'm a Provider", fullName: "Full Name", phone: "Phone", agreeTerms: "I agree to the",
    terms: "Terms of Service", privacy: "Privacy Policy", haveAccount: "Already have an account?", loginNow: "Login",
    dashboard: "Dashboard", totalEarnings: "Total Earnings", upcomingBookings: "Upcoming Bookings",
    avgRating: "Avg Rating", myServices: "My Services", addService: "Add New Service", serviceName: "Service Name",
    servicePhone: "Service Phone", center: "Center", capacity: "Capacity", priceLabel: "Price",
    uploadImages: "Click to upload images", addBtn: "Add Service", verified: "Confirmed", pending: "Pending",
    cancelled: "Cancelled", completed: "Completed", cancelBooking: "Cancel Booking", addReview: "⭐ Add Review",
    viewService: "View Service", noBookings: "No bookings yet", startBooking: "Start booking your dream service!",
    browseServices: "Browse Services", trackBookings: "Track all your bookings and events",
    notFound404: "Page not found", backHome: "Back to Home",
    aboutTitle: "About Farahi", aboutDesc: "Farahi is the first and only platform specialized in booking wedding services in Sohag governorate. We provide a single place where you can search for venues, photographers, beauty services, compare prices, and book easily.",
    aboutMission: "Our Mission", aboutMissionDesc: "To simplify wedding service booking and turn it from a stressful process into a smooth, enjoyable experience.",
    aboutVision: "Our Vision", aboutVisionDesc: "To be the leading wedding services platform in Upper Egypt.",
    contactInfo: "Contact Info", providerName: "Provider Name", noContact: "No contact info available",
    bugTitle: "Bug Title", bugDesc: "Describe the issue", submitBug: "Submit Report", bugSent: "Bug report submitted",
    verifyEmail: "Verify your email", verifyCode: "Enter verification code", verify: "Verify",
    featured: "Featured", underReview: "Under Review", since: "since",
    siteName: "Farahi", siteNameFull: "Farahi — Wedding Services",
    contactPageTitle: "Contact Us", contactPageDesc: "Have a question? Reach out and we'll get back to you soon.",
    contactAddress: "Address", contactAddressVal: "Sohag, Egypt", contactEmail: "Email", contactPhone: "Phone",
    sendMessage: "Send Message", yourName: "Your Name", yourEmail: "Your Email", yourMessage: "Your Message", messageSent: "Message sent successfully!",
    selectCategory: "Service Type", verifyListing: "Verify Listing", enterCode: "Enter the verification code sent to your email", verifyBtn: "Verify",
    listingCreated: "Service created! Enter the code to activate it.",
    quickLinks: "Quick Links", forProviders: "For Providers", contactUs: "Contact Us",
    registered: "registered services", monthlyUsers: "monthly users", confirmedBooking: "confirmed bookings", serviceRating: "service rating",
    closedHalls: "Closed Halls", openAir: "Open Air", nileView: "Nile View", hotelHalls: "Hotel Halls",
    profilePage: "Profile", memberSince: "Member since", emailVerified: "Email verified", emailNotVerified: "Email not verified",
  }
};

function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("farahi_lang") || "ar");
  const t = T[lang];
  const toggle = () => { const n = lang === "ar" ? "en" : "ar"; setLang(n); localStorage.setItem("farahi_lang", n); document.documentElement.dir = n === "ar" ? "rtl" : "ltr"; };
  useEffect(() => { document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; }, []);
  return <LangCtx.Provider value={{ lang, t, toggle }}>{children}</LangCtx.Provider>;
}

// ═══════════════════════════════════════
// DARK MODE
// ═══════════════════════════════════════
const DarkCtx = createContext(null);
function useDark() { return useContext(DarkCtx); }
function DarkProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem("farahi_dark") === "1");
  const toggle = () => { setDark(d => { localStorage.setItem("farahi_dark", d ? "0" : "1"); return !d; }); };
  useEffect(() => { document.body.setAttribute("data-theme", dark ? "dark" : "light"); }, [dark]);
  return <DarkCtx.Provider value={{ dark, toggle }}>{children}</DarkCtx.Provider>;
}

// ═══════════════════════════════════════
// AUTH CONTEXT
// ═══════════════════════════════════════
const AuthCtx = createContext(null);
function useAuth() { return useContext(AuthCtx); }
function AuthProvider({ children }) {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem("farahi_user")); } catch { return null; } });
  const [token, setToken] = useState(() => localStorage.getItem("farahi_token") || "");
  const login = (u, t) => { setUser(u); setToken(t); localStorage.setItem("farahi_user", JSON.stringify(u)); localStorage.setItem("farahi_token", t); };
  const logout = async () => { try { await fetch(API + "/api/auth/logout", { method: "POST", headers: { Authorization: "Bearer " + token } }); } catch {} setUser(null); setToken(""); localStorage.removeItem("farahi_user"); localStorage.removeItem("farahi_token"); };
  const authFetch = useCallback(async (path, opts = {}) => fetch(API + path, { ...opts, headers: { "Content-Type": "application/json", ...(token ? { Authorization: "Bearer " + token } : {}), ...opts.headers } }), [token]);
  return <AuthCtx.Provider value={{ user, token, login, logout, authFetch }}>{children}</AuthCtx.Provider>;
}

// ═══════════════════════════════════════
// ROUTER
// ═══════════════════════════════════════
function useRoute() {
  const [path, setPath] = useState(window.location.hash.slice(1) || "/");
  useEffect(() => { const h = () => setPath(window.location.hash.slice(1) || "/"); window.addEventListener("hashchange", h); return () => window.removeEventListener("hashchange", h); }, []);
  return { path, navigate: (to) => { window.location.hash = to; } };
}

// ═══════════════════════════════════════
// CSS
// ═══════════════════════════════════════
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{--p:#F5A800;--pd:#D48C00;--pl:#FFF8E7;--bg:#F8F8F6;--white:#FFF;--text:#1A1A1A;--text2:#555;--text3:#999;--border:#E5E5E0;--radius:12px;--shadow:0 2px 16px rgba(0,0,0,.08);--card:#FFF;--nav-bg:#FFF;--nav-border:#F0EFE8}
  [data-theme="dark"]{--bg:#121212;--white:#1E1E1E;--text:#E8E8E4;--text2:#A8A8A2;--text3:#777;--border:#333;--shadow:0 2px 16px rgba(0,0,0,.3);--card:#1E1E1E;--nav-bg:#1A1A1A;--nav-border:#2A2A2A;--pl:#2A2416}
  body{font-family:'Tajawal',sans-serif;background:var(--bg);color:var(--text);transition:background .3s,color .3s}
  html{scroll-behavior:smooth}
  a{text-decoration:none;color:inherit} button{font-family:'Tajawal',sans-serif;cursor:pointer;border:none;outline:none} input,textarea,select{font-family:'Tajawal',sans-serif;outline:none}
  ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-track{background:var(--bg)} ::-webkit-scrollbar-thumb{background:var(--p);border-radius:4px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  .fade-up{animation:fadeUp .5s ease forwards} .fade-up-1{animation:fadeUp .5s .1s ease both} .fade-up-2{animation:fadeUp .5s .2s ease both}
  .btn-primary{background:var(--p);color:#fff;font-size:15px;font-weight:700;padding:12px 28px;border-radius:10px;transition:all .2s;display:inline-flex;align-items:center;gap:8px}
  .btn-primary:hover{background:var(--pd);transform:translateY(-1px);box-shadow:0 4px 20px rgba(245,168,0,.35)}
  .btn-outline{background:transparent;color:var(--text);font-size:15px;font-weight:600;padding:11px 24px;border-radius:10px;border:1.5px solid var(--border);transition:all .2s}
  .btn-outline:hover{border-color:var(--p);color:var(--p);background:var(--pl)}
  .btn-ghost{background:transparent;color:var(--text);font-size:14px;font-weight:500;padding:8px 16px;border-radius:8px;transition:background .2s}
  .btn-ghost:hover{background:var(--pl);color:var(--p)}
  .input-field{width:100%;padding:12px 16px;border:1.5px solid var(--border);border-radius:10px;font-size:14px;background:var(--white);color:var(--text);transition:border-color .2s}
  .input-field:focus{border-color:var(--p)} .input-field::placeholder{color:var(--text3)}
  .card{background:var(--card);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden;transition:all .25s}
  .card:hover{box-shadow:0 8px 40px rgba(0,0,0,.12);transform:translateY(-3px)}
  .badge{font-size:11px;font-weight:700;padding:3px 9px;border-radius:20px;display:inline-flex;align-items:center;gap:4px}
  .badge-gold{background:var(--pl);color:var(--pd)} .badge-green{background:#E8F8EE;color:#1A8A3C} .badge-blue{background:#E8F0FF;color:#1A4AD4}
  .spinner{width:20px;height:20px;border:2px solid var(--border);border-top-color:var(--p);border-radius:50%;animation:spin .6s linear infinite}
  .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);color:#fff;padding:12px 24px;border-radius:50px;font-size:14px;font-weight:500;z-index:9999;animation:fadeUp .3s;box-shadow:0 8px 40px rgba(0,0,0,.15);display:flex;align-items:center;gap:8px}
  .toast-success{background:#1A8A3C} .toast-error{background:#D43A3A}
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;align-items:center;justify-content:center;animation:fadeUp .2s;padding:16px}
  .modal-box{background:var(--card);border-radius:20px;padding:32px;max-width:480px;width:100%;max-height:90vh;overflow-y:auto;animation:fadeUp .3s}
  .sec-title{font-size:22px;font-weight:800;display:flex;align-items:center;gap:10px}
  .sec-title::before{content:'';width:4px;height:28px;background:var(--p);border-radius:4px;display:inline-block}
  .cal-day{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;cursor:pointer;transition:all .2s}
  .cal-day:hover{background:var(--pl)} .cal-day.selected{background:var(--p);color:#fff;font-weight:700} .cal-day.today{border:2px solid var(--p);color:var(--p);font-weight:700} .cal-day.disabled{color:var(--text3);cursor:default;opacity:.4}
  .page-btn{width:36px;height:36px;border-radius:8px;border:1.5px solid var(--border);background:var(--card);font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text)}
  .page-btn.active{background:var(--p);color:#fff;border-color:var(--p)}
  input[type=checkbox],input[type=radio]{accent-color:var(--p);width:16px;height:16px;cursor:pointer}
  input[type=range]{-webkit-appearance:none;width:100%;height:4px;border-radius:4px;background:var(--border);outline:none}
  input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:var(--p);cursor:pointer}
  @media(max-width:768px){.hide-mobile{display:none!important}}
`;

// ═══════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════
function Toast({ msg, type, onDone }) { useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, []); return <div className={`toast toast-${type}`}>{type === "success" ? "✓" : "✕"} {msg}</div>; }
function useToast() { const [t, setT] = useState(null); return { show: (m, ty = "success") => setT({ m, ty, id: Date.now() }), el: t ? <Toast key={t.id} msg={t.m} type={t.ty} onDone={() => setT(null)} /> : null }; }
function Stars({ n, size = 13 }) { return <span style={{ color: P, fontSize: size }}>{Array(5).fill(0).map((_, i) => i < Math.round(n) ? "★" : "☆").join("")}</span>; }
function Spinner() { return <div className="spinner" />; }
function formatPrice(n) { return new Intl.NumberFormat("ar-EG").format(n); }
function Avatar({ name = "", size = 36 }) { const i = name.split(" ").slice(0, 2).map(w => w[0] || "").join(""); return <div style={{ width: size, height: size, borderRadius: "50%", background: PL, color: P, fontSize: size * .38, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i || "?"}</div>; }

const IMGS = [
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80",
  "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
  "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
  "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=80",
];
function svcImg(s) { return s?.coverImageUrl || s?.images?.[0]?.imageUrl || IMGS[(s?.serviceID || 0) % IMGS.length]; }

// ═══════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════
function Navbar({ navigate, path }) {
  const { user, logout } = useAuth();
  const { t, lang, toggle: toggleLang } = useLang();
  const { dark, toggle: toggleDark } = useDark();
  const [menu, setMenu] = useState(false);

  return (
    <nav style={{ background: "var(--nav-bg)", borderBottom: "1.5px solid var(--nav-border)", position: "sticky", top: 0, zIndex: 200, height: 64 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <div onClick={() => navigate("/")} style={{ cursor: "pointer", fontSize: 22, fontWeight: 900, color: P }}>{t.siteName}</div>
        <div className="hide-mobile" style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {[{ l: t.home, to: "/" }, { l: t.services, to: "/services" }, { l: t.about, to: "/about" }, { l: t.contact, to: "/contact" }].map(x =>
            <span key={x.to} style={{ fontSize: 14, fontWeight: path === x.to ? 700 : 500, color: path === x.to ? P : "var(--text2)", cursor: "pointer" }} onClick={() => navigate(x.to)}>{x.l}</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={toggleLang} style={{ background: "var(--pl)", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, color: P, cursor: "pointer" }}>{lang === "ar" ? "EN" : "عربي"}</button>
          <button onClick={toggleDark} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--text3)" }}>{dark ? "☀️" : "🌙"}</button>
          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button className="btn-ghost" onClick={() => navigate(user.role === "Provider" ? "/dashboard" : user.role === "Admin" ? "/dashboard" : "/my-bookings")} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                <Avatar name={(user.firstName || "") + " " + (user.lastName || "")} size={28} /> {t.myAccount}
              </button>
              <button className="btn-ghost" onClick={() => navigate("/profile")} style={{ fontSize: 12 }}>👤</button>
              <button className="btn-ghost" onClick={() => navigate("/bug-report")} style={{ fontSize: 12 }}>🐛</button>
              <button className="btn-ghost" style={{ fontSize: 12 }} onClick={logout}>{t.logout}</button>
            </div>
          ) : (
            <>
              <button className="btn-ghost hide-mobile" onClick={() => navigate("/login")}>{t.login}</button>
              <button className="btn-primary" onClick={() => navigate("/register")} style={{ fontSize: 13, padding: "8px 18px" }}>{t.register}</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function Footer({ navigate }) {
  const { t } = useLang();
  return (
    <footer style={{ background: "var(--card)", borderTop: "1.5px solid var(--border)", padding: "40px 24px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 900, color: P, marginBottom: 10 }}>{t.siteName}</div>
            <p style={{ fontSize: 13, color: "var(--text3)", lineHeight: 1.7 }}>{t.aboutDesc?.slice(0, 120)}...</p>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>{t.quickLinks}</div>
            {[t.about, t.services, t.contact].map(x => <div key={x} style={{ fontSize: 13, color: "var(--text2)", marginBottom: 8, cursor: "pointer" }}>{x}</div>)}
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>{t.forProviders}</div>
            <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 8, cursor: "pointer" }} onClick={() => navigate("/register")}>{t.registerNow}</div>
          </div>
          <div>
            <div style={{ fontWeight: 700, marginBottom: 14, fontSize: 15 }}>{t.contactUs}</div>
            <div style={{ fontSize: 13, color: "var(--text2)", marginBottom: 8 }}>support@farahi.com</div>
            <div style={{ fontSize: 13, color: "var(--text2)" }}>01000000000</div>
          </div>
        </div>
        <div style={{ textAlign: "center", fontSize: 12, color: "var(--text3)", borderTop: "1px solid var(--border)", paddingTop: 16 }}>© 2026 {t.siteName}. All rights reserved.</div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════
// SERVICE CARD
// ═══════════════════════════════════════
function ServiceCard({ svc, navigate }) {
  const { user, authFetch } = useAuth();
  const { t } = useLang();
  const [fav, setFav] = useState(false);
  const toggleFav = async (e) => { e.stopPropagation(); if (!user) { navigate("/login"); return; } try { if (fav) await authFetch(`/api/favorites/${svc.serviceID}`, { method: "DELETE" }); else await authFetch(`/api/favorites/${svc.serviceID}`, { method: "POST" }); setFav(f => !f); } catch {} };
  return (
    <div className="card" style={{ cursor: "pointer" }} onClick={() => navigate(`/service/${svc.serviceID}`)}>
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={svcImg(svc)} alt={svc.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .3s" }} onMouseEnter={e => e.target.style.transform = "scale(1.05)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
        <button onClick={toggleFav} style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,.9)", border: "none", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>{fav ? "❤️" : "🤍"}</button>
        <span className="badge badge-gold" style={{ position: "absolute", top: 10, left: 10 }}>★ {svc.averageRating?.toFixed(1) || "0.0"}</span>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>{svc.nameAr || svc.name}</div>
          <div style={{ fontWeight: 900, fontSize: 16, color: P }}>{formatPrice(svc.price)} <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text3)" }}>{t.egp}{t.perNight}</span></div>
        </div>
        <div style={{ fontSize: 12, color: "var(--text3)", marginBottom: 10 }}>📍 {svc.city} {svc.categoryNameAr && `· ${svc.categoryNameAr}`}</div>
        {svc.capacity && <span style={{ fontSize: 12, color: "var(--text2)", marginRight: 12 }}>👥 {t.upTo} {svc.capacity} {t.person}</span>}
        <button className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 13, padding: "9px 0", marginTop: 10 }} onClick={e => { e.stopPropagation(); navigate(`/service/${svc.serviceID}`); }}>{t.viewDetails} ←</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════
function HomePage({ navigate }) {
  const { t } = useLang();
  const [svcs, setSvcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({ city: "", date: "", budget: "" });

  useEffect(() => {
    fetch(`${API}/api/services?PageSize=3&SortBy=rating`).then(r => r.json()).then(d => { if (d.data?.items) setSvcs(d.data.items); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSearch = () => { const p = new URLSearchParams(); if (search.city) p.set("city", search.city); navigate("/services?" + p.toString()); };

  return (
    <div>
      <div style={{ position: "relative", height: 520, overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1400&q=85" alt="hero" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.55)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", textAlign: "center" }}>
          <h1 className="fade-up" style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 900, color: "#fff", lineHeight: 1.3, marginBottom: 12 }}>{t.heroTitle}</h1>
          <p className="fade-up-1" style={{ fontSize: 16, color: "rgba(255,255,255,.85)", marginBottom: 32 }}>{t.heroSub}</p>
          <div className="fade-up-2" style={{ background: "var(--card)", borderRadius: 16, padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-end", flexWrap: "wrap", justifyContent: "center", boxShadow: "0 8px 48px rgba(0,0,0,.2)", width: "100%", maxWidth: 780 }}>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--text3)", marginBottom: 6 }}>📍 {t.chooseArea}</label>
              <select className="input-field" value={search.city} onChange={e => setSearch(s => ({ ...s, city: e.target.value }))}><option value="">{t.allAreas}</option><option value="Sohag">سوهاج/Sohag</option><option value="Girga">جرجا/Girga</option><option value="Tahta">طهطا/Tahta</option></select>
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--text3)", marginBottom: 6 }}>📅 {t.eventDate}</label>
              <input type="date" className="input-field" value={search.date} onChange={e => setSearch(s => ({ ...s, date: e.target.value }))} />
            </div>
            <button className="btn-primary" onClick={handleSearch} style={{ padding: "12px 28px", whiteSpace: "nowrap" }}>🔍 {t.search}</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 20, marginBottom: 48 }}>
          {[{ i: "🏛️", v: "50+", l: t.registered }, { i: "👨‍👩‍👧", v: "10,000+", l: t.monthlyUsers }, { i: "✅", v: "100%", l: t.confirmedBooking }, { i: "⭐", v: "4.8", l: t.serviceRating }].map((s, i) =>
            <div key={i} className="card fade-up" style={{ padding: "24px 20px", textAlign: "center" }}><div style={{ fontSize: 32, marginBottom: 8 }}>{s.i}</div><div style={{ fontSize: 28, fontWeight: 900, color: P }}>{s.v}</div><div style={{ fontSize: 13, color: "var(--text3)" }}>{s.l}</div></div>
          )}
        </div>

        {svcs.length > 0 && <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h2 className="sec-title">{t.topRated}</h2><button className="btn-ghost" onClick={() => navigate("/services")} style={{ color: P, fontWeight: 700 }}>{t.viewAll} ←</button></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20, marginBottom: 48 }}>{svcs.map(s => <ServiceCard key={s.serviceID} svc={s} navigate={navigate} />)}</div>
        </>}

        <div style={{ textAlign: "center", marginBottom: 16 }}><h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>{t.browseByType}</h2></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 16, marginBottom: 56 }}>
          {[{ i: "🏠", n: t.closedHalls }, { i: "🏕️", n: t.openAir }, { i: "🌊", n: t.nileView }, { i: "🏨", n: t.hotelHalls }].map((c, i) =>
            <div key={i} className="card" onClick={() => navigate("/services")} style={{ padding: "24px 16px", textAlign: "center", cursor: "pointer" }}><div style={{ fontSize: 36, marginBottom: 10 }}>{c.i}</div><div style={{ fontWeight: 700, fontSize: 14 }}>{c.n}</div></div>
          )}
        </div>

        <div style={{ borderRadius: 20, background: "linear-gradient(135deg,#1A1A1A,#2D2416)", padding: "40px 48px", marginBottom: 56, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
          <div><h3 style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 8 }}>{t.ctaTitle}</h3><p style={{ color: "rgba(255,255,255,.7)", fontSize: 14 }}>{t.ctaSub}</p></div>
          <div style={{ display: "flex", gap: 12 }}><button className="btn-primary" onClick={() => navigate("/register")}>{t.registerNow}</button><button className="btn-outline" onClick={() => navigate("/contact")} style={{ borderColor: "rgba(255,255,255,.3)", color: "#fff" }}>{t.contactSupport}</button></div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SERVICES PAGE (was HallsPage)
// ═══════════════════════════════════════
function ServicesPage({ navigate }) {
  const { t } = useLang();
  const [svcs, setSvcs] = useState([]); const [loading, setLoading] = useState(true); const [total, setTotal] = useState(0); const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ city: "", minPrice: 0, maxPrice: 20000, sortBy: "rating" });

  const load = useCallback(() => {
    setLoading(true);
    const p = new URLSearchParams({ Page: page, PageSize: 8, SortBy: filters.sortBy });
    if (filters.city) p.set("City", filters.city); if (filters.maxPrice < 20000) p.set("MaxPrice", filters.maxPrice);
    fetch(`${API}/api/services?${p}`).then(r => r.json()).then(d => { if (d.data?.items) { setSvcs(d.data.items); setTotal(d.data.totalCount || 0); } }).catch(() => {}).finally(() => setLoading(false));
  }, [page, filters]);

  useEffect(() => { load(); }, [page, filters.sortBy]);
  const totalPages = Math.ceil(total / 8) || 1;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div><h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>{t.servicesPage}</h1><p style={{ fontSize: 13, color: "var(--text3)" }}>{t.found} {total} {t.available}</p></div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "var(--text3)" }}>{t.sortBy}:</span>
          <select className="input-field" style={{ width: "auto", fontSize: 13, padding: "8px 12px" }} value={filters.sortBy} onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value }))}>
            <option value="rating">{t.topRating}</option><option value="price_asc">{t.lowestPrice}</option><option value="price_desc">{t.highestPrice}</option><option value="newest">{t.newest}</option>
          </select>
        </div>
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ width: 240, flexShrink: 0 }} className="hide-mobile">
          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}><span style={{ fontWeight: 800, fontSize: 16 }}>{t.filterResults}</span><button className="btn-ghost" style={{ fontSize: 12, color: P }} onClick={() => setFilters({ city: "", minPrice: 0, maxPrice: 20000, sortBy: "rating" })}>{t.clearAll}</button></div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>{t.area}</div>
              {[t.all, "Sohag", "Girga", "Tahta"].map(c => <label key={c} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer", fontSize: 13 }}><input type="radio" name="city" checked={filters.city === (c === t.all ? "" : c)} onChange={() => setFilters(f => ({ ...f, city: c === t.all ? "" : c }))} />{c}</label>)}
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>{t.price} ({t.egp})</div>
              <input type="range" min={0} max={20000} step={500} value={filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: +e.target.value }))} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text3)", marginTop: 6 }}><span>0</span><span>{formatPrice(filters.maxPrice)}</span></div>
            </div>
            <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={load}>{t.applyFilter}</button>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          {loading ? <div style={{ display: "flex", justifyContent: "center", padding: 60 }}><Spinner /></div> : svcs.length === 0 ? (
            <div className="card" style={{ padding: 60, textAlign: "center" }}><div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div><div style={{ fontWeight: 700, fontSize: 16 }}>{t.noBookings}</div></div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>{svcs.map(s => <ServiceCard key={s.serviceID} svc={s} navigate={navigate} />)}</div>
          )}
          {totalPages > 1 && <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 28 }}>
            <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))}>←</button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(p => <button key={p} className={`page-btn ${page === p ? "active" : ""}`} onClick={() => setPage(p)}>{p}</button>)}
            <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))}>→</button>
          </div>}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// SERVICE DETAIL PAGE
// ═══════════════════════════════════════
function ServiceDetailPage({ id, navigate }) {
  const { user, authFetch } = useAuth(); const { t } = useLang();
  const { show, el: toastEl } = useToast();
  const [svc, setSvc] = useState(null); const [reviews, setReviews] = useState([]); const [loading, setLoading] = useState(true);
  const [selDate, setSelDate] = useState(null); const [curMonth, setCurMonth] = useState(new Date()); const [booking, setBooking] = useState(false);
  const [payMethod, setPayMethod] = useState("Cash"); const [walletPhone, setWalletPhone] = useState("");
  const [contactModal, setContactModal] = useState(null);

  useEffect(() => {
    Promise.all([fetch(`${API}/api/services/${id}`).then(r => r.json()).catch(() => null), fetch(`${API}/api/services/${id}/reviews`).then(r => r.json()).catch(() => null)])
      .then(([hd, rv]) => { if (hd?.data) setSvc(hd.data); if (rv?.data) setReviews(rv.data); }).finally(() => setLoading(false));
  }, [id]);

  const handleBook = async () => {
    if (!user) { navigate("/login"); return; } if (!selDate) { show(t.selectDate, "error"); return; }
    if (payMethod === "VodafoneCash" && !walletPhone) { show(t.walletPhone, "error"); return; }
    setBooking(true);
    try {
      const r = await authFetch("/api/bookings", { method: "POST", body: JSON.stringify({ serviceID: +id, eventDate: selDate.toISOString(), notes: "", paymentMethod: payMethod, walletPhone: payMethod === "VodafoneCash" ? walletPhone : null }) });
      const d = await r.json();
      if (r.ok) { show(d.message || "Booking confirmed! ✓"); setTimeout(() => navigate("/my-bookings"), 1500); }
      else show(d.message || "Error", "error");
    } catch { show("Connection error", "error"); }
    setBooking(false);
  };

  const showContact = async () => {
    try { const r = await fetch(`${API}/api/services/${id}/contact`); const d = await r.json(); if (d.data) setContactModal(d.data); else show(t.noContact, "error"); }
    catch { show("Connection error", "error"); }
  };

  const daysInMonth = () => { const y = curMonth.getFullYear(), m = curMonth.getMonth(); return { first: (new Date(y, m, 1).getDay() + 1) % 7, total: new Date(y, m + 1, 0).getDate() }; };
  if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: 80 }}><Spinner /></div>;
  if (!svc) return <div style={{ textAlign: "center", padding: 80, color: "var(--text3)" }}>Not found</div>;
  const { first, total } = daysInMonth(); const price = svc.price || 0;

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 24px 60px" }}>
      {toastEl}
      {contactModal && <div className="modal-overlay" onClick={() => setContactModal(null)}><div className="modal-box" onClick={e => e.stopPropagation()}>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>{t.contactInfo}</h3>
        <div style={{ marginBottom: 12 }}><strong>{t.providerName}:</strong> {contactModal.providerName}</div>
        {contactModal.servicePhone && <div style={{ marginBottom: 12 }}><strong>{t.servicePhone}:</strong> <a href={`tel:${contactModal.servicePhone}`} style={{ color: P }}>{contactModal.servicePhone}</a></div>}
        {contactModal.providerPhone && <div style={{ marginBottom: 12 }}><strong>{t.phone}:</strong> <a href={`tel:${contactModal.providerPhone}`} style={{ color: P }}>{contactModal.providerPhone}</a></div>}
        {contactModal.providerEmail && <div style={{ marginBottom: 12 }}><strong>{t.email}:</strong> {contactModal.providerEmail}</div>}
        <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 12 }} onClick={() => setContactModal(null)}>✓</button>
      </div></div>}

      <button className="btn-ghost" onClick={() => navigate("/services")} style={{ marginBottom: 20 }}>→ {t.serviceDetails}</button>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <div style={{ width: 280, flexShrink: 0 }}>
          <div className="card" style={{ padding: 20, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <button onClick={() => setCurMonth(d => new Date(d.getFullYear(), d.getMonth() - 1))} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--text)" }}>←</button>
              <span style={{ fontWeight: 700, fontSize: 14 }}>{curMonth.toLocaleDateString("ar-EG", { month: "long", year: "numeric" })}</span>
              <button onClick={() => setCurMonth(d => new Date(d.getFullYear(), d.getMonth() + 1))} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--text)" }}>→</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 }}>{["س","ن","ث","ر","خ","ج","س"].map((d,i) => <div key={i} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "var(--text3)", padding: "4px 0" }}>{d}</div>)}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
              {Array(first).fill(null).map((_,i) => <div key={"e"+i} />)}
              {Array(total).fill(null).map((_,i) => { const day=i+1,date=new Date(curMonth.getFullYear(),curMonth.getMonth(),day),isToday=date.toDateString()===new Date().toDateString(),isSel=selDate?.toDateString()===date.toDateString(),isPast=date<new Date(new Date().setHours(0,0,0,0)); return <div key={day} className={`cal-day ${isSel?"selected":isToday?"today":isPast?"disabled":""}`} onClick={() => !isPast && setSelDate(date)} style={{ fontSize: 12 }}>{day}</div>; })}
            </div>
            <div style={{ marginTop: 16, borderTop: "1px solid var(--border)", paddingTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}><span style={{ color: "var(--text3)" }}>{t.price}</span><span style={{ fontWeight: 700 }}>{formatPrice(price)} {t.egp}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 12 }}><span style={{ color: "var(--text3)" }}>{t.serviceFee}</span><span style={{ fontWeight: 700 }}>500 {t.egp}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 900, color: P, marginBottom: 16 }}><span>{t.total}</span><span>{formatPrice(price + 500)} {t.egp}</span></div>

              {/* Payment method selector */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>{t.paymentMethod}</div>
                {[
                  { val: "Cash", icon: "💵", label: t.cash },
                  { val: "VodafoneCash", icon: "📱", label: t.vodafoneCash },
                  { val: "Card", icon: "💳", label: t.card },
                ].map(pm => (
                  <label key={pm.val} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", marginBottom: 6, borderRadius: 10, cursor: "pointer", border: `1.5px solid ${payMethod === pm.val ? P : "var(--border)"}`, background: payMethod === pm.val ? PL : "transparent", transition: "all .2s" }}>
                    <input type="radio" name="payment" checked={payMethod === pm.val} onChange={() => setPayMethod(pm.val)} />
                    <span style={{ fontSize: 18 }}>{pm.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{pm.label}</span>
                  </label>
                ))}
                {payMethod === "VodafoneCash" && (
                  <input className="input-field" style={{ marginTop: 8 }} placeholder={t.walletPhone + " (01x xxxxxxxx)"} value={walletPhone} onChange={e => setWalletPhone(e.target.value)} />
                )}
                {payMethod === "Card" && (
                  <div style={{ marginTop: 8, padding: 12, background: "var(--pl)", borderRadius: 8, fontSize: 12, color: "var(--text2)" }}>
                    🔒 Card payment will be available soon via Paymob
                  </div>
                )}
              </div>

              <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={handleBook} disabled={booking || payMethod === "Card"}>{booking ? <Spinner /> : selDate ? t.bookNow : t.selectDate}</button>
            </div>
          </div>
          <div className="card" style={{ padding: 16 }}><button className="btn-outline" style={{ width: "100%", justifyContent: "center" }} onClick={showContact}>📞 {t.contactInfo}</button></div>
        </div>

        <div style={{ flex: 1, minWidth: 280 }}>
          <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 20, height: 280 }}>
            <img src={svc.images?.[0]?.imageUrl || svcImg(svc)} alt={svc.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          {svc.images?.length > 1 && <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto" }}>{svc.images.slice(1).map((img,i) => <img key={i} src={img.imageUrl} alt="" style={{ width: 100, height: 70, objectFit: "cover", borderRadius: 8, cursor: "pointer" }} />)}</div>}

          <div style={{ marginBottom: 12 }}>
            <h1 style={{ fontSize: 24, fontWeight: 900 }}>{svc.nameAr || svc.name}</h1>
            <div style={{ fontSize: 13, color: "var(--text3)", marginTop: 4 }}>📍 {svc.city}{svc.address && `, ${svc.address}`}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}><Stars n={svc.averageRating} size={16} /><span style={{ fontWeight: 800 }}>{svc.averageRating?.toFixed(1)}</span><span style={{ color: "var(--text3)", fontSize: 12 }}>({svc.reviewCount} {t.review})</span></div>
          </div>

          {svc.description && <p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8, marginBottom: 20 }}>{svc.descriptionAr || svc.description}</p>}

          {(svc.amenities?.length > 0 || svc.capacity) && <div style={{ marginBottom: 20 }}>
            <h2 className="sec-title" style={{ fontSize: 17, marginBottom: 14 }}>{t.specs}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(130px,1fr))", gap: 10 }}>
              {svc.capacity && <div style={{ background: "var(--pl)", border: "1.5px solid var(--border)", borderRadius: 12, padding: "12px 14px", textAlign: "center" }}><span style={{ fontSize: 22 }}>👥</span><div style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>{t.maxCapacity}</div><div style={{ fontSize: 11, color: "var(--text3)" }}>{svc.capacity} {t.person}</div></div>}
              {svc.amenities?.map((a,i) => <div key={i} style={{ background: "var(--pl)", border: "1.5px solid var(--border)", borderRadius: 12, padding: "12px 14px", textAlign: "center" }}><span style={{ fontSize: 22 }}>✨</span><div style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>{a.nameAr || a.name}</div></div>)}
            </div>
          </div>}

          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><h2 className="sec-title" style={{ fontSize: 17 }}>{t.locationIn}</h2>
              <a href={`https://www.google.com/maps/search/?api=1&query=${svc.latitude || 26.556},${svc.longitude || 31.695}`} target="_blank" rel="noopener" className="btn-ghost" style={{ color: P, fontSize: 13 }}>🗺️ {t.openMaps}</a></div>
            <iframe src={`https://www.openstreetmap.org/export/embed.html?bbox=${(svc.longitude||31.695)-.01},${(svc.latitude||26.556)-.01},${(svc.longitude||31.695)+.01},${(svc.latitude||26.556)+.01}&layer=mapnik`} style={{ width: "100%", height: 200, border: "none", borderRadius: 12 }} />
          </div>

          {reviews.length > 0 && <div>
            <h2 className="sec-title" style={{ fontSize: 17, marginBottom: 16 }}>{t.reviews}</h2>
            {reviews.map(r => <div key={r.reviewID} style={{ background: "var(--pl)", border: "1.5px solid var(--border)", borderRadius: 12, padding: 16, marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Avatar name={r.customerName} size={36} /><div><div style={{ fontWeight: 700, fontSize: 14 }}>{r.customerName}</div><div style={{ fontSize: 11, color: "var(--text3)" }}>{new Date(r.createdAt).toLocaleDateString("ar-EG")}</div></div></div>
                <Stars n={r.rating} />
              </div>
              {r.comment && <p style={{ fontSize: 13, color: "var(--text2)", lineHeight: 1.7 }}>{r.comment}</p>}
            </div>)}
          </div>}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// LOGIN PAGE
// ═══════════════════════════════════════
function LoginPage({ navigate }) {
  const { login } = useAuth(); const { t } = useLang(); const { show, el } = useToast();
  const [form, setForm] = useState({ email: "", password: "" }); const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!form.email || !form.password) { show(t.email + " & " + t.password, "error"); return; }
    setLoading(true);
    try { const r = await fetch(`${API}/api/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); const d = await r.json();
      if (r.ok && d.data) { login(d.data, d.data.accessToken); show("✓"); setTimeout(() => navigate(d.data.role === "Provider" || d.data.role === "Admin" ? "/dashboard" : "/"), 1200); }
      else show(d.message || "Error", "error");
    } catch { show("Connection error", "error"); } setLoading(false);
  };
  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>{el}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}><div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div><h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 6 }}>{t.welcomeBack}</h1><p style={{ color: "var(--text3)", fontSize: 14 }}>{t.loginSub}</p></div>
          <div style={{ marginBottom: 16 }}><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.email}</label><input className="input-field" type="email" placeholder="name@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
          <div style={{ marginBottom: 20 }}><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.password}</label><input className="input-field" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} onKeyDown={e => e.key === "Enter" && handleSubmit()} /></div>
          <button className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: 14 }} onClick={handleSubmit} disabled={loading}>{loading ? <Spinner /> : t.loginBtn}</button>
          <p style={{ textAlign: "center", fontSize: 13, color: "var(--text3)", marginTop: 16 }}>{t.noAccount} <span style={{ color: P, fontWeight: 700, cursor: "pointer" }} onClick={() => navigate("/register")}>{t.createAccount}</span></p>
        </div>
      </div>
      <div className="hide-mobile" style={{ flex: 1, overflow: "hidden" }}><img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
    </div>
  );
}

// ═══════════════════════════════════════
// REGISTER PAGE
// ═══════════════════════════════════════
function RegisterPage({ navigate }) {
  const { login } = useAuth(); const { t } = useLang(); const { show, el } = useToast();
  const [role, setRole] = useState("Customer"); const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", password: "" }); const [agreed, setAgreed] = useState(false); const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!form.firstName || !form.email || !form.password) { show("Fill all fields", "error"); return; } if (!agreed) { show(t.agreeTerms, "error"); return; }
    setLoading(true);
    try { const r = await fetch(`${API}/api/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, lastName: form.lastName || form.firstName.split(" ").slice(1).join(" ") || ".", role }) }); const d = await r.json();
      if (r.ok && d.data) { login(d.data, d.data.accessToken); show(d.message || "✓"); setTimeout(() => navigate("/"), 1500); }
      else show(d.message || "Error", "error");
    } catch { show("Connection error", "error"); } setLoading(false);
  };
  return (
    <div style={{ minHeight: "calc(100vh - 64px)", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>{el}
      <div className="card" style={{ width: "100%", maxWidth: 480, padding: "36px 40px" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}><h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 4 }}>{t.joinTitle}</h1><p style={{ color: "var(--text3)", fontSize: 14 }}>{t.joinSub}</p></div>
        <div style={{ display: "flex", background: "var(--bg)", borderRadius: 12, padding: 4, marginBottom: 24 }}>
          {["Customer", "Provider"].map(r => <button key={r} onClick={() => setRole(r)} style={{ flex: 1, padding: "10px 0", borderRadius: 9, border: "none", fontSize: 14, fontWeight: 700, background: role === r ? P : "transparent", color: role === r ? "#fff" : "var(--text3)", cursor: "pointer" }}>{r === "Customer" ? t.iAmCustomer : t.iAmProvider}</button>)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 5 }}>{t.fullName}</label><input className="input-field" placeholder={t.fullName} value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} /></div>
          <div><label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 5 }}>{t.phone}</label><input className="input-field" placeholder="01xxxxxxxxx" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
        </div>
        <div style={{ marginBottom: 12 }}><label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 5 }}>{t.email}</label><input className="input-field" type="email" placeholder="example@mail.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
        <div style={{ marginBottom: 16 }}><label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 5 }}>{t.password}</label><input className="input-field" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} /></div>
        <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "var(--text2)", marginBottom: 20, cursor: "pointer" }}><input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />{t.agreeTerms} <span style={{ color: P }}>{t.terms}</span> & <span style={{ color: P }}>{t.privacy}</span></label>
        <button className="btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: 16, padding: 14 }} onClick={handleSubmit} disabled={loading}>{loading ? <Spinner /> : t.createAccount}</button>
        <p style={{ textAlign: "center", fontSize: 13, color: "var(--text3)", marginTop: 16 }}>{t.haveAccount} <span style={{ color: P, fontWeight: 700, cursor: "pointer" }} onClick={() => navigate("/login")}>{t.loginNow}</span></p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// DASHBOARD (Provider)
// ═══════════════════════════════════════
function DashboardPage({ navigate }) {
  const { user, authFetch } = useAuth(); const { t } = useLang(); const { show, el } = useToast();
  const [data, setData] = useState(null); const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [newSvc, setNewSvc] = useState({ name: "", city: "Sohag", price: "", capacity: "", phone: "", categoryID: "" });
  const [pendingVerify, setPendingVerify] = useState(null); // { serviceID, code } after creation
  const [verifyCode, setVerifyCode] = useState("");

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    // Load dashboard stats + categories in parallel
    Promise.all([
      authFetch("/api/dashboard/provider").then(r => r.json()).catch(() => null),
      fetch(`${API}/api/categories`).then(r => r.json()).catch(() => null)
    ]).then(([d, c]) => {
      setData(d?.data || { totalServices: 0, totalBookings: 0, totalEarnings: 0, upcomingBookings: 0, averageRating: 0, totalReviews: 0 });
      if (c?.data) setCategories(c.data);
    }).finally(() => setLoading(false));
  }, []);

  const handleAdd = async () => {
    if (!newSvc.name || !newSvc.price || !newSvc.categoryID) { show(t.serviceName + " & " + t.priceLabel + " & " + t.selectCategory, "error"); return; }
    try {
      const r = await authFetch("/api/services", { method: "POST", body: JSON.stringify({
        categoryID: +newSvc.categoryID, name: newSvc.name, nameAr: newSvc.name,
        city: newSvc.city, price: +newSvc.price, capacity: +newSvc.capacity || null, phone: newSvc.phone || null
      }) });
      const d = await r.json();
      if (r.ok && d.data) {
        // Show verification step — the code is returned in the response during development
        setPendingVerify({ serviceID: d.data.serviceID, code: d.data.verificationCode });
        show(t.listingCreated);
        setNewSvc({ name: "", city: "Sohag", price: "", capacity: "", phone: "", categoryID: "" });
      } else show(d.message || "Error", "error");
    } catch { show("Connection error", "error"); }
  };

  const handleVerify = async () => {
    if (!verifyCode || !pendingVerify) return;
    try {
      const r = await authFetch(`/api/services/${pendingVerify.serviceID}/verify`, { method: "POST", body: JSON.stringify({ code: verifyCode }) });
      const d = await r.json();
      if (r.ok) { show(d.message || "Verified! ✓"); setPendingVerify(null); setVerifyCode(""); }
      else show(d.message || "Invalid code", "error");
    } catch { show("Connection error", "error"); }
  };

  if (!user) return null;
  if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: 80 }}><Spinner /></div>;

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>{el}
      <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 24 }}>🏆 {t.dashboard}</h1>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 16, marginBottom: 28 }}>
        {[{ i: "💰", l: t.totalEarnings, v: `${formatPrice(data?.totalEarnings || 0)} ${t.egp}` }, { i: "📅", l: t.upcomingBookings, v: data?.upcomingBookings || 0 }, { i: "⭐", l: t.avgRating, v: data?.averageRating?.toFixed(1) || "0.0" }, { i: "🏛️", l: t.myServices, v: data?.totalServices || 0 }].map((s, i) =>
          <div key={i} className="card" style={{ padding: "20px 18px", display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 46, height: 46, borderRadius: 12, background: PL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{s.i}</div>
            <div><div style={{ fontSize: 12, color: "var(--text3)" }}>{s.l}</div><div style={{ fontSize: 20, fontWeight: 900, color: P }}>{s.v}</div></div>
          </div>
        )}
      </div>

      {/* Verification modal — appears after creating a service */}
      {pendingVerify && (
        <div className="card" style={{ padding: 24, marginBottom: 24, border: "2px solid " + P, background: PL }}>
          <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 8, color: P }}>✉️ {t.verifyListing}</h3>
          <p style={{ fontSize: 13, color: "var(--text2)", marginBottom: 4 }}>{t.enterCode}</p>
          <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 16 }}>
            (Dev mode — code: <strong style={{ color: P, fontSize: 16 }}>{pendingVerify.code}</strong>)
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <input className="input-field" style={{ maxWidth: 200, fontSize: 18, textAlign: "center", letterSpacing: 6, fontWeight: 700 }}
              placeholder="000000" maxLength={6} value={verifyCode} onChange={e => setVerifyCode(e.target.value.replace(/\D/g, ""))} />
            <button className="btn-primary" onClick={handleVerify}>{t.verifyBtn}</button>
            <button className="btn-ghost" onClick={() => setPendingVerify(null)}>✕</button>
          </div>
        </div>
      )}

      {/* Add service form */}
      <div className="card" style={{ padding: 24 }}>
        <h3 style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>🏛️ {t.addService}</h3>

        {/* Service name */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 5 }}>{t.serviceName}</label>
          <input className="input-field" placeholder={t.serviceName} value={newSvc.name} onChange={e => setNewSvc(h => ({ ...h, name: e.target.value }))} />
        </div>

        {/* Category selector */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 5 }}>{t.selectCategory}</label>
          <select className="input-field" value={newSvc.categoryID} onChange={e => setNewSvc(h => ({ ...h, categoryID: e.target.value }))}>
            <option value="">— {t.selectCategory} —</option>
            {categories.map(c => (
              <option key={c.categoryID} value={c.categoryID}>{c.nameAr || c.name}</option>
            ))}
          </select>
        </div>

        {/* City + Phone */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 5 }}>{t.center}</label>
            <select className="input-field" value={newSvc.city} onChange={e => setNewSvc(h => ({ ...h, city: e.target.value }))}>
              <option>Sohag</option><option>Girga</option><option>Tahta</option><option>Akhmim</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 5 }}>{t.servicePhone}</label>
            <input className="input-field" placeholder="01xxxxxxxxx" value={newSvc.phone} onChange={e => setNewSvc(h => ({ ...h, phone: e.target.value }))} />
          </div>
        </div>

        {/* Capacity + Price */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 5 }}>{t.capacity}</label>
            <input className="input-field" type="number" placeholder="500" value={newSvc.capacity} onChange={e => setNewSvc(h => ({ ...h, capacity: e.target.value }))} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 5 }}>{t.priceLabel} ({t.egp})</label>
            <input className="input-field" type="number" placeholder="5000" value={newSvc.price} onChange={e => setNewSvc(h => ({ ...h, price: e.target.value }))} />
          </div>
        </div>

        <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={handleAdd}>{t.addBtn}</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// MY BOOKINGS (Customer)
// ═══════════════════════════════════════
function MyBookingsPage({ navigate }) {
  const { user, authFetch } = useAuth(); const { t } = useLang(); const { show, el } = useToast();
  const [bookings, setBookings] = useState([]); const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    authFetch("/api/bookings/my").then(r => r.json()).then(d => { if (d.data) setBookings(Array.isArray(d.data) ? d.data : []); }).catch(() => {}).finally(() => setLoading(false));
  }, [user]);

  const statusMap = { Confirmed: [t.verified, "#1A8A3C", "#E8F8EE"], Pending: [t.pending, "#B45309", "#FEF3C7"], Cancelled: [t.cancelled, "#D43A3A", "#FFE5E5"], Completed: [t.completed, "#1A4AD4", "#E8F0FF"] };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>{el}
      <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6 }}>{t.myBookings}</h1>
      <p style={{ color: "var(--text3)", fontSize: 14, marginBottom: 24 }}>{t.trackBookings}</p>
      {loading ? <div style={{ textAlign: "center", padding: 60 }}><Spinner /></div> : bookings.length === 0 ? (
        <div className="card" style={{ padding: 60, textAlign: "center" }}><div style={{ fontSize: 48, marginBottom: 12 }}>📋</div><div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{t.noBookings}</div><p style={{ color: "var(--text3)", marginBottom: 20 }}>{t.startBooking}</p><button className="btn-primary" onClick={() => navigate("/services")}>{t.browseServices}</button></div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {bookings.map(b => { const [label, color, bg] = statusMap[b.status] || ["—", "#888", "#f0f0f0"]; return (
            <div key={b.bookingID} className="card" style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div><div style={{ fontWeight: 800, fontSize: 17, marginBottom: 4 }}>{b.serviceNameAr || b.serviceName}</div><div style={{ fontSize: 13, color: "var(--text3)" }}>📍 {b.serviceCity} · 📅 {new Date(b.eventDate).toLocaleDateString("ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div></div>
                <span className="badge" style={{ background: bg, color }}>{label}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 900, fontSize: 18, color: P }}>{formatPrice(b.totalPrice)} {t.egp}</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {b.status === "Completed" && !b.hasReview && <button className="btn-primary" style={{ fontSize: 13, padding: "7px 16px" }} onClick={async () => {
                    const rating = prompt("Rating (1-5):"); if (!rating || +rating < 1 || +rating > 5) return;
                    const comment = prompt("Comment (optional):") || "";
                    try { const r = await authFetch("/api/reviews", { method: "POST", body: JSON.stringify({ bookingID: b.bookingID, rating: +rating, comment }) }); if (r.ok) { show("Review submitted ✓"); setBookings(bs => bs.map(x => x.bookingID === b.bookingID ? { ...x, hasReview: true } : x)); } else { const d = await r.json(); show(d.message, "error"); } } catch { show("Error", "error"); }
                  }}>{t.addReview}</button>}
                  {b.status === "Confirmed" && <button className="btn-outline" style={{ fontSize: 13, padding: "7px 16px", color: "#D43A3A", borderColor: "#D43A3A" }} onClick={async () => {
                    if (!confirm("Cancel?")) return;
                    try { const r = await authFetch(`/api/bookings/${b.bookingID}/cancel`, { method: "PUT", body: JSON.stringify({ reason: "Cancelled by user" }) }); if (r.ok) { show("Cancelled"); setBookings(bs => bs.map(x => x.bookingID === b.bookingID ? { ...x, status: "Cancelled" } : x)); } } catch { show("Error", "error"); }
                  }}>{t.cancelBooking}</button>}
                  <button className="btn-ghost" style={{ fontSize: 13 }} onClick={() => navigate(`/service/${b.serviceID || 1}`)}>{t.viewService}</button>
                </div>
              </div>
            </div>
          ); })}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// PROFILE PAGE
// ═══════════════════════════════════════
function ProfilePage({ navigate }) {
  const { user, authFetch } = useAuth(); const { t } = useLang();
  const [profile, setProfile] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { if (!user) { navigate("/login"); return; } authFetch("/api/auth/profile").then(r => r.json()).then(d => { if (d.data) setProfile(d.data); }).catch(() => {}).finally(() => setLoading(false)); }, [user]);
  if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: 80 }}><Spinner /></div>;
  if (!profile) return null;
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 24 }}>👤 {t.profilePage}</h1>
      <div className="card" style={{ padding: 32, textAlign: "center" }}>
        <Avatar name={profile.firstName + " " + profile.lastName} size={80} />
        <h2 style={{ fontSize: 22, fontWeight: 800, marginTop: 16 }}>{profile.firstName} {profile.lastName}</h2>
        <span className="badge badge-gold" style={{ marginTop: 8 }}>{profile.role}</span>
        <div style={{ marginTop: 24, textAlign: "start" }}>
          {[{ l: t.email, v: profile.email }, { l: t.phone, v: profile.phone || "—" }, { l: t.memberSince, v: new Date(profile.createdAt).toLocaleDateString("ar-EG") }].map((x, i) =>
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)" }}><span style={{ color: "var(--text3)", fontSize: 14 }}>{x.l}</span><span style={{ fontWeight: 600, fontSize: 14 }}>{x.v}</span></div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════
function AboutPage() {
  const { t } = useLang();
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
      <h1 className="sec-title" style={{ marginBottom: 24 }}>{t.aboutTitle}</h1>
      <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 24, height: 300 }}><img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=85" alt="Farahi" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
      <p style={{ fontSize: 16, lineHeight: 2, color: "var(--text2)", marginBottom: 32 }}>{t.aboutDesc}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
        <div className="card" style={{ padding: 24 }}><div style={{ fontSize: 32, marginBottom: 12 }}>🎯</div><h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{t.aboutMission}</h3><p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8 }}>{t.aboutMissionDesc}</p></div>
        <div className="card" style={{ padding: 24 }}><div style={{ fontSize: 32, marginBottom: 12 }}>🔭</div><h3 style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{t.aboutVision}</h3><p style={{ fontSize: 14, color: "var(--text2)", lineHeight: 1.8 }}>{t.aboutVisionDesc}</p></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {["https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&q=80","https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&q=80","https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&q=80"].map((u,i) =>
          <div key={i} style={{ borderRadius: 12, overflow: "hidden", height: 180 }}><img src={u} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// BUG REPORT PAGE
// ═══════════════════════════════════════
function BugReportPage({ navigate }) {
  const { user, authFetch } = useAuth(); const { t } = useLang(); const { show, el } = useToast();
  const [form, setForm] = useState({ title: "", description: "" }); const [loading, setLoading] = useState(false);
  if (!user) { navigate("/login"); return null; }
  const handleSubmit = async () => {
    if (!form.title || !form.description) { show("Fill all fields", "error"); return; }
    setLoading(true);
    try { const r = await authFetch("/api/bugreports", { method: "POST", body: JSON.stringify(form) }); if (r.ok) { show(t.bugSent); setForm({ title: "", description: "" }); } else { const d = await r.json(); show(d.message, "error"); } }
    catch { show("Error", "error"); } setLoading(false);
  };
  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "32px 24px" }}>{el}
      <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 24 }}>🐛 {t.bugReport}</h1>
      <div className="card" style={{ padding: 24 }}>
        <div style={{ marginBottom: 16 }}><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.bugTitle}</label><input className="input-field" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
        <div style={{ marginBottom: 16 }}><label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.bugDesc}</label><textarea className="input-field" rows={5} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: "vertical" }} /></div>
        <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={handleSubmit} disabled={loading}>{loading ? <Spinner /> : t.submitBug}</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// CONTACT PAGE
// ═══════════════════════════════════════
function ContactPage() {
  const { t } = useLang();
  const { show, el } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!form.name || !form.email || !form.message) { show("Fill all fields", "error"); return; }
    setSent(true);
    show(t.messageSent);
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      {el}
      <h1 className="sec-title" style={{ marginBottom: 8 }}>{t.contactPageTitle}</h1>
      <p style={{ color: "var(--text3)", fontSize: 14, marginBottom: 32 }}>{t.contactPageDesc}</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {/* Contact Info */}
        <div>
          <div className="card" style={{ padding: 24, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: PL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📍</div>
              <div><div style={{ fontWeight: 700, fontSize: 14 }}>{t.contactAddress}</div><div style={{ fontSize: 13, color: "var(--text3)" }}>{t.contactAddressVal}</div></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: PL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>✉️</div>
              <div><div style={{ fontWeight: 700, fontSize: 14 }}>{t.contactEmail}</div><div style={{ fontSize: 13, color: "var(--text3)" }}>support@farahi.com</div></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, background: PL, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📞</div>
              <div><div style={{ fontWeight: 700, fontSize: 14 }}>{t.contactPhone}</div><div style={{ fontSize: 13, color: "var(--text3)" }}>01000000000</div></div>
            </div>
          </div>

          {/* Map */}
          <div style={{ borderRadius: 12, overflow: "hidden" }}>
            <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=31.68,26.54,31.72,26.58&layer=mapnik" style={{ width: "100%", height: 200, border: "none" }} />
          </div>
        </div>

        {/* Contact Form */}
        <div className="card" style={{ padding: 24 }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{t.messageSent}</div>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.yourName}</label>
                <input className="input-field" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.yourEmail}</label>
                <input className="input-field" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{t.yourMessage}</label>
                <textarea className="input-field" rows={5} style={{ resize: "vertical" }} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              </div>
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={handleSend}>{t.sendMessage}</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// 404 + APP ROUTER
// ═══════════════════════════════════════
function NotFoundPage({ navigate }) {
  const { t } = useLang();
  return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 128px)", padding: 24, textAlign: "center" }}><div style={{ fontSize: 80, marginBottom: 16 }}>😔</div><h1 style={{ fontSize: 32, fontWeight: 900, color: P, marginBottom: 8 }}>404</h1><p style={{ color: "var(--text3)", marginBottom: 24 }}>{t.notFound404}</p><button className="btn-primary" onClick={() => navigate("/")}>{t.backHome}</button></div>;
}

function App() {
  const { path, navigate } = useRoute();
  const segs = path.split("?")[0].split("/").filter(Boolean);
  const base = "/" + (segs[0] || ""); const param1 = segs[1];
  const showNav = !["/login", "/register"].includes(base);

  const page = () => {
    if (path === "/" || path === "") return <HomePage navigate={navigate} />;
    if (base === "/services") return <ServicesPage navigate={navigate} />;
    if (base === "/service" && param1) return <ServiceDetailPage id={param1} navigate={navigate} />;
    if (base === "/login") return <LoginPage navigate={navigate} />;
    if (base === "/register") return <RegisterPage navigate={navigate} />;
    if (base === "/dashboard") return <DashboardPage navigate={navigate} />;
    if (base === "/my-bookings") return <MyBookingsPage navigate={navigate} />;
    if (base === "/profile") return <ProfilePage navigate={navigate} />;
    if (base === "/about") return <AboutPage />;
    if (base === "/contact") return <ContactPage />;
    if (base === "/bug-report") return <BugReportPage navigate={navigate} />;
    // Legacy routes redirect
    if (base === "/halls") return <ServicesPage navigate={navigate} />;
    if (base === "/hall" && param1) return <ServiceDetailPage id={param1} navigate={navigate} />;
    return <NotFoundPage navigate={navigate} />;
  };

  return (
    <>
      <style>{CSS}</style>
      <LangProvider><DarkProvider><AuthProvider>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          {showNav && <Navbar navigate={navigate} path={base} />}
          <main style={{ flex: 1 }}>{page()}</main>
          {showNav && <Footer navigate={navigate} />}
        </div>
      </AuthProvider></DarkProvider></LangProvider>
    </>
  );
}

export default App;
