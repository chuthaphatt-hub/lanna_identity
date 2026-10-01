import { useEffect, useRef, useState } from "react";

const appBase = import.meta.env.BASE_URL;

const identities = [
    {
        number: "01",
        title: "กาแล",
        image: `${appBase}images/run3_point_4101_right.jpg`,
        alt: "ตัวอย่างกาแลจากข้อมูลภาพถนน",
        description:
            "ไม้แกะสลักที่ประดับอยู่บนยอดจั่วหลังคาของบ้านหรือเรือนไม้โบราณล้านนา โดยติดในลักษณะไขว้กันเป็นรูปกากบาท",
    },
    {
        number: "02",
        title: "โคม",
        image: `${appBase}images/run4_point_2378_left.jpg`,
        alt: "ตัวอย่างโคมจากข้อมูลภาพถนน",
        description:
            "เครื่องโคมไฟที่มีที่บังลม เป็นเครื่องพุทธบูชาและเครื่องประดับตกแต่งเพื่อความสิริมงคล ที่เชื่อมโยงพื้นที่สถาปัตยกรรมและกิจกรรมชุมชน",
    },
    {
        number: "03",
        title: "อักษรล้านนา",
        image: `${appBase}images/run1_point_934_left.jpg`,
        alt: "ตัวอย่างอักษรล้านนาจากข้อมูลภาพถนน",
        description:
            "เรียกว่า “อักษรธรรมล้านนา” หรือชาวล้านนาเรียกว่า “ตั๋วเมือง” ใช้บันทึกเรื่องราว วัฒนธรรม และศาสนาในภูมิภาคล้านนาในอดีต",
    },
];

const maps = [
    {
        number: "01",
        category: "CULTURAL POINTS",
        title: "แผนที่จุดทั้งหมด",
        description:
            "จุดตรวจจับได้ และจุดที่ได้จากการสร้างระยะ 20 เมตร พร้อมภาพ Street View",
        view: "points",
    },
    {
        number: "02",
        category: "SPATIAL ANALYSIS",
        title: "แผนที่การวิเคราะห์",
        description: "ความหนาแน่นของจุดตรวจจับ และผล Hot Spot / Cold Spot",
        view: "analysis",
    },
    {
        number: "03",
        category: "AREA COMPARISON",
        title: "เปรียบเทียบเมืองเก่า",
        description: "เปรียบเทียบการกระจายตัวระหว่างเมืองเก่าและพื้นที่โดยรอบ",
        view: "comparison",
    },
];

function AboutDrawer({ open, onClose }) {
    return (
        <>
            <aside id="aboutDrawer" aria-hidden={!open} aria-label="เกี่ยวกับโครงการ">
                <button
                    id="aboutClose"
                    type="button"
                    aria-label="ปิด"
                    onClick={onClose}
                >
                    ×
                </button>
                <p className="eyebrow">ABOUT THE PROJECT</p>
                <h2>อัตลักษณ์ความเป็นล้านนาในเมืองเชียงใหม่</h2>
                <p>
                    แผนที่นี้ชวนสำรวจร่องรอยของกาแล โคม และอักษรล้านนาที่ตรวจพบจากภาพ
                    Google Street View
                </p>
                <dl>
                    <div>
                        <dt>พื้นที่ศึกษา</dt>
                        <dd>เขตเทศบาลนครเชียงใหม่</dd>
                    </div>
                    <div>
                        <dt>วิธีตรวจจับ</dt>
                        <dd>YOLO Object Detection</dd>
                    </div>
                    <div>
                        <dt>การวิเคราะห์</dt>
                        <dd>
                            • Average Nearest Neighbor
                            <br />• Moran&apos;s I
                            <br />• Kernel Density
                            <br />• Getis-Ord Gi*
                        </dd>
                    </div>
                </dl>
            </aside>
            <div
                id="drawerScrim"
                aria-hidden={!open}
                onClick={onClose}
            />
        </>
    );
}

