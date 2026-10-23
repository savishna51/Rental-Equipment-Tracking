sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/retcl/maintenance/maintenance/test/integration/pages/MaintenanceRecordSrvList.gen",
	"com/retcl/maintenance/maintenance/test/integration/pages/MaintenanceRecordSrvObjectPage.gen"
], function (JourneyRunner, MaintenanceRecordSrvListGenerated, MaintenanceRecordSrvObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/retcl/maintenance/maintenance') + '/test/flp.html#app-preview',
        pages: {
			onTheMaintenanceRecordSrvListGenerated: MaintenanceRecordSrvListGenerated,
			onTheMaintenanceRecordSrvObjectPageGenerated: MaintenanceRecordSrvObjectPageGenerated
        },
        async: true
    });

    return runner;
});

