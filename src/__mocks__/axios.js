const mockData = {
    data: 100
};

const axiosMock = {
    get: jest.fn((url) => {
    return Promise.resolve({ data: mockData });
    })
};

axiosMock.get.mockResolvedValue(mockData);

export default axiosMock;