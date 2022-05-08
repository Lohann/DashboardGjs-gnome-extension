# Toggle Overview GNOME Shell Extension

As of GNOME 41, the dbus method `Eval()` is now restricted with `MetaContext:unsafe-mode` property (see this [commit](https://gitlab.gnome.org/GNOME/gnome-shell/-/merge_requests/1970/diffs?commit_id=f42df5995e08a89495e2f59a9ed89b5c03369bf8)). This extension exposes `ToggleOverview()` and `ToggleApplications()` dbus methods.

## Features

* Expose `Main.overview.show()` and `Main.overview.showApps()` in `ToggleOverview()` and `ToggleApplications()` dbus methods.

## Installation

```sh
git clone https://github.com/Lohann/toggle-overview-gnome-extension
cd toggle-overview-gnome-extension
make install
```

## Basic Usage with command-line

Toggle overview
```sh
gdbus call \
  --session \
  --dest org.gnome.Shell \
  --object-path /dev/lohann/ToggleOverview \
  --method dev.lohann.ToggleOverview.ToggleOverview
```

Toggle applications
```sh
gdbus call \
  --session \
  --dest org.gnome.Shell \
  --object-path /dev/lohann/ToggleOverview \
  --method dev.lohann.ToggleOverview.ToggleApplications
```

## How to Bind Mouse Buttons to dbus

### 1. Install xbindkeys, xev and xdotool.

#### Debian, Ubuntu, Linux Mint, Pop!_OS, Elementary OS and other Debian or Ubuntu based Linux distributions:
```sh
sudo apt install xbindkeys x11-utils
```

#### Fedora:
```sh
sudo dnf install xbindkeys xorg-x11-utils
```

#### openSUSE:
```sh
sudo zypper install xbindkeys xev
```

#### Arch Linux or Manjaro:
```sh
sudo pacman -S xbindkeys xorg-xev
```

### 2. Grab the mouse button codes.
To get the mouse button code(s), run this command:
```sh
xev | grep button
```
Next, focus the small window that pops up and watch the terminal output. Now press the mouse button for which you want to grab the code. After pressing the button you should see its code in the terminal where you ran xev, e.g.:
```sh
xev | grep button

state 0x10, button 8, same_screen YES
state 0x10, button 9, same_screen YES
```
In this example, the button code we'll need later is 8 and 9.

### 3. Create the xbindkeys configuration (in ~/.xbindkeysrc).
You may either create an empty ~/.xbindkeysrc file, or generate a sample configuration file using this command:
```sh
cat > ~/.xbindkeysrc <<EOL
"gdbus call --session --dest org.gnome.Shell --object-path /dev/lohann/ToggleOverview --method dev.lohann.ToggleOverview.ToggleOverview"
  b:8 + Release

"gdbus call --session --dest org.gnome.Shell --object-path /dev/lohann/ToggleOverview --method dev.lohann.ToggleOverview.ToggleApplications"
  b:9 + Release
EOL
```

### 4.  Start xbindkeys.
Now you can start xbindkeys using a terminal and typing:
```sh
xbindkeys
```
In case xbindkeys was running, you can restart it by killing the xbindkeys process and running it again:
```sh
killall xbindkeys
xbindkeys
```
On Ubuntu, xbindkeys is automatically started on system startup if it finds a non-empty (it needs to have lines that are not commented out) ~/.xbindkeysrc configuration file. If the tool doesn't automatically start for the Linux distribution you're using, add xbindkeys to your startup programs.