"use client";

import Modal from "@/components/ui/Modal";
import PortfolioEditForm from "./PortfolioEditForm";

type Props = {
  open: boolean;
  onClose: () => void;
  portfolio: any;
};

export default function PortfolioEditModal({ open, onClose, portfolio }: Props) {
  return (
    <Modal open={open} onClose={onClose} title="Edit Portfolio">
      <PortfolioEditForm portfolio={portfolio} onSuccess={onClose} />
    </Modal>
  );
}