import { useState, useEffect } from "react";

const useFetch = (url) => {
	const [infos, setInfo] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		//console.log("use effect ran");
		const abortFetch = new AbortController();

		setTimeout(() => {
			fetch(url, { signal: abortFetch.signal })
				.then((res) => {
					if (!res.ok) {
						throw Error("could not fetch the requested data");
					}
					return res.json();
				})
				.then((data) => {
					//console.log(data);
					setInfo(data);
					setIsPending(false);
					setError(null);
				})
				.catch((err) => {
					if (err.name === "AbortError") {
						console.log("aborted");
					} else {
						setIsPending(false);
						setError(err.message);
						console.log(err.message);
					}
				});
		}, 0);

		return () => abortFetch.abort();
		//console.log(blogs);
	}, [url]);

	return { infos, isPending, error };
};

export default useFetch;
