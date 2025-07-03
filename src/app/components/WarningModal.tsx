"use client";
import React from "react";

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function WarningModal({ isOpen, onClose, message }: WarningModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h3 className="text-lg font-bold text-red-600 mb-4">Advertencia</h3>
        <p className="text-gray-700 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}