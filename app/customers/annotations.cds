using CatalogService as service from '../../srv/cat-service';

annotate service.CustomerSrv with @(
    UI.SelectionFields : [
        COMPANY_NAME,
        CUSTOMER_RISK,
        S4_CUSTOMER_ID,
    ],

    UI.HeaderInfo : {
        TypeName       : 'Customer',
        TypeNamePlural : 'Customers',
        Title          : { Value : COMPANY_NAME },
        Description    : { Value : CONTACT_PERSON },
    },

    UI.DataPoint #Risk : {
        Value       : CUSTOMER_RISK,
        Title       : '{i18n>CUSTOMER_RISK}',
        Criticality : RISK_CRITICALITY,
        CriticalityRepresentation : #WithIcon,
    },
    UI.HeaderFacets : [
        {
            $Type  : 'UI.ReferenceFacet',
            Target : '@UI.DataPoint#Risk',
        },
    ],

    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>COMPANY_NAME}',
                Value : COMPANY_NAME,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>CONTACT_PERSON}',
                Value : CONTACT_PERSON,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>EMAIL}',
                Value : EMAIL,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>PHONE}',
                Value : PHONE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>ADDRESS}',
                Value : ADDRESS,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>S4_CUSTOMER_ID}',
                Value : S4_CUSTOMER_ID,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>CUSTOMER_RISK}',
                Value : CUSTOMER_RISK,
                Criticality : RISK_CRITICALITY,
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
            ID : 'RentalsFacet',
            Label : '{i18n>RENTALS}',
            Target : 'rentals/@UI.LineItem',
        },
    ],

    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : '{i18n>COMPANY_NAME}',
            Value : COMPANY_NAME,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>CONTACT_PERSON}',
            Value : CONTACT_PERSON,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>EMAIL}',
            Value : EMAIL,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>PHONE}',
            Value : PHONE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>ADDRESS}',
            Value : ADDRESS,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>CUSTOMER_RISK}',
            Value : CUSTOMER_RISK,
            Criticality : RISK_CRITICALITY,
            CriticalityRepresentation : #WithIcon,
        },
    ],
);