import dotenv from "dotenv";
import winston from "winston";
import { WinstonTransport as AxiomTransport } from "@axiomhq/winston";

dotenv.config();
const isDev = process.env.ENV === "dev";

export function initAxiomLogger() {
    const logger = winston.createLogger({
        level: "info",
        format: winston.format.json(),
        defaultMeta: { service: "user-service", isDev },
        transports: [
            new AxiomTransport({
                token: process.env.AXIOM_API_TOKEN,
                dataset: process.env.AXIOM_DATASET,
            }),
        ],
    });

    return logger;
}
