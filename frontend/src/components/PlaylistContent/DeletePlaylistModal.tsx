import { Modal } from "../ui/Modal";

interface DeletePlaylistProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  playlistName: string
}

export default function DeletePlaylist({ isOpen, onClose, onConfirm, playlistName }: DeletePlaylistProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="bg-transparent p-0 ">
      <div className="bg-white flex flex-col gap-4 px-10 pt-10 pb-8.5 rounded-lg">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-bg-base text-18-bold">
            Apagar da sua biblioteca?
          </h2>
          <span className="text-bg-base text-12-medium">
            A playlist 
            <span className="text-12-bold"> {playlistName} </span>
            será excluída da sua biblioteca.
          </span>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button onClick={onClose} className="text-black text-12-bold px-5 py-2.5 rounded-full cursor-pointer outline-none">
            Cancelar
          </button>
          <button onClick={onConfirm} className="text-white text-12-bold px-5 py-2.5 rounded-full bg-danger hover:bg-danger-hover transition-colors cursor-pointer outline-none">
            Apagar
          </button>
        </div>
      </div>
    </Modal>
  )
}