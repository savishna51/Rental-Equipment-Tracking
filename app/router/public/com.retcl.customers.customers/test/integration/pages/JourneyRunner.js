sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/retcl/customers/customers/test/integration/pages/CustomerSrvList.gen",
	"com/retcl/customers/customers/test/integration/pages/CustomerSrvObjectPage.gen",
	"com/retcl/customers/customers/test/integration/pages/RentalSrvObjectPage.gen"
], function (JourneyRunner, CustomerSrvListGenerated, CustomerSrvObjectPageGenerated, RentalSrvObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/retcl/customers/customers') + '/test/flp.html#app-preview',
        pages: {
			onTheCustomerSrvListGenerated: CustomerSrvListGenerated,
			onTheCustomerSrvObjectPageGenerated: CustomerSrvObjectPageGenerated,
			onTheRentalSrvObjectPageGenerated: RentalSrvObjectPageGenerated
        },
        async: true
    });

    return runner;
});

