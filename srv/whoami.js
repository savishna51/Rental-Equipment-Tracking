const cds = require('@sap/cds');
const ROLES = ['YardWorker', 'Dispatcher', 'Technician', 'BillingClerk', 'Manager', 'Admin'];

module.exports = (srv) => {
    srv.on('me', (req) => {
        // Token details (names only, never the token itself). Only present for real XSUAA / IAS logins.
        let payload = {};
        try { payload = req.user.tokenInfo?.getPayload?.() || {}; } catch (e) { payload = {}; }

        const scopes = Array.isArray(payload.scope) ? payload.scope : [];

        return {
            user: req.user.id,
            roles: ROLES.filter((r) => req.user.is(r)),
            authKind: String(cds.env.requires?.auth?.kind || 'unknown'),
            scopes,
            issuer: String(payload.iss || payload.ext_attr?.zdn || ''),
            clientId: String(payload.cid || payload.azp || '')
        };
    });
};