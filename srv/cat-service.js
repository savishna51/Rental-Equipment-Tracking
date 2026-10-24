const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
    const {CustomerSrv, RentalSrv, RentalItemSrv, EquipmentSrv, LocationSrv, RepairBillSrv, ConditionLogSrv, MaintenanceRecordSrv, DamageRecordSrv, DamagePhotoSrv} = this.entities;

    this.on('createCustomers', async(request, response) =>{
        const custData = request.data.input;
        const objTransaction = cds.tx(request);
        let returnData = await objTransaction.run([
            INSERT.into(CustomerSrv).entries(custData)
        ]).then((resolve, reject) => {
            if(typeof(resolve) !== undefined){
                return request.data.input;
            } else{
                request.error(500, "Error in inserting data into the database")
            }
        }).catch(err => {
            request.error("There is an error : ", err.toString())
        })
        return request.data.input;
    })

    this.on('createRentals', async(request, response) =>{
        const rentData = request.data.input;
        const objTransaction = cds.tx(request);
        let returnData = await objTransaction.run([
            INSERT.into(RentalSrv).entries(rentData)
        ]).then((resolve, reject) => {
            if(typeof(resolve) !== undefined){
                return request.data.input;
            } else{
                request.error(500, "Error in inserting data into the database")
            }
        }).catch(err => {
            request.error("There is an error : ", err.toString())
        })
        return request.data.input;
    })

    this.on('createRentalItems', async(request, response) =>{
        const riData = request.data.input;
        const objTransaction = cds.tx(request);
        let returnData = await objTransaction.run([
            INSERT.into(RentalItemSrv).entries(riData)
        ]).then((resolve, reject) => {
            if(typeof(resolve) !== undefined){
                return request.data.input;
            } else{
                request.error(500, "Error in inserting data into the database")
            }
        }).catch(err => {
            request.error("There is an error : ", err.toString())
        })
        return request.data.input;
    })

    this.on('createEquipments', async(request, response) =>{
        const eqData = request.data.input;
        const objTransaction = cds.tx(request);
        let returnData = await objTransaction.run([
            INSERT.into(EquipmentSrv).entries(eqData)
        ]).then((resolve, reject) => {
            if(typeof(resolve) !== undefined){
                return request.data.input;
            } else{
                request.error(500, "Error in inserting data into the database")
            }
        }).catch(err => {
            request.error("There is an error : ", err.toString())
        })
        return request.data.input;
    })

    this.on('createLocations', async(request, response) =>{
        const locData = request.data.input;
        const objTransaction = cds.tx(request);
        let returnData = await objTransaction.run([
            INSERT.into(LocationSrv).entries(locData)
        ]).then((resolve, reject) => {
            if(typeof(resolve) !== undefined){
                return request.data.input;
            } else{
                request.error(500, "Error in inserting data into the database")
            }
        }).catch(err => {
            request.error("There is an error : ", err.toString())
        })
        return request.data.input;
    })

    this.on('createRepairBills', async(request, response) =>{
        const rbData = request.data.input;
        const objTransaction = cds.tx(request);
        let returnData = await objTransaction.run([
            INSERT.into(RepairBillSrv).entries(rbData)
        ]).then((resolve, reject) => {
            if(typeof(resolve) !== undefined){
                return request.data.input;
            } else{
                request.error(500, "Error in inserting data into the database")
            }
        }).catch(err => {
            request.error("There is an error : ", err.toString())
        })
        return request.data.input;
    })

    this.on('createConditionLogs', async(request, response) =>{
        const clData = request.data.input;
        const objTransaction = cds.tx(request);
        let returnData = await objTransaction.run([
            INSERT.into(ConditionLogSrv).entries(clData)
        ]).then((resolve, reject) => {
            if(typeof(resolve) !== undefined){
                return request.data.input;
            } else{
                request.error(500, "Error in inserting data into the database")
            }
        }).catch(err => {
            request.error("There is an error : ", err.toString())
        })
        return request.data.input;
    })

    this.on('createMaintenanceRecords', async(request, response) =>{
        const mrData = request.data.input;
        const objTransaction = cds.tx(request);
        let returnData = await objTransaction.run([
            INSERT.into(MaintenanceRecordSrv).entries(mrData)
        ]).then((resolve, reject) => {
            if(typeof(resolve) !== undefined){
                return request.data.input;
            } else{
                request.error(500, "Error in inserting data into the database")
            }
        }).catch(err => {
            request.error("There is an error : ", err.toString())
        })
        return request.data.input;
    })

    this.on('createDamageRecords', async(request, response) =>{
        const drData = request.data.input;
        const objTransaction = cds.tx(request);
        let returnData = await objTransaction.run([
            INSERT.into(DamageRecordSrv).entries(drData)
        ]).then((resolve, reject) => {
            if(typeof(resolve) !== undefined){
                return request.data.input;
            } else{
                request.error(500, "Error in inserting data into the database")
            }
        }).catch(err => {
            request.error("There is an error : ", err.toString())
        })
        return request.data.input;
    })

    this.on('createDamagePhotos', async(request, response) =>{
        const dpData = request.data.input;
        const objTransaction = cds.tx(request);
        let returnData = await objTransaction.run([
            INSERT.into(DamagePhotoSrv).entries(dpData)
        ]).then((resolve, reject) => {
            if(typeof(resolve) !== undefined){
                return request.data.input;
            } else{
                request.error(500, "Error in inserting data into the database")
            }
        }).catch(err => {
            request.error("There is an error : ", err.toString())
        })
        return request.data.input;
    })
})