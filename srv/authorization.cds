using CatalogService from './cat-service';

annotate CatalogService.CustomerSrv with @restrict: [
    {
        grant: ['READ'],
        to: ['YardWorker', 'Dispatcher', 'Technician', 'BillingClerk', 'Manager', 'Admin']
    },
    {
        grant: ['CREATE', 'UPDATE', 'DELETE'],
        to: ['Admin']
    }
];

annotate CatalogService.RentalSrv with @restrict: [
    {
        grant: ['READ'],
        to: ['YardWorker', 'Dispatcher', 'Technician', 'BillingClerk', 'Manager', 'Admin']
    },
    {
        grant: ['CREATE', 'UPDATE', 'DELETE'],
        to: ['Dispatcher', 'Manager', 'Admin']
    }
];

annotate CatalogService.RentalItemSrv with @restrict: [
    {
        grant: ['READ'],
        to: ['YardWorker', 'Dispatcher', 'Technician', 'BillingClerk', 'Manager', 'Admin']
    },
    {
        grant: ['CREATE', 'UPDATE', 'DELETE'],
        to: ['Dispatcher', 'Manager', 'Admin']
    }
];

annotate CatalogService.EquipmentSrv with @restrict: [
    {
        grant: ['READ'],
        to: ['YardWorker', 'Dispatcher', 'Technician', 'BillingClerk', 'Manager', 'Admin']
    },
    {
        grant: ['CREATE', 'UPDATE', 'DELETE'],
        to: ['Dispatcher', 'Technician', 'Manager', 'Admin']
    },
    {
        grant: ['UPDATE'],
        to: ['YardWorker']
    }
];

annotate CatalogService.LocationSrv with @restrict: [
    {
        grant: ['READ'],
        to: ['YardWorker', 'Dispatcher', 'Technician', 'BillingClerk', 'Manager', 'Admin']
    },
    {
        grant: ['CREATE', 'UPDATE', 'DELETE'],
        to: ['Admin']
    }
];

annotate CatalogService.ConditionLogSrv with @restrict: [
    {
        grant: ['READ'],
        to: ['YardWorker', 'Dispatcher', 'Technician', 'BillingClerk', 'Manager', 'Admin']
    },
    {
        grant: ['CREATE'],
        to: ['YardWorker', 'Technician', 'Dispatcher', 'Manager', 'Admin']
    },
    {
        grant: ['UPDATE'],
        to: ['Technician', 'Manager', 'Admin']
    },
    {
        grant: ['DELETE'],
        to: ['Admin']
    }
];

annotate CatalogService.DamageRecordSrv with @restrict: [
    {
        grant: ['READ'],
        to: ['YardWorker', 'Dispatcher', 'Technician', 'BillingClerk', 'Manager', 'Admin']
    },
    {
        grant: ['CREATE'],
        to: ['YardWorker', 'Technician', 'Dispatcher', 'Manager', 'Admin']
    },
    {
        grant: ['UPDATE'],
        to: ['Technician', 'BillingClerk', 'Manager', 'Admin']
    },
    {
        grant: ['DELETE'],
        to: ['Admin']
    }
];

annotate CatalogService.DamagePhotoSrv with @restrict: [
    {
        grant: ['READ'],
        to: ['YardWorker', 'Dispatcher', 'Technician', 'BillingClerk', 'Manager', 'Admin']
    },
    {
        grant: ['CREATE'],
        to: ['YardWorker']
    },
    {
        grant: ['UPDATE', 'DELETE'],
        to: ['Admin']
    }
];

annotate CatalogService.MaintenanceRecordSrv with @restrict: [
    {
        grant: ['READ'],
        to: ['YardWorker', 'Dispatcher', 'Technician', 'BillingClerk', 'Manager', 'Admin']
    },
    {
        grant: ['CREATE', 'UPDATE'],
        to: ['Technician', 'Manager', 'Admin']
    },
    {
        grant: ['DELETE'],
        to: ['Admin']
    }
];

annotate CatalogService.RepairBillSrv with @restrict: [
    {
        grant: ['READ'],
        to: ['BillingClerk', 'Manager', 'Admin']
    },
    {
        grant: ['CREATE', 'UPDATE'],
        to: ['BillingClerk', 'Manager', 'Admin']
    },
    {
        grant: ['DELETE'],
        to: ['Admin']
    }
];

/*
 * Custom actions
 */

annotate CatalogService.createCustomers with @requires: 'Admin';

annotate CatalogService.createRentals with @requires: ['Dispatcher', 'Manager', 'Admin'];

annotate CatalogService.createRentalItems with @requires: ['Dispatcher', 'Manager', 'Admin'];

annotate CatalogService.createEquipments with @requires: ['Technician', 'Manager', 'Admin'];

annotate CatalogService.createLocations with @requires: 'Admin';

annotate CatalogService.createRepairBills with @requires: ['BillingClerk', 'Manager', 'Admin'];

annotate CatalogService.createConditionLogs with @requires: ['YardWorker', 'Technician', 'Dispatcher', 'Manager', 'Admin'];

annotate CatalogService.createMaintenanceRecords with @requires: ['Technician', 'Manager', 'Admin'];

annotate CatalogService.createDamageRecords with @requires: ['YardWorker', 'Technician', 'Dispatcher', 'Manager', 'Admin'];

annotate CatalogService.createDamagePhotos with @requires: 'YardWorker';