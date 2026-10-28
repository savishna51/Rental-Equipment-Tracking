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

        const crypto = require('crypto');
    const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
    const MAX_PHOTO_BYTES = 5 * 1024 * 1024;

    const SHOT_TYPES = ['FRONT', 'REAR', 'LEFT', 'RIGHT', 'TOP_PLATE', 'METER', 'DAMAGE'];

    const findOne = async (entity, ID, columns) =>
        await SELECT.one.from(entity).columns(columns).where({ ID })
        || await SELECT.one.from(entity.drafts).columns(columns).where({ ID });

    this.on('uploadDamagePhoto', async (req) => {
        const { damageId, fileName, mediaType, content, thumbnail, sha256, capturedAt, latitude, longitude } = req.data;
        let { conditionId, shotType } = req.data;

        if (!content || !sha256) return req.error(400, 'Photo and hash are required');
        if (!damageId && !conditionId) return req.error(400, 'Select an inspection or a damage item for the photo');
        if (!ALLOWED_TYPES.includes(mediaType)) return req.error(400, `Media type ${mediaType} is not allowed`);

        if (damageId) {
            const damage = await findOne(DamageRecordSrv, damageId, ['ID', 'CONDITION_ID']);
            if (!damage) return req.error(404, `Damage record ${damageId} not found`);
            conditionId = conditionId || damage.CONDITION_ID;
            shotType = 'DAMAGE';
        }
        if (conditionId) {
            const inspection = await findOne(ConditionLogSrv, conditionId, ['ID']);
            if (!inspection) return req.error(404, `Inspection ${conditionId} not found`);
        }
        if (!SHOT_TYPES.includes(shotType)) return req.error(400, `Shot type ${shotType} is not allowed`);

        const photo = Buffer.from(content, 'base64');
        if (photo.length === 0) return req.error(400, 'Photo is empty');
        if (photo.length > MAX_PHOTO_BYTES) return req.error(413, 'Photo is larger than 5 MB');

        const serverHash = crypto.createHash('sha256').update(photo).digest('hex');
        if (serverHash !== String(sha256).toLowerCase()) {
            return req.error(400, 'Photo integrity check failed: SHA-256 mismatch, photo rejected');
        }

        const ID = cds.utils.uuid();
        await INSERT.into('retcl.DamagePhotos').entries({
            ID,
            DAMAGE_ID: damageId || null,
            CONDITION_ID: conditionId || null,
            SHOT_TYPE: shotType,
            FILE_NAME: fileName || `photo-${ID}.jpg`,
            MEDIA_TYPE: mediaType,
            PHOTO_CONTENT: photo,
            THUMBNAIL: thumbnail ? Buffer.from(thumbnail, 'base64') : null,
            SHA256: serverHash,
            SIZE_BYTES: photo.length,
            CAPTURED_AT: capturedAt || new Date().toISOString(),
            LATITUDE: latitude ?? null,
            LONGITUDE: longitude ?? null,
            UPLOADED_AT: new Date().toISOString(),
            UPLOADED_BY: req.user.id
        });
        return ID;
    });

    this.on('canUploadPhotos', (req) => req.user.is('YardWorker'));

    this.before('SAVE', DamageRecordSrv, async (req) => {
        const existing = await SELECT.one.from(DamageRecordSrv).columns('ID').where({ ID: req.data.ID });
        if (existing) return;
        const { count } = await SELECT.one.from('retcl.DamagePhotos')
            .columns('count(1) as count').where({ DAMAGE_ID: req.data.ID });
        if (!count) req.error(400, 'Take at least one photo of the damage before saving');
    });
})

        