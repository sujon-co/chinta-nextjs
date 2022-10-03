import { useRouter } from "next/router";
import { useEffect } from "react";
export default function ToTop({ children }: any) {
    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = () => {
            document.getElementById('root')?.scrollIntoView() as any;
        };
        router.events.on('routeChangeComplete', handleRouteChange);
    }, [router.events]);

    return children;
}
