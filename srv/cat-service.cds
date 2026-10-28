using { retcl as database } from '../db/schema';
using { retcl } from '../db/criticality';
using from '../db/media';

annotate CatalogService.CustomerSrv with @odata.draft.enabled;
annotate CatalogService.RentalSrv with @odata.draft.enabled;
annotate CatalogService.EquipmentSrv with @odata.draft.enabled;
annotate CatalogService.LocationSrv with @odata.draft.enabled;
annotate CatalogService.RepairBillSrv with @odata.draft.enabled;
annotate CatalogService.MaintenanceRecordSrv with @odata.draft.enabled;
annotate CatalogService.ConditionLogSrv with @odata.draft.enabled;
annotate CatalogService.DamageRecordSrv with @odata.draft.enabled;

type createCustomersIP : array of {
    ID : database.common.String100;
    COMPANY_NAME : database.common.String100;
    CONTACT_PERSON : database.common.String100;
    EMAIL : database.common.String100;
    PHONE : database.common.String20;
    ADDRESS : database.common.String255;
    S4_CUSTOMER_ID : database.common.String50;
}

type createRentalsIP : array of {
    ID                   : database.common.Guid;
    CUSTOMER_ID          : database.common.Guid;
    RENTAL_DATE          : Date;
    EXPECTED_RETURN_DATE : Date;
    ACTUAL_RETURN_DATE   : Date;
    RENTAL_STATUS        : database.common.RentalStatus;
    TOTAL_RENTAL_AMOUNT  : database.common.Amount;
}

type createRentalItemsIP : array of {
    ID                : database.common.Guid;
    RENTAL_ID         : database.common.Guid;
    EQUIPMENT_ID      : database.common.Guid;
    DAILY_RENTAL_RATE : database.common.Rental;
    START_DATE        : Date;
    END_DATE          : Date;
    ITEM_STATUS       : database.common.ItemStatus;
}

type createEquipmentsIP : array of{
    ID                  : database.common.Guid;
    LOCATION_ID         : database.common.Guid;
    EQUIPMENT_NAME      : database.common.String100;
    EQUIPMENT_TYPE      : database.common.String50;
    MANUFACTURER        : database.common.String100;
    MODEL               : database.common.String100;
    SERIAL_NUMBER       : database.common.String100;
    PURCHASE_DATE       : Date;
    RENTAL_RATE_PER_DAY : database.common.Rental;
    CURRENT_STATUS      : database.common.EquipmentStatus;
}

type createLocationsIP : array of{
    ID             : database.common.Guid;
    LOCATION_NAME  : database.common.String100;
    LOCATION_TYPE  : database.common.LocationType;
    ADDRESS        : database.common.String255;
    CITY           : database.common.String100;
    LATITUDE       : Decimal(9,6);
    LONGITUDE      : Decimal(9,6);
}

type createRepairBillsIP : array of{
    ID                     : database.common.Guid;
    RENTAL_ID              : database.common.Guid;
    CUSTOMER_ID            : database.common.Guid;
    DAMAGE_ID              : database.common.Guid;
    BILL_DATE              : Date;
    REPAIR_AMOUNT          : database.common.Amount;
    TAX_AMOUNT             : database.common.Amount;
    TOTAL_AMOUNT           : database.common.Amount;
    BILLING_STATUS         : database.common.BillingStatus;
    S4_BILLING_DOCUMENT_ID : database.common.String50;
}

type createConditionLogsIP : array of{
    ID                : database.common.Guid;
    EQUIPMENT_ID      : database.common.Guid;
    RENTAL_ID         : database.common.Guid;
    INSPECTION_DATE   : DateTime;
    INSPECTION_TYPE   : database.common.InspectionType;
    CONDITION_GRADE   : database.common.ConditionGrade;
    INSPECTOR_NAME    : database.common.String100;
    METER_READING     : database.common.Rental;
    NOTES             : String(500);
}