function App() {
    const [aboutOpen, setAboutOpen] = useState(false);
    const aboutButtonRef = useRef(null);
    const closeAbout = () => {
        setAboutOpen(false);
        aboutButtonRef.current?.focus();
    };

    useEffect(() => {
        document.body.classList.add("tourist-mode");
        history.scrollRestoration = "manual";
        if (location.hash !== "#home") {
            history.replaceState(
                null,
                "",
                `${location.pathname}${location.search}#home`,
            );
        }
        window.scrollTo(0, 0);

        const section = document.querySelector("#identities");
        const cards = [...document.querySelectorAll(".identity-cards article")];
        let timers = [];
        const clearTimers = () => {
            timers.forEach(window.clearTimeout);
            timers = [];
        };
        const observer = new IntersectionObserver(([entry]) => {
            clearTimers();
            if (entry.isIntersecting) {
                timers = cards.map((card, index) =>
                    window.setTimeout(
                        () => card.classList.add("is-visible"),
                        index * 900,
                    ),
                );
            } else {
                cards.forEach((card) => card.classList.remove("is-visible"));
            }
        }, { threshold: 0.15 });
        observer.observe(section);

        return () => {
            document.body.classList.remove("tourist-mode", "about-open");
            observer.disconnect();
            clearTimers();
        };
    }, []);

    useEffect(() => {
        document.body.classList.toggle("about-open", aboutOpen);
    }, [aboutOpen]);

    return (
        <>
            <header className="site-header">
                <a className="brand" href="#home">
                    LANNA / CHIANG MAI
                </a>
                <nav>
                    <a href="#identities">อัตลักษณ์</a>
                    <a href="#explore">แผนที่</a>
                    <button
                        id="aboutButton"
                        ref={aboutButtonRef}
                        type="button"
                        aria-controls="aboutDrawer"
                        aria-expanded={aboutOpen}
                        onClick={() => setAboutOpen(true)}
                    >
                        เกี่ยวกับ
                    </button>
                </nav>
            </header>
            <AboutDrawer open={aboutOpen} onClose={closeAbout} />
            <main>
                <section id="home" className="hero">
                    <img src={`${appBase}assets/lanna-hero.jpg`} alt="อาคารล้านนาที่ประดับโคมและกาแล" />
                    <div className="hero-shade" />
                    <div className="hero-copy">
                        <p className="eyebrow">CULTURE EXPLORER · CHIANG MAI</p>
                        <h1>
                            ตามหาร่องรอย
                            <br />
                            ล้านนาในเมืองเชียงใหม่
                        </h1>
                        <p>สำรวจโคม กาแล และอักษรล้านนาที่ปรากฏอยู่บนเส้นทางในเมือง</p>
                        <a className="scroll-link" href="#identities">
                            เริ่มสำรวจ ↓
                        </a>
                    </div>
                </section>
                <section id="identities" className="identity-section">
                    <p className="eyebrow">WHAT TO LOOK FOR</p>
                    <h2>สามอัตลักษณ์ล้านนาที่ปรากฎ</h2>
                    <div className="identity-cards">
                        {identities.map((identity) => (
                            <article key={identity.number}>
                                <img src={identity.image} alt={identity.alt} />
                                <div>
                                    <span>{identity.number}</span>
                                    <h3>{identity.title}</h3>
                                    <p>{identity.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
                <section id="explore" className="explore-section map-menu-section">
                    <div className="section-heading">
                        <p className="eyebrow">MAP COLLECTION</p>
                        <h2>
                            เลือกแผนที่
                            <br />
                            เพื่อ <em>สำรวจ</em>
                        </h2>
                        <p>เลือกหัวข้อที่สนใจเพื่อเปิดแผนที่เชิงโต้ตอบในหน้าใหม่</p>
                    </div>
                    <div className="home-map-choices">
                        {maps.map((map) => (
                            <a key={map.view} href={`${appBase}map.html?view=${map.view}`}>
                                <span>
                                    {map.number} · {map.category}
                                </span>
                                <h3>{map.title}</h3>
                                <p>{map.description}</p>
                                <b>↗</b>
                            </a>
                        ))}
                    </div>
                </section>
            </main>
            <footer>
                แผนที่สำรวจวัฒนธรรมล้านนา · ข้อมูลแผนที่ © OpenStreetMap contributors
            </footer>
        </>
    );
}

export default App;
