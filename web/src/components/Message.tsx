import { Alert } from "@mui/material";

interface MessageProps {
  type: 'success' | 'error' | 'warning';
  children: React.ReactNode;
  visibility: boolean;
}

export function Message({ type, children, visibility }: MessageProps) {
  return <Alert
    sx={{
      position: 'absolute',
      top: 10,
      right: 10,
      display: visibility ? 'static' : 'none',
      maxWidth: '300px'
    }}
    severity={type}>
      { children }
    </Alert>
}