using CatalogService as service from '../../srv/cat-service';

annotate service.ConditionLogSrv with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>INSPECTION_DATE}',
                Value : INSPECTION_DATE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>INSPECTION_TYPE}',
                Value : INSPECTION_TYPE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>CONDITION_GRADE}',
                Value : CONDITION_GRADE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>INSPECTOR_NAME}',
                Value : INSPECTOR_NAME,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>METER_READING}',
                Value : METER_READING,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>NOTES}',
                Value : NOTES,
            },
        ],
    },

    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : '{i18n>GENERAL_INFORMATION}',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],

    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : '{i18n>INSPECTION_DATE}',
            Value : INSPECTION_DATE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>INSPECTION_TYPE}',
            Value : INSPECTION_TYPE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>CONDITION_GRADE}',
            Value : CONDITION_GRADE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>INSPECTOR_NAME}',
            Value : INSPECTOR_NAME,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>METER_READING}',
            Value : METER_READING,
        },
    ],
);

annotate service.ConditionLogSrv with {
    EQUIPMENT @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'EquipmentSrv',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : EQUIPMENT_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'EQUIPMENT_NAME',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'EQUIPMENT_TYPE',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'MANUFACTURER',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'MODEL',
            },
        ],
    }
};

annotate service.ConditionLogSrv with {
    RENTAL @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'RentalSrv',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : RENTAL_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'RENTAL_DATE',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'EXPECTED_RETURN_DATE',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'ACTUAL_RETURN_DATE',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'RENTAL_STATUS',
            },
        ],
    }
};