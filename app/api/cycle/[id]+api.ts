import { notion } from '@/lib/notionClient';
import { mapNotionPageToCycle } from '@/utils/notion';
import type { PageObjectResponse } from '@notionhq/client';

export async function PATCH(request: Request, { id }: { id: string }) {
  try {
    const payload = await request.json();

    const response = await notion.pages.update({
      page_id: id,
      properties: {
        receivedDate: { date: { start: payload.receivedDate } },
        receivedAmount: { number: payload.receivedAmount },
        netProfit: { number: payload.netProfit },
      },
    });

    const cycle = mapNotionPageToCycle(response as PageObjectResponse);

    return Response.json(cycle);
  } catch (error) {
    console.error(`Error updating round ${id}:`, error);
    return Response.json({ error: 'Failed to update round' }, { status: 500 });
  }
}
