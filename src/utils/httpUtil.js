export const httpGet = async (url) => {
	const res = await fetch(url);
	return res;
};

export const authHttpGet = async (url, token) => {
	const res = await fetch(url, {
		method: "GET",
		headers: {
			"content-type": "application/json",
			"x-access-token": token,
		},
	});
	return res;
};

export const httpPost = async (url, body) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(body),
	});
	return res;
};

export const authHttpPost = async (url, token, body) => {
	const res = await fetch(url, {
		method: "POST",
		headers: {
			"content-type": "application/json",
			"x-access-token": token,
		},
		body: JSON.stringify(body),
	});
	return res;
};
