import type { IncomingHttpHeaders } from "node:http2";

export default function getAccessToken(headers: IncomingHttpHeaders): string | undefined {
	return headers.authentication?.toString()?.replace("Bearer ", "")?.trim();
}