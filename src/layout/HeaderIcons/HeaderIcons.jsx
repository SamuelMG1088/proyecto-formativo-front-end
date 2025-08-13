import './css/headerIcons.css';
import '../../styles/variables.css';
import logosena from '../../assets/logos/logo-Sena.png';
import logosisgeec from '../../assets/logos/logo-sisgeec.png';
import { GrLanguage } from "react-icons/gr";
import { useTranslation } from 'react-i18next';

const HeaderLogin = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <div id='barra-navegacion'>
      <nav>
        <img src={logosisgeec} alt="logo-sisgeec" />
        <div className="icons-left">
          <button 
            onClick={handleLanguageChange}
            className="language-button"
            aria-label="Change language"
          >
            <GrLanguage className='icon-language' />
            <span>{i18n.language === 'es' ? 'EN' : 'ES'}</span>
          </button>
          <img className='img-sena' src={logosena} alt="logo-sena" />
        </div>
      </nav>
    </div>
  );
};

export default HeaderLogin;