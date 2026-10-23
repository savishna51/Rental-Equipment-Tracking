sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"fleet/test/integration/pages/EquipmentSrvList.gen",
	"fleet/test/integration/pages/EquipmentSrvObjectPage.gen",
	"fleet/test/integration/pages/ConditionLogSrvObjectPage.gen"
], function (JourneyRunner, EquipmentSrvListGenerated, EquipmentSrvObjectPageGenerated, ConditionLogSrvObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('fleet') + '/test/flp.html#app-preview',
        pages: {
			onTheEquipmentSrvListGenerated: EquipmentSrvListGenerated,
			onTheEquipmentSrvObjectPageGenerated: EquipmentSrvObjectPageGenerated,
			onTheConditionLogSrvObjectPageGenerated: ConditionLogSrvObjectPageGenerated
        },
        async: true
    });

    return runner;
});

