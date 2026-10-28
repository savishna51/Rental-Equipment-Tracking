using CatalogService as service from '../../srv/cat-service';

annotate service.RentalSrv with @(
    UI.SelectionFields : [
        RENTAL_STATUS,
        RETURN_STATUS,
        CUSTOMER_ID,
        EXPECTED_RETURN_DATE,
    ],
    UI.HeaderInfo : {
        TypeName       : 'Rental',
        TypeNamePlural : 'Rentals',
        Title          : { Value : CUSTOMER.COMPANY_NAME },
        Description    : { Value : RENTAL_DATE },
    },
    UI.DataPoint #Status : {
        Value       : RENTAL_STATUS,
        Title       : '{i18n>RENTAL_STATUS}',
        Criticality : STATUS_CRITICALITY,
        CriticalityRepresentation : #WithIcon,
    },
    UI.DataPoint #Return : {
        Value       : RETURN_STATUS,
        Title       : '{i18n>RETURN_STATUS}',
        Criticality : RETURN_CRITICALITY,
        CriticalityRepresentation : #WithIcon,
    },
    UI.HeaderFacets : [
        {
            $Type  : 'UI.ReferenceFacet',
            Target : '@UI.DataPoint#Status',
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Target : '@UI.DataPoint#Return',
        },
    ],
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>CUSTOMER}',
                Value : CUSTOMER_ID,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>RENTAL_DATE}',
                Value : RENTAL_DATE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>EXPECTED_RETURN_DATE}',
                Value : EXPECTED_RETURN_DATE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>ACTUAL_RETURN_DATE}',
                Value : ACTUAL_RETURN_DATE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>RENTAL_STATUS}',
                Value : RENTAL_STATUS,
                Criticality : STATUS_CRITICALITY,
                CriticalityRepresentation : #WithIcon,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>RETURN_STATUS}',
                Value : RETURN_STATUS,
                Criticality : RETURN_CRITICALITY,
                CriticalityRepresentation : #WithIcon,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>TOTAL_RENTAL_AMOUNT}',
                Value : TOTAL_RENTAL_AMOUNT,
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
            ID : 'RentalItemsFacet',
            Label : '{i18n>RENTAL_ITEMS}',
            Target : 'rentalitems/@UI.LineItem',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : '{i18n>RENTAL_DATE}',
            Value : RENTAL_DATE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>EXPECTED_RETURN_DATE}',
            Value : EXPECTED_RETURN_DATE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>ACTUAL_RETURN_DATE}',
            Value : ACTUAL_RETURN_DATE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>RENTAL_STATUS}',
            Value : RENTAL_STATUS,
            Criticality : STATUS_CRITICALITY,
            CriticalityRepresentation : #WithIcon,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>RETURN_STATUS}',
            Value : RETURN_STATUS,
            Criticality : RETURN_CRITICALITY,
            CriticalityRepresentation : #WithIcon,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>TOTAL_RENTAL_AMOUNT}',
            Value : TOTAL_RENTAL_AMOUNT,
        },
    ],
);

annotate service.RentalItemSrv with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : '{i18n>EQUIPMENT}',
            Value : EQUIPMENT_ID,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>START_DATE}',
            Value : START_DATE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>END_DATE}',
            Value : END_DATE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>DAILY_RENTAL_RATE}',
            Value : DAILY_RENTAL_RATE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>ITEM_STATUS}',
            Value : ITEM_STATUS,
            Criticality : STATUS_CRITICALITY,
            CriticalityRepresentation : #WithIcon,
        },
    ],
    UI.FieldGroup #ItemGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>EQUIPMENT}',
                Value : EQUIPMENT_ID,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>START_DATE}',
                Value : START_DATE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>END_DATE}',
                Value : END_DATE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>DAILY_RENTAL_RATE}',
                Value : DAILY_RENTAL_RATE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>ITEM_STATUS}',
                Value : ITEM_STATUS,
                Criticality : STATUS_CRITICALITY,
                CriticalityRepresentation : #WithIcon,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'ItemFacet',
            Label : '{i18n>GENERAL_INFORMATION}',
            Target : '@UI.FieldGroup#ItemGroup',
        },
    ],
);

annotate service.RentalSrv with {
    CUSTOMER @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'CustomerSrv',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : CUSTOMER_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'COMPANY_NAME',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'CONTACT_PERSON',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'EMAIL',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'PHONE',
            },
        ],
    }
};

annotate service.RentalItemSrv with {
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
                ValueListProperty : 'CURRENT_STATUS',
            },
        ],
    }
};