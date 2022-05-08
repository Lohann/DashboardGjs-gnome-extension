/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */
'use strict';

const { Gio } = imports.gi;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Main = imports.ui.main;

const Iface =
    '<node>' +
    '   <interface name="dev.lohann.ToggleOverview">' +
    '       <method name="ToggleOverview">' +
    '           <arg type="b" direction="out" name="success"/>' +
    '           <arg type="s" direction="out" name="returnValue"/>' +
    '       </method>' +
    '       <method name="ToggleApplications">' +
    '           <arg type="b" direction="out" name="success"/>' +
    '           <arg type="s" direction="out" name="returnValue"/>' +
    '       </method>' +
    '   </interface>' +
    '</node>';

class Extension {    
    ToggleOverview() {
        try {
            if (Main.overview.visible) {
                Main.overview.hide();
            } else {
                Main.overview.show();
            }
        } catch(error) {
            return [false, `${error}`]
        }
        return [true, '']
    }

    ToggleApplications() {
        try {
            if (Main.overview.visible) {
                Main.overview.hide();
            } else {
                Main.overview.showApps()
            }
        } catch(error) {
            return [false, `${error}`]
        }
        return [true, '']
    }

    enable() {
        this.dbus = Gio.DBusExportedObject.wrapJSObject(Iface, this);
        this.dbus.export(Gio.DBus.session, '/dev/lohann/ToggleOverview');
    }
    
    disable() {
        if (this.dbus) {
            this.dbus.flush();
            this.dbus.unexport();
            delete this.dbus;
        }
    }
}

function init() {
    log(`initializing ${Me.metadata.name}`);
    return new Extension();
}