type createMaintenanceRecordsIP : array of{
    ID                    : database.common.Guid;
    EQUIPMENT_ID          : database.common.Guid;
    MAINTENANCE_TYPE      : database.common.MaintenanceType;
    MAINTENANCE_DATE      : Date;
    DESCRIPTION           : String(500);
    SERVICE_PROVIDER      : String(150);
    COST                  : database.common.Amount;
    NEXT_MAINTENANCE_DATE : Date;
    STATUS                : database.common.MaintenanceStatus;
}

type createDamageRecordsIP : array of{
    ID                 : database.common.Guid;
    CONDITION_ID       : database.common.Guid;
    DAMAGE_TYPE        : database.common.String50;
    DAMAGE_DESCRIPTION : String(500);
    SEVERITY           : database.common.DamageSeverity;
    REPAIR_ESTIMATE    : database.common.Amount;
    CUSTOMER_LIABLE    : Boolean;
    DAMAGE_STATUS      : database.common.DamageStatus;
}

type createDamagePhotosIP : array of{
    ID             : database.common.Guid;
    DAMAGE_ID      : database.common.Guid;
    FILE_NAME      : database.common.String255;
    MEDIA_TYPE     : database.common.String100;
    PHOTO_CONTENT  : LargeBinary;
    UPLOADED_AT    : DateTime;
    UPLOADED_BY    : database.common.String100;
}

@requires: 'authenticated-user'
service CatalogService {
    entity CustomerSrv as projection on database.Customers;
    entity RentalSrv as projection on database.Rentals;
    entity RentalItemSrv as projection on database.RentalItems;
    entity EquipmentSrv as projection on database.Equipments;
    entity LocationSrv as projection on database.Locations;
    entity RepairBillSrv as projection on database.RepairBills;
    entity ConditionLogSrv as projection on database.ConditionLogs;
    entity MaintenanceRecordSrv as projection on database.MaintenanceRecords;
    entity DamageRecordSrv as projection on database.DamageRecords;
    entity DamagePhotoSrv as projection on database.DamagePhotos;

    @restrict: [
    { grant: '*', to: 'Admin' }
]
action createCustomers(input : createCustomersIP) returns String;

@restrict: [
    { grant: '*', to: ['Dispatcher', 'Manager', 'Admin'] }
]
action createRentals(input : createRentalsIP) returns String;

@restrict: [
    { grant: '*', to: ['Dispatcher', 'Manager', 'Admin'] }
]
action createRentalItems(input : createRentalItemsIP) returns String;

@restrict: [
    { grant: '*', to: ['Technician', 'Manager', 'Admin'] }
]
action createEquipments(input : createEquipmentsIP) returns String;

@restrict: [
    { grant: '*', to: 'Admin' }
]
action createLocations(input : createLocationsIP) returns String;

@restrict: [
    { grant: '*', to: ['BillingClerk', 'Manager', 'Admin'] }
]
action createRepairBills(input : createRepairBillsIP) returns String;

@restrict: [
    { grant: '*', to: ['YardWorker', 'Technician', 'Dispatcher', 'Manager', 'Admin'] }
]
action createConditionLogs(input : createConditionLogsIP) returns String;

@restrict: [
    { grant: '*', to: ['Technician', 'Manager', 'Admin'] }
]
action createMaintenanceRecords(input : createMaintenanceRecordsIP) returns String;

@restrict: [
    { grant: '*', to: ['YardWorker', 'Technician', 'Dispatcher', 'Manager', 'Admin'] }
]
action createDamageRecords(input : createDamageRecordsIP) returns String;

@restrict: [
    { grant: '*', to: ['YardWorker', 'Technician', 'Dispatcher', 'Manager', 'Admin'] }
]
action createDamagePhotos(input : createDamagePhotosIP) returns String;

@requires: 'YardWorker'
action uploadDamagePhoto(
    conditionId : database.common.Guid,
    damageId   : database.common.Guid,
    shotType   : String(20),
    fileName   : database.common.String255,
    mediaType  : database.common.String100,
    content    : LargeString,
    thumbnail  : LargeString,
    sha256     : String(64),
    capturedAt : Timestamp,
    latitude   : Decimal(9,6),
    longitude  : Decimal(9,6)
) returns database.common.Guid;

function canUploadPhotos() returns Boolean;

}