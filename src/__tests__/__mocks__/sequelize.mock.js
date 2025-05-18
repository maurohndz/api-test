export const createTransactionMock = () => {
    return {
        commit: jest.fn(),
        rollback: jest.fn()
    };
};

export const createModelMock = (data) => {
    return {
        ...data,
        toJSON: () => ({ ...data }),
        get: () => ({ ...data }),
        createdAt: new Date(),
        updatedAt: new Date()
    };
};

export const createModelListMock = (dataList) => {
    return dataList.map(data => createModelMock(data));
};

export const createModelWithRelationsMock = (data, relations = {}) => {
    const mock = createModelMock(data);

    Object.entries(relations).forEach(([key, value]) => {
        mock[key] = Array.isArray(value)
            ? createModelListMock(value)
            : createModelMock(value);
    });

    return mock;
};