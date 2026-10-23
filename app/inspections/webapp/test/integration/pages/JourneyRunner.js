sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"inspections/test/integration/pages/ConditionLogSrvList.gen",
	"inspections/test/integration/pages/ConditionLogSrvObjectPage.gen",
	"inspections/test/integration/pages/DamageRecordSrvObjectPage.gen"
], function (JourneyRunner, ConditionLogSrvListGenerated, ConditionLogSrvObjectPageGenerated, DamageRecordSrvObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('inspections') + '/test/flp.html#app-preview',
        pages: {
			onTheConditionLogSrvListGenerated: ConditionLogSrvListGenerated,
			onTheConditionLogSrvObjectPageGenerated: ConditionLogSrvObjectPageGenerated,
			onTheDamageRecordSrvObjectPageGenerated: DamageRecordSrvObjectPageGenerated
        },
        async: true
    });

    return runner;
});

