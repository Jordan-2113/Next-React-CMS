import useragent from "express-useragent";

export default function handler(req, res) {
    var source = req.headers['user-agent'];
    var ua = useragent.parse(source);

    if (ua.isiPad || ua.isiPhone || ua.isiPod) {
        return res.redirect(`https://apps.apple.com/us/app/${process.env.NEXT_PUBLIC_APP_STORE}`);
    }
    return res.redirect(`https://play.google.com/store/apps/details?id=${process.env.NEXT_PUBLIC_PLAY_STORE}`);
} 