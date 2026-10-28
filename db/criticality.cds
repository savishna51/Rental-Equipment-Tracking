namespace retcl;

using {
    retcl.Equipments,
    retcl.Rentals,
    retcl.RentalItems,
    retcl.ConditionLogs,
    retcl.DamageRecords,
    retcl.RepairBills,
    retcl.MaintenanceRecords,
    retcl.Customers
} from './schema';

extend Equipments with {
    STATUS_CRITICALITY : Integer = case
        when CURRENT_STATUS = 'AVAILABLE'   then 3
        when CURRENT_STATUS = 'RENTED'      then 5
        when CURRENT_STATUS = 'MAINTENANCE' then 2
        when CURRENT_STATUS = 'DAMAGED'     then 1
        when CURRENT_STATUS = 'RETIRED'     then 0
        else 0
    end;

    SERVICE_STATUS : String(20) = case
        when exists maintenancerecords[STATUS = 'SCHEDULED' and days_between(MAINTENANCE_DATE, $now) > 0]   then 'Service Overdue'
        when exists maintenancerecords[STATUS = 'SCHEDULED' and days_between($now, MAINTENANCE_DATE) <= 14] then 'Service Due Soon'
        else 'OK'
    end;

    SERVICE_CRITICALITY : Integer = case
        when exists maintenancerecords[STATUS = 'SCHEDULED' and days_between(MAINTENANCE_DATE, $now) > 0]   then 1
        when exists maintenancerecords[STATUS = 'SCHEDULED' and days_between($now, MAINTENANCE_DATE) <= 14] then 2
        else 3
    end;
};

extend Rentals with {
    RETURN_STATUS : String(20) = case
        when ACTUAL_RETURN_DATE is not null                  then 'Returned'
        when RENTAL_STATUS in ('CANCELLED', 'COMPLETED')     then 'Closed'
        when EXPECTED_RETURN_DATE is null                    then 'No Due Date'
        when days_between(EXPECTED_RETURN_DATE, $now) > 0    then 'Overdue'
        when days_between(EXPECTED_RETURN_DATE, $now) = 0    then 'Due Today'
        else 'On Time'
    end;

    RETURN_CRITICALITY : Integer = case
        when ACTUAL_RETURN_DATE is not null                  then 3
        when RENTAL_STATUS in ('CANCELLED', 'COMPLETED')     then 0
        when EXPECTED_RETURN_DATE is null                    then 0
        when days_between(EXPECTED_RETURN_DATE, $now) > 0    then 1
        when days_between(EXPECTED_RETURN_DATE, $now) = 0    then 2
        else 3
    end;

    STATUS_CRITICALITY : Integer = case
        when RENTAL_STATUS = 'CREATED'   then 0
        when RENTAL_STATUS = 'ACTIVE'    then 5
        when RENTAL_STATUS = 'RETURNED'  then 2
        when RENTAL_STATUS = 'COMPLETED' then 3
        when RENTAL_STATUS = 'CANCELLED' then 0
        else 0
    end;
};

extend RentalItems with {
    STATUS_CRITICALITY : Integer = case
        when ITEM_STATUS = 'RESERVED' then 0
        when ITEM_STATUS = 'RENTED'   then 5
        when ITEM_STATUS = 'RETURNED' then 2
        when ITEM_STATUS = 'DAMAGED'  then 1
        when ITEM_STATUS = 'LOST'     then 1
        else 0
    end;
};

extend ConditionLogs with {
    GRADE_CRITICALITY : Integer = case
        when CONDITION_GRADE = 'EXCELLENT' then 3
        when CONDITION_GRADE = 'GOOD'      then 3
        when CONDITION_GRADE = 'FAIR'      then 2
        when CONDITION_GRADE = 'POOR'      then 1
        when CONDITION_GRADE = 'CRITICAL'  then 1
        else 0
    end;
};

extend DamageRecords with {
    SEVERITY_CRITICALITY : Integer = case
        when SEVERITY = 'LOW'      then 3
        when SEVERITY = 'MEDIUM'   then 2
        when SEVERITY = 'HIGH'     then 1
        when SEVERITY = 'CRITICAL' then 1
        else 0
    end;

    DAMAGE_STATUS_CRITICALITY : Integer = case
        when DAMAGE_STATUS = 'REPORTED'  then 2
        when DAMAGE_STATUS = 'REVIEWED'  then 5
        when DAMAGE_STATUS = 'IN_REPAIR' then 2
        when DAMAGE_STATUS = 'REPAIRED'  then 3
        when DAMAGE_STATUS = 'CLOSED'    then 3
        else 0
    end;

    LIABLE_CRITICALITY : Integer = case
        when CUSTOMER_LIABLE = true then 2
        else 0
    end;
};

