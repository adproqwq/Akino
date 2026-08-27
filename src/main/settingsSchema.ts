import type { JSONSchema } from 'electron-conf/main';

interface ISettings {
  lang?: string;
};

export const schema: JSONSchema<ISettings> = {
  type: 'object',
  properties: {
    lang: {
      type: 'string',
      nullable: true,
    },
    theme: {
      type: 'string',
      nullable: true,
    },
    proxy: {
      "type": 'string',
      nullable: true,
    },
  },
  required: [],
};