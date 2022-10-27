import { createPortal } from "react-dom";

interface Props {
  selector?: string;
}

export default function Portal(props: any) {
  const rootEl = props.selector && document.getElementById(props.selector);

  return <>{rootEl ? createPortal(props.children, rootEl) : props.children}</>;
}
