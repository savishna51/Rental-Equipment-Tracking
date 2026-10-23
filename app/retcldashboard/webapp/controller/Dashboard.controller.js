sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem"
], function (
    Controller,
    JSONModel,
    FlattenedDataset,
    FeedItem
)  {
    "use strict";

    return Controller.extend(
        "com.retcl.dashboard.retcldashboard.controller.Dashboard",
        {

            onInit: async function () {

                const oODataModel = this.getOwnerComponent().getModel();

//
// Active Fleet
//
const aEquipments = await oODataModel
    .bindList("/EquipmentSrv")
    .requestContexts();

let activeFleet = 0;

aEquipments.forEach(ctx => {

    const equipment = ctx.getObject();

    if (
        equipment.CURRENT_STATUS === "AVAILABLE" ||
        equipment.CURRENT_STATUS === "RENTED"
    ) {
        activeFleet++;
    }
});

this.byId("fleetCount")
    .setValue(activeFleet);

//
// Active Rentals
//
const aRentals = await oODataModel
    .bindList("/RentalSrv")
    .requestContexts();

let activeRentals = 0;

aRentals.forEach(ctx => {

    const rental = ctx.getObject();

    if (
        rental.RENTAL_STATUS === "ACTIVE"
    ) {
        activeRentals++;
    }
});

this.byId("rentalCount")
    .setValue(activeRentals);

//
// Open Inspections
//
const aInspections = await oODataModel
    .bindList("/ConditionLogSrv")
    .requestContexts();

let openInspections = 0;

aInspections.forEach(ctx => {

    const inspection = ctx.getObject();

    if (
        inspection.CONDITION_GRADE === "POOR" ||
        inspection.CONDITION_GRADE === "CRITICAL"
    ) {
        openInspections++;
    }
});

this.byId("inspectionCount")
    .setValue(openInspections);

//
// Open Repair Bills
//
const aBills = await oODataModel
    .bindList("/RepairBillSrv")
    .requestContexts();

let openBills = 0;

aBills.forEach(ctx => {

    const bill = ctx.getObject();

    if (
        bill.BILLING_STATUS === "DRAFT" ||
        bill.BILLING_STATUS === "APPROVED"
    ) {
        openBills++;
    }
});

this.byId("billingCount")
    .setValue(openBills);


const oData = {
    fleetData: [
        { Day: "Mon 14", Utilization: 23 },
        { Day: "Tue 15", Utilization: 45 },
        { Day: "Wed 16", Utilization: 60 },
        { Day: "Thu 17", Utilization: 74 },
        { Day: "Fri 18", Utilization: 75 },
        { Day: "Sat 19", Utilization: 81 },
        { Day: "Sun 20", Utilization: 97 }
    ]
};

const oModel = new JSONModel(oData);

this.getView().setModel(oModel);

const oChart = this.byId("fleetChart");

const oDataset = new FlattenedDataset({
    dimensions: [{
        name: "Day",
        value: "{Day}"
    }],
    measures: [{
        name: "Utilization",
        value: "{Utilization}"
    }],
    data: {
        path: "/fleetData"
    }
});

oChart.setDataset(oDataset);
oChart.setModel(oModel);

// Dimension Feed
oChart.addFeed(
    new FeedItem({
        uid: "categoryAxis",
        type: "Dimension",
        values: ["Day"]
    })
);

// Measure Feed
oChart.addFeed(
    new FeedItem({
        uid: "valueAxis",
        type: "Measure",
        values: ["Utilization"]
    })
);

oChart.setVizProperties({

    title: {
        visible: false
    },

    legend: {
        visible: false
    },

    valueAxis: {
        title: {
            visible: false
        },
        label: {
            formatString: "#'%'"
        }
    },

    categoryAxis: {
        title: {
            visible: false
        }
    },

    plotArea: {
        colorPalette: ["#356AE6"],
        dataLabel: {
            visible: false
        }
    }

});

    const oBillingData = {
    Billing: [
        {
            Status: "Posted",
            Amount: 84600
        },
        {
            Status: "Pending",
            Amount: 4640
        }
    ]
};

const oBillingModel =
    new JSONModel(oBillingData);

this.getView().setModel(
    oBillingModel,
    "billing"
);

const oBillingChart =
    this.byId("billingChart");

const oBillingDataset =
    new FlattenedDataset({

        dimensions: [{
            name: "Status",
            value: "{billing>Status}"
        }],

        measures: [{
            name: "Amount",
            value: "{billing>Amount}"
        }],

        data: {
            path: "billing>/Billing"
        }

    });

oBillingChart.setDataset(
    oBillingDataset
);

oBillingChart.setModel(
    oBillingModel,
    "billing"
);

oBillingChart.addFeed(
    new FeedItem({
        uid: "color",
        type: "Dimension",
        values: ["Status"]
    })
);

oBillingChart.addFeed(
    new FeedItem({
        uid: "size",
        type: "Measure",
        values: ["Amount"]
    })
);
oBillingChart.setVizProperties({
    title: {
        visible: false
    },
    legend: {
        visible: false
    },
    plotArea: {
        colorPalette: [
            "#38B878",
            "#F4A63E"
        ]
    }
});
},

            onFleetPress: function () {
                window.open(
                    "/fleet/index.html",
                    "_blank"
                );
            },

            onInspectionPress: function () {
                window.open(
                    "/inspections/index.html",
                    "_blank"
                );
            },

            onRentalPress: function () {
                window.open(
                    "/com.retcl.rentals.rentals/index.html",
                    "_blank"
                );
            },

            onBillingPress: function () {
                window.open(
                    "/com.retcl.billing.billing/index.html",
                    "_blank"
                );
            }

        }
    );
});