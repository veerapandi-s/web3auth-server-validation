const jose = require('jose')

const validateUser = async (req, res) => {
    const idToken = req.headers.authorization;
    const app_pub_key = req.body.appPubKey;
    if (!idToken) {
        return res.status(400).json({
            status: false,
            message: "ID Token is missing"
        })
    }
    if (!app_pub_key) {
        return res.status(400).json({
            status: false,
            message: "App Pub Key is missing"
        })
    }
    try {
        const jwks = jose.createRemoteJWKSet(new URL("https://api-auth.web3auth.io/jwks")); // for social logins
        const jwtDecoded = await jose.jwtVerify(idToken, jwks, { algorithms: ["ES256"] });
        // Checking `app_pub_key` against the decoded JWT wallet's public_key
        if ((jwtDecoded.payload).wallets[0].public_key.toLowerCase() === app_pub_key.toLowerCase()) {
            // Verified
            console.log(jwtDecoded);
            return res.status(200).json({ name: 'Verification Successful' })
        } else {
            return res.status(400).json({ name: 'Verification Failed' })
        }
    } catch (error) {
        return res.status(500).json({
            status : false,
            message : "Server Error",
            rawError : error
        })
    }
}

module.exports = {
    validateUser
}