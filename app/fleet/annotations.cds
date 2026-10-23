using CatalogService as service from '../../srv/cat-service';

annotate service.EquipmentSrv with @(
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