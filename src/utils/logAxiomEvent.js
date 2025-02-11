import { initAxiomLogger } from "./initLogger.js";

const logger = initAxiomLogger();

export function logAxiomEvent(eventName, { chatId, payload, level = "info", ...extra } = {}) {
    try {
        const logData = {
            event: eventName,
            level,
            timestamp: new Date().toISOString(),
            ...(chatId ? { chatId } : {}),
            ...(payload ? { payload } : {}),
            ...extra,
        };

        logger.log(logData);
    } catch (error) {
        console.error("Axiom logging error:", error);
    }
}
