import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'

describe('TokenController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Aqui você pode realizar o login ou autenticação necessária para obter o token de acesso
    const loginResponse = await request(app.getHttpServer())
      .post('/login') // Substitua pelo endpoint real de login, se aplicável
      .send({
        email: 'test@user.com',
        password: 'password123',
      })
      .expect(HttpStatus.OK);

    token = loginResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close(); // Fecha a aplicação após os testes
  });

  it('should create a token', async () => {
    const createDto = {
      name: 'Test Token',
      symbol: 'TEST',
      address: '0xabc123',
      supply: '1000000',
      checksum: 'xyz456',
      deployerWallet: '0xdef789',
      deployerInfo: 'Test Deployer',
      deployerLabel: 'Tester',
    };

    const createResponse = await request(app.getHttpServer())
      .post('/tokens')
      .set('Authorization', `Bearer ${token}`)
      .send(createDto)
      .expect(HttpStatus.CREATED);

    expect(createResponse.body).toBeDefined();
    expect(createResponse.body.name).toEqual(createDto.name);
    // Adicione mais expectativas conforme necessário para validar a criação do token
  });

  it('should fetch all tokens', async () => {
    const response = await request(app.getHttpServer())
      .get('/tokens')
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.OK);

    expect(response.body).toBeDefined();
    // Adicione mais expectativas conforme necessário para validar a lista de tokens
  });

  it('should fetch a token by id', async () => {
    const createDto = {
      name: 'Test Token',
      symbol: 'TEST',
      address: '0xabc123',
      supply: '1000000',
      checksum: 'xyz456',
      deployerWallet: '0xdef789',
      deployerInfo: 'Test Deployer',
      deployerLabel: 'Tester',
    };

    const createResponse = await request(app.getHttpServer())
      .post('/tokens')
      .set('Authorization', `Bearer ${token}`)
      .send(createDto)
      .expect(HttpStatus.CREATED);

    const tokenCreated = createResponse.body;

    const response = await request(app.getHttpServer())
      .get(`/tokens/${tokenCreated.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.OK);

    expect(response.body).toBeDefined();
    expect(response.body.name).toEqual(createDto.name);
    // Adicione mais expectativas conforme necessário para validar a obtenção de um token específico
  });

  it('should update a token', async () => {
    const createDto = {
      name: 'Test Token',
      symbol: 'TEST',
      address: '0xabc123',
      supply: '1000000',
      checksum: 'xyz456',
      deployerWallet: '0xdef789',
      deployerInfo: 'Test Deployer',
      deployerLabel: 'Tester',
    };

    const createResponse = await request(app.getHttpServer())
      .post('/tokens')
      .set('Authorization', `Bearer ${token}`)
      .send(createDto)
      .expect(HttpStatus.CREATED);

    const tokenCreated = createResponse.body;

    const updateDto = {
      ...createDto,
      name: 'Updated Token',
    };

    const updateResponse = await request(app.getHttpServer())
      .patch(`/tokens/${tokenCreated.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateDto)
      .expect(HttpStatus.OK);

    expect(updateResponse.body).toBeDefined();
    expect(updateResponse.body.name).toEqual(updateDto.name);
    // Adicione mais expectativas conforme necessário para validar a atualização do token
  });

  it('should delete a token', async () => {
    const createDto = {
      name: 'Test Token',
      symbol: 'TEST',
      address: '0xabc123',
      supply: '1000000',
      checksum: 'xyz456',
      deployerWallet: '0xdef789',
      deployerInfo: 'Test Deployer',
      deployerLabel: 'Tester',
    };

    const createResponse = await request(app.getHttpServer())
      .post('/tokens')
      .set('Authorization', `Bearer ${token}`)
      .send(createDto)
      .expect(HttpStatus.CREATED);

    const tokenCreated = createResponse.body;

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/tokens/${tokenCreated.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(HttpStatus.OK);

    expect(deleteResponse.body).toBeDefined();
    // Adicione mais expectativas conforme necessário para validar a exclusão do token
  });
});
