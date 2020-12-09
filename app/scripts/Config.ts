const config = require('./config.json');
const environment: string = 'prod';

const Config: Config = (() => {
  if (!environment) {
    console.error('env is not set');
  }

  switch (environment) {
    case 'dev':
      return config.development;
    case 'prod':
      return config.production;
    default:
      console.error('env not found');
  }
})();

export default Config;

interface Config {
  contentScript: {
    shouldDisplayButton: boolean,
    isButtonDisabledWhenClick: boolean
  }
}
