# Desktop Buddies 🖥️

**Your desktop deserves a little personality.**

Desktop Buddies is a collection of interactive Windows desktop companions that bring familiar characters to life on your screen.

The project includes two Electron-based desktop applications, **Spider-Man Desktop Buddy** and **Itachi Study Buddy**, along with a responsive, multi-page website where users can explore their features, watch demonstrations, and access downloads.

## Meet the Buddies

### 🕷️ Spider-Man Desktop Buddy

A playful, interactive desktop companion that hangs from the top of your screen and responds to your cursor movements.

**Features**
- Interactive Spider-Man character that follows cursor movement
- Adjustable character size
- Show and hide controls
- Lightweight desktop overlay
- Keyboard shortcut `Ctrl + Shift + Q` to quit

### 🌙 Itachi Study Buddy

A desktop study companion designed to encourage focus, regular check-ins, and structured study sessions.

**Features**
- Interactive Itachi-themed desktop companion
- Study session tracking
- Initial check-in after 5 minutes
- Recurring focus reminders every 30 minutes
- Break, resume, and end-session options
- Keyboard shortcut `Ctrl + Shift + Q` to quit

## Website Features

The Desktop Buddies website provides:

- Responsive design for desktop and mobile screens
- Dedicated pages for both desktop companions
- Character exploration and feature descriptions
- Recorded video demonstrations
- Download confirmation interface
- About, Privacy Policy, and Terms pages
- Custom 404 error page

## Project Structure

```text
desktop-buddies/
├── assets/
│   ├── favicon.svg
│   ├── itachi-app.png
│   ├── itachi.png
│   ├── spiderman-app.png
│   └── spiderman.png
├── videos/
│   ├── itachi-demo.mp4
│   └── spiderman-demo.mp4
├── downloads/
│   └── PLACE_INSTALLERS_HERE.txt
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
└── README.md
```

## Technology Stack

| Component | Technology |
|---|---|
| Website structure | HTML5 |
| Styling and responsive layout | CSS3 |
| Website interactions | JavaScript |
| Desktop applications | Electron |
| Desktop application language | JavaScript |
| Version control | Git and GitHub |
| Planned website hosting | GitHub Pages |
| Planned installer distribution | GitHub Releases |

## Run the Website Locally

Clone the repository:

```bash
git clone https://github.com/praishwarya10/desktop-buddies.git
```

Navigate to the project:

```bash
cd desktop-buddies
```

Start a local server:

```bash
py -m http.server 8000
```

Open the website in your browser:

http://localhost:8000

The website can also be previewed by opening `index.html` directly, although a local server is recommended for testing.

## Desktop Application Downloads

The Windows installers have been built and tested locally.

**Available applications:**
- Spider-Man Desktop Buddy v1.0.0
- Itachi Study Buddy v1.0.0

Installer distribution through GitHub Releases is being prepared. The website's download buttons will be connected to the release assets once publishing is complete.

**System requirement:** Windows desktop environment.

## Demo Videos

### Spider-Man Desktop Buddy

https://github.com/praishwarya10/desktop-buddies/blob/main/videos/spiderman-demo.mp4

### Itachi Study Buddy

https://github.com/praishwarya10/desktop-buddies/blob/main/videos/itachi-demo.mp4

Both demonstration videos are included in the repository.

## Future Improvements

- Publish the website using GitHub Pages
- Integrate installer downloads through GitHub Releases
- Improve character customization
- Expand the desktop companion collection
- Refine keyboard shortcut handling when multiple companions run simultaneously
- Improve installation and update experiences

## Important Notes

**Intellectual property:** Spider-Man and Itachi are third-party fictional characters. This is an independent fan-created project, not affiliated with or endorsed by their respective rights holders. Public distribution of character artwork, applications, and installers is subject to the necessary permissions.

**Windows security:** The installers may trigger Windows SmartScreen warnings if they are not code-signed. Users should verify the source and authenticity of downloaded executables before installing.

**Keyboard shortcuts:** Both desktop applications currently use `Ctrl + Shift + Q` as a quit shortcut. Running them simultaneously may cause a shortcut conflict.

**Built with creativity, curiosity, and a love for interactive desktop experiences.**
