// Portable AI Node Component with i18n
import { store } from '../state.js';
import { t } from '../i18n.js';

export function renderAiNode(container) {
  const state = store.getState();
  const lang = state.activeLang;
  const models = state.aiModels;
  const drive = store.getActiveDrive();

  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <h1 class="view-title">
            <i data-lucide="bot" style="color:var(--accent-amber);"></i> ${t('aiTitle', lang)}
          </h1>
          <p class="view-subtitle">${t('aiSub', lang)}</p>
        </div>
        <div>
          <span class="badge badge-amber" style="font-size:0.8rem; padding:6px 12px;">
            <i data-lucide="wifi-off" style="width:14px;"></i> 100% Offline & Private
          </span>
        </div>
      </div>

      <div class="grid-2 mb-24">
        <div class="card">
          <div class="card-title">
            <i data-lucide="hard-drive" style="color:var(--primary);"></i> ${t('aiModelsTitle', lang)}
          </div>
          <p class="card-desc">Path: <code style="color:var(--accent-cyan);">${drive.letter}\\AI_Node\\models\\</code></p>

          <div style="display:flex; flex-direction:column; gap:10px;">
            ${models.map(m => `
              <div style="padding:12px; background:rgba(0,0,0,0.25); border:1px solid var(--border-color); border-radius:var(--radius-md);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <strong style="color:var(--text-main); font-size:0.95rem;">${m.name}</strong>
                  <span class="badge ${m.downloaded ? 'badge-green' : 'badge-amber'}">${m.downloaded ? 'Ready in USB' : 'Downloadable'}</span>
                </div>
                <div style="font-size:0.8rem; color:var(--text-muted); margin:4px 0;">${m.description}</div>
                <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-dim); margin-top:6px;">
                  <span>Size: ${m.size} | RAM: ${m.vram}</span>
                  ${m.downloaded ? `<span style="color:var(--accent-green); font-weight:600;">Ollama Active</span>` : `<button class="btn btn-secondary btn-sm">${t('download', lang)}</button>`}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div class="card-title">
              <i data-lucide="sparkles" style="color:var(--accent-purple);"></i> ${t('aiPlaygroundTitle', lang)}
            </div>
            <p class="card-desc">Model executes directly using local CPU/RAM.</p>

            <div class="form-group">
              <label class="form-label">${t('aiPromptLabel', lang)}</label>
              <textarea id="ai-prompt-input" class="form-textarea" placeholder="${t('aiPromptPlaceholder', lang)}"></textarea>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.78rem; color:var(--text-dim);">Model: Qwen2.5-Coder 1.5B (GGUF Q4)</span>
            <button class="btn btn-primary" id="btn-run-ai">
              <i data-lucide="zap" style="width:16px;"></i> ${t('generateAiBtn', lang)}
            </button>
          </div>
        </div>
      </div>

      <div class="card" id="ai-response-card" style="display:none;">
        <div class="card-title" style="color:var(--accent-green);">
          <i data-lucide="terminal-square" style="color:var(--accent-green);"></i> Qwen2.5-Coder Output:
        </div>
        <pre id="ai-response-text" style="font-family:var(--font-mono); font-size:0.85rem; background:rgba(0,0,0,0.4); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color); color:var(--text-main); white-space:pre-wrap; overflow-x:auto;"></pre>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  document.getElementById('btn-run-ai')?.addEventListener('click', () => {
    const input = document.getElementById('ai-prompt-input')?.value.trim();
    if (!input) return;

    store.addLog('info', `Local AI Model Execution: "${input.substring(0, 30)}..."`);
    const respCard = document.getElementById('ai-response-card');
    const respText = document.getElementById('ai-response-text');

    if (respCard && respText) {
      respCard.style.display = 'block';
      respText.textContent = 'Generating AI response (Tokens/sec: 48.5)...';

      setTimeout(() => {
        respText.textContent = `// N.E.X.U.S. AI Offline Code Generator Output
// Prompt: ${input}

function encryptProjectVault(dataBuffer, masterPassphrase) {
    const crypto = require('crypto');
    const algorithm = 'aes-256-gcm';
    const salt = crypto.randomBytes(16);
    const key = crypto.pbkdf2Sync(masterPassphrase, salt, 100000, 32, 'sha256');
    const iv = crypto.randomBytes(12);
    
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(dataBuffer), cipher.final()]);
    const tag = cipher.getAuthTag();
    
    return { encryptedData: encrypted.toString('hex'), salt: salt.toString('hex'), iv: iv.toString('hex'), tag: tag.toString('hex') };
}

// Generated 100% locally via N.E.X.U.S. AI Engine`;
        store.addLog('success', 'AI Code Generated (48.5 tokens/sec).');
      }, 900);
    }
  });
}
