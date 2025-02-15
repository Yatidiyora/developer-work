const getConfig = () => {
    return {
        BACKEND: {
            BACKEND_API: import.meta.env.VITE_BACKEND_API_URL,
        },
        FRONTEND: {
            DELELOPER_WORK_AUTH_TOKEN_ID: import.meta.env.VITE_DELELOPER_WORK_AUTH_TOKEN_ID,
        }
    }
}

export default getConfig;