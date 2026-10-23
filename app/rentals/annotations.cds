using CatalogService as service from '../../srv/cat-service';

annotate service.RentalSrv with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
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
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>TOTAL_RENTAL_AMOUNT}',
            Value : TOTAL_RENTAL_AMOUNT,
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