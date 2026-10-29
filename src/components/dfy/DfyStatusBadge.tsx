import { Badge } from "../common/Badge";
import { formatDfyStatus, orderTone } from "./dfyUtils";

interface DfyStatusBadgeProps {
  status: string;
}

export function DfyStatusBadge({ status }: DfyStatusBadgeProps) {
  return <Badge tone={orderTone(status)}>{formatDfyStatus(status)}</Badge>;
}
