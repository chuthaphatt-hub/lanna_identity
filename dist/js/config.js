/* Field mappings verified from the supplied GeoJSON, 23 September 2026. */
window.MAP_CONFIG = {
  files: {
    detections: "data/detections_all_conf.json",
    oldTownPoints: "data/detections_oldtown.geojson",
    peripheryPoints: "data/detections_periphery.geojson",
    municipality: "data/city_boundary.geojson",
    oldCity: "data/old_city.geojson",
    periphery: "data/periphery_boundary.geojson",
    hotspots: {
      all: "data/hotspot_all.geojson",
      kalae: "data/hotspot_kalae.geojson",
      kom: "data/hotspot_kom.geojson",
      text: "data/hotspot_text.geojson",
    },
  },
  classes: [
    {
      key: "kalae",
      count: "kalae_count",
      confidence: "kalae_conf",
      label: "กาแล",
      en: "Galae",
      color: "#b74832",
    },
    {
      key: "kom",
      count: "kom_count",
      confidence: "kom_conf",
      label: "โคม",
      en: "Lantern",
      color: "#d49725",
    },
    {
      key: "text",
      count: "text_lanna_count",
      confidence: "text_lanna_conf",
      label: "อักษรล้านนา",
      en: "Lanna script",
      color: "#237b70",
    },
  ],
  pointId: "idx",
  road: "name",
  coordinates: { longitude: "POINT_X", latitude: "POINT_Y" },
};

/* Vertical numeric legend for the Kernel Density map. */
(() => {
  if (new URLSearchParams(location.search).get("view") !== "analysis") return;
  const maxima = {
      kernelAll: 322.43533325195,
      kernelKalae: 148.4397277832,
      kernelKom: 185.94612121582,
      kernelText: 30.73192024231,
    },
    names = {
      kernelAll: "รวมทั้งหมด",
      kernelKalae: "กาแล",
      kernelKom: "โคม",
      kernelText: "อักษรล้านนา",
    },
    colors = [
      "#40cdbe",
      "#6bcfa3",
      "#95d089",
      "#c0d26e",
      "#ead253",
      "#ffc749",
      "#ffae53",
      "#ff955b",
      "#ff7c62",
      "#ff6369",
    ],
    render = (key) => {
      const max = maxima[key],
        rows = colors
          .map((color, i) => {
            const low = i ? (i * max) / 10 : 0.001,
              high = ((i + 1) * max) / 10;
            return `<span class="kernel-caption-row"><i style="background:${color}"></i>${low.toFixed(3)} - ${high.toFixed(3)}</span>`;
          })
          .join("");
      document.querySelector("#caption").innerHTML =
        `<div class="kernel-caption-title">Kernel Density: ${names[key]}</div><div class="kernel-caption-label">VALUE</div>${rows}`;
    },
    attach = () => {
      const first = document.querySelector("#kernelAll");
      if (!first) {
        setTimeout(attach, 60);
        return;
      }
      document.head.insertAdjacentHTML(
        "beforeend",
        "<style>.map-caption{font-size:.76rem!important;line-height:1.28}.kernel-caption-title{font-weight:700;margin-bottom:3px}.kernel-caption-label{margin-bottom:3px;color:#237b70;font:700 .65rem Arial,sans-serif;letter-spacing:.08em}.kernel-caption-row{display:flex;align-items:center;gap:7px;white-space:nowrap}.kernel-caption-row i{width:16px;height:13px;flex:0 0 16px;border:1px solid #0000000d}</style>",
      );
      Object.keys(maxima).forEach((key) =>
        document
          .querySelector("#" + key)
          .addEventListener("change", (event) => {
            if (event.target.checked) render(key);
          }),
      );
      render(
        document.querySelector('[id^="kernel"]:checked')?.id || "kernelAll",
      );
    };
  attach();
})();
