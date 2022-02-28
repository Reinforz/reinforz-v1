import { useNavigate } from "react-router-dom";
export default function NotFoundPage() {
    const navigate = useNavigate();
    navigate("/");
    return null;
}
