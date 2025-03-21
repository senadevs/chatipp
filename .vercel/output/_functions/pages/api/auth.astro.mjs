export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { token } = body;
    return new Response(
      JSON.stringify({
        user: {
          id: "123",
          email: "demo@example.com",
          name: "Demo User"
        },
        session: {
          token: "mock-session-token",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3).toISOString()
        }
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Authentication failed"
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
