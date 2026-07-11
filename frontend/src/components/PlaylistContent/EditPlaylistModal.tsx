import { useRef, useState } from "react"
import { Modal } from "../ui/Modal"
import LockIcon from "@/assets/icons/lock-icon.svg"
import PencilIcon from "@/assets/icons/pencil-icon.svg"
import CoverImage from "@/assets/playlist-cover.png"

interface EditPlaylistModalProps {
  isOpen: boolean
  onClose: () => void
  playlist: {
    name: string
    description: string
    isPublic: boolean
  }
  onSave: (data: {
    name: string,
    description: string
    isPublic?: boolean
  }) => void
}

export default function EditPlaylistModal({
  isOpen,
  onClose,
  playlist,
  onSave
}: EditPlaylistModalProps) {
  const [name, setName] = useState(playlist.name)
  const [description, setDescription] = useState(playlist.description)
  const [isPublic, setIsPublic] = useState(playlist.isPublic)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCoverClick = () => fileInputRef.current?.click()

  const handleSave = () => {
    onSave({ name, description, isPublic })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <h2 className="text-white text-16-bold">Editar detalhes</h2>

        {/* Body */}
        <div className="flex gap-3">
          {/* cover image */}
          <div
            onClick={handleCoverClick}
            className="relative h-[134px] w-[134px] rounded-sm shrink-0 group">
            <img src={CoverImage} className="object-fit" />

            {/* hover overlay */}
            <div className="absolute flex flex-col gap-3 items-center justify-center inset-0 bg-bg-popup opacity-0 group-hover:opacity-100 transition-opacity ">
              <img src={PencilIcon} className="w-8 h-8" />
              <span className="text-white text-12-bold px-2">
                Escolher foto
              </span>
            </div>

            {/* hidden input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* input fields */}
          <div className="flex flex-col gap-2 flex-1 ">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome da playlist"
              className="w-full h-[30px] bg-textbox-bg text-10-medium text-white placeholder:text-subdued p-2 rounded-sm outline-none"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição da playlist preenchida"
              className="w-full h-[93px] bg-textbox-bg text-10-medium text-white placeholder:text-subdued p-2 rounded-sm outline-none "
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between ">
          <button
            onClick={() => setIsPublic(prev => !prev)}
            className="text-white text-10-bold flex items-center gap-2 px-4 py-2 border border-essential-subdued hover:border-white hover:border-2 transition-colors rounded-full outline-none cursor-pointer ">
            <img src={LockIcon} />
            {isPublic ? "Tornar privada" : "Tornar pública"}
          </button>
          <button
            onClick={handleSave}
            className="bg-white text-black text-12-bold px-6 h-9 rounded-full outline-none cursor-pointer disabled:opacity-50"
          >
            Salvar
          </button>
        </div>

        <p className="text-8-bold text-white">
          Ao continuar, você aurotiza o spoticati a acessar a imagem enviada. <br />
          Certifique-se de que você tem o direito de fazer o upload dessa imagem.
        </p>

      </div>
    </Modal>
  )
}