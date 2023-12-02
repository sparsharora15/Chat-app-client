import * as jose from "jose";

async function decodeToken(suppliedToken = null) {
  try {
    let token;
    if (!suppliedToken) {
      token = localStorage.getItem("userToken");
    } else {
      token = suppliedToken;
    }
    const deCodedToken = await jose.jwtVerify(
      token,
      new TextEncoder().encode(import.meta.env.VITE_SECRET_KEY)
    );
    return { isDecode: true, deCodedToken: deCodedToken };
  } catch (e) {
    return { isDecode: false };
  }
}

export default decodeToken;
