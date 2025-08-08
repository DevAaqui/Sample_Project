import LZString from 'lz-string';

export const serialize = (data: any) => {
  return LZString.compressToEncodedURIComponent(JSON.stringify(data));
};

export const deserialize = (text: string) => {
  if (typeof text !== 'string') {
    return text;
  }
  return JSON.parse(LZString.decompressFromEncodedURIComponent(text) || '{}');
};

const serialization = {
  serialize,
  deserialize,
};

export default serialization;
