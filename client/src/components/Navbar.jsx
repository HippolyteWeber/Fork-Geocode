import { ShieldEllipsis, ReceiptText, Send, User } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";

export default function Navbar() {
  const { currentUser } = useOutletContext();
  return (
    <div className="md:fixed md:inset-x-0 md:bottom-10 md:flex md:justify-center md:items-center z-[1000] fixed bottom-0 w-full">
      <div className="bg-GreenComp md:w-10/12 rounded-xl border-solid border-4 border-GreyComp flex flex-col py-4 ">
        <ul className="flex justify-evenly flex-row items-center  ">
          <Link to="/map">
            <li className="flex flex-col items-center ">
              <Send color="#ffffff" size={20} strokeWidth={1} />
              <span className="text-white mt-2 font-paraph hover:text-black">
                Carte
              </span>
            </li>
          </Link>
          {!currentUser ? (
            <Link to="/connexion">
              <li className="flex flex-col items-center">
                <User color="#ffffff" size={20} strokeWidth={1} />
                <span className="text-white mt-2 font-paraph hover:text-black">
                  connexion
                </span>
              </li>
            </Link>
          ) : (
            <Link to="/profil">
              <li className="flex flex-col items-center">
                <User color="#ffffff" size={20} strokeWidth={1} />
                <span className="text-white mt-2 font-paraph hover:text-black">
                  {currentUser.role === "Admin" ? "Tableau de bord" : "Profil"}
                </span>
              </li>
            </Link>
          )}

          <Link to="/contact">
            <li className="flex flex-col items-center">
              <ReceiptText color="#ffffff" size={20} strokeWidth={1} />
              <span className="text-white mt-2 font-paraph hover:text-black">
                Contact
              </span>
            </li>
          </Link>
          <Link to="/rgpd">
            <li className="flex flex-col items-center">
              <ShieldEllipsis color="#ffffff" size={20} strokeWidth={1} />

              <span className="text-white mt-2 font-paraph hover:text-black">
                Mentions
              </span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
