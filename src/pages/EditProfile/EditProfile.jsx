// src/pages/EditProfile/EditProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import Gov from "../../layout/Gov/Gov.jsx";
import HeaderIcons from "../../layout/HeaderIcons/HeaderIcons.jsx";
import NavBar from "../../layout/NavBar/NavBar.jsx";
import BannerHome3 from "../../assets/banners/BannerHome3.png";
import BannerHome4 from "../../assets/banners/BannerHome4.png";
import BannerHome5 from "../../assets/images/factorHumano5.png";
import ButtonConfirm from "../../components/Buttons/ButtonConfirm/ButtonConfirm.jsx";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/AuthContext/AuthContext.jsx"; // ✅ importar contexto
import "./css/editProfile.css";

const EditProfile = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user, updateUser } = useAuth(); // ✅ acceder a updateUser y datos
  const navigate = useNavigate();

  // Estados de formulario con valores iniciales desde user
  const [formData, setFormData] = useState({
    tipoDocumento: user?.tipoDocumento || "",
    telefono: user?.telefono || "",
    email: user?.email || "",
    direccion: user?.direccion || "",
  });

  const images = [BannerHome3, BannerHome4, BannerHome5];

  // 🎞 Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Guardar cambios
  const handleSave = () => {
    updateUser(formData); // ✅ actualiza en contexto y localStorage
    Swal.fire({
      title: "¡Datos actualizados!",
      text: "Tus datos han sido actualizados correctamente.",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#39a900",
    }).then(() => {
      navigate("/viewprofile"); // ✅ redirige al perfil SIN perder sesión
    });
  };

  return (
    <div id="EditProfilePage">
      <div className="PageEditProfile">
        <Gov />
        <HeaderIcons />
        <NavBar />

        {/* 🎞 Carrusel */}
        <div className="profile-carousel">
          <div className="carousel-container">
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
            <div className="carousel-dots">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 👤 Perfil */}
        <div className="profile-container">
          <div className="profile-header">
            <FaGraduationCap className="icon-Training" />
          </div>
          <h1 className="profile-title">
            {user?.nombre || "Usuario"}
          </h1>

          <div className="info-boxes">
            <div className="info-box">
              <p className="info-main">Estado</p>
              <p className="info-label">{user?.estado || "Activo"}</p>
            </div>
          </div>

          <div className="requirements">
            <div className="requirement">
              <h3>Tipo de documento</h3>
              <select
                name="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={handleChange}
              >
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="NIT">NIT</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PA">Pasaporte</option>
              </select>
            </div>

            <div className="requirement">
              <h3>Número Telefónico</h3>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ingresa el nuevo número de teléfono"
              />
            </div>

            <div className="requirement">
              <h3>Correo Electrónico</h3>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ingresa la nueva dirección de correo"
              />
            </div>

            <div className="requirement">
              <h3>Dirección</h3>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                placeholder="Ingresa la dirección actualizada"
              />
            </div>
          </div>

          {/* Botón Guardar */}
          <div className="Box-Button">
            <div className="Button" onClick={handleSave}>
              <ButtonConfirm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
