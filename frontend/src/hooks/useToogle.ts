import { useState } from "react";

export const useToogle = () => {
    const [status, setStatus] = useState(false);
    const toogleStatus = () => setStatus((preStatus) => !preStatus);
    const close = () => setStatus(false);

    return { status, toogleStatus, close };
}