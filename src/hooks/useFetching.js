import { useState } from "react";

function useFetching(callback) {
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    const fetchData = async (...args) => {
        setTimeout(async () => {
            try {
                await callback(...args)
            } catch (error) {
                console.log(error)
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }, 1500)
    }
    return [isLoading, error, fetchData]
}

export default useFetching;