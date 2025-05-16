export const createSequelizeMock = (data) => {
    return {
        ...data,
        toJSON: () => ({ ...data }),
        get: () => ({ ...data }),
        createdAt: new Date(),
        updatedAt: new Date()
    };
};

export const createSequelizeMockList = (dataList) => {
    return dataList.map(data => createSequelizeMock(data));
};

export const createSequelizeMockWithRelations = (data, relations = {}) => {
    const mock = createSequelizeMock(data);
    
    Object.entries(relations).forEach(([key, value]) => {
        mock[key] = Array.isArray(value) 
            ? createSequelizeMockList(value)
            : createSequelizeMock(value);
    });

    return mock;
}; 