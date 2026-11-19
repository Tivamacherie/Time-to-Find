window.GameApp = {
  state: {
    currentCase: null,
    timeRemaining: 1800, // 30 minutes in seconds
    timerInterval: null,
    visitedChannels: new Set(),
    completedDeepScans: new Set(),
    clues: [],
    activeChannel: null,
    activeCamIndex: 0,
    activePhoneTab: "calls",
    activeHotspotIndex: 0,
    isMurderCase: false,
    selectedSuspect: null,
    pendingMurderReason: "TIMEOUT",
    pendingWrongSuspectName: ""
  },

  async init() {
    this.bindNavigation();
    await this.checkBackendConnection();
    await this.renderCaseList();
  },

  getActiveChannels() {
    if (this.state.isMurderCase && this.state.currentCase.murderChannels) {
      return this.state.currentCase.murderChannels;
    }
    return this.state.currentCase.channels;
  },

  async checkBackendConnection() {
    const badge = document.getElementById("api-status-badge");
    try {
      await CaseAPI.checkHealth();
      badge.textContent = "API: ONLINE";
      badge.style.color = "var(--accent-green)";
    } catch (err) {
      badge.textContent = "API: OFFLINE";
      badge.style.color = "var(--accent-red)";
    }
  },

  bindNavigation() {
    document.getElementById("btn-start-game").addEventListener("click", () => {
      GameAudio.click();
      this.showScreen("screen-cases");
    });

    document.getElementById("btn-home-nav").addEventListener("click", () => {
      GameAudio.click();
      this.stopTimer();
      this.showScreen("screen-home");
    });

    document.getElementById("btn-crt-toggle").addEventListener("click", (e) => {
      GameAudio.click();
      const enabled = document.body.classList.toggle("crt-enabled");
      e.target.textContent = enabled ? "CRT: ON" : "CRT: OFF";
    });

    document.getElementById("btn-sound-toggle").addEventListener("click", (e) => {
      const on = GameAudio.toggle();
      if (on) GameAudio.click();
      e.target.textContent = on ? "SFX: ON" : "SFX: OFF";
    });

    document.getElementById("btn-back-cases").addEventListener("click", () => {
      GameAudio.click();
      this.stopTimer();
      this.showScreen("screen-cases");
    });

    document.getElementById("btn-begin-investigation").addEventListener("click", () => {
      GameAudio.click();
      this.startInvestigation();
    });

    document.querySelectorAll(".channel-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        const channel = btn.getAttribute("data-channel");
        this.openChannel(channel);
      });
    });

    document.getElementById("btn-go-suspects").addEventListener("click", () => {
      GameAudio.click();
      this.openSuspectSelection();
    });

    document.getElementById("btn-back-investigation").addEventListener("click", () => {
      GameAudio.click();
      this.showScreen("screen-investigation");
    });

    const enterMurderBtn = document.getElementById("btn-enter-murder-case");
    if (enterMurderBtn) {
      enterMurderBtn.addEventListener("click", () => {
        GameAudio.click();
        this.startMurderCase(
          this.state.pendingMurderReason,
          this.state.pendingWrongSuspectName
        );
      });
    }

    document.getElementById("btn-replay-case").addEventListener("click", () => {
      GameAudio.click();
      this.selectCase(this.state.currentCase.id);
    });

    document.getElementById("btn-outcome-cases").addEventListener("click", () => {
      GameAudio.click();
      this.stopTimer();
      this.showScreen("screen-cases");
    });
  },

  showScreen(screenId) {
    document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    document.getElementById(screenId).classList.add("active");

    const homeBtn = document.getElementById("btn-home-nav");
    if (screenId === "screen-home") {
      homeBtn.classList.add("hidden");
    } else {
      homeBtn.classList.remove("hidden");
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  },

  showToast(message) {
    const toast = document.getElementById("toast-notification");
    toast.textContent = message;
    toast.classList.remove("hidden");
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.add("hidden");
    }, 3600);
  },

  async renderCaseList() {
    const container = document.getElementById("case-list");
    container.innerHTML = `<div class="pixel-box" style="padding:18px;grid-column:1/-1;text-align:center;">CONNECTING TO BACKEND SERVER (localhost:3001)...</div>`;

    let cases = [];
    try {
      cases = await CaseAPI.getCases();
    } catch (err) {
      container.innerHTML = `
        <div class="pixel-box" style="padding:22px;grid-column:1/-1;border-color:var(--accent-red);">
          <h3 style="color:var(--accent-red);margin-bottom:8px;">[!] BACKEND SERVER NOT REACHABLE</h3>
          <p style="margin-bottom:10px;">Please start the Node.js backend server first:</p>
          <pre style="background:#070a12;padding:10px;border:1px solid #2d3e5e;color:var(--accent-cyan);">npm run server</pre>
          <button id="btn-retry-api" class="btn-pixel btn-cyan" style="margin-top:12px;">↻ RETRY CONNECTION</button>
        </div>
      `;
      document.getElementById("btn-retry-api").addEventListener("click", async () => {
        GameAudio.click();
        await this.checkBackendConnection();
        await this.renderCaseList();
      });
      return;
    }

    container.innerHTML = "";
    cases.forEach((c) => {
      const card = document.createElement("div");
      card.className = `case-card pixel-box ${c.playable ? "playable" : "locked"}`;
      card.innerHTML = `
        <div>
          <span class="case-status-pill ${c.playable ? "pill-open" : "pill-locked"}">
            ${c.code} // ${c.status}
          </span>
          <h3>${c.title}</h3>
          <p>${c.shortDesc}</p>
        </div>
        <button class="btn-pixel ${c.playable ? "btn-cyan" : ""}" ${c.playable ? "" : "disabled"}>
          ${c.playable ? "LOAD DISK ►" : "DISK LOCKED"}
        </button>
      `;

      if (c.playable) {
        card.querySelector("button").addEventListener("click", () => {
          GameAudio.click();
          this.selectCase(c.id);
        });
      }
      container.appendChild(card);
    });
  },

  async selectCase(caseId) {
    let found;
    try {
      found = await CaseAPI.getCaseById(caseId);
    } catch (err) {
      this.showToast("ERROR: UNABLE TO LOAD CASE FROM SERVER");
      return;
    }

    this.stopTimer();
    this.state.currentCase = found;
    this.state.timeRemaining = 30 * 60; // 30:00 (1800 seconds)
    this.state.visitedChannels = new Set();
    this.state.completedDeepScans = new Set();
    this.state.clues = [];
    this.state.activeChannel = null;
    this.state.activeCamIndex = 0;
    this.state.activePhoneTab = "calls";
    this.state.activeHotspotIndex = 0;
    this.state.isMurderCase = false;
    this.state.selectedSuspect = null;

    const enterMurderBtn = document.getElementById("btn-enter-murder-case");
    if (enterMurderBtn) enterMurderBtn.classList.add("hidden");

    document.getElementById("briefing-title").textContent = `${found.code}: ${found.title}`;
    document.getElementById("briefing-victim-portrait").innerHTML = GameVisuals.getPortraitSVG(found.victim.id);
    document.getElementById("briefing-victim-name").textContent = found.victim.name;
    document.getElementById("briefing-victim-meta").innerHTML = `
      <li><span>AGE:</span><strong>${found.victim.age}</strong></li>
      <li><span>ROLE:</span><strong>${found.victim.occupation}</strong></li>
      <li><span>SEEN:</span><strong>${found.victim.lastSeen}</strong></li>
      <li><span>FILE:</span><strong>${found.victim.reportedBy}</strong></li>
    `;
    document.getElementById("briefing-summary").textContent = found.briefingSummary;

    this.showScreen("screen-briefing");
  },

  resetChannelCardsUI(statusLabel) {
    ["cctv", "phone", "people", "location"].forEach((ch) => {
      const costEl = document.getElementById(`cost-${ch}`);
      const statusEl = document.getElementById(`status-${ch}`);
      costEl.textContent = "-05:00";
      costEl.classList.remove("visited");
      statusEl.textContent = statusLabel;
    });
    document.querySelectorAll(".channel-card").forEach((c) => c.classList.remove("active-channel"));
  },

  startInvestigation() {
    document.getElementById("hud-case-name").textContent =
      `${this.state.currentCase.code}: ${this.state.currentCase.victim.name.toUpperCase()}`;

    document.getElementById("escalation-banner").classList.add("hidden");
    const stageBadge = document.getElementById("hud-case-stage");
    stageBadge.textContent = "PHASE 1 // RESCUE OP";
    stageBadge.className = "stage-badge stage-rescue";

    this.resetChannelCardsUI("> UNEXAMINED");

    document.getElementById("investigation-viewer").innerHTML = `
      <div class="empty-viewer">
        <div class="empty-icon">[ ? ]</div>
        <h3>SELECT AN INVESTIGATION CHANNEL</h3>
        <p>Each new channel consumes <strong>05:00</strong>. Cross-reference CCTV, Phone, People, and Location clues before accusing a suspect.</p>
      </div>
    `;

    this.updateTimerDisplay();
    this.startTimer();
    this.renderClueLog();
    this.showScreen("screen-investigation");
  },

  startTimer() {
    this.stopTimer();
    this.state.timerInterval = setInterval(() => {
      if (this.state.timeRemaining > 0) {
        this.state.timeRemaining -= 1;
        this.updateTimerDisplay();

        if (this.state.timeRemaining === 0) {
          this.handleTimeExpired();
        }
      } else {
        this.stopTimer();
      }
    }, 1000);
  },

  stopTimer() {
    if (this.state.timerInterval) {
      clearInterval(this.state.timerInterval);
      this.state.timerInterval = null;
    }
  },

  consumeTime(minutes, reasonLabel) {
    if (this.state.timeRemaining <= 0) return false;

    this.state.timeRemaining = Math.max(0, this.state.timeRemaining - minutes * 60);
    GameAudio.timeDeduct();
    this.showToast(`TIME -0${minutes}:00 [${reasonLabel}]`);
    this.updateTimerDisplay();

    if (this.state.timeRemaining === 0) {
      this.handleTimeExpired();
      return true;
    }
    return false;
  },

  handleTimeExpired() {
    this.stopTimer();
    if (!this.state.isMurderCase) {
      this.showMurderTransitionScreen("TIMEOUT", "");
    } else {
      GameAudio.alarm();
      this.showToast("MURDER CLOCK EXPIRED (00:00) — SUBMIT ACCUSATION NOW!");
      this.openSuspectSelection();
    }
  },

  showMurderTransitionScreen(reason, wrongSuspectName) {
    this.stopTimer();
    GameAudio.alarm();

    this.state.pendingMurderReason = reason;
    this.state.pendingWrongSuspectName = wrongSuspectName;

    const victimName = this.state.currentCase?.victim?.name || "The victim";
    const chamberName =
      (this.state.currentCase?.blueprintRooms && this.state.currentCase.blueprintRooms[2]) ||
      "the sealed chamber";

    const badgeEl = document.getElementById("outcome-badge");
    badgeEl.textContent = "RESCUE FAILED // ESCALATED TO MURDER CASE";
    badgeEl.className = "outcome-badge outcome-fail";

    if (reason === "WRONG_SUSPECT") {
      document.getElementById("outcome-title").textContent = "Wrong Suspect — Victim Deceased";
      document.getElementById("outcome-subtitle").textContent =
        `Detaining ${wrongSuspectName} cost critical rescue minutes. ${victimName} was found deceased in ${chamberName}.`;
      document.getElementById("outcome-narrative").textContent =
        `While investigators questioned ${wrongSuspectName}, the rescue window inside ${chamberName} ran out. The file has now been officially upgraded to a MURDER INVESTIGATION. New post-mortem forensics, recovered audio recordings, and lab reports are ready—click the button below to begin the Murder Case investigation.`;
      document.getElementById("out-stat-suspect").textContent = wrongSuspectName;
      document.getElementById("out-stat-verdict").textContent = "WRONG";
    } else {
      document.getElementById("outcome-title").textContent = "Time Expired — Victim Deceased";
      document.getElementById("outcome-subtitle").textContent =
        `The 30:00 rescue window closed. ${victimName} was found deceased in ${chamberName}.`;
      document.getElementById("outcome-narrative").textContent =
        `Before the rescue team could breach ${chamberName}, the survival window inside the chamber expired. The file has now been officially upgraded to a MURDER INVESTIGATION. New post-mortem forensics, recovered audio recordings, and lab reports are ready—click the button below to begin the Murder Case investigation.`;
      document.getElementById("out-stat-suspect").textContent = "NONE (TIME UP)";
      document.getElementById("out-stat-verdict").textContent = "ESCALATED";
    }

    const mins = String(Math.floor(this.state.timeRemaining / 60)).padStart(2, "0");
    const secs = String(this.state.timeRemaining % 60).padStart(2, "0");
    document.getElementById("out-stat-time").textContent = `${mins}:${secs}`;
    document.getElementById("out-stat-clues").textContent = String(this.state.clues.length);

    const enterMurderBtn = document.getElementById("btn-enter-murder-case");
    if (enterMurderBtn) enterMurderBtn.classList.remove("hidden");

    this.showScreen("screen-outcome");
  },

  startMurderCase(reason = "TIMEOUT", wrongSuspectName = "") {
    this.state.isMurderCase = true;
    this.state.selectedSuspect = null;
    this.state.timeRemaining = 30 * 60; // Fresh 30:00 timer for Murder Investigation
    this.state.visitedChannels = new Set();
    this.state.completedDeepScans = new Set();
    this.state.activeChannel = null;
    this.state.activeCamIndex = 0;
    this.state.activePhoneTab = "calls";
    this.state.activeHotspotIndex = 0;

    const enterMurderBtn = document.getElementById("btn-enter-murder-case");
    if (enterMurderBtn) enterMurderBtn.classList.add("hidden");

    const stageBadge = document.getElementById("hud-case-stage");
    stageBadge.textContent = "PHASE 2 // MURDER CASE";
    stageBadge.className = "stage-badge stage-murder";

    const victimName = this.state.currentCase?.victim?.name || "The victim";
    const chamberName =
      (this.state.currentCase?.blueprintRooms && this.state.currentCase.blueprintRooms[2]) ||
      "the sealed chamber";

    const causeText =
      reason === "WRONG_SUSPECT"
        ? `False accusation of <strong>${wrongSuspectName}</strong> delayed rescue—${victimName} was found deceased in ${chamberName}.`
        : `Rescue window expired (00:00)—${victimName} was found deceased in ${chamberName}.`;

    const banner = document.getElementById("escalation-banner");
    banner.innerHTML = `
      <div class="escalation-icon">[!]</div>
      <div>
        <strong>PHASE 2: MURDER INVESTIGATION ACTIVE (30:00 CLOCK)</strong>
        <p>${causeText} <strong>Post-mortem forensics, recovered audio recordings, and lab reports</strong> are now unlocked across all 4 channels. Examine the evidence to catch the killer!</p>
      </div>
    `;
    banner.classList.remove("hidden");

    this.resetChannelCardsUI("> HOMICIDE FILE [NEW]");

    document.getElementById("investigation-viewer").innerHTML = `
      <div class="empty-viewer">
        <div class="empty-icon" style="color:var(--accent-red);">[ MURDER CASE ]</div>
        <h3 style="color:var(--accent-amber);">HOMICIDE EVIDENCE UNLOCKED</h3>
        <p>All 4 channels now contain <strong>autopsy findings, recovered audio recordings, and forensic lab reports</strong> pointing clearly to the killer. Inspect the channels before the 30:00 clock hits 00:00.</p>
      </div>
    `;

    this.updateTimerDisplay();
    this.startTimer();
    this.showScreen("screen-investigation");
    this.showToast("[!] MURDER CASE STARTED — NEW HOMICIDE EVIDENCE UNLOCKED!");
  },

  updateTimerDisplay() {
    const timerEl = document.getElementById("hud-timer");
    const mins = String(Math.floor(this.state.timeRemaining / 60)).padStart(2, "0");
    const secs = String(this.state.timeRemaining % 60).padStart(2, "0");
    timerEl.textContent = `${mins}:${secs}`;

    timerEl.classList.remove("warning", "critical");
    if (this.state.timeRemaining === 0) {
      timerEl.classList.add("critical");
    } else if (this.state.timeRemaining <= 10 * 60) {
      timerEl.classList.add("warning");
    }
  },

  addClue(source, text) {
    if (this.state.clues.some((c) => c.text === text)) return;
    this.state.clues.push({ source, text });
    GameAudio.clueFound();
    this.renderClueLog();
  },

  renderClueLog() {
    const list = document.getElementById("clue-log-list");
    const badge = document.getElementById("clue-count-badge");
    badge.textContent = `${this.state.clues.length} CLUE${this.state.clues.length === 1 ? "" : "S"}`;

    if (this.state.clues.length === 0) {
      list.innerHTML = `<li class="clue-placeholder">&gt; Notepad empty. Select a channel to log clues...</li>`;
      return;
    }

    list.innerHTML = this.state.clues
      .map(
        (c) => `
        <li>
          <span class="clue-source">[${c.source}]</span>
          ${c.text}
        </li>`
      )
      .join("");
  },

  openChannel(channelKey) {
    this.state.activeChannel = channelKey;

    document.querySelectorAll(".channel-card").forEach((card) => {
      card.classList.toggle("active-channel", card.getAttribute("data-channel") === channelKey);
    });

    const channelsObj = this.getActiveChannels();
    const channelData = channelsObj[channelKey];

    if (!this.state.visitedChannels.has(channelKey)) {
      this.state.visitedChannels.add(channelKey);
      this.addClue(channelKey.toUpperCase(), channelData.clueText);

      const costEl = document.getElementById(`cost-${channelKey}`);
      const statusEl = document.getElementById(`status-${channelKey}`);
      costEl.textContent = "OPENED";
      costEl.classList.add("visited");
      statusEl.textContent = "> EXAMINED [OK]";
    }

    const expired = this.consumeTime(5, channelKey.toUpperCase());
    if (expired) return;

    this.renderChannelWorkspace(channelKey);
  },

  renderChannelWorkspace(channelKey) {
    const viewer = document.getElementById("investigation-viewer");
    const channelsObj = this.getActiveChannels();
    const ch = channelsObj[channelKey];
    const deepDone = this.state.completedDeepScans.has(ch.deepScan.id);

    const deepScanHTML = `
      <div class="deep-scan-bar">
        <div style="flex:1;">
          <strong style="color:var(--accent-amber);">★ FORENSIC DEEP SCAN</strong>
          <div style="color:var(--text-main);margin-top:4px;">
            ${deepDone ? ch.deepScan.result : "Run targeted forensic analysis for conclusive proof."}
          </div>
        </div>
        ${
          deepDone
            ? `<button id="btn-deep-scan" class="btn-pixel btn-sm">VIEW AGAIN (-05:00)</button>`
            : `<button id="btn-deep-scan" class="btn-pixel btn-sm">${ch.deepScan.label}</button>`
        }
      </div>
    `;

    if (channelKey === "cctv") {
      const cam = ch.cameras[this.state.activeCamIndex] || ch.cameras[0];
      viewer.innerHTML = `
        <div class="panel-header"><span>[CAM] ${ch.title.toUpperCase()}</span><span>160x84 VGA</span></div>
        <div class="sub-tabs">
          ${ch.cameras
            .map(
              (c, idx) =>
                `<button class="sub-tab ${idx === this.state.activeCamIndex ? "active" : ""}" data-cam="${idx}">${c.label}</button>`
            )
            .join("")}
        </div>
        <canvas id="cctv-canvas" class="cctv-screen" width="160" height="84"></canvas>
        <div class="evidence-detail-box">
          <strong style="color:var(--accent-cyan);">LOG [${cam.timestamp}]:</strong>
          <p style="margin-top:6px;">${cam.notes}</p>
        </div>
        ${deepScanHTML}
      `;

      GameVisuals.startCCTVCanvas("cctv-canvas", this.state.activeCamIndex, cam);
      viewer.querySelectorAll("[data-cam]").forEach((btn) => {
        btn.addEventListener("click", () => {
          GameAudio.click();
          this.state.activeCamIndex = Number(btn.getAttribute("data-cam"));
          this.renderChannelWorkspace("cctv");
        });
      });
    } else if (channelKey === "phone") {
      let phoneBody = "";
      if (this.state.activePhoneTab === "calls") {
        phoneBody = ch.calls
          .map(
            (call) => `
            <div class="phone-entry">
              <div style="display:flex;justify-content:space-between;">
                <strong>${call.contact}</strong>
                <span style="color:var(--accent-amber);">${call.time}</span>
              </div>
              <div style="color:var(--text-muted);">&gt; ${call.status}</div>
            </div>`
          )
          .join("");
      } else if (this.state.activePhoneTab === "draft") {
        phoneBody = `
          <div class="phone-entry" style="border-color:var(--accent-amber);">
            <div style="color:var(--accent-amber);margin-bottom:6px;">
              ${ch.draft.time}
            </div>
            <p>"${ch.draft.text}"</p>
          </div>`;
      } else {
        phoneBody = `
          <div class="phone-entry" style="border-color:var(--accent-red);">
            <div style="color:var(--accent-red);margin-bottom:6px;">
              ${ch.gps.time}
            </div>
            <p>${ch.gps.coords}</p>
          </div>`;
      }

      viewer.innerHTML = `
        <div class="panel-header"><span>[TEL] ${ch.title.toUpperCase()}</span><span>DATA DUMP</span></div>
        <div class="phone-frame">
          <div class="sub-tabs" style="justify-content:center;">
            <button class="sub-tab ${this.state.activePhoneTab === "calls" ? "active" : ""}" data-ptab="calls">CALLS</button>
            <button class="sub-tab ${this.state.activePhoneTab === "draft" ? "active" : ""}" data-ptab="draft">${this.state.isMurderCase ? "AUDIO" : "DRAFT"}</button>
            <button class="sub-tab ${this.state.activePhoneTab === "gps" ? "active" : ""}" data-ptab="gps">GPS</button>
          </div>
          ${phoneBody}
        </div>
        ${deepScanHTML}
      `;

      viewer.querySelectorAll("[data-ptab]").forEach((btn) => {
        btn.addEventListener("click", () => {
          GameAudio.click();
          this.state.activePhoneTab = btn.getAttribute("data-ptab");
          this.renderChannelWorkspace("phone");
        });
      });
    } else if (channelKey === "people") {
      viewer.innerHTML = `
        <div class="panel-header"><span>[BIO] ${ch.title.toUpperCase()}</span><span>STATEMENTS</span></div>
        ${ch.profiles
          .map(
            (p) => `
            <div class="person-dossier">
              <div class="person-mini-portrait">${GameVisuals.getPortraitSVG(p.id)}</div>
              <div>
                <h4>${p.name}</h4>
                <div style="color:var(--accent-cyan);margin:4px 0;">${p.meta}</div>
                <div style="color:var(--text-main);margin-bottom:6px;"><em>${p.appearance}</em></div>
                <ul>
                  ${p.bullets.map((b) => `<li>${b}</li>`).join("")}
                </ul>
              </div>
            </div>`
          )
          .join("")}
        ${deepScanHTML}
      `;
    } else if (channelKey === "location") {
      const activeSpot = ch.hotspots[this.state.activeHotspotIndex] || ch.hotspots[0];
      const blueprintHeader =
        this.state.currentCase.blueprintTitle ||
        "BLUEPRINT // CRIME SCENE SECTOR MAP (CLICK [A], [B], OR [C])";
      const blueprintRooms =
        this.state.currentCase.blueprintRooms || ["SECTOR A", "CORRIDOR", "SECTOR C"];

      viewer.innerHTML = `
        <div class="panel-header"><span>[MAP] ${ch.title.toUpperCase()}</span><span>SECTOR GRID</span></div>
        <div class="location-map">
          <div style="color:var(--accent-cyan);">
            ${blueprintHeader}
          </div>
          <canvas id="location-canvas" class="blueprint-canvas" width="320" height="110"></canvas>
          <div class="hotspot-grid">
            ${ch.hotspots
              .map(
                (spot, idx) => `
                <button class="hotspot-btn ${idx === this.state.activeHotspotIndex ? "active" : ""}" data-spot="${idx}">
                  <strong>${spot.title}</strong>
                </button>`
              )
              .join("")}
          </div>
        </div>
        <div class="evidence-detail-box">
          <strong style="color:var(--accent-amber);">${activeSpot.title}:</strong>
          <p style="margin-top:6px;">${activeSpot.detail}</p>
        </div>
        ${deepScanHTML}
      `;

      const selectHotspot = (idx) => {
        GameAudio.click();
        this.state.activeHotspotIndex = idx;
        this.renderChannelWorkspace("location");
      };

      GameVisuals.drawLocationBlueprint(
        "location-canvas",
        this.state.activeHotspotIndex,
        selectHotspot,
        blueprintRooms
      );

      viewer.querySelectorAll("[data-spot]").forEach((btn) => {
        btn.addEventListener("click", () => {
          selectHotspot(Number(btn.getAttribute("data-spot")));
        });
      });
    }

    const deepBtn = document.getElementById("btn-deep-scan");
    if (deepBtn) {
      deepBtn.addEventListener("click", () => {
        this.state.completedDeepScans.add(ch.deepScan.id);
        this.addClue(`${channelKey.toUpperCase()} // SCAN`, ch.deepScan.clueText);
        const expired = this.consumeTime(5, "DEEP SCAN");
        if (expired) return;
        this.renderChannelWorkspace(channelKey);
      });
    }
  },

  openSuspectSelection() {
    const titleEl = document.getElementById("suspect-screen-title");
    titleEl.textContent = this.state.isMurderCase
      ? "SUSPECT LINEUP — MURDER CASE"
      : "SUSPECT LINEUP — RESCUE OP";

    const feedbackEl = document.getElementById("suspect-feedback");
    feedbackEl.classList.add("hidden");

    const grid = document.getElementById("suspect-grid");
    grid.innerHTML = "";

    this.state.currentCase.suspects.forEach((suspect) => {
      const card = document.createElement("div");
      card.className = "suspect-card pixel-box";
      card.innerHTML = `
        <div class="suspect-portrait">${GameVisuals.getPortraitSVG(suspect.id)}</div>
        <h3>${suspect.name}</h3>
        <span class="suspect-role">${suspect.role}</span>
        <div class="suspect-alibi"><strong>ALIBI:</strong> ${suspect.alibi}</div>
      `;

      card.addEventListener("click", () => this.handleSuspectChoice(suspect, card));
      grid.appendChild(card);
    });

    this.showScreen("screen-suspects");
  },

  async handleSuspectChoice(suspect, cardEl) {
    if (this.state.selectedSuspect) return;
    this.state.selectedSuspect = suspect;
    this.stopTimer();

    const feedbackEl = document.getElementById("suspect-feedback");
    feedbackEl.classList.remove("hidden", "feedback-correct", "feedback-wrong");
    feedbackEl.textContent = "TRANSMITTING ACCUSATION TO SERVER...";

    let verdictResult;
    try {
      verdictResult = await CaseAPI.accuseSuspect(this.state.currentCase.id, {
        suspectId: suspect.id,
        timeRemaining: this.state.timeRemaining,
        isMurderCase: this.state.isMurderCase
      });
    } catch (err) {
      this.state.selectedSuspect = null;
      if (this.state.timeRemaining > 0) this.startTimer();
      this.showToast("ERROR: SERVER VERIFICATION FAILED");
      return;
    }

    // 1. Correct suspect chosen
    if (verdictResult.isCorrect) {
      GameAudio.verdict(true);
      cardEl.classList.add("selected-correct");
      feedbackEl.classList.add("feedback-correct");
      feedbackEl.textContent = `[✓] CORRECT — ${suspect.name.toUpperCase()} CONFIRMED! LOADING OUTCOME...`;

      setTimeout(() => {
        this.showOutcome(verdictResult.outcome);
      }, 1500);
      return;
    }

    // 2. Wrong suspect chosen during Phase 1 (Rescue) -> Show Murder Case button screen
    if (!this.state.isMurderCase) {
      GameAudio.verdict(false);
      cardEl.classList.add("selected-wrong");
      feedbackEl.classList.add("feedback-wrong");
      feedbackEl.textContent = `[X] WRONG — ${suspect.name.toUpperCase()} IS INNOCENT!`;

      const chamberName =
        (this.state.currentCase?.blueprintRooms && this.state.currentCase.blueprintRooms[2]) ||
        "the sealed chamber";

      this.addClue(
        "SYSTEM // ALERT",
        `False accusation of ${suspect.name} delayed rescue—victim died in ${chamberName}. Upgraded to Murder Case.`
      );

      this.showMurderTransitionScreen("WRONG_SUSPECT", suspect.name);
      return;
    }

    // 3. Wrong suspect chosen during Phase 2 (Murder Case) -> Final Cold Case Outcome
    GameAudio.verdict(false);
    cardEl.classList.add("selected-wrong");
    feedbackEl.classList.add("feedback-wrong");
    feedbackEl.textContent = `[X] WRONG — ${suspect.name.toUpperCase()} IS INNOCENT! LOADING OUTCOME...`;

    setTimeout(() => {
      this.showOutcome(verdictResult.outcome);
    }, 1500);
  },

  showOutcome(selectedOutcome) {
    this.stopTimer();

    const enterMurderBtn = document.getElementById("btn-enter-murder-case");
    if (enterMurderBtn) enterMurderBtn.classList.add("hidden");

    const badgeEl = document.getElementById("outcome-badge");
    badgeEl.textContent = selectedOutcome.badge;
    badgeEl.className = `outcome-badge ${selectedOutcome.badgeClass}`;

    document.getElementById("outcome-title").textContent = selectedOutcome.title;
    document.getElementById("outcome-subtitle").textContent = selectedOutcome.subtitle;
    document.getElementById("outcome-narrative").textContent = selectedOutcome.narrative;

    const mins = String(Math.floor(this.state.timeRemaining / 60)).padStart(2, "0");
    const secs = String(this.state.timeRemaining % 60).padStart(2, "0");
    document.getElementById("out-stat-time").textContent = `${mins}:${secs}`;
    document.getElementById("out-stat-clues").textContent = String(this.state.clues.length);
    document.getElementById("out-stat-suspect").textContent = this.state.selectedSuspect.name;
    document.getElementById("out-stat-verdict").textContent = selectedOutcome.verdict;

    this.showScreen("screen-outcome");
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    GameApp.init();
  });
} else {
  GameApp.init();
}