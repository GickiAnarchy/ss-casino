/* global Player */
(function installLocalSaveManager() {
  const FILE_FORMAT = 'ss-casino-local-save';
  const FILE_SCHEMA_VERSION = 1;
  const HANDLE_DB_NAME = 'ss-casino-local-save-files';
  const HANDLE_STORE_NAME = 'handles';
  const HANDLE_KEY = 'primary-save-file';
  const DEFAULT_SETTINGS = Object.freeze({ volume: 80, isMuted: false, theme: 'vegas' });
  const THEMES = new Set(['vegas', 'midnight', 'gold']);

  class LocalSaveManager {
    constructor({ hub, jackpot, bank, xp, dailyWheel, settings }) {
      this.hub = hub;
      this.jackpot = jackpot;
      this.bank = bank;
      this.xp = xp;
      this.dailyWheel = dailyWheel;
      this.settings = settings;
      this.fileHandle = null;
      this.fileWriteQueue = Promise.resolve();
      this.openButton = document.getElementById('btn-open-local-save');
      this.modal = document.getElementById('modal-local-save');
      this.closeButton = document.getElementById('btn-close-local-save');
      this.linkButton = document.getElementById('btn-link-save-file');
      this.exportButton = document.getElementById('btn-export-save');
      this.importButton = document.getElementById('btn-import-save');
      this.recoverButton = document.getElementById('btn-recover-legacy-save');
      this.importInput = document.getElementById('local-save-import-input');
      this.status = document.getElementById('local-save-status');
      this.startupOverlay = document.getElementById('startup-overlay');
      this.splashModal = document.getElementById('splash-modal');
      this.bindEvents();
    }

    bindEvents() {
      this.openButton?.addEventListener('click', () => this.openModal());
      this.closeButton?.addEventListener('click', () => this.closeModal());
      this.modal?.addEventListener('click', (event) => {
        if (event.target === this.modal) this.closeModal();
      });
      this.linkButton?.addEventListener('click', () => this.linkFile());
      this.exportButton?.addEventListener('click', () => this.downloadBackup());
      this.importButton?.addEventListener('click', () => this.importInput?.click());
      this.recoverButton?.addEventListener('click', () => this.recoverLegacyProfile());
      this.importInput?.addEventListener('change', (event) => this.importSelectedFile(event));
    }

    async initialize() {
      this.splashModal.classList.replace('active-view', 'hidden-view');
      this.splashModal.getAnimations().forEach(animation => {
        if (animation.name === 'splash') {
          animation.onfinish = () => this.splashModal.remove(); 
          animation.play();
        }
      });


      this.setStatus('Saved automatically in this browser. Choose a JSON file to enable direct file auto-save where supported.', 'local');
      try {
        this.fileHandle = await this.readStoredHandle();
        if (this.fileHandle) {
          const permission = await this.fileHandle.queryPermission({ mode: 'readwrite' });
          if (permission === 'granted') {
            const file = await this.fileHandle.getFile();
            if (file.size > 0) {
              const saved = this.parseSave(await file.text());
              this.applySave(saved);
            } else {
              await this.writeToLinkedFile();
            }
            this.setStatus(`Saved in this browser and linked file: ${this.fileHandle.name}`, 'linked');
          } else {
            this.setStatus('Your browser save is active. Reconnect the linked file from this dialog to resume file auto-save.', 'warning');
          }
        }
      } catch (error) {
        this.fileHandle = null;
        this.setStatus('Your browser save is active. The linked file could not be read; choose it again or use a backup file.', 'warning');
      } finally {
        this.refreshLegacyRecoveryOption();
        this.startupOverlay?.classList.add('hidden-view');
      }
    }

    openModal() {
      this.modal?.classList.replace('hidden-view', 'active-view');
    }

    closeModal() {
      this.modal?.classList.replace('active-view', 'hidden-view');
    }

    setStatus(message, state = 'local') {
      if (!this.status) return;
      this.status.textContent = message;
      this.status.dataset.state = state;
    }

    createSave() {
      return {
        format: FILE_FORMAT,
        schemaVersion: FILE_SCHEMA_VERSION,
        updatedAt: new Date().toISOString(),
        player: this.hub.player.toProfile(),
        settings: this.normalizeSettings(this.settings.getSettings()),
        jackpot: Player.numberOr(this.jackpot.currentJackpot, 10000, 0)
      };
    }

    parseSave(text) {
      const data = JSON.parse(text);
      if (!data || data.format !== FILE_FORMAT || data.schemaVersion !== FILE_SCHEMA_VERSION) {
        throw new Error('This is not a supported S&S Casino Hub save file.');
      }
      const player = Player.fromProfile(data.player || {}).toProfile();
      const jackpot = Player.numberOr(data.jackpot, NaN, 0);
      if (!Number.isFinite(jackpot)) throw new Error('The save file has an invalid jackpot value.');
      return {
        format: FILE_FORMAT,
        schemaVersion: FILE_SCHEMA_VERSION,
        updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : new Date().toISOString(),
        player,
        settings: this.normalizeSettings(data.settings),
        jackpot
      };
    }

    normalizeSettings(value) {
      const input = value && typeof value === 'object' ? value : {};
      const volume = Math.round(Player.numberOr(input.volume, DEFAULT_SETTINGS.volume, 0));
      return {
        volume: Math.min(100, volume),
        isMuted: input.isMuted === true,
        theme: THEMES.has(input.theme) ? input.theme : DEFAULT_SETTINGS.theme
      };
    }

    readLegacyProfiles() {
      const archived = window.LocalProfiles?.getCurrentSave().legacyProfiles || [];
      return archived.map(profile => ({
        updatedAtMs: Player.numberOr(profile.updatedAtMs, 0, 0),
        player: Player.fromProfile(profile.player).toProfile(),
        settings: this.normalizeSettings(profile.settings)
      })).sort((a, b) => b.updatedAtMs - a.updatedAtMs);
    }

    refreshLegacyRecoveryOption() {
      const profiles = this.readLegacyProfiles();
      if (!profiles.length) {
        this.recoverButton?.classList.add('hidden-view');
        return;
      }
      this.recoverButton?.classList.remove('hidden-view');
      if (!this.fileHandle) {
        const count = profiles.length;
        this.setStatus(`${count} older local profile ${count === 1 ? 'save is' : 'saves are'} available to recover.`, 'local');
      }
    }

    recoverLegacyProfile() {
      const profiles = this.readLegacyProfiles();
      if (!profiles.length) {
        this.refreshLegacyRecoveryOption();
        return;
      }
      const newest = profiles[0];
      const savedAt = newest.updatedAtMs ? new Date(newest.updatedAtMs).toLocaleString() : 'an unknown date';
      const countNote = profiles.length > 1 ? ` There are ${profiles.length} cached profiles; this selects the most recently saved one.` : '';
      if (!confirm(`Replace this browser's current casino save with the older local profile saved ${savedAt}?${countNote} The old cache will remain on this device.`)) return;
      this.applySave({
        format: FILE_FORMAT,
        schemaVersion: FILE_SCHEMA_VERSION,
        updatedAt: new Date().toISOString(),
        player: newest.player,
        settings: newest.settings,
        jackpot: Player.numberOr(this.jackpot.currentJackpot, 10000, 0)
      });
      this.recoverButton?.classList.add('hidden-view');
      if (this.fileHandle) this.queueFileSave();
    }

    applySave(save) {
      this.hub.player = Player.fromProfile(save.player, window.LocalProfiles?.activeProfile?.name || 'Player');
      this.settings.applySettings(save.settings);
      this.jackpot.setJackpot(save.jackpot);
      window.LocalProfiles?.saveCurrent({
        player: this.hub.player.toProfile(),
        settings: save.settings
      });
      this.hub.updateGlobalUI();
      this.bank.updateModalUI();
      this.xp.updateUI();
      this.dailyWheel.updateUI();
      this.setStatus('Local save loaded. Your browser data has been updated.', 'local');
    }

    async linkFile() {
      if (typeof window.showSaveFilePicker !== 'function') {
        this.setStatus('Direct file auto-save is not supported in this browser. Use Download save backup and Import save file instead.', 'warning');
        return;
      }
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: 'ss-casino-save.json',
          types: [{ description: 'S&S Casino Hub save file', accept: { 'application/json': ['.json'] } }]
        });
        const file = await handle.getFile();
        let existingSave = null;
        if (file.size > 0) {
          try {
            existingSave = this.parseSave(await file.text());
          } catch (error) {
            alert('That file is not a valid S&S Casino Hub save. Choose a different file or import a valid JSON backup.');
            return;
          }
          if (!confirm('This file already contains a casino save. Replace the current browser save with the file contents? Choose Cancel to keep the current save and leave the file unchanged.')) {
            return;
          }
        }

        this.fileHandle = handle;
        await this.storeHandle(handle);
        if (existingSave) this.applySave(existingSave);
        else await this.writeToLinkedFile();
        this.setStatus(`Saved in this browser and linked file: ${handle.name}`, 'linked');
      } catch (error) {
        if (error?.name !== 'AbortError') {
          this.setStatus('Could not link that file. Browser-local saving is still active; use Download save backup instead.', 'warning');
        }
      }
    }

    queueFileSave() {
      if (!this.fileHandle) return;
      const fileHandle = this.fileHandle;
      const saveText = JSON.stringify(this.createSave(), null, 2);
      this.fileWriteQueue = this.fileWriteQueue
        .then(async () => {
          const writable = await fileHandle.createWritable();
          await writable.write(saveText);
          await writable.close();
          this.setStatus(`Saved in this browser and linked file: ${fileHandle.name}`, 'linked');
        })
        .catch(() => {
          this.setStatus('Saved in this browser, but the linked file could not be updated. Reconnect it or download a backup.', 'warning');
        });
    }

    async writeToLinkedFile() {
      if (!this.fileHandle) return;
      const writable = await this.fileHandle.createWritable();
      await writable.write(JSON.stringify(this.createSave(), null, 2));
      await writable.close();
    }

    async switchProfile() {
      await this.fileWriteQueue.catch(() => {});
      this.fileHandle = null;
      this.setStatus('Encrypted profile save is active in this browser. Choose a save file to link this profile.', 'local');
    }

    downloadBackup() {
      const blob = new Blob([JSON.stringify(this.createSave(), null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ss-casino-save-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      this.setStatus('Save backup downloaded to your device.', this.fileHandle ? 'linked' : 'local');
    }

    async importSelectedFile(event) {
      const file = event.target.files?.[0];
      if (!file) return;
      try {
        const save = this.parseSave(await file.text());
        if (!confirm('Importing this file replaces the casino save currently stored in this browser. Continue?')) return;
        this.applySave(save);
        if (this.fileHandle) this.queueFileSave();
      } catch (error) {
        alert(error instanceof SyntaxError ? 'The selected file is not valid JSON.' : (error.message || 'Could not import this save file.'));
      } finally {
        event.target.value = '';
      }
    }

    openHandleDatabase() {
      if (!window.indexedDB) return Promise.resolve(null);
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(HANDLE_DB_NAME, 1);
        request.onupgradeneeded = () => {
          if (!request.result.objectStoreNames.contains(HANDLE_STORE_NAME)) {
            request.result.createObjectStore(HANDLE_STORE_NAME);
          }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }

    async readStoredHandle() {
      const db = await this.openHandleDatabase();
      if (!db) return null;
      return new Promise((resolve, reject) => {
        const request = db.transaction(HANDLE_STORE_NAME, 'readonly').objectStore(HANDLE_STORE_NAME).get(this.getHandleKey());
        request.onsuccess = () => { db.close(); resolve(request.result || null); };
        request.onerror = () => { db.close(); reject(request.error); };
      });
    }

    async storeHandle(handle) {
      const db = await this.openHandleDatabase();
      if (!db) return;
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(HANDLE_STORE_NAME, 'readwrite');
        transaction.objectStore(HANDLE_STORE_NAME).put(handle, this.getHandleKey());
        transaction.oncomplete = () => { db.close(); resolve(); };
        transaction.onerror = () => { db.close(); reject(transaction.error); };
      });
    }

    getHandleKey() {
      const profileId = window.LocalProfiles?.activeProfile?.id;
      return profileId ? `profile-save-file:${profileId}` : HANDLE_KEY;
    }
  }

  window.LocalSaveManager = LocalSaveManager;
})();
