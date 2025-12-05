import { IgApiClient } from 'instagram-private-api';

export default async function handler(req, res) {
  const ig = new IgApiClient();

  try {
    // Load session from environment variable
    if (process.env.IG_SESSION_STATE) {
      await ig.importState(process.env.IG_SESSION_STATE);
    } else {
      // First time login (not recommended in production)
      ig.state.generateDevice(process.env.IG_USER);
      await ig.account.login(process.env.IG_USER, process.env.IG_PASS);
      const session = await ig.exportState();
      console.log("Exported session:", session);
    }

    const { toUser, message } = req.query;
    const userId = await ig.user.getIdByUsername(toUser);
    await ig.entity.directThread([userId]).broadcastText(message);

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}
