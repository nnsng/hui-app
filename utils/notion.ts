import type { Cycle, CycleWithoutIsReceived, Round, RoundWithoutLunarDate } from '@/types';
import type { PageObjectResponse } from '@notionhq/client';
import { convertToLunarDate } from './date';

type Property = PageObjectResponse['properties'][string];

const getNotionPropertyValue = (property: Property) => {
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

const transformNotionPageToObject = <T extends object>(page: PageObjectResponse): T => {
  const pageProperties = page.properties;
  const properties = Object.keys(pageProperties).reduce((data, key) => {
    const value = pageProperties[key];
    if (value.type === 'relation') return data;
    return { ...data, [key]: getNotionPropertyValue(value) };
  }, {});

  return { id: page.id, ...properties } as T;
};

export const mapNotionPageToCycle = (page: PageObjectResponse): Cycle => {
  const cycle = transformNotionPageToObject<CycleWithoutIsReceived>(page);
  return { ...cycle, isReceived: !!cycle.receivedDate };
};

export const mapNotionPageToRound = (page: PageObjectResponse): Round => {
  const round = transformNotionPageToObject<RoundWithoutLunarDate>(page);
  return { ...round, lunarDate: convertToLunarDate(round.date) };
};
