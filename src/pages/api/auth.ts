import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { token } = body;

    // In a real app, you would:
    // 1. Verify the token with Supabase
    // 2. Create or update the user in your database
    // 3. Generate your own session token
    // 4. Return the session data

    // For demo purposes, we'll return mock data
    return new Response(
      JSON.stringify({
        user: {
          id: '123',
          email: 'demo@example.com',
          name: 'Demo User',
        },
        session: {
          token: 'mock-session-token',
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Authentication failed',
      }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};