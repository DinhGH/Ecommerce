/* src/components/Buttons.jsx */

export function PrimaryButton({ editStyle = "", title, ...rest }) {
  return (
    <div
      className={`
        text-black
        bg-[#eeeeee] 
        rounded-xl 
        hover:bg-[#CFCFCF] transition ${editStyle}
      `}
      {...rest}
    >
      {title}
    </div>
  );
}

export function SecondaryButton({ editStyle = "", title, ...rest }) {
  return (
    <div
      className={`
        text-white
        bg-[#333]
        rounded-xl
        hover:bg-black transition ${editStyle}
      `}
      {...rest}
    >
      {title}
    </div>
  );
}

export function DangerButton({ editStyle = "", title, ...rest }) {
  return (
    <div
      className={`
      text-white
      bg-red-600
      rounded-xl
      hover:bg-red-700 transition ${editStyle}
      `}
      {...rest}
    >
      {title}
    </div>
  );
}
