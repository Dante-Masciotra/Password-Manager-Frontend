import { authHttpGet } from "./httpUtil";

const parseJwt = (token) => {
	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const jsonPayload = decodeURIComponent(
			window
				.atob(base64)
				.split("")
				.map((c) => {
					return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
				})
				.join("")
		);
		return JSON.parse(jsonPayload);
	} catch (e) {
		console.log(e);
	}
};

export const isExpired = (token) => {
	const decode = parseJwt(token);
	if (!decode) return;
	const currentTime = Math.floor(Date.now() / 1000);
	return decode.exp < currentTime;
};

export const authenticate = async (token, refresh) => {
	const res = await authHttpGet("http://127.0.0.1:5000/authenticate", token);
	if (res.ok) {
		return true;
	} else {
		if (await refreshTokens(refresh)) {
			return true;
		}
	}
	return false;
};

export const refreshTokens = async (refreshToken) => {
	try {
		const res = await fetch("http://127.0.0.1:5000/refresh", {
			method: "GET",
			headers: {
				"content-type": "application/json",
				"x-refresh-token": refreshToken,
			},
		});
		const data = await res.json();
		if (res.ok) {
			localStorage.setItem("refresh", data.refresh);
			localStorage.setItem("token", data.token);
			return true;
		}
		return false;
	} catch (e) {
		console.log(e);
		return false;
	}
};
