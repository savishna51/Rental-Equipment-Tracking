using CatalogService as service from '../../srv/cat-service';

annotate service.MaintenanceRecordSrv with @(
    UI.SelectionFields : [
        STATUS,
        SERVICE_DUE_STATUS,
        MAINTENANCE_TYPE,
        EQUIPMENT_ID,
        NEXT_MAINTENANCE_DATE,
    ],
    UI.HeaderInfo : {
        TypeName       : 'Maintenance Record',
        TypeNamePlural : 'Maintenance Records',
        Title          : { Value : EQUIPMENT.EQUIPMENT_NAME },
        Description    : { Value : MAINTENANCE_TYPE },
    },
    UI.DataPoint #Status : {
        Value       : STATUS,
        Title       : '{i18n>STATUS}',
        Criticality : STATUS_CRITICALITY,
        CriticalityRepresentation : #WithIcon,
    },
    UI.DataPoint #NextService : {
        Value       : SERVICE_DUE_STATUS,
        Title       : '{i18n>SERVICE_DUE_STATUS}',
        Criticality : NEXT_SERVICE_CRITICALITY,
        CriticalityRepresentation : #WithIcon,
    },
    UI.HeaderFacets : [
        {
            $Type  : 'UI.ReferenceFacet',
            Target : '@UI.DataPoint#Status',
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Target : '@UI.DataPoint#NextService',
        },
    ],
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>EQUIPMENT}',
                Value : EQUIPMENT_ID,
            },
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
                Criticality : NEXT_SERVICE_CRITICALITY,
                CriticalityRepresentation : #WithIcon,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>SERVICE_DUE_STATUS}',
                Value : SERVICE_DUE_STATUS,
                Criticality : NEXT_SERVICE_CRITICALITY,
                CriticalityRepresentation : #WithIcon,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>STATUS}',
                Value : STATUS,
                Criticality : STATUS_CRITICALITY,
                CriticalityRepresentation : #WithIcon,
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
        {
            $Type : 'UI.DataField',
            Label : '{i18n>NEXT_MAINTENANCE_DATE}',
            Value : NEXT_MAINTENANCE_DATE,
            Criticality : NEXT_SERVICE_CRITICALITY,
            CriticalityRepresentation : #WithIcon,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>SERVICE_DUE_STATUS}',
            Value : SERVICE_DUE_STATUS,
            Criticality : NEXT_SERVICE_CRITICALITY,
            CriticalityRepresentation : #WithIcon,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>STATUS}',
            Value : STATUS,
            Criticality : STATUS_CRITICALITY,
            CriticalityRepresentation : #WithIcon,
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