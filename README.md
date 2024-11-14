# NoBPM MuteUI

NoBPM MuteUI is an Electron-based application that allows users to manage MIDI device connections, view connected devices, and handle MIDI messages. The app provides an easy-to-use interface for working with multiple MIDI devices and mute channels.

## Features

- Connect and display MIDI devices
- Track MIDI messages in real-time
- Configure and manage mute channels
- Toggle between different link modes for devices

## Installation

### Prerequisites

- **Node.js** (v14 or later)

### Step 1: Clone the Repository

To get started, clone the project repository from GitHub:

```bash
git clone https://github.com/NilocEidlog/NoBPM-MutesUI.git
cd NoBPM-MutesUI
```

### Step 2: Install Dependencies

Once inside the project directory, install the necessary dependencies:

```bash
npm install
```

This command installs Electron, React, TailwindCSS, and other necessary libraries.

## Running the Application

### Development Mode

To run the application in development mode with live reloading:

```bash
npm start
```

### Building the Application

To package the application for distribution:

```bash
npm run package
```

This command will bundle the application into a distributable format (e.g., .exe for Windows, .dmg for macOS). You can find the packaged files in the out directory.
