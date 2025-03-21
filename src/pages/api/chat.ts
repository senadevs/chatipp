import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const message = formData.get('message') as string;
    const files = formData.getAll('files') as File[];

    // In a real application, you would:
    // 1. Upload files to a storage service (e.g., Supabase Storage)
    // 2. Process the message
    // 3. Forward everything to your Laravel backend

    const response = await fetch('https://neuron-agent.fly.dev/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message,
        files: files.map(file => ({
          name: file.name,
          type: file.type,
          // In reality, this would be the URL from your storage service
          url: URL.createObjectURL(file)
        }))
      }),
    });

    const data = await response.json();

    return new Response(
      JSON.stringify({
        message: data.message_markdown,
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
        message: 'Error processing request',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};