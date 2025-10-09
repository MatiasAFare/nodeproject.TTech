const [method, path, ...args] = process.argv.slice(2);
const [title, price, category] = args;

const apiPath = (path || 'products').replace(/^\/+|\/+$/g, '');
const url = `https://fakestoreapi.com/${apiPath}`;

(async () => {
    const fetchClient = typeof fetch !== 'undefined' ? fetch : (await import('node-fetch')).default;

    const options = {
        GET: { method: 'GET' },
        POST: {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, price: Number(price), category })
        },
        DELETE: { method: 'DELETE' }
    };

    const res = await fetchClient(url, options[method] || options.GET);
    const text = await res.text();

    try {
        const data = JSON.parse(text);
        console.log(JSON.stringify(data, null, 2));
    } catch {
        console.log(text || JSON.stringify({ status: res.status }, null, 2));
    }
})();
