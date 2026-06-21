import { notion } from '@/lib/notionClient';

const roundDataSourceId = process.env.NOTION_ROUND_DATA_SOURCE_ID;

export async function GET(request: Request) {
  try {
    if (!roundDataSourceId) {
      return Response.json({ error: 'Missing Data Source ID' }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const cycleId = searchParams.get('cycleId');

    if (!cycleId) {
      return Response.json({ error: 'cycleId is required' }, { status: 400 });
    }

    const response = await notion.dataSources.query({
      data_source_id: roundDataSourceId,
      filter: {
        property: 'cycle',
        relation: {
          contains: cycleId,
        },
      },
      sorts: [
        {
          property: 'date',
          direction: 'descending',
        },
      ],
    });

    return Response.json(response);
  } catch (error) {
    console.error('Error fetching rounds:', error);
    return Response.json({ error: 'Failed to fetch rounds' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!roundDataSourceId) {
      return Response.json({ error: 'Missing Data Source ID' }, { status: 500 });
    }

    const payload = await request.json();

    const response = await notion.pages.create({
      parent: {
        data_source_id: roundDataSourceId,
      },
      properties: {
        cycle: { relation: [{ id: payload.cycle }] },
        round: { title: [{ text: { content: payload.round } }] },
        date: { date: { start: payload.date } },
        bidAmount: { number: payload.bidAmount },
        paymentAmount: { number: payload.paymentAmount },
        status: { select: { name: payload.status } },
      },
    });
    return Response.json(response);
  } catch (error) {
    console.error('Error creating round:', error);
    return Response.json({ error: 'Failed to create round' }, { status: 500 });
  }
}
