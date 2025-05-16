import CommonError from './error.common.js';
//import { errors } from '../constant/https.js';

export class CommonRepository {
    constructor(model, { logger } = {}) {
        this.model = model;

        if (logger) this.logger = logger;
    }

    /**
     * Count
     * @param {*} params
     * @param {*} params.where - Filtering conditions
     * @param {*} params.order - Order for results
     * @param {*} params.include - Relationships
     */
    async count({ where, order, include, transaction } = {}) {
        return await this.model.count({
            ...(where && { where }),
            ...(order && { order }),
            ...(include && { include }),
            ...(transaction && { transaction })
        }).catch((error) => {
            if (this.logger) this.logger.error(`[DATABASE] ${error}`);

            throw new CommonError('server');
        });
    }

    /**
     * Search for many records
     * @param {Object} params
     * @param {*} params.where - Filtering conditions
     * @param {*} params.order - Order for results
     * @param {*} params.attributes - Attributes to consult
     * @param {*} params.include - Relationships
     */
    async findAll({ where, order, attributes, include, offset, limit, transaction, paranoid = true } = {}) {
        const data = await this.model.findAll({
            ...(where && { where }),
            ...(order && { order }),
            ...(attributes && { attributes }),
            ...(include && { include }),
            ...((limit || offset) && { offset: offset, limit: limit }),
            ...(transaction && { transaction }),
            paranoid
        }).catch((error) => {
            if (this.logger) this.logger.error(`[DATABASE] ${error}`);

            throw new CommonError('server');
        });

        return data;
    }

    /**
     * Search one record
     * @param {*} params.where - Filtering conditions
     * @param {*} params.order - Order for results
     * @param {*} params.attributes - Attributes to consult
     * @param {*} params.include - Relationships
     */
    async findOne({ where, order, attributes, include, transaction } = {}) {
        return await this.model.findOne({
            ...(where && { where }),
            ...(order && { order }),
            ...(attributes && { attributes }),
            ...(include && { include }),
            ...(transaction && { transaction })
        }).catch((error) => {
            if (this.logger) this.logger.error(`[DATABASE] ${error}`);

            throw new CommonError('server');
        });
    }

    /**
     * Search one record or throw an error if not found
     * @param {*} params.where - Filtering conditions
     * @param {*} params.order - Order for results
     * @param {*} params.attributes - Attributes to consult
     * @param {*} params.include - Relationships
     * @param {*} params.customError - Custom error message
     */
    async findOrFail({ where, order, attributes, include, transaction, customError = 'not_found' } = {}) {
        const record = await this.model.findOne({
            ...(where && { where }),
            ...(order && { order }),
            ...(attributes && { attributes }),
            ...(include && { include }),
            ...(transaction && { transaction })
        }).catch((error) => {
            if (this.logger) this.logger.error(`[DATABASE] ${error}`);

            throw new CommonError('server');
        });

        if (!record) throw new CommonError(customError);

        return record;
    }

    /**
     * Create a record
     * @param {*} params.validation - pre-action validation
     * @param {*} params.payload - data to insert
     * @param {*} params.fields - fields to return
     * @param {*} transaction  - Sequelize transaction
     */
    async create({ validation, payload, fields, include } = {}, transaction = null) {
        if (validation) {
            const exist = await this.findOne({ where: validation });
            if (exist) throw new CommonError('exists');
        }

        const record = await this.model.create(payload, {
            transaction,
            ...(fields && { fields })
        }).catch((error) => {
            if (this.logger) this.logger.error(`[DATABASE] ${error}`);

            throw new CommonError('server');
        });

        if (include) {
            return await this.findOne({ id: record.id, include, transaction });
        }

        return record;
    }

    /**
     * Create or Update a record
     *
     * @param {*} params.validation - pre-action validation (used to find the record)
     * @param {*} params.payload - data to insert or update
     * @param {*} params.fields - fields to return
     * @param {*} transaction  - Sequelize transaction
     */
    async createOrUpdate({ validation, payload, fields } = {}, transaction = null) {
        try {
            const existingRecord = await this.findOne({ where: validation });

            if (existingRecord) {
                return this.update({ where: validation, payload }, transaction);
            } else {
                return await this.create({ payload: { ...payload, ...validation }, fields }, transaction);
            }
        } catch (error) {
            if (this.logger) this.logger.error(`[DATABASE] ${error}`);

            throw new CommonError('server');
        }
    }

    /**
     * Create multiple records in the database.
     * 
     * @param {Object} params - Parameters for creating records.
     * @param {Array<Object>} params.payload - Data to be inserted as an array of objects.
     * @param {Array<string>} [params.fields] - List of fields to return in the response (optional).
     * @param {Transaction} [transaction=null] - Sequelize transaction object to ensure atomicity (optional).
     * 
     * @returns {Promise<Array<Model>>} - A promise that resolves to an array of created records if successful.
     * 
     * @throws {CommonError} - Throws a `CommonError` with message 'ERR_EXISTS' if records matching the validation 
     *                         criteria are found, or 'ERR_BAD_REQ' if there is a problem during the insertion.
     */
    async createMany({ payload, fields } = {}, transaction = null) {
        return await this.model.bulkCreate(payload, {
            transaction,
            ...(fields && { fields })
        }).catch((error) => {
            if (this.logger) this.logger.error(`[DATABASE] ${error}`);

            throw new CommonError('server');
        });
    }

    /**
     * Update a record
     * @param {*} params.where - Filtering conditions
     * @param {*} params.validation - pre-action validation
     * @param {*} params.payload - data to update
     * @param {*} transaction  - Sequelize transaction
     */
    async update({ validation, where, payload } = {}, transaction = null) {
        if (!where) throw new CommonError('not_found');

        if (validation) {
            const exist = await this.findOne({ where: validation });
            if (exist) throw new CommonError('exists');
        }

        return await this.model.update(payload, {
            transaction,
            where,
            returning: true
        }).then((data) => {
            return data[1][0];
        })
        .catch((error) => {
            if (this.logger) this.logger.error(`[DATABASE] ${error}`);

            throw new CommonError('server');
        });

    }

    /**
     * Delete a record
     * @param {*} params.where - Filtering conditions
     * @param {*} transaction  - Sequelize transaction
     */
    async delete({ where, force = false } = {}, transaction = null) {
        if (!where) throw new CommonError('server');

        return await this.model.destroy({
            transaction,
            where,
            force,
            returning: true
        }).catch((error) => {
            if (this.logger) this.logger.error(`[DATABASE] ${error}`);

            throw new CommonError('server');
        });
    }
}