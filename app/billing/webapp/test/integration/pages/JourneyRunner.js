sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/retcl/billing/billing/test/integration/pages/RepairBillSrvList.gen",
	"com/retcl/billing/billing/test/integration/pages/RepairBillSrvObjectPage.gen"
], function (JourneyRunner, RepairBillSrvListGenerated, RepairBillSrvObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/retcl/billing/billing') + '/test/flp.html#app-preview',
        pages: {
			onTheRepairBillSrvListGenerated: RepairBillSrvListGenerated,
			onTheRepairBillSrvObjectPageGenerated: RepairBillSrvObjectPageGenerated
        },
        async: true
    });

    return runner;
});

