export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { eventName } = req.body;

    // ==========================================
    // MASUKKAN DATA TRACKING META LU DI SINI
    // ==========================================
    const META_PIXEL_ID = "1030551356672770";
    const CAPI_ACCESS_TOKEN = "EAAcygAkuEZBYBSRjBoOEZAwhD0CKJ9sCXbGtlLaQcBaVHxbApE6ZCcgmAKFhd2xqCX8D7WLJu9PZArUyGZAgQb0ySE9BBBkZB5RoVPZC5ZAp0xADzLSX8ZBVGG1UpZA7ZA3kPFyZCjZBcgVHRkYsHQFByzA1fRyDHCzRA18EuZB23PLA704QesmH8hnogiGELoxKA0qgZDZD";
    const TEST_EVENT_CODE = ""; // Kosongkan string ("") jika website sudah live
    // ==========================================

    const url = `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events`;

    const payload = {
        data: [
            {
                event_name: eventName,
                event_time: Math.floor(Date.now() / 1000),
                action_source: "website",
                user_data: {
                    // CAPI butuh IP dan User Agent untuk mencocokkan data
                    client_ip_address: req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
                    client_user_agent: req.headers['user-agent']
                }
            }
        ],
        access_token: CAPI_ACCESS_TOKEN
    };

    // Tambahkan test_event_code jika sedang mode testing
    if (TEST_EVENT_CODE) {
        payload.test_event_code = TEST_EVENT_CODE;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const fbResponse = await response.json();
        res.status(200).json({ success: true, data: fbResponse });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}
