const getFilterByProfileType = require('./getFilterByProfileType');
const { ProfileTypes } = require('../../../utils/constants');

describe('getFilterByProfileType', () => {
  it('should return ClientId filter if profile type is CLIENT', async () => {
    const profile = { type: ProfileTypes.CLIENT, id: 1 };
    const expectedFilter = { ClientId: profile.id };
    const filter = await getFilterByProfileType(profile);
    expect(filter).toEqual(expectedFilter);
  });

  it('should return ContractorId filter if profile type is CONTRACTOR', async () => {
    const profile = { type: ProfileTypes.CONTRACTOR, id: 2 };
    const expectedFilter = { ContractorId: profile.id };
    const filter = await getFilterByProfileType(profile);
    expect(filter).toEqual(expectedFilter);
  });
});
