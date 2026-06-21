import { notion } from '@/lib/notionClient';

const cycleDataSourceId = process.env.NOTION_CYCLE_DATA_SOURCE_ID;

export async function GET(request: Request) {
  try {
    if (!cycleDataSourceId) {
      return Response.json({ error: 'Missing Data Source ID' }, { status: 500 });
    }

    const response = await notion.dataSources.query({
      data_source_id: cycleDataSourceId,
      filter: {
        property: 'status',
        select: {
          equals: 'active',
        },
      },
      page_size: 1,
    });

    return Response.json(response);
  } catch (error) {
    console.error('Error fetching active cycle:', error);
    return Response.json({ error: 'Failed to fetch active cycle' }, { status: 500 });
  }
}
