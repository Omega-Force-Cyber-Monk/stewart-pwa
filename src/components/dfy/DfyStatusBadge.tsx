import { Badge } from "../common/Badge";
import { customerStatus, formatDfyStatus, orderTone } from "./dfyUtils";

interface DfyStatusBadgeProps {
  status: string;
  customerFacing?: boolean;
}

export function DfyStatusBadge({ status, customerFacing = false }: DfyStatusBadgeProps) {
  return (
    <Badge tone={orderTone(status)}>
      {customerFacing ? customerStatus(status) : formatDfyStatus(status)}
    </Badge>
  );
}

