sap.ui.define([], function () {
    "use strict";

    // ------------------------------------------------------------------ helpers
    function esc(s) {
        return String(s === null || s === undefined ? "" : s)
            .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }

    var ICONS = {
        grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
        truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
        clipboard: '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
        wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
        wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
        chart: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
        search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
        bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
        pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
        plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
        down: '<path d="m6 9 6 6 6-6"/>',
        right: '<path d="m9 18 6-6-6-6"/>',
        arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
        up: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
        dn: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
        camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
        check: '<path d="M20 6 9 17l-5-5"/>',
        sync: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
        clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
        download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
        filter: '<line x1="4" x2="20" y1="6" y2="6"/><line x1="7" x2="17" y1="12" y2="12"/><line x1="10" x2="14" y1="18" y2="18"/>',
        close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
        dots: '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>'
    };

    function ico(name, size) {
        size = size || 20;
        return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
            'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
    }

    function money(n) { return "$" + Math.round(n).toLocaleString("en-US"); }
    function moneyK(n) { return n >= 1000 ? "$" + (n / 1000).toFixed(1) + "k" : money(n); }
    function pct(n, d) { return Number(n).toFixed(d === undefined ? 1 : d) + "%"; }

    function ago(date, now) {
        if (!date) { return ""; }
        var m = Math.max(0, Math.round((now - date) / 60000));
        if (m < 1) { return "just now"; }
        if (m < 60) { return m + " min ago"; }
        var h = Math.round(m / 60);
        if (h < 24) { return h + (h === 1 ? " hr" : " hrs") + " ago"; }
        var d = Math.round(h / 24);
        return d + (d === 1 ? " day" : " days") + " ago";
    }

    function greeting(now) {
        var h = now.getHours();
        return h < 12 ? "Good morning" : (h < 18 ? "Good afternoon" : "Good evening");
    }

    function minSec(min) {
        var m = Math.floor(min), s = Math.round((min - m) * 60);
        return m + "m " + (s < 10 ? "0" : "") + s + "s";
    }

    // ------------------------------------------------------------------ charts
    function smooth(p, yMin, yMax) {
        if (p.length < 2) { return "M" + p[0][0] + "," + p[0][1]; }
        var clamp = function (y) { return Math.max(yMin, Math.min(yMax, y)); };
        var d = "M" + p[0][0].toFixed(1) + "," + p[0][1].toFixed(1);
        for (var i = 0; i < p.length - 1; i++) {
            var p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
            var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = clamp(p1[1] + (p2[1] - p0[1]) / 6);
            var c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = clamp(p2[1] - (p3[1] - p1[1]) / 6);
            d += " C" + c1x.toFixed(1) + "," + c1y.toFixed(1) + " " + c2x.toFixed(1) + "," + c2y.toFixed(1) + " " + p2[0].toFixed(1) + "," + p2[1].toFixed(1);
        }
        return d;
    }

    function areaChart(series) {
        var W = 900, H = 300, pl = 44, pr = 10, pt = 14, pb = 32;
        var n = series.length, iw = W - pl - pr, ih = H - pt - pb;
        var X = function (i) { return n > 1 ? pl + i * iw / (n - 1) : pl + iw / 2; };
        var Y = function (v) { return pt + (1 - Math.max(0, Math.min(100, v)) / 100) * ih; };
        var pts = series.map(function (s, i) { return [X(i), Y(s.value)]; });
        var line = smooth(pts, Y(100), Y(0));
        var area = line + " L" + X(n - 1).toFixed(1) + "," + Y(0) + " L" + X(0).toFixed(1) + "," + Y(0) + " Z";

        var grid = "";
        [100, 75, 50, 25, 0].forEach(function (v) {
            grid += '<line x1="' + pl + '" x2="' + (W - pr) + '" y1="' + Y(v) + '" y2="' + Y(v) + '" class="fl-grid"/>' +
                '<text x="' + (pl - 10) + '" y="' + (Y(v) + 4) + '" text-anchor="end" class="fl-axis">' + v + "%</text>";
        });

        var labels = "", shown = {}, k;
        var count = Math.min(n, 7);
        for (k = 0; k < count; k++) {
            var idx = count === 1 ? 0 : Math.round(k * (n - 1) / (count - 1));
            if (shown[idx]) { continue; }
            shown[idx] = true;
            var dt = series[idx].date;
            var txt = n <= 7
                ? dt.toLocaleDateString("en-US", { weekday: "short" }) + " " + dt.getDate()
                : dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            var anchor = idx === 0 ? "start" : (idx === n - 1 ? "end" : "middle");
            labels += '<text x="' + X(idx) + '" y="' + (H - 8) + '" text-anchor="' + anchor + '" class="fl-axis">' + esc(txt) + "</text>";
        }

        var data = series.map(function (s, i) {
            return {
                x: +X(i).toFixed(1), y: +Y(s.value).toFixed(1), v: s.value.toFixed(1) + "%",
                d: s.date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
            };
        });

        return '<div class="fl-chart" data-chart="' + esc(JSON.stringify({ W: W, pts: data })) + '">' +
            '<svg viewBox="0 0 ' + W + " " + H + '" class="fl-chart__svg" role="img" aria-label="Fleet utilization chart">' +
            '<defs><linearGradient id="flArea" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0" stop-color="#3b5bdb" stop-opacity="0.22"/><stop offset="1" stop-color="#3b5bdb" stop-opacity="0"/></linearGradient></defs>' +
            grid + '<path d="' + area + '" fill="url(#flArea)"/>' +
            '<path d="' + line + '" fill="none" stroke="#3b5bdb" stroke-width="2.4" stroke-linecap="round"/>' +
            labels + '<circle class="fl-marker" r="6" cx="-20" cy="-20"/></svg>' +
            '<div class="fl-tip" hidden><b></b><span></span></div></div>';
    }

    function barsSpark(vals) {
        var max = Math.max.apply(null, vals.concat([1])), min = Math.min.apply(null, vals);
        var span = Math.max(max - min, 1), out = "";
        vals.forEach(function (v, i) {
            var h = 6 + (v - min) / span * 20;
            out += '<rect x="' + (i * 6) + '" y="' + (30 - h) + '" width="3.5" height="' + h + '" rx="1.5"/>';
        });
        return '<svg class="fl-spark fl-spark--bars" viewBox="0 0 ' + (vals.length * 6) + ' 30" width="78" height="30">' + out + "</svg>";
    }

    function lineSpark(vals) {
        var W = 120, H = 34;
        var max = Math.max.apply(null, vals.concat([1])), min = Math.min.apply(null, vals);
        var span = Math.max(max - min, 1);
        var pts = vals.map(function (v, i) { return [i * W / (vals.length - 1), H - 3 - (v - min) / span * (H - 8)]; });
        var l = smooth(pts, 0, H);
        return '<svg class="fl-spark" viewBox="0 0 ' + W + " " + H + '" width="120" height="34" preserveAspectRatio="none">' +
            '<path d="' + l + " L" + W + "," + H + " L0," + H + ' Z" fill="#5db87d" opacity="0.18"/>' +
            '<path d="' + l + '" fill="none" stroke="#5db87d" stroke-width="1.6"/></svg>';
    }

    function donut(rate) {
        var r = 76, c = 2 * Math.PI * r, f = c * Math.max(0, Math.min(100, rate)) / 100;
        return '<svg viewBox="0 0 200 200" class="fl-donut__svg" role="img" aria-label="Recovery rate">' +
            '<circle cx="100" cy="100" r="' + r + '" fill="none" stroke="#eceee8" stroke-width="24"/>' +
            '<circle cx="100" cy="100" r="' + r + '" fill="none" stroke="#5db87d" stroke-width="24" ' +
            'stroke-dasharray="' + f.toFixed(2) + " " + (c - f).toFixed(2) + '" transform="rotate(-90 100 100)"/></svg>';
    }

    function ring(flags, total) {
        var r = 40, c = 2 * Math.PI * r, f = c * Math.min(1, flags / Math.max(total, 1));
        f = Math.max(f, flags > 0 ? c * 0.12 : 0);
        return '<svg viewBox="0 0 100 100" class="fl-ring__svg">' +
            '<circle cx="50" cy="50" r="' + r + '" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="6"/>' +
            '<circle cx="50" cy="50" r="' + r + '" fill="none" stroke="#e8672f" stroke-width="6" stroke-linecap="round" ' +
            'stroke-dasharray="' + f.toFixed(2) + " " + (c - f).toFixed(2) + '" transform="rotate(-90 50 50)"/></svg>';
    }

    // ------------------------------------------------------------------ sections
    function chip(kind, icon, text) {
        return '<span class="fl-chip fl-chip--' + kind + '">' + (icon ? ico(icon, 11) : "") + esc(text) + "</span>";
    }

    function sidebar(m, cfg) {
        function item(key, icon, label, badge, active) {
            return '<a class="fl-nav' + (active ? " is-active" : "") + '" data-action="nav" data-target="' + key + '">' +
                ico(icon, 20) + "<span>" + label + "</span>" +
                (badge !== null && badge !== undefined ? '<em class="fl-nav__badge">' + Number(badge).toLocaleString("en-US") + "</em>" : "") + "</a>";
        }
        var initials = cfg.userName.split(/\s+/).map(function (p) { return p.charAt(0); }).join("").slice(0, 2).toUpperCase();
        return '<aside class="fl-side">' +
            '<div class="fl-brand"><div class="fl-logo"><svg width="22" height="22" viewBox="0 0 22 22" fill="#fff">' +
            '<rect x="2" y="12" width="4" height="8" rx="1"/><rect x="9" y="6" width="4" height="14" rx="1"/><rect x="16" y="2" width="4" height="18" rx="1"/></svg></div>' +
            '<div><div class="fl-brand__name">' + esc(cfg.brand) + '</div><div class="fl-brand__sub">Rental operations</div></div></div>' +
            '<div class="fl-side__rule"></div><div class="fl-side__label">WORKSPACE</div>' +
            '<nav class="fl-navlist">' +
            item("overview", "grid", "Overview", null, true) +
            item("fleet", "truck", "Fleet", m.badges.fleet) +
            item("inspections", "clipboard", "Inspections", m.badges.inspections) +
            item("billing", "wallet", "Billing", m.badges.billing) +
            item("maintenance", "wrench", "Maintenance", null) +
            item("analytics", "chart", "Analytics", null) +
            "</nav>" +
            '<div class="fl-grow"></div>' +
            '<div class="fl-sync"><div class="fl-sync__head"><span class="fl-sync__ico">' + ico("sync", 18) + "</span><b>S/4HANA sync</b></div>" +
            '<div class="fl-sync__txt">All systems operational</div><div class="fl-sync__bar"><i></i></div>' +
            '<div class="fl-sync__sub">Last sync 2 minutes ago</div></div>' +
            '<div class="fl-user" data-action="profile" role="button" tabindex="0" aria-label="Open my profile"><span class="fl-avatar">' + esc(initials) + "</span>" +
            '<div><b>' + esc(cfg.userName) + "</b><small>" + esc(cfg.userRole) + "</small></div>" +
            '<span class="fl-user__dots">' + ico("dots", 18) + "</span></div></aside>";
    }

    function topbar(m, cfg) {
        var unread = m.notifications.length > 0 && !cfg.notifRead;
        return '<header class="fl-top"><label class="fl-search">' + ico("search", 18) +
            '<input id="flSearch" type="text" autocomplete="off" placeholder="Search assets, contracts, customers\u2026" value="' + esc(cfg.query) + '"/>' +
            '</label><div class="fl-grow"></div>' +
            '<button class="fl-bell' + (cfg.panel === "notif" ? " is-open" : "") + '" data-action="notifications" aria-label="Notifications" aria-expanded="' + (cfg.panel === "notif") + '">' +
            ico("bell", 20) + (unread ? "<i></i>" : "") + '</button>' +
            '<span class="fl-live"><i></i>Network live</span></header>';
    }

    function notifPanel(m, cfg) {
        var n = m.notifications.length, unread = n > 0 && !cfg.notifRead;
        var items = m.notifications.map(function (x) {
            return '<li class="fl-notif__item" data-action="notif-go" data-target="' + esc(x.target) + '" role="button" tabindex="0">' +
                '<span class="fl-act__ico fl-act__ico--' + x.kind + '">' + ico(x.icon, 16) + "</span>" +
                "<div><b>" + esc(x.title) + "</b><small>" + esc(x.sub) + "</small></div>" + ico("right", 16) + "</li>";
        }).join("");
        return '<div class="fl-backdrop" data-action="close-panel"></div>' +
            '<section class="fl-notif" role="dialog" aria-label="Notifications"><header><h3>Notifications</h3>' +
            (unread ? '<span class="fl-chip fl-chip--orange">' + n + " new</span>" : "") + "</header>" +
            "<ul>" + (items || '<li class="fl-empty">You\u2019re all caught up.</li>') + "</ul>" +
            '<footer><button class="fl-btn" data-action="mark-read">Mark all as read</button></footer></section>';
    }

    function profilePanel(m, cfg) {
        var initials = cfg.userName.split(/\s+/).map(function (p) { return p.charAt(0); }).join("").slice(0, 2).toUpperCase();
        function row(k, v) { return "<dt>" + k + "</dt><dd>" + esc(v) + "</dd>"; }
        return '<div class="fl-backdrop fl-backdrop--dim" data-action="close-panel"></div>' +
            '<section class="fl-profile" role="dialog" aria-label="My profile">' +
            '<button class="fl-profile__x" data-action="close-panel" aria-label="Close">' + ico("close", 18) + "</button>" +
            '<div class="fl-profile__hero"><span class="fl-avatar fl-avatar--lg">' + esc(initials) + "</span>" +
            "<h3>" + esc(cfg.userName) + "</h3><p>" + esc(cfg.userRole) + "</p></div>" +
            "<dl>" + row("Email", cfg.userEmail) + row("Role", cfg.userRole) + row("Organization", cfg.brand) + row("Location access", "All locations") + "</dl>" +
            '<div class="fl-profile__actions"><button class="fl-btn" data-action="close-panel">Close</button></div></section>';
    }

    function header(m, cfg) {
        var opts = '<option value="">All locations</option>' + m.locations.map(function (l) {
            return '<option value="' + esc(l.id) + '"' + (l.id === cfg.locationId ? " selected" : "") + ">" + esc(l.name) + "</option>";
        }).join("");
        return '<section class="fl-head"><div><div class="fl-eyebrow">OPERATIONS CONTROL</div>' +
            "<h1>" + greeting(m.now) + ", " + esc(cfg.userName.split(/\s+/)[0]) + ".</h1>" +
            "<p>Here\u2019s what needs your attention across the rental network.</p></div>" +
            '<div class="fl-head__actions"><label class="fl-select">' + ico("pin", 16) +
            '<select id="flLocation" aria-label="Location">' + opts + "</select>" + ico("down", 16) + "</label>" +
            '<button class="fl-btn fl-btn--primary" data-action="new-inspection">' + ico("plus", 18) + "New inspection</button></div></section>";
    }

    function kpis(m, cfg) {
        var f = m.fleet, p = m.pending, r = m.recovered, b = m.billingTime;
        var pctBar = Math.min(100, b.minutes / Math.max(b.target, 1) * 100);
        var inside = b.minutes <= b.target;
        return '<section class="fl-kpis">' +
            // Active fleet
            '<article class="fl-card fl-kpi" data-action="nav" data-target="fleet"><div class="fl-kpi__top"><span class="fl-ico fl-ico--blue">' + ico("truck", 20) + "</span>" +
            chip("green", "up", pct(f.growth)) + "</div>" +
            '<div class="fl-kpi__label">Active fleet</div><div class="fl-kpi__value">' + f.count.toLocaleString("en-US") + "</div>" +
            '<div class="fl-kpi__foot"><span><b>' + Math.round(f.utilNow) + "%</b> currently utilized</span>" + barsSpark(f.bars) + "</div></article>" +
            // Pending inspections
            '<article class="fl-card fl-kpi fl-kpi--alert"><div class="fl-kpi__top"><span class="fl-ico fl-ico--orange">' + ico("clipboard", 20) + "</span>" +
            (p.urgent ? chip("orange", "", p.urgent + " urgent") : "") + "</div>" +
            '<div class="fl-kpi__label">Pending inspections</div><div class="fl-kpi__value">' + p.count + "</div>" +
            '<div class="fl-kpi__foot"><span><b>' + p.waiting + "</b> waiting over 2 hours</span>" +
            '<a class="fl-link fl-link--orange" data-action="goto-queue">Review queue ' + ico("arrow", 14) + "</a></div></article>" +
            // Recovered
            '<article class="fl-card fl-kpi" data-action="nav" data-target="billing"><div class="fl-kpi__top"><span class="fl-ico fl-ico--green">' + ico("wallet", 20) + "</span>" +
            (r.delta === null ? "" : chip(r.delta >= 0 ? "green" : "red", r.delta >= 0 ? "up" : "dn", pct(Math.abs(r.delta)))) + "</div>" +
            '<div class="fl-kpi__label">Recovered ' + esc(r.scope) + '</div><div class="fl-kpi__value">' + moneyK(r.amount) + "</div>" +
            '<div class="fl-kpi__foot"><span><b>' + pct(r.rate) + "</b> damage recovery rate</span>" + lineSpark(r.spark) + "</div></article>" +
            // Avg billing time
            '<article class="fl-card fl-kpi"><div class="fl-kpi__top"><span class="fl-ico fl-ico--purple">' + ico("clock", 20) + "</span>" +
            chip(inside ? "green" : "red", inside ? "dn" : "up", Math.abs(Math.round(b.target - b.minutes)) + " min") + "</div>" +
            '<div class="fl-kpi__label">Avg. billing time</div><div class="fl-kpi__value">' + minSec(b.minutes) + "</div>" +
            '<div class="fl-kpi__foot fl-kpi__foot--col"><span><b>' + (inside ? "Inside" : "Over") + "</b> " + b.target + ' minute target</span>' +
            '<div class="fl-progress"><i style="width:' + pctBar.toFixed(0) + '%"></i></div><small>Target ' + b.target + "m</small></div></article></section>";
    }

    function utilizationCard(m, cfg) {
        var u = m.util, d = u.delta;
        function seg(days, label) {
            return '<button class="fl-seg__b' + (cfg.periodDays === days ? " is-on" : "") + '" data-action="period" data-days="' + days + '">' + label + "</button>";
        }
        return '<article class="fl-card fl-util"><div class="fl-card__head"><div><h2>Fleet utilization</h2><p>Active rentals across ' +
            (cfg.locationId ? "this location" : "all locations") + '</p></div><div class="fl-seg">' +
            seg(7, "7 days") + seg(30, "30 days") + seg(90, "90 days") + "</div></div>" +
            '<div class="fl-util__big"><b>' + pct(u.avg) + "</b><span class=\"" + (d >= 0 ? "pos" : "neg") + '">' + (d >= 0 ? "+" : "-") + Math.abs(d).toFixed(1) + "%</span> vs previous period</div>" +
            areaChart(u.series) + "</article>";
    }

    function billingCard(m) {
        var b = m.billing;
        return '<article class="fl-card fl-bill"><div class="fl-card__head"><div><h2>Billing health</h2><p>' + esc(b.title) + "</p></div>" +
            '<button class="fl-more" aria-label="More">' + ico("dots", 20) + "</button></div>" +
            '<div class="fl-bill__body"><div class="fl-donut">' + donut(b.rate) +
            '<div class="fl-donut__c"><b>' + pct(b.rate) + "</b><span>recovered</span></div></div>" +
            '<div class="fl-bill__legend"><b class="fl-bill__total">' + money(b.eligible) + "</b><span>Eligible charges</span>" +
            '<dl><dt><i class="dot dot--green"></i>Posted</dt><dd>' + money(b.posted) + "</dd>" +
            '<dt><i class="dot dot--amber"></i>Pending</dt><dd>' + money(b.pending) + "</dd></dl></div></div>" +
            '<div class="fl-card__foot"><a class="fl-link" data-action="nav" data-target="billing">Open billing center ' + ico("arrow", 14) + "</a></div></article>";
    }

    function queueRows(m, cfg) {
        var q = (m.queue || []).filter(function (r) {
            if (cfg.urgentOnly && !r.urgent) { return false; }
            if (cfg.query) {
                var hay = (r.name + " " + r.code + " " + r.title + " " + r.location).toLowerCase();
                if (hay.indexOf(cfg.query.toLowerCase()) < 0) { return false; }
            }
            return true;
        });
        var rows = q.slice(0, 4).map(function (r) {
            return '<div class="fl-qrow" data-action="open-inspection" data-id="' + esc(r.id) + '">' +
                '<div class="fl-asset"><span class="fl-thumb">' + ico("truck", 22) + '</span><div><b>' + esc(r.name) + "</b><small>" +
                esc(r.code) + (r.location ? " \u00B7 " + esc(r.location) : "") + "</small></div></div>" +
                '<div class="fl-dmg"><b>' + esc(r.title) + "</b><small>" + ico("camera", 13) + " " + r.photos + " photo" + (r.photos === 1 ? "" : "s") +
                " \u00B7 " + esc(ago(r.when, m.now)) + "</small></div>" +
                '<div><span class="fl-grade fl-grade--' + r.grade + '">' + r.grade + "</span></div>" +
                '<div class="fl-charge">' + money(r.estimate) + "</div>" +
                '<div><span class="fl-iconbtn">' + ico("right", 16) + "</span></div></div>";
        }).join("");
        if (!rows) { rows = '<div class="fl-empty">No inspections waiting for review.</div>'; }
        var more = '<div class="fl-queue__more"><a class="fl-link" data-action="nav" data-target="inspections">View all ' + m.queue.length +
            " inspections " + ico("arrow", 14) + "</a></div>";
        return rows + more;
    }

    function queueCard(m, cfg) {
        return '<article class="fl-card fl-queue" id="flQueue"><div class="fl-card__head"><div><h2>Inspection queue</h2><p>Returns requiring review or approval</p></div>' +
            '<div class="fl-queue__tools"><button class="fl-btn' + (cfg.urgentOnly ? " is-on" : "") + '" data-action="filter">' + ico("filter", 16) + "Filter</button>" +
            '<button class="fl-btn" data-action="export">' + ico("download", 16) + "Export</button></div></div>" +
            '<div class="fl-qhead"><span>ASSET</span><span>DAMAGE REPORT</span><span>CONDITION</span><span>EST. CHARGE</span><span></span></div>' +
            '<div id="flQueueBody">' + queueRows(m, cfg) + "</div></article>";
    }

    function activityCard(m) {
        var cls = { post: "green", damage: "orange", "return": "blue", sync: "purple" };
        var icn = { post: "check", damage: "camera", "return": "truck", sync: "sync" };
        var items = m.activity.map(function (a) {
            return '<li><span class="fl-act__ico fl-act__ico--' + cls[a.type] + '">' + ico(icn[a.type], 16) + "</span><div><b>" + esc(a.title) +
                "</b><small>" + esc(a.sub) + "</small><small class=\"fl-act__t\">" + esc(ago(a.at, m.now)) + "</small></div></li>";
        }).join("");
        return '<article class="fl-card fl-act"><div class="fl-card__head"><div><h2>Live activity</h2><p>Across your network</p></div>' +
            '<span class="fl-pill"><i></i>Live</span></div><ul>' + (items || '<li class="fl-empty">No recent activity.</li>') + "</ul></article>";
    }

    function coverageCard(m) {
        var c = m.coverage;
        return '<article class="fl-cover"><div><div class="fl-cover__eyebrow">LOCATION COVERAGE</div><b class="fl-cover__pct">' + pct(c.pct) + "</b>" +
            "<p>" + c.flags + " asset" + (c.flags === 1 ? " needs" : "s need") + " a location update.</p>" +
            '<a class="fl-link fl-link--orange" data-action="nav" data-target="fleet">Resolve exceptions ' + ico("arrow", 14) + "</a></div>" +
            '<div class="fl-ring">' + ring(c.flags, m.fleet.count) + "<span><b>" + c.flags + "</b><small>flags</small></span></div></article>";
    }

    // ------------------------------------------------------------------ public
    function page(m, cfg) {
        return sidebar(m, cfg) +
            '<div class="fl-main">' + topbar(m, cfg) + '<div class="fl-content">' + header(m, cfg) + kpis(m, cfg) +
            '<section class="fl-row fl-row--a">' + utilizationCard(m, cfg) + billingCard(m) + "</section>" +
            '<section class="fl-row fl-row--b">' + queueCard(m, cfg) + '<div class="fl-stack">' + activityCard(m) + coverageCard(m) + "</div></section>" +
            "</div></div>" +
            (cfg.panel === "notif" ? notifPanel(m, cfg) : "") + (cfg.panel === "profile" ? profilePanel(m, cfg) : "");
    }

    function skeleton() {
        return '<div class="fl-loading"><div class="fl-spinner"></div><span>Loading dashboard\u2026</span></div>';
    }

    // Hover tooltip for the area chart
    function bindChart(root) {
        var wrap = root.querySelector(".fl-chart");
        if (!wrap) { return; }
        var cfg = JSON.parse(wrap.getAttribute("data-chart"));
        var svg = wrap.querySelector("svg"), marker = wrap.querySelector(".fl-marker"), tip = wrap.querySelector(".fl-tip");
        function show(i) {
            var p = cfg.pts[i];
            if (!p) { return; }
            marker.setAttribute("cx", p.x); marker.setAttribute("cy", p.y);
            tip.hidden = false;
            tip.querySelector("b").textContent = p.v;
            tip.querySelector("span").textContent = p.d;
            var w = wrap.clientWidth;
            tip.style.left = (p.x / cfg.W * w) + "px";
            tip.style.top = (p.y / (cfg.W / 3) * (wrap.clientWidth / 3)) + "px";
        }
        svg.addEventListener("mousemove", function (e) {
            var r = svg.getBoundingClientRect();
            var x = (e.clientX - r.left) / r.width * cfg.W, best = 0, bd = Infinity;
            cfg.pts.forEach(function (p, i) { var d = Math.abs(p.x - x); if (d < bd) { bd = d; best = i; } });
            show(best);
        });
        show(Math.min(cfg.pts.length - 1, Math.round((cfg.pts.length - 1) * 0.67)));
    }

    return { page: page, skeleton: skeleton, queueRows: queueRows, bindChart: bindChart, esc: esc };
});