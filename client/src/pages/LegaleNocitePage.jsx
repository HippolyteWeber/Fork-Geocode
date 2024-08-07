import Navbar from "../components/Navbar";

export default function LegaleNoticePage() {
  return (
    <>
      <Navbar />
      <ul className=" bg-bg-geocode text-white py-12 px-4 md:px-40 pb-32 ">
        <h1 className="text-4xl pb-4"> Conditions Générales d'Utilisation</h1>
        <li className="text-2xl pb-4">
          En accédant et en utilisant le site Geocode, vous acceptez de
          respecter les conditions générales d'utilisation suivantes :
        </li>
        <h3 className="text-2xl pb-4">Objet</h3>
        <li className="pb-4">
          Le site Geocode fournit un service de localisation des bornes de
          recharge pour véhicules électriques basé sur les données publiques du
          fichier IRVE de data.gouv.
        </li>
        <h3 className="text-2xl pb-4">Accès au Service</h3>
        <li className="pb-4">
          L'accès au site et à ses services est libre. Toutefois, l'utilisation
          de certaines fonctionnalités nécessite la création d'un compte
          utilisateur.
        </li>
        <h3 className="text-2xl pb-4">Responsabilité</h3>
        <li className="pb-4">
          Geocode ne saurait être tenu responsable des erreurs ou omissions dans
          les données fournies par le site. Les informations disponibles sont à
          titre indicatif et peuvent être modifiées sans préavis.
        </li>
        <h3 className="text-2xl pb-4">Propriété Intellectuelle</h3>
        <li className="pb-4">
          Le contenu du site Geocode, y compris les textes, graphiques, logos,
          et autres éléments, est la propriété exclusive de Geocode ou de ses
          partenaires. Toute reproduction ou utilisation sans autorisation est
          interdite.
        </li>
        <h3 className="text-2xl pb-4"> Liens Externes</h3>
        <li className="pb-4">
          Le site peut contenir des liens vers des sites externes. Geocode ne
          saurait être tenu responsable du contenu de ces sites ou de leurs
          pratiques en matière de confidentialité.
        </li>
        <h3 className="text-2xl pb-4">Modification des Conditions</h3>
        <li className="pb-4">
          Geocode se réserve le droit de modifier les conditions générales
          d'utilisation à tout moment. Les modifications seront publiées sur
          cette page.
        </li>
        <h2 className="text-3xl pb-4">Politique de Confidentialité (RGPD)</h2>
        <h3 className="text-2xl pb-4"> 1. Données Collectées</h3>
        <li className="pb-4">
          Lors de votre utilisation du site Geocode, nous pouvons collecter les
          données suivantes : Données d'identification : nom, prénom, adresse
          e-mail, mot de passe (haché). Données de géolocalisation :
          informations de localisation pour trouver les bornes de recharge à
          proximité. Données de véhicule : modèle, marque du véhicule
          sélectionné par l'utilisateur. Données de navigation : adresse IP,
          type de navigateur, pages visitées.
        </li>
        <h3 className="text-2xl pb-4"> 2. Finalités du Traitement</h3>
        <li className="pb-4">
          Les données collectées sont utilisées pour : Créer et gérer votre
          compte utilisateur. Fournir les services de localisation des bornes de
          recharge. Améliorer notre site et nos services en fonction de vos
          préférences. Vous envoyer des informations pertinentes concernant
          notre service (newsletters, mises à jour).
        </li>
        <h3 className="text-2xl pb-4">3. Base Légale du Traitement</h3>
        <li className="pb-4">
          Le traitement de vos données personnelles est fondé sur les bases
          légales suivantes : Consentement : Vous avez consenti à la collecte et
          au traitement de vos données lors de la création de votre compte ou de
          l'utilisation de certaines fonctionnalités du site. Exécution du
          contrat : Le traitement est nécessaire pour la fourniture des services
          demandés. Obligations légales : Le traitement est nécessaire pour
          respecter des obligations légales auxquelles nous sommes soumis.
        </li>
        <h3 className="text-2xl pb-4">4. Durée de Conservation</h3>
        <li className="pb-4">
          Les données personnelles sont conservées pendant la durée nécessaire à
          la réalisation des finalités pour lesquelles elles ont été collectées,
          et ce, conformément aux exigences légales applicables.
        </li>
        <h3 className="text-2xl pb-4">5. Sécurité des Données</h3>
        <li className="pb-4">
          Nous mettons en œuvre des mesures techniques et organisationnelles
          appropriées pour garantir la sécurité de vos données personnelles et
          prévenir toute perte, détérioration ou accès non autorisé.
        </li>
        <h3 className="text-2xl pb-4"> 6. Droits des Utilisateurs</h3>
        <li className="pb-4">
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous disposez des droits suivants : Droit d'accès : Vous
          pouvez demander une copie des données personnelles que nous détenons
          sur vous. Droit de rectification : Vous pouvez demander la correction
          de données personnelles inexactes ou incomplètes. Droit à l'effacement
          : Vous pouvez demander la suppression de vos données personnelles dans
          certaines circonstances. Droit à la limitation du traitement : Vous
          pouvez demander de limiter le traitement de vos données personnelles.
          Droit à la portabilité : Vous pouvez demander la transmission de vos
          données personnelles à un autre responsable du traitement. Droit
          d'opposition : Vous pouvez vous opposer au traitement de vos données
          pour des motifs légitimes. Pour exercer vos droits, veuillez nous
          contacter à l'adresse suivante : contact@geocode.example.
        </li>
        <h3 className="text-2xl pb-4">7. Cookies</h3>
        <li className="pb-4">
          Le site Geocode utilise des cookies pour améliorer votre expérience
          utilisateur. Vous pouvez gérer vos préférences en matière de cookies
          via les paramètres de votre navigateur.
        </li>
        <h3 className="text-2xl pb-4">
          8. Modifications de la Politique de Confidentialité
        </h3>
        <li className="pb-4">
          Cette politique de confidentialité peut être mise à jour. Les
          modifications seront publiées sur cette page. Nous vous encourageons à
          consulter régulièrement cette politique pour être informé de tout
          changement.{" "}
        </li>
      </ul>
    </>
  );
}
