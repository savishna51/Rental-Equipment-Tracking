sap.ui.define([], function () {
    "use strict";

    var DAY = 86400000;

    var OUT = { RENTED: true, RETURNED: true, DAMAGED: true };
    var POSTED = { POSTED_TO_S4: true, PAID: true };
    var PENDING = { DRAFT: true, APPROVED: true };
    var NEEDS_REVIEW = { FAIR: true, POOR: true, CRITICAL: true };
    var GRADE_LETTER = { EXCELLENT: "A", GOOD: "B", FAIR: "C", POOR: "D", CRITICAL: "D" };

    function num(v) {
        var n = Number(v);
        return isFinite(n) ? n : 0;
    }

    function parse(v) {
        if (!v) { return null; }
        if (v instanceof Date) { return v; }
        var d = /^\d{4}-\d{2}-\d{2}$/.test(v) ? new Date(v + "T00:00:00") : new Date(v);
        return isNaN(d.getTime()) ? null : d;
    }

    function sod(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
    function addDays(d, k) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + k); }

    function utilAt(items, denom, day, today) {
        var seen = {}, n = 0;
        items.forEach(function (it) {
            if (!OUT[it.ITEM_STATUS]) { return; }
            var s = parse(it.START_DATE);
            if (!s || s > day) { return; }
            var e = parse(it.END_DATE);
            if (!e) {
                if (it.ITEM_STATUS !== "RENTED") { return; }
                e = today;
            }
            if (e < day) { return; }
            if (!seen[it.EQUIPMENT_ID]) { seen[it.EQUIPMENT_ID] = true; n++; }
        });
        return denom ? Math.min(100, n / denom * 100) : 0;
    }

    function series(items, denom, today, n, offset) {
        var out = [];
        for (var i = n - 1; i >= 0; i--) {
            var day = addDays(today, -(i + offset));
            out.push({ date: day, value: utilAt(items, denom, day, today) });
        }
        return out;
    }

    function avg(arr) {
        if (!arr.length) { return 0; }
        return arr.reduce(function (a, b) { return a + b.value; }, 0) / arr.length;
    }

    function index(arr, key) {
        var m = {};
        arr.forEach(function (o) { m[o[key]] = o; });
        return m;
    }

    function build(raw, opts) {
        opts = opts || {};
        var now = opts.now || new Date();
        var today = sod(now);
        var locId = opts.locationId || "";
        var periodDays = opts.periodDays || 7;

        var equipAll = raw.equipments || [];
        var equip = locId ? equipAll.filter(function (e) { return e.LOCATION_ID === locId; }) : equipAll;
        var eqSet = {};
        equip.forEach(function (e) { eqSet[e.ID] = true; });
        var eqById = index(equipAll, "ID");
        var locById = index(raw.locations || [], "ID");
        var inScope = function (eqId) { return !locId || eqSet[eqId] === true; };

        function eqCode(e) { return e ? (e.SERIAL_NUMBER || ("EQ-" + String(e.ID).slice(0, 4).toUpperCase())) : "-"; }
        function eqLoc(e) { var l = e && locById[e.LOCATION_ID]; return l ? l.LOCATION_NAME : ""; }

        var active = equip.filter(function (e) { return e.CURRENT_STATUS !== "RETIRED"; });
        var activeCount = active.length;
        var rentedNow = active.filter(function (e) { return e.CURRENT_STATUS === "RENTED"; }).length;
        var utilNow = activeCount ? rentedNow / activeCount * 100 : 0;
        var newEq = equip.filter(function (e) {
            var d = parse(e.PURCHASE_DATE);
            return d && d <= today && (today - d) <= 30 * DAY;
        }).length;
        var growth = (activeCount - newEq) > 0 ? newEq / (activeCount - newEq) * 100 : 0;

        var items = (raw.rentalItems || []).filter(function (r) { return inScope(r.EQUIPMENT_ID); });
        var denom = activeCount || equip.length;
        var cur = series(items, denom, today, periodDays, 0);
        var prev = series(items, denom, today, periodDays, periodDays);
        var bars = series(items, denom, today, 14, 0).map(function (p) { return p.value; });

        var dmgById = index(raw.damages || [], "ID");
        var condById = index(raw.conditionLogs || [], "ID");
        var damagesByCond = {};
        (raw.damages || []).forEach(function (d) {
            (damagesByCond[d.CONDITION_ID] = damagesByCond[d.CONDITION_ID] || []).push(d);
        });
        var photosByDmg = {};
        (raw.photos || []).forEach(function (p) { photosByDmg[p.DAMAGE_ID] = (photosByDmg[p.DAMAGE_ID] || 0) + 1; });

        var queue = (raw.conditionLogs || [])
            .filter(function (c) {
                if (!inScope(c.EQUIPMENT_ID)) { return false; }
                var reported = (damagesByCond[c.ID] || []).some(function (d) { return d.DAMAGE_STATUS === "REPORTED"; });
                return NEEDS_REVIEW[c.CONDITION_GRADE] === true || reported;
            })
            .map(function (c) {
                var e = eqById[c.EQUIPMENT_ID];
                var dms = damagesByCond[c.ID] || [];
                var first = dms[0];
                var title = first ? (first.DAMAGE_DESCRIPTION || first.DAMAGE_TYPE) : (c.NOTES || "Condition review required");
                if (dms.length > 1) { title += " +" + (dms.length - 1) + " more"; }
                var photos = 0, est = 0;
                dms.forEach(function (d) { photos += photosByDmg[d.ID] || 0; est += num(d.REPAIR_ESTIMATE); });
                return {
                    id: c.ID,
                    name: e ? e.EQUIPMENT_NAME : "Unknown equipment",
                    code: eqCode(e),
                    location: eqLoc(e),
                    title: title,
                    photos: photos,
                    when: parse(c.INSPECTION_DATE),
                    grade: GRADE_LETTER[c.CONDITION_GRADE] || "C",
                    urgent: c.CONDITION_GRADE === "CRITICAL",
                    estimate: est
                };
            })
            .sort(function (a, b) { return (b.when || 0) - (a.when || 0); });

        var urgent = queue.filter(function (q) { return q.urgent; }).length;
        var waiting = queue.filter(function (q) { return q.when && (now - q.when) > 2 * 3600000; }).length;

        function billEq(b) {
            var d = dmgById[b.DAMAGE_ID];
            var c = d && condById[d.CONDITION_ID];
            return c && c.EQUIPMENT_ID;
        }
        var bills = (raw.bills || []).filter(function (b) { return !locId || eqSet[billEq(b)] === true; });
        var billAmt = function (b) { return num(b.TOTAL_AMOUNT) || num(b.REPAIR_AMOUNT); };
        var monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        var prevMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        var inMonth = bills.filter(function (b) { var d = parse(b.BILL_DATE); return d && d >= monthStart; });
        var fallback = !inMonth.length && bills.length > 0;
        var used = fallback ? bills : inMonth;

        var posted = 0, pending = 0;
        used.forEach(function (b) {
            if (POSTED[b.BILLING_STATUS]) { posted += billAmt(b); }
            else if (PENDING[b.BILLING_STATUS]) { pending += billAmt(b); }
        });
        var eligible = posted + pending;
        var rate = eligible ? posted / eligible * 100 : 0;

        var prevPosted = 0;
        bills.forEach(function (b) {
            var d = parse(b.BILL_DATE);
            if (d && d >= prevMonthStart && d < monthStart && POSTED[b.BILLING_STATUS]) { prevPosted += billAmt(b); }
        });
        var recDelta = (!fallback && prevPosted > 0) ? (posted - prevPosted) / prevPosted * 100 : null;

        var spark = [];
        for (var i = 13; i >= 0; i--) {
            var day = addDays(today, -i), sum = 0;
            bills.forEach(function (b) {
                var d = parse(b.BILL_DATE);
                if (d && d <= day && POSTED[b.BILLING_STATUS]) { sum += billAmt(b); }
            });
            spark.push(sum);
        }
        var openBills = bills.filter(function (b) { return PENDING[b.BILLING_STATUS]; }).length;

        var feed = [];
        bills.forEach(function (b) {
            if (POSTED[b.BILLING_STATUS]) {
                var q = eqById[billEq(b)];
                feed.push({
                    type: "post", title: "Charge posted to S/4HANA",
                    sub: (b.S4_BILLING_DOCUMENT_ID || eqCode(q)) + " \u00B7 $" + Math.round(billAmt(b)).toLocaleString("en-US"),
                    at: parse(b.BILL_DATE)
                });
            }
        });
        (raw.conditionLogs || []).forEach(function (c) {
            if (!inScope(c.EQUIPMENT_ID)) { return; }
            var e = eqById[c.EQUIPMENT_ID];
            var sub = eqCode(e) + (eqLoc(e) ? " \u00B7 " + eqLoc(e) : "");
            if ((damagesByCond[c.ID] || []).length) {
                feed.push({ type: "damage", title: "New damage reported", sub: sub, at: parse(c.INSPECTION_DATE) });
            } else if (c.INSPECTION_TYPE === "RETURN") {
                feed.push({ type: "return", title: "Asset returned", sub: sub, at: parse(c.INSPECTION_DATE) });
            }
        });
        (raw.maintenance || []).forEach(function (m) {
            if (!inScope(m.EQUIPMENT_ID)) { return; }
            var e = eqById[m.EQUIPMENT_ID];
            feed.push({
                type: "sync",
                title: m.STATUS === "COMPLETED" ? "Maintenance completed" : "Maintenance " + String(m.STATUS || "").toLowerCase().replace("_", " "),
                sub: eqCode(e) + " \u00B7 " + String(m.MAINTENANCE_TYPE || "").toLowerCase(),
                at: parse(m.MAINTENANCE_DATE)
            });
        });
        feed = feed.filter(function (f) { return f.at; }).sort(function (a, b) { return b.at - a.at; }).slice(0, 4);

        var withLoc = equipAll.filter(function (e) { return e.LOCATION_ID && locById[e.LOCATION_ID]; }).length;
        var flags = equipAll.length - withLoc;
        var coverage = equipAll.length ? withLoc / equipAll.length * 100 : 100;

        var notifications = [];
        var plural = function (n, one, many) { return n + " " + (n === 1 ? one : many); };
        if (urgent) {
            notifications.push({ kind: "orange", icon: "clipboard", target: "inspections",
                title: plural(urgent, "urgent inspection needs", "urgent inspections need") + " review",
                sub: "Critical condition reported on return" });
        }
        if (waiting) {
            notifications.push({ kind: "purple", icon: "clock", target: "inspections",
                title: plural(waiting, "inspection", "inspections") + " waiting over 2 hours",
                sub: "Review before the equipment is released" });
        }
        if (openBills) {
            notifications.push({ kind: "green", icon: "wallet", target: "billing",
                title: plural(openBills, "repair bill", "repair bills") + " awaiting posting",
                sub: "Draft or approved, not yet sent to S/4HANA" });
        }
        if (flags) {
            notifications.push({ kind: "blue", icon: "pin", target: "fleet",
                title: plural(flags, "asset needs", "assets need") + " a location update",
                sub: "Resolve in the fleet app" });
        }

        return {
            now: now,
            locations: ((raw.locations && raw.locations.length ? raw.locations : (opts.fallbackLocations || [])))
                .map(function (l) { return { id: l.ID, name: l.LOCATION_NAME }; })
                .sort(function (a, b) { return a.name.localeCompare(b.name); }),
            locationsAreSamples: !(raw.locations && raw.locations.length) && !!(opts.fallbackLocations && opts.fallbackLocations.length),
            notifications: notifications,
            fleet: { count: activeCount, growth: growth, utilNow: utilNow, bars: bars },
            pending: { count: queue.length, urgent: urgent, waiting: waiting },
            recovered: {
                amount: posted, delta: recDelta, rate: rate, spark: spark,
                scope: fallback ? "all time" : "this month"
            },
            billingTime: { minutes: opts.avgBillingMinutes || 0, target: 15 },
            util: { series: cur, avg: avg(cur), delta: avg(cur) - avg(prev), periodDays: periodDays },
            billing: {
                eligible: eligible, posted: posted, pending: pending, rate: rate,
                title: (fallback ? "All-time" : now.toLocaleDateString("en-US", { month: "long" })) + " recovery funnel"
            },
            queue: queue,
            activity: feed,
            coverage: { pct: coverage, flags: flags },
            badges: { fleet: activeCount, inspections: queue.length, billing: openBills }
        };
    }

    return { build: build };
});