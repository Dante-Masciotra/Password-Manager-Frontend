import { refreshTokens, isExpired } from "./token";
export const httpGet = async (url) => {
	try {
		const res = await fetch(url);
		return res;
	} catch (e) {
		console.log(e);
	}
};

export const authHttpGet = async (url, token) => {
	try {
		if (isExpired(token)) {
			await refreshTokens(localStorage.getItem("refresh"));
		}
		const res = await fetch(url, {
			method: "GET",
			headers: {
				"content-type": "application/json",
				"x-access-token": token,
			},
		});
		return res;
	} catch (e) {
		console.log(e);
	}
};

export const httpPost = async (url, body) => {
	try {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(body),
		});
		return res;
	} catch (e) {
		console.log(e);
	}
};

export const authHttpPost = async (url, token, body) => {
	try {
		if (isExpired(token)) {
			await refreshTokens(localStorage.getItem("refresh"));
		}
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				"x-access-token": token,
			},
			body: JSON.stringify(body),
		});
		return res;
	} catch (e) {
		console.log(e);
	}
};

export const httpPut = async (url, body) => {
	try {
		const res = await fetch(url, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(body),
		});
		return res;
	} catch (e) {
		console.log(e);
	}
};

export const authHttpPut = async (url, token, body) => {
	try {
		if (isExpired(token)) {
			await refreshTokens(localStorage.getItem("refresh"));
		}
		const res = await fetch(url, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
				"x-access-token": token,
			},
			body: JSON.stringify(body),
		});
		return res;
	} catch (e) {
		console.log(e);
	}
};
