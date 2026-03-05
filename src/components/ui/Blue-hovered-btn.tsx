import { Link } from "@/i18n/navigation";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";

interface BlueHoveredBtnType {
  pathname: string;
  btnText: string;
  translationTargetText: string;
}
export default function BlueHoveredBtn({
  pathname,
  btnText,
  translationTargetText,
}: BlueHoveredBtnType) {
  const t = useTranslations(`${translationTargetText}`);

  return (
    <Button className="capitalize border-blue-600 border rounded-lg px-4 py-2 relative overflow-hidden group">
      <Link href={pathname} className="relative z-10 group-hover:text-white">
        {t(`${btnText}`)}
      </Link>
      <span className="absolute inset-0 bg-blue-600 -translate-x-full opacity-0 group-hover:translate-x-0 duration-500 rounded-r-lg ease-in-out  transition-transform group-hover:opacity-100"></span>
    </Button>
  );
}
