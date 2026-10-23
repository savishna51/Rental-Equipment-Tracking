namespace retcl;

using {
    retcl.common.Guid,
    retcl.common.String100,
    retcl.common.String20,
    retcl.common.String50,
    retcl.common.String255,
    retcl.common.Amount,
    retcl.common.Rental,
    retcl.common.RentalStatus,
    retcl.common.ItemStatus,
    retcl.common.EquipmentStatus,
    retcl.common.LocationType,
    retcl.common.InspectionType,
    retcl.common.ConditionGrade,
    retcl.common.MaintenanceType,
    retcl.common.MaintenanceStatus,
    retcl.common.DamageSeverity,
    retcl.common.DamageStatus,
    retcl.common.BillingStatus
} from './common';

entity Customers{
    key ID : Guid @(title : '{i18n>ID}');
    COMPANY_NAME : String100 @(title : '{i18n>COMPANY_NAME}');
    CONTACT_PERSON : String100 @(title : '{i18n>CONTACT_PERSON}');
    EMAIL : String100 @(title : '{i18n>EMAIL}');
    PHONE : String20 @(title : '{i18n>PHONE}');
    ADDRESS : String255 @(title : '{i18n>ADDRESS}');
    S4_CUSTOMER_ID : String50 @(title : '{i18n>S4_CUSTOMER_ID}');
    rentals : Association to many Rentals on rentals.CUSTOMER=$self;
    repairbills : Association to many RepairBills on repairbills.CUSTOMER=$self;
}

entity Rentals{
    key ID : Guid @(title : '{i18n>ID}');
    CUSTOMER : Association to Customers @(title : '{i18n>CUSTOMER}');
    RENTAL_DATE : Date @(title : '{i18n>RENTAL_DATE}');
    EXPECTED_RETURN_DATE : Date @(title : '{i18n>EXPECTED_RETURN_DATE}');
    ACTUAL_RETURN_DATE : Date @(title : '{i18n>ACTUAL_RETURN_DATE}');
    RENTAL_STATUS : RentalStatus @(title : '{i18n>RENTAL_STATUS}');
    TOTAL_RENTAL_AMOUNT : Amount @(title : '{i18n>TOTAL_RENTAL_AMOUNT}');
    rentalitems : Association to many RentalItems on rentalitems.RENTAL=$self;
    conditionlogs : Association to many ConditionLogs on conditionlogs.RENTAL=$self;
}

entity RentalItems{
    key ID : Guid @(title : '{i18n>ID}');
    RENTAL : Association to Rentals @(title : '{i18n>RENTAL}');
    DAILY_RENTAL_RATE : Rental @(title : '{i18n>DAILY_RENTAL_RATE}');
    START_DATE : Date @(title : '{i18n>START_DATE}');
    END_DATE : Date @(title : '{i18n>END_DATE}');
    ITEM_STATUS : ItemStatus @(title : '{i18n>ITEM_STATUS}');
    EQUIPMENT : Association to Equipments @(title : '{i18n>EQUIPMENT}');
}

entity Equipments{
    key ID : Guid @(title : '{i18n>ID}');
    LOCATION : Association to Locations @(title : '{i18n>LOCATION}');
    EQUIPMENT_NAME : String100 @(title : '{i18n>EQUIPMENT_NAME}');
    EQUIPMENT_TYPE : String50 @(title : '{i18n>EQUIPMENT_TYPE}');
    MANUFACTURER : String100 @(title : '{i18n>MANUFACTURER}');
    MODEL : String100 @(title : '{i18n>MODEL}');
    SERIAL_NUMBER : String100 @(title : '{i18n>SERIAL_NUMBER}');
    PURCHASE_DATE : Date @(title : '{i18n>PURCHASE_DATE}');
    RENTAL_RATE_PER_DAY : Rental @(title : '{i18n>RENTAL_RATE_PER_DAY}');
    CURRENT_STATUS : EquipmentStatus @(title : '{i18n>CURRENT_STATUS}');
    rentalitems : Association to many RentalItems on rentalitems.EQUIPMENT=$self;
    conditionlogs : Association to many ConditionLogs on conditionlogs.EQUIPMENT=$self;
    maintenancerecords : Association to many MaintenanceRecords on maintenancerecords.EQUIPMENT=$self;
}

entity Locations{
    key ID : Guid @(title : '{i18n>ID}');
    LOCATION_NAME : String100 @(title : '{i18n>LOCATION_NAME}');
    LOCATION_TYPE : LocationType @(title : '{i18n>LOCATION_TYPE}');
    ADDRESS : String255 @(title : '{i18n>ADDRESS}');
    CITY : String100 @(title : '{i18n>CITY}');
    LATITUDE : Decimal(9,6) @(title : '{i18n>LATITUDE}');
    LONGITUDE : Decimal(9,6) @(title : '{i18n>LONGITUDE}');
    equipments : Association to many Equipments on equipments.LOCATION=$self;   
}

