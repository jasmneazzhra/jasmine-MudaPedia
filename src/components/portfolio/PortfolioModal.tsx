"use client";

import Modal from "@/components/ui/Modal";
import PortfolioForm from "./PortfolioForm";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function PortfolioModal({
  open,
  onClose,
}: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Portfolio"
    >
      <PortfolioForm
        onSuccess={onClose}
      />
    </Modal>
  );
}