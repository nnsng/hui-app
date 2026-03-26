import type { Cycle, CycleRound } from '@/types';

type PropertyType =
  | 'title'
  | 'rich_text'
  | 'number'
  | 'date'
  | 'select'
  | 'relation'
  | (string & {});

export const mapValueToNotionProperty = (value: any, propertyType: PropertyType) => {
  switch (propertyType) {
    case 'title':
      return { title: [{ text: { content: value } }] };
    case 'rich_text':
      return { rich_text: [{ text: { content: value } }] };
    case 'number':
      return { number: value };
    case 'date':
      return { date: { start: value } };
    case 'select':
      return { select: { name: value } };
    case 'checkbox':
      return { checkbox: value };
    case 'relation':
      return { relation: [{ id: value }] };
    default:
      return { [value.type]: value };
  }
};

const getNotionPropertyValue = (property: any) => {
  switch (property.type as PropertyType) {
    case 'title':
      return property.title?.[0]?.plain_text ?? '';
    case 'rich_text':
      return property.rich_text?.[0]?.plain_text ?? '';
    case 'number':
      return property.number ?? 0;
    case 'date':
      return property.date?.start;
    case 'select':
      return property.select?.name ?? '';
    case 'checkbox':
      return property.checkbox ?? false;
    default:
      return property[property.type] ?? '';
  }
};

export const transformNotionPageToObject = <T extends object>(page: any): T => {
  const pageProperties: Record<string, any> = page.properties;
  const properties = Object.keys(pageProperties).reduce((data, key) => {
    const value = pageProperties[key];
    if (value.type === 'relation') return data;
    return { ...data, [key]: getNotionPropertyValue(value) };
  }, {});

  return { id: page.id, ...properties } as T;
};

export const getCycleFromNotion = (data: any[]): Cycle => {
  if (!Array.isArray(data) || data.length === 0) return {} as Cycle;
  return transformNotionPageToObject<Cycle>(data[0]);
};

export const getRoundsFromNotion = (data: any[]) => {
  if (!Array.isArray(data) || data.length === 0) return [];
  return data.map(transformNotionPageToObject<CycleRound>);
};
