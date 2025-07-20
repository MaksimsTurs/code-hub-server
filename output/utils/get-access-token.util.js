export default function getAccessToken(headers) {
    return headers.authentication?.toString()?.replace("Bearer ", "")?.trim();
}
