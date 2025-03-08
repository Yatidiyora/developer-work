import { useState } from "react";

export const useToggle = () => {
    const [status, setStatus] = useState(false);
    const toggleStatus = () => setStatus((preStatus) => !preStatus);
    const close = () => setStatus(false);

    return { status, toggleStatus, close };
}