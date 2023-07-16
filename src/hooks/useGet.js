import { useState, useEffect } from "react";

const useGet = (url) => {
	const [data, setData] = useState();
	useEffect(async () => {
		const res = await fetch(url);
		setData(res.json());
	}, [url]);
	return data;
};

export default useGet;
