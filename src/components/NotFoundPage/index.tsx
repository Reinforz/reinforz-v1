import { useHistory } from "react-router-dom";

export default function NotFoundPage() {
  const history = useHistory();
  history.push("/")
  return null;
}