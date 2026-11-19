const originalEnv = process.env;

function loadEnv() {
  let env: any;
  jest.isolateModules(() => {
    // eslint-disable-next-line ts/no-require-imports
    env = require('../env');
  });
  return env;
}

describe('env validation', () => {
  beforeEach(() => {
    process.env = {
      ...originalEnv,
      APP_ENV: 'staging',
      API_URL: 'https://example.com',
      VAR_NUMBER: '10',
      VAR_BOOL: 'true',
      SECRET_KEY: 'secret',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  it('parses valid variables and keeps build-time values out of the client env', () => {
    const { ClientEnv, Env } = loadEnv();

    expect(Env).toMatchObject({
      APP_ENV: 'staging',
      BUNDLE_ID: 'com.mpnlookuprn.staging',
      SECRET_KEY: 'secret',
      VAR_BOOL: true,
      VAR_NUMBER: 10,
    });
    expect(ClientEnv).not.toHaveProperty('SECRET_KEY');
  });

  it('reports the invalid field and throws', () => {
    process.env.VAR_NUMBER = 'not-a-number';
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(loadEnv).toThrow('Invalid environment variables');
    expect(error.mock.calls[0][1]).toHaveProperty('VAR_NUMBER');
  });
});
