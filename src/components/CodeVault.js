// Code Vault Component with Real Web Crypto API (AES-256-GCM + PBKDF2)
import { store } from '../state.js';
import { t } from '../i18n.js';

// PBKDF2 Key Derivation
async function deriveAesKey(passphrase, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );
  return await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

// Real AES-256-GCM File & Data Encryptor
async function encryptData(arrayBuffer, passphrase) {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveAesKey(passphrase, salt);

  const encryptedContent = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    arrayBuffer
  );

  const result = new Uint8Array(salt.byteLength + iv.byteLength + encryptedContent.byteLength);
  result.set(salt, 0);
  result.set(iv, salt.byteLength);
  result.set(new Uint8Array(encryptedContent), salt.byteLength + iv.byteLength);

  return result;
}

// Real AES-256-GCM Decryptor
async function decryptData(packedBuffer, passphrase) {
  const packed = new Uint8Array(packedBuffer);
  const salt = packed.slice(0, 16);
  const iv = packed.slice(16, 28);
  const ciphertext = packed.slice(28);

  const key = await deriveAesKey(passphrase, salt);
  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    ciphertext
  );

  return decrypted;
}

export function renderCodeVault(container) {
  const state = store.getState();
  const lang = state.activeLang || 'tr';
  const vaults = state.vaultProjects || [];

  container.innerHTML = `
    <div class="view-container">
      <div class="view-header">
        <div>
          <h1 class="view-title">
            <i data-lucide="shield-lock" style="color:var(--accent-amber);"></i> ${t('vaultTitle', lang)} (Gerçek AES-256)
          </h1>
          <p class="view-subtitle">Projelerinizi, kodlarınızı veya dosyalarınızı tarayıcıda askeri düzeyde şifreleyin.</p>
        </div>
      </div>

      <div class="grid-2 mb-24">
        <!-- Card 1: Encrypt Form -->
        <div class="card">
          <div class="card-title mb-12">
            <i data-lucide="lock" style="color:var(--accent-amber);"></i> Yeni Dosya / Kod Şifrele
          </div>
          <p class="card-desc">AES-256-GCM + PBKDF2 (100.000 İterasyon) ile %100 yerel ve çevrimdışı şifreleme.</p>

          <div class="form-group">
            <label class="form-label">Kasa / Proje Adı</label>
            <input type="text" id="vault-proj-name" class="form-input" placeholder="Örn: gizli_projelerim veya backend_kodlari" />
          </div>

          <div class="form-group">
            <label class="form-label">Ana Şifre (Master Passphrase)</label>
            <input type="password" id="vault-passphrase" class="form-input" placeholder="••••••••••••••••" />
          </div>

          <div class="form-group">
            <label class="form-label">Şifrelenecek Dosyayı Seçin</label>
            <input type="file" id="vault-file-input" class="form-input" style="padding:6px;" />
          </div>

          <div class="form-group">
            <label class="form-label">Veya Şifrelenecek Kod / Metni Yapıştırın</label>
            <textarea id="vault-code-text" class="form-input" rows="3" style="font-family:var(--font-mono); font-size:0.8rem;" placeholder="Şifrelenecek özel kod, API key veya notlarınızı buraya yazabilirsiniz..."></textarea>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px;">
            <div style="font-size:0.75rem; color:var(--accent-green); display:flex; align-items:center; gap:4px;">
              <i data-lucide="shield-check" style="width:14px;"></i> WebCrypto AES-256-GCM
            </div>
            <button class="btn btn-success" id="btn-encrypt-action">
              <i data-lucide="lock" style="width:16px;"></i> Şifrele & Dosyayı İndir
            </button>
          </div>
        </div>

        <!-- Card 2: Decrypt & Import Existing Vault File -->
        <div class="card" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div class="card-title mb-12">
              <i data-lucide="key-round" style="color:var(--accent-cyan);"></i> Harici `.aes` Şifreli Dosya Çöz
            </div>
            <p class="card-desc">USB'nizdeki veya bilgisayarınızdaki önceden şifrelenmiş `.aes` dosyasının şifresini çözün.</p>

            <div class="form-group mb-12">
              <label class="form-label">Şifreli `.aes` veya `.nexus` Dosyasını Seçin</label>
              <input type="file" id="decrypt-file-input" class="form-input" style="padding:6px;" accept=".aes,.nexus,*.*" />
            </div>

            <div class="form-group mb-16">
              <label class="form-label">Açma Şifresi (Passphrase)</label>
              <input type="password" id="decrypt-passphrase" class="form-input" placeholder="••••••••••••••••" />
            </div>

            <button class="btn btn-primary btn-block" id="btn-decrypt-file-action">
              <i data-lucide="unlock" style="width:16px;"></i> Şifreyi Çöz & Orijinal Dosyayı Al
            </button>
          </div>

          <div style="margin-top:20px; padding:12px; background:rgba(0,0,0,0.3); border:1px solid var(--border-color); border-radius:var(--radius-md); font-size:0.75rem; color:var(--text-muted);">
            <i data-lucide="info" style="width:14px; color:var(--primary);"></i>
            Tüm şifreleme ve çözme işlemleri tarayıcınızın içinde yerel olarak gerçekleşir. Şifreleriniz veya dosyalarınız sunucuya asla gönderilmez.
          </div>
        </div>
      </div>

      <!-- Card 3: Encrypted Vault Items List -->
      <div class="card">
        <div class="card-title mb-16">
          <i data-lucide="folder-git-2" style="color:var(--primary);"></i> Şifreli Kasa Listesi (${vaults.length})
        </div>

        <div class="file-tree">
          ${vaults.length === 0 ? `
            <div style="color:var(--text-dim); text-align:center; padding:30px;">
              Henüz şifrelenmiş bir proje yok. Yukarıdaki formdan dosyanızı veya kodunuzu şifreleyebilirsiniz.
            </div>
          ` : vaults.map((v, idx) => `
            <div class="file-item" style="padding:12px 16px;">
              <div class="file-name">
                <i data-lucide="shield-alert" style="color:var(--accent-amber); width:20px; height:20px;"></i>
                <div>
                  <div style="font-weight:700; color:var(--text-main); font-size:0.95rem;">${v.name}</div>
                  <div style="font-size:0.75rem; color:var(--text-muted);">${v.fileName || v.name + '.aes'} • Tarih: ${v.lastBackup}</div>
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:10px;">
                <span class="badge badge-amber">AES-256-GCM Kilitli</span>
                <span class="file-size">${v.size}</span>
                <button class="btn btn-primary btn-sm" data-unlock-index="${idx}">
                  <i data-lucide="key" style="width:12px;"></i> Şifreyi Çöz
                </button>
                <button class="btn btn-danger btn-sm" data-delete-index="${idx}" title="Sil">
                  <i data-lucide="trash-2" style="width:12px;"></i>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Handle Encrypt Action
  document.getElementById('btn-encrypt-action')?.addEventListener('click', async () => {
    const nameInput = document.getElementById('vault-proj-name');
    const passInput = document.getElementById('vault-passphrase');
    const fileInput = document.getElementById('vault-file-input');
    const textInput = document.getElementById('vault-code-text');

    const name = nameInput.value.trim() || 'nexus_vault';
    const pass = passInput.value.trim();
    const file = fileInput.files ? fileInput.files[0] : null;
    const textContent = textInput.value.trim();

    if (!pass) {
      alert('⚠️ Lütfen şifreleme için güçlü bir Ana Şifre (Master Passphrase) girin.');
      return;
    }

    if (!file && !textContent) {
      alert('⚠️ Lütfen şifrelenecek bir dosya seçin veya metin/kod kutusuna bir şeyler yazın.');
      return;
    }

    try {
      let dataBuffer;
      let originalFileName = name;

      if (file) {
        dataBuffer = await file.arrayBuffer();
        originalFileName = file.name;
      } else {
        const enc = new TextEncoder();
        dataBuffer = enc.encode(textContent).buffer;
        originalFileName = name + '.txt';
      }

      // Execute Real AES-256-GCM Encryption
      const encryptedBytes = await encryptData(dataBuffer, pass);

      // Download the Encrypted .aes file to user's machine/USB
      const blob = new Blob([encryptedBytes], { type: 'application/octet-stream' });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${name}.nexus.aes`;
      a.click();
      URL.revokeObjectURL(downloadUrl);

      // Format size
      let sizeStr = (encryptedBytes.byteLength / 1024).toFixed(1) + ' KB';
      if (encryptedBytes.byteLength > 1024 * 1024) {
        sizeStr = (encryptedBytes.byteLength / (1024 * 1024)).toFixed(1) + ' MB';
      }

      // Save item to state
      state.vaultProjects.unshift({
        id: 'vault_' + Date.now(),
        name: name,
        fileName: originalFileName,
        size: sizeStr,
        lastBackup: new Date().toLocaleString('tr-TR'),
        status: 'AES-256 Kilitli',
        encryptedBytesBase64: null,
        rawBuffer: encryptedBytes
      });

      nameInput.value = '';
      passInput.value = '';
      textInput.value = '';
      if (fileInput) fileInput.value = '';

      store.addLog('success', `🔒 GERÇEK AES-256 ŞİFRELEME BAŞARILI: "${name}.nexus.aes" indirildi.`);
      alert(`🎉 BAŞARILI!\n"${name}.nexus.aes" dosyası şifrelendi ve indirildi.\n\nBu şifreli dosyayı USB belleğinize kopyalayabilirsiniz. Şifrenizi unutmayın!`);
      renderCodeVault(container);
    } catch (err) {
      alert('❌ Şifreleme sırasında bir hata oluştu: ' + err.message);
    }
  });

  // Handle Decrypt File Action (from File Upload)
  document.getElementById('btn-decrypt-file-action')?.addEventListener('click', async () => {
    const fileInput = document.getElementById('decrypt-file-input');
    const passInput = document.getElementById('decrypt-passphrase');
    const file = fileInput.files ? fileInput.files[0] : null;
    const pass = passInput.value.trim();

    if (!file) {
      alert('⚠️ Lütfen şifresi çözülecek `.aes` veya `.nexus` uzantılı dosyayı seçin.');
      return;
    }
    if (!pass) {
      alert('⚠️ Lütfen dosyanın açma şifresini girin.');
      return;
    }

    try {
      const packedBuffer = await file.arrayBuffer();
      const decryptedBuffer = await decryptData(packedBuffer, pass);

      // Download Decrypted Unencrypted Original File
      let outName = file.name.replace('.nexus', '').replace('.aes', '');
      if (!outName.includes('.')) outName += '_cozuldu.txt';

      const blob = new Blob([decryptedBuffer], { type: 'application/octet-stream' });
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = outName;
      a.click();
      URL.revokeObjectURL(downloadUrl);

      store.addLog('success', `🔑 ŞİFRE BAŞARIYLA ÇÖZÜLDÜ: "${outName}" orijinal haliyle indirildi.`);
      alert(`🎉 ŞİFRE ÇÖZÜLDÜ!\n"${outName}" dosyası orijinal haliyle bilgisayarınıza indirildi.`);
      passInput.value = '';
      fileInput.value = '';
    } catch (err) {
      alert('❌ YANLIŞ ŞİFRE VEYA GEÇERSİZ DOSYA!\nAES-256 şifresi çözülemedi. Lütfen şifrenizi kontrol edin.');
    }
  });

  // Handle Unlocking items from list
  container.querySelectorAll('[data-unlock-index]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const idx = parseInt(btn.getAttribute('data-unlock-index'), 10);
      const item = state.vaultProjects[idx];
      if (!item) return;

      const pass = prompt(`"${item.name}" kasasını açmak için Master Şifrenizi girin:`);
      if (!pass) return;

      if (item.rawBuffer) {
        try {
          const decryptedBuffer = await decryptData(item.rawBuffer, pass);
          const blob = new Blob([decryptedBuffer], { type: 'application/octet-stream' });
          const downloadUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = item.fileName || item.name;
          a.click();
          URL.revokeObjectURL(downloadUrl);

          store.addLog('success', `🔑 Kasa Çözüldü: ${item.name}`);
          alert(`🎉 Kasa Şifresi Doğrulandı!\n"${item.fileName || item.name}" dosyası indirildi.`);
        } catch (err) {
          alert('❌ YANLIŞ ŞİFRE! Kasa şifresi çözülemedi.');
        }
      } else {
        alert('⚠️ Bu öge cihaz oturumunda önbellekte saklanmıyor. Lütfen harici `.aes` dosyasını sağ taraftan yükleyin.');
      }
    });
  });

  // Handle Deleting items from list
  container.querySelectorAll('[data-delete-index]').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-delete-index'), 10);
      state.vaultProjects.splice(idx, 1);
      renderCodeVault(container);
    });
  });
}
