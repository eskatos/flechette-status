import { useState, useEffect } from "react";
import ServiceStatus from "../types/ServiceStatus";

function useSystemStatus() {
    const [data, setData] = useState<ServiceStatus[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("./urls.cfg");
                const configText = await response.text();
                const configLines = configText.split("\n");

                const services: ServiceStatus[] = [];
                for (let ii = 0; ii < configLines.length; ii++) {
                    const configLine = configLines[ii];
                    const [key, url] = configLine.split("=");
                    if (!key || !url) {
                        continue;
                    }
                    const status = await logs(key);

                    services.push(status);
                }

                setData(services as ServiceStatus[]);
            } catch (e: any) {
                setError(e);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    return [data, isLoading, error];
}

async function logs(key: string): Promise<ServiceStatus> {
    const response = await fetch(`./status/${key}_report.log`);
    const text = await response.text();
    const lines = text.split("\n");
    try {
        const line = lines[lines.length - 2];
        const [created_at, status, _] = line.split(", ");
        return {
            name: key,
            status: status,
            date: created_at,
        };
    } catch (e) {
        return {
            name: key,
            status: "unknown",
            date: undefined,
        };
    }
}

export default useSystemStatus;
