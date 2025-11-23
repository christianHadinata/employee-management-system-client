import React from "react";
import warningIcon from "../assets/icon/warning-1.png";

type ModalProps = {
  show: boolean;
  employeeId: number | null;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteConfirmationModal = ({
  show,
  employeeId,
  onClose,
  onConfirm,
}: ModalProps) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      {/* Modal Container */}
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 flex flex-col justify-center items-center">
        <img src={warningIcon} alt="" className="w-20 h-20 mb-4" />
        <h3 className="text-xl font-bold text-black mb-4">
          Konfirmasi Penghapusan
        </h3>

        <p className="text-gray-700 mb-6 text-center">
          Apakah Anda yakin ingin menghapus data karyawan dengan ID:{" "}
          <span className="font-semibold">{employeeId}</span>?
        </p>
        {/* Tombol Aksi */}
        <div className="flex justify-end space-x-12">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-150"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-150"
          >
            Ya
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
