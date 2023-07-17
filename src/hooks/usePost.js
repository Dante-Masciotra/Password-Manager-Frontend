import { useState, useEffect } from "react";

const usePost = (url, body) => {
	const [data, setData] = useState();
	useEffect(async () => {
		const res = await fetch(
			url,
			{
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify(body),
			},
			[url]
		);
		setData(res);
	});
	return data; // this returns a response object; use json() on the returned value if you don't need other parts of the object
};

export default usePost;
