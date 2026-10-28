sap.ui.define([], function () {
    "use strict";

    var seed = 7;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

    function iso(d) {
        var p = function (n) { return (n < 10 ? "0" : "") + n; };
        return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
    }
    function daysAgo(n) { var d = new Date(); d.setDate(d.getDate() - n); return d; }
    function minsAgo(n) { return new Date(Date.now() - n * 60000).toISOString(); }

    function build() {
        seed = 7;
        var locs = [
            { ID: "L1", LOCATION_NAME: "North Yard", CITY: "Austin" },
            { ID: "L2", LOCATION_NAME: "West Depot", CITY: "Phoenix" },
            { ID: "L3", LOCATION_NAME: "East Hub", CITY: "Atlanta" }
        ];
        var types = [
            ["CAT 320 Excavator", "Excavator"], ["JLG 660SJ Boom Lift", "Boom Lift"], ["Bobcat S650 Loader", "Loader"],
            ["Genie GS-4390 RT", "Scissor Lift"], ["Kubota KX040 Mini Excavator", "Excavator"], ["Cat 262D Skid Steer", "Loader"]
        ];

        var equipments = [], rentalItems = [];
        for (var i = 0; i < 40; i++) {
            var t = types[i % types.length];
            var rented = i < 34;
            equipments.push({
                ID: "E" + i, LOCATION_ID: i === 39 ? null : locs[i % 3].ID,
                EQUIPMENT_NAME: t[0], EQUIPMENT_TYPE: t[1],
                SERIAL_NUMBER: "EQ-" + (2400 + i * 7),
                PURCHASE_DATE: iso(daysAgo(i < 2 ? 12 : 200 + i * 9)),
                CURRENT_STATUS: rented ? "RENTED" : (i < 37 ? "AVAILABLE" : (i === 37 ? "MAINTENANCE" : "DAMAGED"))
            });
            if (rented) {
                rentalItems.push({
                    ID: "R" + i, RENTAL_ID: "RN" + i, EQUIPMENT_ID: "E" + i,
                    START_DATE: iso(daysAgo(Math.max(0, 97 - Math.round(i * 2.95) - Math.round(rnd())))),
                    END_DATE: null, ITEM_STATUS: "RENTED"
                });
            }
            // a few historic, already returned rentals so older days are not empty
            if (i % 4 === 0) {
                var s = 100 + Math.round(rnd() * 20);
                rentalItems.push({
                    ID: "H" + i, RENTAL_ID: "RH" + i, EQUIPMENT_ID: "E" + i,
                    START_DATE: iso(daysAgo(s)), END_DATE: iso(daysAgo(s - 40)), ITEM_STATUS: "RETURNED"
                });
            }
        }

        var specs = [
            ["E0", "CRITICAL", 12, "Hydraulic arm dent", 2450, 4, "REPORTED"],
            ["E1", "GOOD", 34, "Guard rail damage", 780, 4, "REPORTED"],
            ["E2", "FAIR", 60, "Rear panel scrape", 420, 4, "REPORTED"],
            ["E3", "CRITICAL", 120, "Control cover cracked", 1190, 4, "REPORTED"],
            ["E4", "POOR", 300, "Track tension fault", 910, 2, "REPORTED"],
            ["E5", "CRITICAL", 480, "Cab glass shattered", 1620, 3, "REPORTED"],
            ["E6", "POOR", 190, "Bucket tooth missing", 360, 1, "REPORTED"]
        ];
        var conditionLogs = [], damages = [], photos = [];
        specs.forEach(function (s, k) {
            conditionLogs.push({
                ID: "C" + k, EQUIPMENT_ID: s[0], RENTAL_ID: "RN" + k, INSPECTION_DATE: minsAgo(s[2]),
                INSPECTION_TYPE: "RETURN", CONDITION_GRADE: s[1], INSPECTOR_NAME: "Demo Inspector", NOTES: ""
            });
            damages.push({
                ID: "D" + k, CONDITION_ID: "C" + k, DAMAGE_TYPE: "STRUCTURAL", DAMAGE_DESCRIPTION: s[3],
                SEVERITY: "HIGH", REPAIR_ESTIMATE: s[4], DAMAGE_STATUS: s[6]
            });
            for (var p = 0; p < s[5]; p++) { photos.push({ ID: "P" + k + "_" + p, DAMAGE_ID: "D" + k }); }
        });
        for (var g = 0; g < 11; g++) {
            conditionLogs.push({
                ID: "G" + g, EQUIPMENT_ID: "E" + (10 + g), RENTAL_ID: "RN" + (10 + g),
                INSPECTION_DATE: minsAgo(600 + g * 50), INSPECTION_TYPE: "RETURN",
                CONDITION_GRADE: g % 3 === 0 ? "CRITICAL" : "POOR", NOTES: "Needs review"
            });
        }

        var bills = [];
        var statuses = ["POSTED_TO_S4", "POSTED_TO_S4", "POSTED_TO_S4", "PAID", "APPROVED", "DRAFT"];
        for (var b = 0; b < 24; b++) {
            var st = statuses[b % statuses.length];
            bills.push({
                ID: "B" + b, DAMAGE_ID: "D" + (b % specs.length),
                BILL_DATE: iso(daysAgo(b < 20 ? Math.floor(b * 1.2) % (new Date().getDate()) : 35 + b)),
                TOTAL_AMOUNT: st === "DRAFT" || st === "APPROVED" ? 780 + b * 40 : 3400 + b * 95,
                BILLING_STATUS: st, S4_BILLING_DOCUMENT_ID: "EQ-" + (2480 + b)
            });
        }

        var maintenance = [
            { ID: "M1", EQUIPMENT_ID: "E37", MAINTENANCE_TYPE: "CORRECTIVE", MAINTENANCE_DATE: iso(daysAgo(0)), STATUS: "IN_PROGRESS" },
            { ID: "M2", EQUIPMENT_ID: "E20", MAINTENANCE_TYPE: "PREVENTIVE", MAINTENANCE_DATE: iso(daysAgo(2)), STATUS: "COMPLETED" }
        ];

        return {
            equipments: equipments, locations: locs, rentalItems: rentalItems, conditionLogs: conditionLogs,
            damages: damages, photos: photos, bills: bills, maintenance: maintenance
        };
    }

    return { build: build };
});
