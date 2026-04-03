export function canViewNotice(visibility: string, role: string) {
  if (role === "ADMIN") return true;
  if (visibility === "PUBLIC") return true;
  if (visibility === "AGENT" && role === "AGENT") return true;
  return false;
}
