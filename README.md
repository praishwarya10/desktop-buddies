# Desktop Buddies 

**Your desktop deserves a little personality.**

Desktop Buddies is a collection of interactive Windows desktop companions that bring familiar characters to life on your screen.

The project features two Electron-based applications, **Spider-Man Desktop Buddy** and **Itachi Study Buddy**, alongside a responsive, multi-page website where users can explore features, watch demonstrations, and download the applications.

## Live Website

**[Explore Desktop Buddies](https://praishwarya10.github.io/desktop-buddies/)**

Both applications are available to download through the website or GitHub Releases.

**[Download Desktop Buddies v1.0.0](https://github.com/praishwarya10/desktop-buddies/releases/tag/v1.0.0)**

## Meet the Buddies

### 🕷️ Spider-Man Desktop Buddy

A playful, interactive desktop companion that hangs from the top of your screen and responds to cursor movements.

**Features**
- Interactive Spider-Man character that follows cursor movement
- Adjustable character size
- Show and hide controls
- Lightweight desktop overlay
- Keyboard shortcut `Ctrl + Shift + Q` to quit

**[Download Spider-Man Desktop Buddy](https://github.com/praishwarya10/desktop-buddies/releases/download/v1.0.0/SpiderMan-Desktop-Buddy-Setup-1.0.0.exe)**

### 🌙 Itachi Study Buddy

A desktop study companion designed to encourage focus, regular check-ins, and structured study sessions.

**Features**
- Interactive Itachi-themed desktop companion
- Study session tracking
- Initial check-in after 5 minutes
- Recurring focus reminders every 30 minutes
- Break, resume, and end-session options
- Keyboard shortcut `Ctrl + Shift + Q` to quit

**[Download Itachi Study Buddy](https://github.com/praishwarya10/desktop-buddies/releases/download/v1.0.0/Itachi-Study-Buddy-Setup-1.0.0.exe)**

## Website Features

The Desktop Buddies website includes:

- Responsive design for desktop and mobile screens
- Dedicated pages for both desktop companions
- Character exploration and feature descriptions
- Recorded video demonstrations
- Download confirmation interface
- GitHub Releases integration for Windows installers
- About, Privacy Policy, and Terms pages
- Custom 404 error page
- Live hosting through GitHub Pages

## Project Structure

```text
desktop-buddies/
├── apps/
│   ├── spiderman/
│   │   ├── index.html
│   │   ├── settings.html
│   │   ├── main.js
│   │   ├── preload.js
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   └── spiderman.png
│   │
│   └── itachi/
│       ├── itachi.html
│       ├── main.js
│       ├── preload.js
│       ├── package.json
│       ├── package-lock.json
│       └── itachi.png
│
├── assets/
│   ├── favicon.svg
│   ├── itachi-app.png
│   ├── itachi.png
│   ├── spiderman-app.png
│   └── spiderman.png
│
├── videos/
│   ├── itachi-demo.mp4
│   └── spiderman-demo.mp4
│
├── downloads/
│   └── PLACE_INSTALLERS_HERE.txt
│
├── index.html
├── explore.html
├── spiderman.html
├── itachi.html
├── about.html
├── privacy.html
├── terms.html
├── 404.html
├── styles.css
├── script.js
├── .gitignore
└── README.md
```

The `apps/` directory contains the source code for both Electron applications.

Windows installers are distributed separately through GitHub Releases rather than being stored directly in the repository.

## Technology Stack

| Component | Technology |
|---|---|
| Website structure | HTML5 |
| Styling and responsive layout | CSS3 |
| Website interactions | JavaScript |
| Desktop application framework | Electron |
| Desktop application language | JavaScript |
| Runtime and package management | Node.js and npm |
| Version control | Git and GitHub |
| Website hosting | GitHub Pages |
| Installer distribution | GitHub Releases |

## Run the Website Locally

**1. Clone the repository**

```bash
git clone https://github.com/praishwarya10/desktop-buddies.git
```

**2. Navigate to the project**

```bash
cd desktop-buddies
```

**3. Start a local server**

```bash
py -m http.server 8000
```

**4. Open the website**

http://localhost:8000

The website can also be previewed by opening `index.html` directly, although a local server is recommended for testing.

Local installer downloads require the corresponding EXE files to be available in the `downloads/` directory. On the deployed website, downloads use GitHub Releases.

## Run the Desktop Applications Locally

**Prerequisites**
- Node.js
- npm
- Windows desktop environment

### Spider-Man Desktop Buddy

```bash
cd apps/spiderman
npm install
npm start
```

### Itachi Study Buddy

From the repository root:

```bash
cd apps/itachi
npm install
npm start
```

These commands install the required dependencies and start the Electron application using its configured npm start script.

## Desktop Application Downloads

**Latest release: v1.0.0**

| Application | Download |
|---|---|
| Spider-Man Desktop Buddy | [Windows Installer](https://github.com/praishwarya10/desktop-buddies/releases/download/v1.0.0/SpiderMan-Desktop-Buddy-Setup-1.0.0.exe) |
| Itachi Study Buddy | [Windows Installer](https://github.com/praishwarya10/desktop-buddies/releases/download/v1.0.0/Itachi-Study-Buddy-Setup-1.0.0.exe) |

Both Windows installers are available through the published GitHub Release.

**[View Release Notes and Assets](https://github.com/praishwarya10/desktop-buddies/releases/tag/v1.0.0)**

**System requirement:** Windows desktop environment.

## Demo Videos

### Spider-Man Desktop Buddy

[Watch Spider-Man Demo](https://github.com/praishwarya10/desktop-buddies/blob/main/videos/spiderman-demo.mp4)

### Itachi Study Buddy

[Watch Itachi Demo](https://github.com/praishwarya10/desktop-buddies/blob/main/videos/itachi-demo.mp4)

Both demonstration videos are included in the repository and are also accessible through the live website.

## Deployment

The website is deployed using **GitHub Pages**.

- **Repository:** [Desktop Buddies](https://github.com/praishwarya10/desktop-buddies)
- **Branch:** `main`
- **Publishing directory:** `/ (root)`
- **Live website:** https://praishwarya10.github.io/desktop-buddies/
- **Release:** [v1.0.0](https://github.com/praishwarya10/desktop-buddies/releases/tag/v1.0.0)

The website uses GitHub Releases to distribute the Windows installers.

## Future Improvements

- Introduce additional desktop companions
- Expand character customization options
- Add more interactive character animations
- Improve keyboard shortcut handling when multiple companions run simultaneously
- Introduce configurable study reminder intervals
- Improve installation and application update experiences
- Explore automatic update support for Electron applications

## Important Notes

**Intellectual property:** Spider-Man and Itachi are third-party fictional characters. This is an independent fan-created project, not affiliated with or endorsed by their respective rights holders. Public distribution of character artwork, applications, and installers is subject to the necessary permissions.

**Windows security:** The installers are not code-signed and may trigger Windows SmartScreen warnings. Users should verify the source and authenticity of downloaded executables before installation.

**Keyboard shortcuts:** Both desktop applications currently use `Ctrl + Shift + Q` as a quit shortcut. Running them simultaneously may cause a shortcut conflict.

---

**Built with creativity, curiosity, and a love for interactive desktop experiences.**
