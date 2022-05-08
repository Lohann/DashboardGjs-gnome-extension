all: install

.PHONY: install lint

install:
	install -d ~/.local/share/gnome-shell/extensions
	cp -a toggle-overview@lohann.dev/ ~/.local/share/gnome-shell/extensions/

lint:
	eslint toggle-overview@lohann.dev