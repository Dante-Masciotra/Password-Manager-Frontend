import { refreshTokens } from "./token";
import { authHttpGet } from "./httpUtil";
const getPasswords = async (token, refresh) => {
	try {
		const res = await authHttpGet("http://127.0.0.1:5000/GetPassword", token);
		if (res.ok) {
			return res.json();
		} else {
			if (await refreshTokens(refresh)) {
				return res.json();
			}
		}
		return "";
	} catch (e) {
		console.log(e);
		return "";
	}
};
export default getPasswords;
