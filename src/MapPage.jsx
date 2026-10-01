export default function MapPage() {
    return (
        <>
            <header className="map-top">
                <a href="maps.html">← เลือกแผนที่</a>
                <a href="index.html">LANNA / CHIANG MAI</a>
            </header>
            <main className="map-shell">
                <aside className="map-panel">
                    <p className="eyebrow" id="kicker" />
                    <h1 id="title" />
                    <p id="intro" />
                    <div id="controls" />
                    <div id="legend" className="legend" />
                </aside>
                <section className="map-canvas">
                    <div id="map" />
                    <div id="caption" className="map-caption" />
                </section>
            </main>
        </>
    );
}
