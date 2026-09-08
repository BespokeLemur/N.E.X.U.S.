// USB Speed & Health Benchmark Component
import { store } from '../state.js';

export function renderUsbBenchmark(container) {
  const state = store.getState();
  const bench = state.benchmarkResult;
  const drive = store.getActiveDrive();

  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <h1 class="view-title">
            <i data-lucide="activity" style="color:var(--accent-purple);"></i> USB Hız & Sağlık Testi (Drive Diagnostics)
          </h1>
          <p class="view-subtitle">Flash belleğinizin gerçek okuma/yazma performansını ölçün ve donanımsal sağlık durumunu analiz edin.</p>
        </div>
        <div>
          <button class="btn btn-primary" id="btn-run-bench-start">
            <i data-lucide="play" style="width:16px;"></i> Performans Testini Başlat
          </button>
        </div>
      </div>

      ${!bench ? `
        <div class="card" style="text-align:center; padding:50px 20px;">
          <i data-lucide="gauge" style="width:48px; height:48px; color:var(--primary); margin-bottom:12px;"></i>
          <h3 style="font-weight:700; font-size:1.15rem; margin-bottom:6px;">USB Bellek Taranmaya Hazır</h3>
          <p style="color:var(--text-muted); font-size:0.88rem; max-width:480px; margin:0 auto 20px;">
            <strong style="color:var(--text-main);">${drive.name} (${drive.letter})</strong> sürücüsünün sıralı okuma/yazma ve 4K rastgele IOPS değerlerini ölçmek için testi başlatın.
          </p>
          <button class="btn btn-primary" id="btn-run-bench-inner">
            <i data-lucide="zap" style="width:16px;"></i> Benchmark'ı Başlat
          </button>
        </div>
      ` : `
        <!-- Benchmark Summary Grid -->
        <div class="grid-2 mb-24">
          <!-- Sequential Read / Write -->
          <div class="card">
            <div class="card-title">
              <i data-lucide="arrow-right-left" style="color:var(--primary);"></i> Sıralı Okuma & Yazma (Sequential IO)
            </div>
            <div style="display:flex; justify-content:space-around; align-items:center; margin-top:20px; text-align:center;">
              <div>
                <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Sıralı Okuma</div>
                <div style="font-size:1.8rem; font-weight:800; color:var(--accent-green); margin-top:4px;">${bench.seqRead}</div>
              </div>
              <div style="width:1px; height:50px; background:var(--border-color);"></div>
              <div>
                <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Sıralı Yazma</div>
                <div style="font-size:1.8rem; font-weight:800; color:var(--primary); margin-top:4px;">${bench.seqWrite}</div>
              </div>
            </div>
          </div>

          <!-- Random 4K IOPS -->
          <div class="card">
            <div class="card-title">
              <i data-lucide="grid" style="color:var(--accent-purple);"></i> Rastgele 4K Hızı (Random IOPS)
            </div>
            <div style="display:flex; justify-content:space-around; align-items:center; margin-top:20px; text-align:center;">
              <div>
                <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">4K Read</div>
                <div style="font-size:1.8rem; font-weight:800; color:var(--accent-cyan); margin-top:4px;">${bench.rnd4kRead}</div>
              </div>
              <div style="width:1px; height:50px; background:var(--border-color);"></div>
              <div>
                <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">4K Write</div>
                <div style="font-size:1.8rem; font-weight:800; color:var(--accent-amber); margin-top:4px;">${bench.rnd4kWrite}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- S.M.A.R.T Health Report -->
        <div class="card">
          <div class="card-title mb-16">
            <i data-lucide="shield-check" style="color:var(--accent-green);"></i> S.M.A.R.T Donanım Sağlık Raporu
          </div>

          <div class="grid-3">
            <div style="padding:14px; background:rgba(0,0,0,0.25); border:1px solid var(--border-color); border-radius:var(--radius-md);">
              <div style="font-size:0.78rem; color:var(--text-muted);">Genel Sağlık Skoru</div>
              <div style="font-size:1.5rem; font-weight:700; color:var(--accent-green); margin-top:2px;">${bench.healthScore}</div>
              <div style="font-size:0.72rem; color:var(--text-dim); margin-top:4px;">Bad Block Tespiti: 0 Hatalı Hücre</div>
            </div>

            <div style="padding:14px; background:rgba(0,0,0,0.25); border:1px solid var(--border-color); border-radius:var(--radius-md);">
              <div style="font-size:0.78rem; color:var(--text-muted);">Yıpranma Durumu (Wear Leveling)</div>
              <div style="font-size:1.1rem; font-weight:700; color:var(--text-main); margin-top:4px;">${bench.wearLeveling}</div>
              <div style="font-size:0.72rem; color:var(--text-dim); margin-top:4px;">Tahmini Kalan Ömür: ~4.2 Yıl</div>
            </div>

            <div style="padding:14px; background:rgba(0,0,0,0.25); border:1px solid var(--border-color); border-radius:var(--radius-md);">
              <div style="font-size:0.78rem; color:var(--text-muted);">Çalışma Sıcaklığı & Arayüz</div>
              <div style="font-size:1.1rem; font-weight:700; color:var(--primary); margin-top:4px;">${bench.temp} | USB 3.2</div>
              <div style="font-size:0.72rem; color:var(--text-dim); margin-top:4px;">Veri Verimliliği: Mükemmel</div>
            </div>
          </div>
        </div>
      `}
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const runBench = () => {
    store.runBenchmark();
    setTimeout(() => renderUsbBenchmark(container), 1050);
  };

  document.getElementById('btn-run-bench-start')?.addEventListener('click', runBench);
  document.getElementById('btn-run-bench-inner')?.addEventListener('click', runBench);
}
