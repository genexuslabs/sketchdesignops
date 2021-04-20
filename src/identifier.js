const isDev = process.env.NODE_ENV === 'development';

const id = `gxdesignops${isDev ? '.dev' : ''}`;

module.exports = {
  name: `GeneXusDesignOps${isDev ? ' DEV' : ''}`,
  identifier: id,
};
