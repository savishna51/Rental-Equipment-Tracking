using CatalogService as service from '../../srv/cat-service';

annotate service.RepairBillSrv with @(
    UI.SelectionFields : [
        BILLING_STATUS,
        APPROVAL_LEVEL,
        CUSTOMER_ID,
        BILL_DATE,
    ],
    UI.HeaderInfo : {
        TypeName       : 'Repair Bill',
        TypeNamePlural : 'Repair Bills',
        Title          : { Value : CUSTOMER.COMPANY_NAME },
        Description    : { Value : BILL_DATE },
    },
    UI.DataPoint #Status : {
        Value       : BILLING_STATUS,
        Title       : '{i18n>BILLING_STATUS}',
        Criticality : STATUS_CRITICALITY,
        CriticalityRepresentation : #WithIcon,
    },
    UI.HeaderFacets : [
        {
            $Type  : 'UI.ReferenceFacet',
            Target : '@UI.DataPoint#Status',
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
                Label : '{i18n>RENTAL}',
                Value : RENTAL_ID,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>DAMAGE}',
                Value : DAMAGE_ID,
            },
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
                Label : '{i18n>APPROVAL_LEVEL}',
                Value : APPROVAL_LEVEL,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>BILLING_STATUS}',
                Value : BILLING_STATUS,
                Criticality : STATUS_CRITICALITY,
                CriticalityRepresentation : #WithIcon,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>S4_BILLING_DOCUMENT_ID}',
                Value : S4_BILLING_DOCUMENT_ID,
                Criticality : S4_CRITICALITY,
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
            Label : '{i18n>APPROVAL_LEVEL}',
            Value : APPROVAL_LEVEL,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>BILLING_STATUS}',
            Value : BILLING_STATUS,
            Criticality : STATUS_CRITICALITY,
            CriticalityRepresentation : #WithIcon,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>S4_BILLING_DOCUMENT_ID}',
            Value : S4_BILLING_DOCUMENT_ID,
            Criticality : S4_CRITICALITY,
            CriticalityRepresentation : #WithIcon,
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