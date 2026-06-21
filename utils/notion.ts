import type { Cycle, CycleWithoutIsReceived, Round, RoundWithoutLunarDate } from '@/types';
import type { PageObjectResponse } from '@notionhq/client';
import { convertToLunarDate } from './date';

const getNotionPropertyValue = (property: PageObjectResponse['properties'][string]) => {
  switch (property.type) {
    case 'title':
      return property.title?.[0]?.plain_text ?? '';
    case 'rich_text':
      return property.rich_text?.[0]?.plain_text ?? '';
    case 'number':
      return property.number ?? 0;
    case 'date':
      return property.date?.start ?? '';
    case 'select':
      return property.select?.name ?? '';
    case 'checkbox':
      return property.checkbox ?? false;
    case 'relation':
      return property.relation[0].id ?? '';
    default:
      return '';
  }
};

export const transformNotionPageToObject = <T extends object>(page: PageObjectResponse): T => {
  const pageProperties = page.properties;
  const properties = Object.keys(pageProperties).reduce((data, key) => {
    const value = pageProperties[key];
    if (value.type === 'relation') return data;
    return { ...data, [key]: getNotionPropertyValue(value) };
  }, {});

  return { id: page.id, ...properties } as T;
};

export const getCycleFromNotion = (data: PageObjectResponse[]): Cycle => {
  if (!Array.isArray(data) || data.length === 0) return {} as Cycle;
  const cycle = transformNotionPageToObject<CycleWithoutIsReceived>(data[0]);
  return { ...cycle, isReceived: !!cycle.receivedDate };
};

export const getRoundsFromNotion = (data: PageObjectResponse[]): Round[] => {
  if (!Array.isArray(data) || data.length === 0) return [];
  return data.map((item) => {
    const round = transformNotionPageToObject<RoundWithoutLunarDate>(item);
    return {
      ...round,
      lunarDate: convertToLunarDate(round.date),
    };
  });
};
