using CatalogService as service from '../../srv/cat-service';

annotate service.MaintenanceRecordSrv with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>MAINTENANCE_TYPE}',
                Value : MAINTENANCE_TYPE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>MAINTENANCE_DATE}',
                Value : MAINTENANCE_DATE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>DESCRIPTION}',
                Value : DESCRIPTION,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>SERVICE_PROVIDER}',
                Value : SERVICE_PROVIDER,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>COST}',
                Value : COST,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>NEXT_MAINTENANCE_DATE}',
                Value : NEXT_MAINTENANCE_DATE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>STATUS}',
                Value : STATUS,
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
            Label : '{i18n>MAINTENANCE_TYPE}',
            Value : MAINTENANCE_TYPE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>MAINTENANCE_DATE}',
            Value : MAINTENANCE_DATE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>DESCRIPTION}',
            Value : DESCRIPTION,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>SERVICE_PROVIDER}',
            Value : SERVICE_PROVIDER,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>COST}',
            Value : COST,
        },
    ],
);

annotate service.MaintenanceRecordSrv with {
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