extend RepairBills with {
    STATUS_CRITICALITY : Integer = case
        when BILLING_STATUS = 'DRAFT'        then 2
        when BILLING_STATUS = 'APPROVED'     then 5
        when BILLING_STATUS = 'POSTED_TO_S4' then 3
        when BILLING_STATUS = 'PAID'         then 3
        when BILLING_STATUS = 'DISPUTED'     then 1
        else 0
    end;

    APPROVAL_LEVEL : String(30) = case
        when TOTAL_AMOUNT is null  then 'Not Calculated'
        when TOTAL_AMOUNT > 5000   then 'Manager Approval'
        when TOTAL_AMOUNT > 1000   then 'Clerk Approval'
        else 'Auto-Approve'
    end;

    S4_CRITICALITY : Integer = case
        when S4_BILLING_DOCUMENT_ID is not null and S4_BILLING_DOCUMENT_ID <> '' then 3
        when BILLING_STATUS in ('APPROVED', 'POSTED_TO_S4', 'PAID')              then 1
        else 0
    end;
};

extend MaintenanceRecords with {
    STATUS_CRITICALITY : Integer = case
        when STATUS = 'SCHEDULED' and MAINTENANCE_DATE is not null
             and days_between(MAINTENANCE_DATE, $now) > 0   then 1
        when STATUS = 'SCHEDULED'                            then 5
        when STATUS = 'IN_PROGRESS'                          then 2
        when STATUS = 'COMPLETED'                            then 3
        when STATUS = 'CANCELLED'                            then 0
        else 0
    end;

    SERVICE_DUE_STATUS : String(20) = case
        when NEXT_MAINTENANCE_DATE is null                       then 'Not Planned'
        when days_between(NEXT_MAINTENANCE_DATE, $now) > 0       then 'Overdue'
        when days_between($now, NEXT_MAINTENANCE_DATE) <= 14     then 'Due in 14 Days'
        else 'Planned'
    end;

    NEXT_SERVICE_CRITICALITY : Integer = case
        when NEXT_MAINTENANCE_DATE is null                       then 0
        when days_between(NEXT_MAINTENANCE_DATE, $now) > 0       then 1
        when days_between($now, NEXT_MAINTENANCE_DATE) <= 14     then 2
        else 3
    end;
};

extend Customers with {
    CUSTOMER_RISK : String(30) = case
        when exists rentals[ACTUAL_RETURN_DATE is null and RENTAL_STATUS = 'ACTIVE'
                            and days_between(EXPECTED_RETURN_DATE, $now) > 0]      then 'Overdue Rental'
        when exists repairbills[BILLING_STATUS = 'DISPUTED']                         then 'Disputed Charge'
        when exists repairbills[BILLING_STATUS in ('DRAFT', 'APPROVED', 'POSTED_TO_S4')] then 'Open Charges'
        else 'No Issues'
    end;

    RISK_CRITICALITY : Integer = case
        when exists rentals[ACTUAL_RETURN_DATE is null and RENTAL_STATUS = 'ACTIVE'
                            and days_between(EXPECTED_RETURN_DATE, $now) > 0]      then 1
        when exists repairbills[BILLING_STATUS = 'DISPUTED']                         then 1
        when exists repairbills[BILLING_STATUS in ('DRAFT', 'APPROVED', 'POSTED_TO_S4')] then 2
        else 3
    end;
};

annotate Equipments with {
    STATUS_CRITICALITY        @UI.Hidden;
    SERVICE_CRITICALITY       @UI.Hidden;
    SERVICE_STATUS            @title: '{i18n>SERVICE_STATUS}';
};
annotate Rentals with {
    STATUS_CRITICALITY        @UI.Hidden;
    RETURN_CRITICALITY        @UI.Hidden;
    RETURN_STATUS             @title: '{i18n>RETURN_STATUS}';
};
annotate RentalItems with {
    STATUS_CRITICALITY        @UI.Hidden;
};
annotate ConditionLogs with {
    GRADE_CRITICALITY         @UI.Hidden;
};
annotate DamageRecords with {
    SEVERITY_CRITICALITY      @UI.Hidden;
    DAMAGE_STATUS_CRITICALITY @UI.Hidden;
    LIABLE_CRITICALITY        @UI.Hidden;
};
annotate RepairBills with {
    STATUS_CRITICALITY        @UI.Hidden;
    S4_CRITICALITY            @UI.Hidden;
    APPROVAL_LEVEL            @title: '{i18n>APPROVAL_LEVEL}';
};
annotate MaintenanceRecords with {
    STATUS_CRITICALITY        @UI.Hidden;
    NEXT_SERVICE_CRITICALITY  @UI.Hidden;
    SERVICE_DUE_STATUS        @title: '{i18n>SERVICE_DUE_STATUS}';
};
annotate Customers with {
    RISK_CRITICALITY          @UI.Hidden;
    CUSTOMER_RISK             @title: '{i18n>CUSTOMER_RISK}';
};