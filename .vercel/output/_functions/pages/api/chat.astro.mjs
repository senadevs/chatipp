export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const formData = await request.formData();
    const message = formData.get("message");
    const files = formData.getAll("files");
    const response = await fetch("https://neuron-agent.fly.dev/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        files: files.map((file) => ({
          name: file.name,
          type: file.type,
          // In reality, this would be the URL from your storage service
          url: URL.createObjectURL(file)
        }))
      })
    });
    const data = await response.json();
    console.log(data);
    return new Response(
      JSON.stringify({
        message: data.message_markdown
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
        message: "Error processing request"
      }),
      {
        status: 500,
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
