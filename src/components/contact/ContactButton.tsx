"use client";

interface ContactButtonProps {
    onClick: () => void;
}

export default function ContactButton({
    onClick,
}: ContactButtonProps) {
    return (
        <button
            onClick={onClick}
            className="
      group
      relative
      overflow-hidden
      rounded-full
      border
      border-white
      px-8
      py-4
      uppercase
      tracking-[3px]
      text-white
      transition-all
      duration-500
      hover:bg-white
      hover:text-black
      "
        >
            <span
                className="
        relative
        z-10
        transition-transform
        duration-500
        group-hover:-translate-y-1
        "
            >
                Contact
            </span>
        </button>
    );
}