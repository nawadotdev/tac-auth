import "dotenv/config"

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

function base64Encode(str) {
    return Buffer.from(str).toString('base64');
}

function base64UrlEncode(str) {
    return Buffer.from(str, 'hex').toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

const sha256 = async (str) => {
    const msgUint8 = new TextEncoder().encode(str);
    return crypto.subtle.digest('SHA-256', msgUint8)
        .then(hashBuffer => {
            let hashArray = Array.from(new Uint8Array(hashBuffer));
            let hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
            return hashHex;
        });
}

export const generateCodeVerifier = (length = 43) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export const generateCodeChallenge = async (codeVerifier) => {
    const sha256Hash = await sha256(codeVerifier);
    return base64UrlEncode(sha256Hash);
}

export const generateAuthLink = (state, challange) => {
    const authUrl = `https://x.com/i/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=users.read%20tweet.read&state=${state}&code_challenge=${challange}&code_challenge_method=S256`
    return authUrl;
}

export const getAccessToken = async (code, verifier) => {
    const resp = await fetch("https://api.x.com/2/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${base64Encode(CLIENT_ID + ":" + CLIENT_SECRET)}`
        },
        body: `code=${code}&grant_type=authorization_code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&code_verifier=${verifier}`
    })

    const data = await resp.json();
    console.log(data)
    return data.access_token || null

}