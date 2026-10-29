# Overwatch 2 Audio Visualizer & Spotify HUD Overlay

An Overwatch 2-styled stream overlay HUD add-on designed for OBS Studio and stream software. Features a real-time symmetrical audio visualizer, live Spotify track ticker with OAuth & API integration, customizable theme accents, and 2D skew/tilt/scale adjustments to fit directly over your in-game health and hero HUD.

---

## Features

- **Seamless Overwatch 2 HUD Design**: Custom-crafted to align right beside the native Overwatch 2 health bar and player nameplate.
- **Live Spotify Integration**:
  - Live track polling (`user-read-currently-playing`).
  - Supports both Spotify API Access Tokens and OAuth 2.0 PKCE client authentication.
  - Automatically displays `[TRACK NAME] — [ARTIST]`.
  - Cinematic slide-out / slide-in animations on song change.
  - Top & bottom visualizer border lines collapse into a center beam and pan open when songs start/end.
- **Customizable Dynamics**:
  - Real-time Symmetrical Audio Visualizer with adjustable bar count and wave gain.
  - Independent Visualizer Box offset (X & Y) to detach and align flush with in-game health blocks.
  - Global skew, tilt angle, scale, and X/Y positioning.
  - Overwatch Accent Themes: OW2 HUD Blue (`#05bbfb`), Mercy Gold, Kiriko Teal, Widow Purple, or custom hex.
- **Real-Time OBS Sync**:
  - Built-in lightweight local sync server (`server.js`) stores settings to `config.json`.
  - Any tweaks made in your control browser window update in the live OBS Browser Source in real-time.
  - Press `H` to toggle studio menus.

---

## Quick Start

### 1. Run the Local Server
Make sure [Node.js](https://nodejs.org/) is installed, then run:
```bash
node server.js
```
The server will start at `http://127.0.0.1:8080/`.

### 2. Configure in Your Browser
1. Open **[http://127.0.0.1:8080/](http://127.0.0.1:8080/)** in Chrome or Edge.
2. In **Section 2 (Spotify Integration)**, paste your Spotify Developer Client ID or Access Token.
3. Fine-tune your visualizer positioning or skew in **Sections 6 & 7**.

### 3. Add to OBS Studio
1. In OBS Studio, click **`+`** under **Sources** and select **Browser**.
2. Set the **URL** to:
   ```text
   http://127.0.0.1:8080/?obs=1
   ```
3. Set **Width** to `1920` and **Height** to `1080`.
4. Place the source directly above your Overwatch 2 Game Capture.
