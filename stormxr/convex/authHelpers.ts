import { getAuthUserId } from '@convex-dev/auth/server';
import type { MutationCtx, QueryCtx } from './_generated/server';

export async function requireAuth(ctx: MutationCtx | QueryCtx) {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error('Not authenticated');
    return userId;
}
