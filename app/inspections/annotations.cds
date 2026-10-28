using CatalogService as service from '../../srv/cat-service';

annotate service.ConditionLogSrv with @(
    UI.SelectionFields : [
        INSPECTION_TYPE,
        CONDITION_GRADE,
        EQUIPMENT_ID,
        INSPECTION_DATE,
    ],

    UI.HeaderInfo : {
        TypeName       : 'Inspection',
        TypeNamePlural : 'Inspections',
        Title          : { Value : EQUIPMENT.EQUIPMENT_NAME },
        Description    : { Value : INSPECTION_TYPE },
    },

    UI.DataPoint #Grade : {
        Value       : CONDITION_GRADE,
        Title       : '{i18n>CONDITION_GRADE}',
        Criticality : GRADE_CRITICALITY,
        CriticalityRepresentation : #WithIcon,
    },
    UI.HeaderFacets : [
        {
            $Type  : 'UI.ReferenceFacet',
            Target : '@UI.DataPoint#Grade',
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
                Label : '{i18n>RENTAL}',
                Value : RENTAL_ID,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>INSPECTION_DATE}',
                Value : INSPECTION_DATE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>INSPECTION_TYPE}',
                Value : INSPECTION_TYPE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>CONDITION_GRADE}',
                Value : CONDITION_GRADE,
                Criticality : GRADE_CRITICALITY,
                CriticalityRepresentation : #WithIcon,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>INSPECTOR_NAME}',
                Value : INSPECTOR_NAME,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>METER_READING}',
                Value : METER_READING,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>NOTES}',
                Value : NOTES,
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
            ID : 'DamageRecordsFacet',
            Label : '{i18n>DAMAGE_RECORDS}',
            Target : 'damagerecords/@UI.LineItem',
        },
    ],

    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : '{i18n>INSPECTION_DATE}',
            Value : INSPECTION_DATE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>INSPECTION_TYPE}',
            Value : INSPECTION_TYPE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>CONDITION_GRADE}',
            Value : CONDITION_GRADE,
            Criticality : GRADE_CRITICALITY,
            CriticalityRepresentation : #WithIcon,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>INSPECTOR_NAME}',
            Value : INSPECTOR_NAME,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>METER_READING}',
            Value : METER_READING,
        },
    ],
);
annotate service.DamageRecordSrv with @(
    UI.HeaderInfo : {
        TypeName       : 'Damage Item',
        TypeNamePlural : 'Damage Items',
        Title          : { Value : DAMAGE_TYPE },
        Description    : { Value : DAMAGE_DESCRIPTION },
    },

    UI.DataPoint #Severity : {
        Value       : SEVERITY,
        Title       : '{i18n>SEVERITY}',
        Criticality : SEVERITY_CRITICALITY,
        CriticalityRepresentation : #WithIcon,
    },
    UI.DataPoint #DamageStatus : {
        Value       : DAMAGE_STATUS,
        Title       : '{i18n>DAMAGE_STATUS}',
        Criticality : DAMAGE_STATUS_CRITICALITY,
        CriticalityRepresentation : #WithIcon,
    },
    UI.HeaderFacets : [
        {
            $Type  : 'UI.ReferenceFacet',
            Target : '@UI.DataPoint#Severity',
        },
        {
            $Type  : 'UI.ReferenceFacet',
            Target : '@UI.DataPoint#DamageStatus',
        },
    ],

    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : '{i18n>DAMAGE_TYPE}',
            Value : DAMAGE_TYPE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>DAMAGE_DESCRIPTION}',
            Value : DAMAGE_DESCRIPTION,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>SEVERITY}',
            Value : SEVERITY,
            Criticality : SEVERITY_CRITICALITY,
            CriticalityRepresentation : #WithIcon,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>REPAIR_ESTIMATE}',
            Value : REPAIR_ESTIMATE,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>CUSTOMER_LIABLE}',
            Value : CUSTOMER_LIABLE,
            Criticality : LIABLE_CRITICALITY,
            CriticalityRepresentation : #WithIcon,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>DAMAGE_STATUS}',
            Value : DAMAGE_STATUS,
            Criticality : DAMAGE_STATUS_CRITICALITY,
            CriticalityRepresentation : #WithIcon,
        },
    ],

    UI.FieldGroup #DamageGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>DAMAGE_TYPE}',
                Value : DAMAGE_TYPE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>DAMAGE_DESCRIPTION}',
                Value : DAMAGE_DESCRIPTION,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>SEVERITY}',
                Value : SEVERITY,
                Criticality : SEVERITY_CRITICALITY,
                CriticalityRepresentation : #WithIcon,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>REPAIR_ESTIMATE}',
                Value : REPAIR_ESTIMATE,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>CUSTOMER_LIABLE}',
                Value : CUSTOMER_LIABLE,
                Criticality : LIABLE_CRITICALITY,
                CriticalityRepresentation : #WithIcon,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>DAMAGE_STATUS}',
                Value : DAMAGE_STATUS,
                Criticality : DAMAGE_STATUS_CRITICALITY,
                CriticalityRepresentation : #WithIcon,
            },
        ],
    },

    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'DamageFacet',
            Label : '{i18n>GENERAL_INFORMATION}',
            Target : '@UI.FieldGroup#DamageGroup',
        },
    ],
);

annotate service.ConditionLogSrv with {
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

annotate service.ConditionLogSrv with {
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