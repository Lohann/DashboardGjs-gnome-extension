# Toggle Overview GNOME Shell Extension

As of GNOME 41, the dbus method `Eval()` is now restricted with `MetaContext:unsafe-mode` property (see this [commit](https://gitlab.gnome.org/GNOME/gnome-shell/-/merge_requests/1970/diffs?commit_id=f42df5995e08a89495e2f59a9ed89b5c03369bf8)). This extension exposes `ToggleOverview()` and `ToggleApplications()` dbus methods.

## Features

* Wrap `Main.overview.show()` and `Main.overview.showApps()` into `ToggleOverview()` and `ToggleApplications()` dbus methods.

## Installation

```sh
git clone https://github.com/Lohann/toggle-overview-gnome-extension
cd toggle-overview-gnome-extension
make install
```

## Example Usage

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