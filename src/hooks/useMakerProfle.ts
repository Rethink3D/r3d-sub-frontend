import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { getMyMakerProfile } from "../services/api";
import { Maker } from "../types/types";

export const useMakerProfile = () => {
  const navigate = useNavigate();
  const [maker, setMaker] = useState<Maker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMakerProfile = async () => {
      try {
        setLoading(true);
        const makerProfile = await getMyMakerProfile();
        if (isMounted) setMaker(makerProfile);
      } catch (err: any) {
        console.error("Erro ao buscar perfil do maker:", err);
        if (isMounted)
          setError("Não foi possível carregar seu perfil de maker.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMakerProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/maker/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      navigate("/maker/login");
    }
  };

  return { maker, loading, error, handleLogout };
};
