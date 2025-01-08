const getConfig = () => {
    return {
        BACKEND: {
            BACKEND_API: import.meta.env.VITE_BACKEND_API_URL,
        }
    }
}

export default getConfig;