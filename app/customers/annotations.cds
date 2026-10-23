using CatalogService as service from '../../srv/cat-service';
annotate service.CustomerSrv with @(
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
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
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
    ],
);