entity RepairBills{
    key ID : Guid @(title : '{i18n>ID}');
    RENTAL : Association to Rentals @(title : '{i18n>RENTAL}');
    CUSTOMER : Association to Customers @(title : '{i18n>CUSTOMER}');
    DAMAGE : Association to DamageRecords @(title : '{i18n>DAMAGE}');
    BILL_DATE : Date @(title : '{i18n>BILL_DATE}');
    REPAIR_AMOUNT : Amount @(title : '{i18n>REPAIR_AMOUNT}');
    TAX_AMOUNT : Amount @(title : '{i18n>TAX_AMOUNT}');
    TOTAL_AMOUNT : Amount @(title : '{i18n>TOTAL_AMOUNT}');
    BILLING_STATUS : BillingStatus @(title : '{i18n>BILLING_STATUS}');
    S4_BILLING_DOCUMENT_ID : String50 @(title : '{i18n>S4_BILLING_DOCUMENT_ID}');
}

entity ConditionLogs{
    key ID : Guid @(title : '{i18n>ID}');
    EQUIPMENT : Association to Equipments @(title : '{i18n>EQUIPMENT}');
    RENTAL : Association to Rentals @(title : '{i18n>RENTAL}');
    INSPECTION_DATE : DateTime @(title : '{i18n>INSPECTION_DATE}');
    INSPECTION_TYPE : InspectionType @(title : '{i18n>INSPECTION_TYPE}');
    CONDITION_GRADE : ConditionGrade @(title : '{i18n>CONDITION_GRADE}');
    INSPECTOR_NAME : String100 @(title : '{i18n>INSPECTOR_NAME}');
    METER_READING : Rental @(title : '{i18n>METER_READING}');
    NOTES : String(500) @(title : '{i18n>NOTES}'); 
    damagerecords : Association to many DamageRecords on damagerecords.CONDITION=$self;
}

entity MaintenanceRecords{
    key ID : Guid @(title : '{i18n>ID}');
    EQUIPMENT : Association to Equipments @(title : '{i18n>EQUIPMENT}');
    MAINTENANCE_TYPE : MaintenanceType @(title : '{i18n>MAINTENANCE_TYPE}');
    MAINTENANCE_DATE : Date @(title : '{i18n>MAINTENANCE_DATE}');
    DESCRIPTION : String(500) @(title : '{i18n>DESCRIPTION}');
    SERVICE_PROVIDER : String(150) @(title : '{i18n>SERVICE_PROVIDER}');
    COST : Decimal(12,2) @(title : '{i18n>COST}');
    NEXT_MAINTENANCE_DATE : Date @(title : '{i18n>NEXT_MAINTENANCE_DATE}');
    STATUS : MaintenanceStatus @(title : '{i18n>STATUS}');
}

entity DamageRecords{
    key ID : Guid @(title : '{i18n>ID}');
    CONDITION : Association to ConditionLogs @(title : '{i18n>CONDITION}');
    DAMAGE_TYPE : String50 @(title : '{i18n>DAMAGE_TYPE}');
    DAMAGE_DESCRIPTION : String(500) @(title : '{i18n>DAMAGE_DESCRIPTION}');
    SEVERITY : DamageSeverity @(title : '{i18n>SEVERITY}');
    REPAIR_ESTIMATE : Amount @(title : '{i18n>REPAIR_ESTIMATE}');
    CUSTOMER_LIABLE : Boolean @(title : '{i18n>CUSTOMER_LIABLE}');
    DAMAGE_STATUS : DamageStatus @(title : '{i18n>DAMAGE_STATUS}');
    damagephotos : Association to many DamagePhotos on damagephotos.DAMAGE = $self;
}

entity DamagePhotos{
    key ID : Guid @(title : '{i18n>ID}');
    DAMAGE : Association to DamageRecords @(title : '{i18n>DAMAGE}');
    FILE_NAME : String255 @(title : '{i18n>FILE_NAME}');
    MEDIA_TYPE : String100 @(title : '{i18n>MEDIA_TYPE}');
    PHOTO_CONTENT : LargeBinary @(title : '{i18n>PHOTO_CONTENT}');
    UPLOADED_AT : DateTime @(title : '{i18n>UPLOADED_AT}');
    UPLOADED_BY : String100 @(title : '{i18n>UPLOADED_BY}');
}