using CatalogService as service from '../../srv/cat-service';

annotate service.EquipmentSrv with @(
    UI.SelectionFields : [
        CURRENT_STATUS,
        SERVICE_STATUS,
        EQUIPMENT_TYPE,
        LOCATION_ID,
    ],

    UI.HeaderInfo : {
        TypeName       : 'Equipment',
        TypeNamePlural : 'Equipment',
        Title          : { Value : EQUIPMENT_NAME },
        Description    : { Value : SERIAL_NUMBER },
    },
    UI.DataPoint #Status : {
        Value       : CURRENT_STATUS,
        Title       : '{i18n>CURRENT_STATUS}',
        Criticality : STATUS_CRITICALITY,
        CriticalityRepresentation : #WithIcon,
    },
    UI.DataPoint #Service : {
        Value       : SERVICE_STATUS,
        Title       : '{i18n>SERVICE_STATUS}',
        Criticality : SERVICE_CRITICALITY,
        CriticalityRepresentation : #WithIcon,
    },
    UI.HeaderFacets : [
        {
            $Type  : 'UI.ReferenceFacet',
            Target : '@UI.DataPoint#Status',
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Target : '@UI.DataPoint#Service',
        },
    ],

    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>EQUIPMENT_NAME}',
                Value : EQUIPMENT_NAME,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>EQUIPMENT_TYPE}',
                Value : EQUIPMENT_TYPE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>MANUFACTURER}',
                Value : MANUFACTURER,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>MODEL}',
                Value : MODEL,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>SERIAL_NUMBER}',
                Value : SERIAL_NUMBER,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>LOCATION}',
                Value : LOCATION_ID,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>PURCHASE_DATE}',
                Value : PURCHASE_DATE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>RENTAL_RATE_PER_DAY}',
                Value : RENTAL_RATE_PER_DAY,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>CURRENT_STATUS}',
                Value : CURRENT_STATUS,
                Criticality : STATUS_CRITICALITY,
                CriticalityRepresentation : #WithIcon,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>SERVICE_STATUS}',
                Value : SERVICE_STATUS,
                Criticality : SERVICE_CRITICALITY,
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
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'ConditionLogsFacet',
            Label : '{i18n>CONDITION_LOGS}',
            Target : 'conditionlogs/@UI.LineItem',
        },
    ],

    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : '{i18n>EQUIPMENT_NAME}',
            Value : EQUIPMENT_NAME,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>EQUIPMENT_TYPE}',
            Value : EQUIPMENT_TYPE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>MANUFACTURER}',
            Value : MANUFACTURER,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>MODEL}',
            Value : MODEL,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>SERIAL_NUMBER}',
            Value : SERIAL_NUMBER,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>CURRENT_STATUS}',
            Value : CURRENT_STATUS,
            Criticality : STATUS_CRITICALITY,
            CriticalityRepresentation : #WithIcon,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>SERVICE_STATUS}',
            Value : SERVICE_STATUS,
            Criticality : SERVICE_CRITICALITY,
            CriticalityRepresentation : #WithIcon,
        },
    ],
);

annotate service.EquipmentSrv with {
    LOCATION @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'LocationSrv',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : LOCATION_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'LOCATION_NAME',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'LOCATION_TYPE',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'ADDRESS',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'CITY',
            },
        ],
    }
};