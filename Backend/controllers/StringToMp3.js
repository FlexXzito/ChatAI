import gTTS from "gtts";
export const StringToMp3Controller = async (req, res) => {
    const { text } = req.body;
    try {
        const gtts = new gTTS(`${text}`, "es");
        res.setHeader("Content-Type", "audio/mpeg");
        gtts.stream().pipe(res);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
