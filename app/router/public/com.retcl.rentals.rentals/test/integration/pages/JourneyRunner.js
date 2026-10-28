sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/retcl/rentals/rentals/test/integration/pages/RentalSrvList.gen",
	"com/retcl/rentals/rentals/test/integration/pages/RentalSrvObjectPage.gen",
	"com/retcl/rentals/rentals/test/integration/pages/RentalItemSrvObjectPage.gen"
], function (JourneyRunner, RentalSrvListGenerated, RentalSrvObjectPageGenerated, RentalItemSrvObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/retcl/rentals/rentals') + '/test/flp.html#app-preview',
        pages: {
			onTheRentalSrvListGenerated: RentalSrvListGenerated,
			onTheRentalSrvObjectPageGenerated: RentalSrvObjectPageGenerated,
			onTheRentalItemSrvObjectPageGenerated: RentalItemSrvObjectPageGenerated
        },
        async: true
    });

    return runner;
});

