export default function DeleteIcon({ className, onClick: onClickHandler }) {
  return (
    <svg
      onClick={onClickHandler}
      xmlns="http://www.w3.org/2000/svg"
      role="button"
      className="text-danger mx-1"
      width="10%"
      height="10%"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}
