using CatalogService as service from '../../srv/cat-service';

annotate service.RepairBillSrv with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>BILL_DATE}',
                Value : BILL_DATE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>REPAIR_AMOUNT}',
                Value : REPAIR_AMOUNT,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>TAX_AMOUNT}',
                Value : TAX_AMOUNT,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>TOTAL_AMOUNT}',
                Value : TOTAL_AMOUNT,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>BILLING_STATUS}',
                Value : BILLING_STATUS,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>S4_BILLING_DOCUMENT_ID}',
                Value : S4_BILLING_DOCUMENT_ID,
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
            Label : '{i18n>BILL_DATE}',
            Value : BILL_DATE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>REPAIR_AMOUNT}',
            Value : REPAIR_AMOUNT,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>TAX_AMOUNT}',
            Value : TAX_AMOUNT,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>TOTAL_AMOUNT}',
            Value : TOTAL_AMOUNT,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>BILLING_STATUS}',
            Value : BILLING_STATUS,
        },
    ],
);

annotate service.RepairBillSrv with {
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

annotate service.RepairBillSrv with {
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

annotate service.RepairBillSrv with {
    DAMAGE @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'DamageRecordSrv',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : DAMAGE_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'DAMAGE_TYPE',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'DAMAGE_DESCRIPTION',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'SEVERITY',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'REPAIR_ESTIMATE',
            },
        ],
    }
};
