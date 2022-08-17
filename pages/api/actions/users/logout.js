import { serialize } from "cookie";

export default async function handle(req, res) {
  const { cookies } = req;
  const jwt = cookies.paridhi;

  if(!jwt) {
    return res.json({ message: "YOU ARE ALREADY LOGEDOUT USERS!" });
  } else {
      const serialised = serialize("paridhi", null, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      });

    res.setHeader("Set-Cookie", serialised);
    res.status(200).json({ message: "LOGOUT DONE!" });
  }
}