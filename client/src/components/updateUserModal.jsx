export default function updateUserModal({
  show,
  onClose,
  onSubmit,
  firstName,
  lastName,
  email,
  setFirstName,
  setLastName,
  setEmail,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-Componentbg rounded-lg shadow-lg p-8">
        <h2 className="text-lg text-white font-bold mb-4">
          Modifier vos informations
        </h2>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="border p-2 mb-2 w-full text-white"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="border p-2 mb-2 w-full text-white"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 mb-2 w-full text-white"
        />
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-500"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="bg-GreenComp hover:bg-green-400  text-white hover:text-black px-4 py-2 rounded"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}
