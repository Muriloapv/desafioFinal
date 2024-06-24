import { CreateTokenDto } from '../src/token/create-token.dto';

describe('CreateTokenDto', () => {
  it('should create a DTO instance', () => {
    const dto = new CreateTokenDto();
    expect(dto).toBeDefined();
  });

  it('should have the correct properties', () => {
    const dto = new CreateTokenDto();
    expect(dto).toHaveProperty('name');
    expect(dto).toHaveProperty('symbol');
    expect(dto).toHaveProperty('address');
    expect(dto).toHaveProperty('supply');
    expect(dto).toHaveProperty('checksum');
    expect(dto).toHaveProperty('deployerWallet');
    expect(dto).toHaveProperty('deployerInfo');
    expect(dto).toHaveProperty('deployerLabel');
  });

  it('should set properties correctly', () => {
    const dto = new CreateTokenDto();
    dto.name = 'Test Token';
    dto.symbol = 'TEST';
    dto.address = '0x123abc';
    dto.supply = '1000000';
    dto.checksum = 'abc123';
    dto.deployerWallet = '0x456def';
    dto.deployerInfo = 'Test deployer';
    dto.deployerLabel = 'Tester';

    expect(dto.name).toEqual('Test Token');
    expect(dto.symbol).toEqual('TEST');
    expect(dto.address).toEqual('0x123abc');
    expect(dto.supply).toEqual('1000000');
    expect(dto.checksum).toEqual('abc123');
    expect(dto.deployerWallet).toEqual('0x456def');
    expect(dto.deployerInfo).toEqual('Test deployer');
    expect(dto.deployerLabel).toEqual('Tester');
  });
});
