import { useTranslation } from "../../../i18n";
// import Games from "./components/games/Games";
import { capitalize } from "../../../lib/capitalize";
import SignUp from "./signComponent/SignUp";
export async function generateMetadata({ params: { lng } }) {
  const { t } = await useTranslation(lng);
  return {
    title: capitalize(t("signup")),
  };
}

export default function page({ params: { lng } }) {
  return <SignUp lng={lng} />;
}
