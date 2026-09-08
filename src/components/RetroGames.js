// Retro Terminal Games & Break Lounge Component
import { store } from '../state.js';

export function renderRetroGames(container) {
  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <h1 class="view-title">
            <i data-lucide="gamepad-2" style="color:var(--accent-amber);"></i> Dev Terminal Break Lounge
          </h1>
          <p class="view-subtitle">Devasa ISO indirmeleri, derleme veya güvenlik taramaları yapılırken oynanabilecek retro terminal oyunları.</p>
        </div>
        <div>
          <span class="badge badge-amber" style="font-size:0.8rem;">
            <i data-lucide="trophy" style="width:12px;"></i> High Score: 1450
          </span>
        </div>
      </div>

      <div class="grid-3">
        <!-- Cyber Snake -->
        <div class="card">
          <div class="card-title">
            <i data-lucide="play-square" style="color:var(--accent-green);"></i> Cyber Snake 2026
          </div>
          <p class="card-desc">Klasik yılan oyunu. Yön tuşlarıyla matristeki verileri toplayarak skor kazanın.</p>
          <button class="btn btn-success btn-block" id="btn-play-snake">
            <i data-lucide="play" style="width:14px;"></i> Snake Başlat
          </button>
        </div>

        <!-- Space Invaders -->
        <div class="card">
          <div class="card-title">
            <i data-lucide="rocket" style="color:var(--primary);"></i> Space Terminal Invaders
          </div>
          <p class="card-desc">Gelen bug dalgalarını terminal lazerleriyle imha edin.</p>
          <button class="btn btn-primary btn-block" id="btn-play-invaders">
            <i data-lucide="play" style="width:14px;"></i> Invaders Başlat
          </button>
        </div>

        <!-- Cyber Tetris -->
        <div class="card">
          <div class="card-title">
            <i data-lucide="box" style="color:var(--accent-purple);"></i> Terminal Tetris
          </div>
          <p class="card-desc">ASCII karakterli blokları yerleştirerek satırları temizleyin.</p>
          <button class="btn btn-secondary btn-block" id="btn-play-tetris">
            <i data-lucide="play" style="width:14px;"></i> Tetris Başlat
          </button>
        </div>
      </div>

      <!-- Active Game Canvas / Screen -->
      <div class="card mt-24" id="game-canvas-card" style="display:none; text-align:center;">
        <div class="card-title" id="game-title" style="color:var(--accent-amber);">Oyun Başlatıldı</div>
        <div id="game-canvas-screen" style="font-family:var(--font-mono); font-size:1.1rem; line-height:1.2; background:#000; padding:20px; border-radius:var(--radius-md); border:1px solid var(--accent-amber); color:var(--accent-green); min-height:200px; display:flex; align-items:center; justify-content:center; white-space:pre;">
          <!-- Active Game Screen Content -->
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  const showGameScreen = (name, asciiArt) => {
    const card = document.getElementById('game-canvas-card');
    const title = document.getElementById('game-title');
    const screen = document.getElementById('game-canvas-screen');

    if (card && title && screen) {
      card.style.display = 'block';
      title.textContent = `🕹️ Oynanıyor: ${name}`;
      screen.textContent = asciiArt;
      store.addLog('info', `Mola Oyunu Başlatıldı: ${name}`);
    }
  };

  document.getElementById('btn-play-snake')?.addEventListener('click', () => {
    showGameScreen('Cyber Snake', `
=================================
  SCORE: 420  |  HIGH SCORE: 1450
=================================
+-------------------------------+
|                               |
|        o o o o O              |
|                |              |
|                |      *       |
|                v              |
+-------------------------------+
[Yön tuşları ile kontrol edin]
`);
  });

  document.getElementById('btn-play-invaders')?.addEventListener('click', () => {
    showGameScreen('Space Invaders', `
=================================
  BUG INVASION - LEVEL 3
=================================
   <WORM>  <BUG>  <VIRUS>  <WORM>
     |       |       |       |
     .       .       .       .
                     ^
                    /|\\
                [DEV_SHIP]
[Sol / Sağ Ok Tuşları - Boşluk: Ateş]
`);
  });

  document.getElementById('btn-play-tetris')?.addEventListener('click', () => {
    showGameScreen('Terminal Tetris', `
=================================
  TETRIS - SCORE: 890
=================================
  |    [][]    |
  |  [][][]    |
  |  [][][][]  |
  |============|
[Sol/Sağ: Hareket | Yukarı: Döndür]
`);
  });
}
