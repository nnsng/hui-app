import { notion } from '@/lib/notionClient';
import { mapNotionPageToCycle } from '@/utils/notion';
import type { PageObjectResponse } from '@notionhq/client';

const cycleDataSourceId = process.env.NOTION_CYCLE_DATA_SOURCE_ID;

export async function GET(request: Request) {
  try {
    if (!cycleDataSourceId) {
      return Response.json({ error: 'Missing Data Source ID' }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') ?? 'active';

    const response = await notion.dataSources.query({
      data_source_id: cycleDataSourceId,
      filter: {
        property: 'status',
        select: {
          equals: status,
        },
      },
      page_size: 1,
    });

    const cycles = response.results.map((item) => mapNotionPageToCycle(item as PageObjectResponse));

    return Response.json(cycles);
  } catch (error) {
    console.error('Error fetching active cycle:', error);
    return Response.json({ error: 'Failed to fetch active cycle' }, { status: 500 });
  }
}
