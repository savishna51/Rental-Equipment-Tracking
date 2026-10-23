namespace retcl.common;

type Guid : UUID;
type String100 : String(100);
type String20 : String(20);
type String50 : String(50);
type String255 : String(255);
type Amount : Decimal(12,2);
type Rental : Decimal(10,2);

type RentalStatus : String enum {
    CREATED;
    ACTIVE;
    RETURNED;
    COMPLETED;
    CANCELLED;
};

type ItemStatus : String enum {
    RESERVED;
    RENTED;
    RETURNED;
    DAMAGED;
    LOST;
};

type EquipmentStatus : String enum {
    AVAILABLE;
    RENTED;
    MAINTENANCE;
    DAMAGED;
    RETIRED;
};

type InspectionType : String enum {
    CHECKOUT;
    RETURN;
    PERIODIC;
    DAMAGE_CHECK;
};

type ConditionGrade : String enum {
    EXCELLENT;
    GOOD;
    FAIR;
    POOR;
    CRITICAL;
};

type DamageSeverity : String enum {
    LOW;
    MEDIUM;
    HIGH;
    CRITICAL;
};

type DamageStatus : String enum {
    REPORTED;
    REVIEWED;
    IN_REPAIR;
    REPAIRED;
    CLOSED;
};

type MaintenanceType : String enum {
    PREVENTIVE;
    CORRECTIVE;
    INSPECTION;
    OVERHAUL;
};

type MaintenanceStatus : String enum {
    SCHEDULED;
    IN_PROGRESS;
    COMPLETED;
    CANCELLED;
};

type BillingStatus : String enum {
    DRAFT;
    APPROVED;
    POSTED_TO_S4;
    PAID;
    DISPUTED;
};

type LocationType : String enum {
    WAREHOUSE;
    CUSTOMER_SITE;
    SERVICE_CENTER;
    DEPOT;
};

type CustomerLiableStatus : String enum {
    LIABLE;
    NOT_LIABLE;
    UNDER_REVIEW;
};



